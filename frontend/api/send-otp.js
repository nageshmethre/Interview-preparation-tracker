// frontend/api/send-otp.js
// Vercel Serverless Function for PrepSpace Email Verification via Resend

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST is supported.' });
  }

  const { email, name, otp } = req.body || {};

  if (!email || !otp) {
    return res.status(400).json({ error: 'Missing email or otp parameter.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not configured.');
    return res.status(500).json({ error: 'Email service configuration error.' });
  }
  const recipientName = name && name.trim() ? name.trim() : 'Candidate';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PrepSpace Verification Code</title>
      <style>
        body { margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .wrapper { width: 100%; background-color: #000000; padding: 30px 10px; }
        .container { max-width: 480px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 36px 30px; color: #ededed; }
        .brand { font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 8px; }
        .heading { font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.3px; margin: 0 0 10px 0; }
        .subtext { font-size: 14px; color: #888888; line-height: 1.5; margin: 0 0 24px 0; }
        .otp-card { background-color: #111111; border: 1px solid #27272a; border-radius: 12px; padding: 20px; text-align: center; margin: 0 0 24px 0; }
        .otp-code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 34px; font-weight: 700; color: #ffffff; letter-spacing: 8px; }
        .expiry-note { font-size: 12px; color: #a1a1aa; line-height: 1.5; margin: 0 0 24px 0; }
        .footer { font-size: 11px; color: #52525b; line-height: 1.5; border-top: 1px solid #1f1f1f; padding-top: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="brand">
            ▲ PrepSpace
          </div>
          <h1 class="heading">Verify Your Email Address</h1>
          <p class="subtext">
            Hello <strong>${recipientName}</strong>,<br>
            Please enter the following 6-digit confirmation code on PrepSpace to complete your registration and secure your space.
          </p>
          <div class="otp-card">
            <div class="otp-code">${otp}</div>
          </div>
          <p class="expiry-note">
            ⚠️ This code expires in <strong>5 minutes</strong>. For security, never share this code with anyone. If you did not create a PrepSpace account, you can safely ignore this email.
          </p>
          <div class="footer">
            &copy; 2026 PrepSpace (stream-in.app). All rights reserved.<br>
            Technical Interview Preparation & Career Readiness Platform.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'PrepSpace <onboarding@resend.dev>',
        to: [email],
        subject: `${otp} is your PrepSpace verification code`,
        html: htmlContent
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('Resend API returned non-200:', data);
      return res.status(200).json({
        success: true,
        emailSent: false,
        warning: data.message || 'Test mode recipient limit',
        devCode: otp
      });
    }

    return res.status(200).json({
      success: true,
      emailSent: true,
      id: data.id
    });
  } catch (err) {
    console.error('Resend dispatch error:', err);
    return res.status(200).json({
      success: true,
      emailSent: false,
      error: err.message,
      devCode: otp
    });
  }
}
