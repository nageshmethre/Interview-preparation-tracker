// frontend/api/send-otp.js
// Vercel Serverless Function for PrepSpace Email Verification via Resend

module.exports = async function handler(req, res) {
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

  const { email, name, otp, type, subject, message } = req.body || {};

  const isAdminMsg = type === 'admin_message' || (subject && message);

  if (!email || (!otp && !isAdminMsg)) {
    return res.status(400).json({ error: 'Missing required email, otp, or message parameters.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not configured.');
    return res.status(500).json({ error: 'Email service configuration error.' });
  }
  const recipientName = name && name.trim() ? name.trim() : 'Candidate';

  let emailSubject = '';
  let emailText = '';
  let htmlContent = '';

  if (isAdminMsg) {
    emailSubject = subject || 'Official Message from PrepSpace Administration';
    emailText = `Hello ${recipientName},\n\n${message}\n\n— The PrepSpace Executive Team\nhttps://stream-in.app`;
    htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${emailSubject}</title>
      <style>
        body { margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .wrapper { width: 100%; background-color: #000000; padding: 30px 10px; }
        .container { max-width: 520px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 36px 30px; color: #ededed; }
        .brand { font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 8px; }
        .badge { display: inline-block; background: rgba(99, 102, 241, 0.2); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.4); padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 16px; }
        .heading { font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.3px; margin: 0 0 12px 0; }
        .body-card { background-color: #111111; border: 1px solid #27272a; border-radius: 12px; padding: 22px; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-line; }
        .cta-btn { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; margin: 16px 0; }
        .footer { font-size: 11px; color: #52525b; line-height: 1.5; border-top: 1px solid #1f1f1f; padding-top: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="brand">
            ▲ PrepSpace
          </div>
          <div><span class="badge">Official Notice</span></div>
          <h1 class="heading">${emailSubject}</h1>
          <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 10px 0;">Hello <strong>${recipientName}</strong>,</p>
          <div class="body-card">
            ${message}
          </div>
          <div style="text-align: center;">
            <a href="https://stream-in.app" class="cta-btn" style="color: #ffffff;">Launch PrepSpace Portal &rarr;</a>
          </div>
          <div class="footer">
            &copy; 2026 PrepSpace (stream-in.app) &bull; Global Operations Team.<br>
            Technical Interview Preparation & Career Readiness Platform.
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
  } else {
    emailSubject = `Your PrepSpace Verification Code: ${otp}`;
    emailText = `Hello ${recipientName},\n\nYour PrepSpace verification code is: ${otp}\n\nThis code will expire in 5 minutes. For your security, never share this code with anyone.\n\nIf you did not request this verification code, you can safely ignore this email.\n\n— The PrepSpace Team\nhttps://stream-in.app`;
    htmlContent = `
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
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'PrepSpace <verify@stream-in.app>',
        to: [email],
        reply_to: 'verify@stream-in.app',
        subject: emailSubject,
        text: emailText,
        html: htmlContent,
        headers: {
          'X-Entity-Ref-ID': `${Date.now()}-${otp || 'admin'}`
        }
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
