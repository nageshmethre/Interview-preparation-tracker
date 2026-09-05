/**
 * production-pages.js - PrepSpace Production Pages, Legal Hub, Customer Lifecycle & UX States
 * Designed with Google-inspired Material Design 3, clean white/glassy layout, subtle colorful accents,
 * rounded pill components, strong typography, and search-first UX.
 * 
 * Author: Nagesh Methre / PrepSpace Engineering
 * Version: 2.6.7
 */

(function() {
  'use strict';

  window.components = window.components || {};

  // =========================================================================
  // 1. LEGAL & COMPLIANCE REPOSITORY (14 Official Documents)
  // =========================================================================
  const LEGAL_DOCS = {
    'privacy': {
      slug: 'privacy',
      title: 'Privacy Policy',
      category: 'Legal & Privacy',
      icon: 'fa-shield-halved',
      badgeColor: 'blue',
      lastUpdated: 'September 2026',
      summary: 'How PrepSpace collects, processes, protects, and governs your personal data and interview activity.',
      content: `
        <h4>1. Introduction & Overview</h4>
        <p>PrepSpace ("we", "our", or "us"), operated at <a href="https://stream-in.app" class="text-primary text-decoration-none">stream-in.app</a>, is committed to safeguarding the privacy and personal data of our users worldwide. This Privacy Policy outlines our transparent data practices, explaining how we collect, use, disclose, and protect your information when you access our technical interview preparation platform, coding environments, mock interview simulators, and associated services.</p>

        <h4>2. Information We Collect</h4>
        <p>We only collect information necessary to deliver a high-performance, personalized interview preparation experience:</p>
        <ul>
          <li><strong>Account & Identity Data:</strong> Your name, email address, profile picture (via Google OAuth), and authentication credentials. Passwords are never stored in plaintext and are salted with bcrypt (cost factor 12).</li>
          <li><strong>Interview & Practice Activity:</strong> Problem submissions, DSA solution code, time spent per question, test execution results, mock interview transcripts, audio responses (when using AI Voice Mock Interviews), and self-assessment scores.</li>
          <li><strong>Device & Usage Telemetry:</strong> IP address, browser type, operating system version, screen resolution, session duration, and anonymous usage telemetry for service reliability.</li>
          <li><strong>Billing Information:</strong> Payments are processed via our PCI-DSS certified gateway partner, <strong>Cashfree Payments</strong>. PrepSpace never receives, logs, or stores full debit/credit card numbers or UPI PINs. We only retain payment reference tokens, order IDs, and subscription statuses.</li>
        </ul>

        <h4>3. How We Utilize Your Information</h4>
        <p>Your data is processed strictly for the following operational and enhancement purposes:</p>
        <ul>
          <li>To generate personalized readiness scores, recommend topic reviews, and calculate interview probability indices.</li>
          <li>To power our AI Mock Interview feedback engine (evaluating code readability, algorithmic complexity, and communication clarity).</li>
          <li>To maintain platform security, prevent unauthorized account sharing, and detect automated scraping or abusive code execution.</li>
          <li>To communicate critical account alerts, transaction receipts, security warnings, and platform updates.</li>
        </ul>

        <h4>4. Data Sharing & Third-Party Processors</h4>
        <p><strong>We never sell, rent, or trade your personal data or interview submissions to third parties or recruiters without your explicit opt-in consent.</strong> Data is shared only with trusted infrastructure subprocessors bound by strict data processing agreements:</p>
        <ul>
          <li><strong>Render Cloud Infrastructure:</strong> Backend application hosting and encrypted persistent databases (US/Frankfurt regions).</li>
          <li><strong>Cashfree Payments:</strong> Secure transaction authorization, billing tokenization, and payout processing.</li>
          <li><strong>Google Identity & Cloud:</strong> Secure OAuth authentication and high-availability DNS routing.</li>
        </ul>

        <h4>5. Data Retention & Erasure (GDPR & CCPA Rights)</h4>
        <p>You retain complete sovereignty over your information. Under GDPR, CCPA, and global privacy standards, you have the right to access, rectify, export, or permanently delete your account and associated practice data at any time from <strong>Settings &rarr; Account &rarr; Delete Profile</strong>, or by emailing <a href="mailto:privacy@stream-in.app" class="text-primary text-decoration-none">privacy@stream-in.app</a>. Deletion requests are fully purged from production storage within 7 business days.</p>

        <h4>6. Contact Our Data Protection Officer</h4>
        <p>For any privacy inquiries, audits, or regulatory compliance questions, please contact our Data Protection Officer at <a href="mailto:privacy@stream-in.app" class="text-primary text-decoration-none">privacy@stream-in.app</a>.</p>
      `
    },

    'terms': {
      slug: 'terms',
      title: 'Terms of Service',
      category: 'Legal & Privacy',
      icon: 'fa-scale-balanced',
      badgeColor: 'blue',
      lastUpdated: 'September 2026',
      summary: 'Legally binding terms and conditions governing the use of PrepSpace software, mock exams, and services.',
      content: `
        <h4>1. Acceptance of Terms</h4>
        <p>By creating an account, browsing, or subscribing to PrepSpace ("Service"), accessible at <a href="https://stream-in.app" class="text-primary text-decoration-none">stream-in.app</a>, you signify that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must refrain from accessing or using the Service.</p>

        <h4>2. Account Eligibility & Responsibilities</h4>
        <p>You must be at least 16 years of age or possess legal parental consent to create an account. You agree to provide true, accurate, and current information during registration. You are solely responsible for safeguarding your login credentials and for all activities that occur under your account.</p>

        <h4>3. Subscriptions, Renewals & Billing</h4>
        <ul>
          <li><strong>Free Tier vs. Pro Subscription:</strong> Free tier accounts have access to standard DSA roadmaps and limited daily mock questions. Pro subscriptions unlock unlimited mock evaluations, AI code reviews, full company problem archives, and priority compile sandboxes.</li>
          <li><strong>Automatic Renewal:</strong> Pro subscriptions renew automatically at the conclusion of each billing period (monthly or annually) unless cancelled before the renewal date.</li>
          <li><strong>Currency & Taxes:</strong> All pricing displayed is exclusive or inclusive of applicable GST/sales taxes based on your billing jurisdiction as indicated at checkout.</li>
        </ul>

        <h4>4. Intellectual Property Rights</h4>
        <p><strong>Your Code:</strong> You retain 100% intellectual property ownership of the source code, solutions, and notes you write inside PrepSpace editors.</p>
        <p><strong>PrepSpace Assets:</strong> The PrepSpace software, brand marks, curated question sets, editorial explanations, AI evaluation models, graphics, and interface designs are the exclusive property of PrepSpace and its founder, Nagesh Methre. You may not reverse-engineer, decompile, redistribute, or reproduce any part of our platform without prior written authorization.</p>

        <h4>5. Fair Use & Prohibited Conduct</h4>
        <p>Users agree not to: (a) share accounts across multiple concurrent developers; (b) launch automated bots, crawlers, or scrapers against our APIs; (c) attempt to exploit compiler sandboxes with malicious payloads or resource exhaustion attacks; or (d) publish or commercialize our proprietary mock interview answer keys.</p>

        <h4>6. Limitation of Liability</h4>
        <p>PrepSpace is provided on an "AS IS" and "AS AVAILABLE" basis. In no event shall PrepSpace, its affiliates, or licensors be liable for indirect, punitive, incidental, special, or consequential damages resulting from the use or inability to use the platform.</p>

        <h4>7. Governing Law & Jurisdiction</h4>
        <p>These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any dispute arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Pune / Mumbai, Maharashtra.</p>
      `
    },

    'cookies': {
      slug: 'cookies',
      title: 'Cookie Policy',
      category: 'Legal & Privacy',
      icon: 'fa-cookie-bite',
      badgeColor: 'yellow',
      lastUpdated: 'September 2026',
      summary: 'Detailed explanation of cookie technologies, local storage tokens, and preference controls used on PrepSpace.',
      content: `
        <h4>1. What Are Cookies and Local Storage?</h4>
        <p>Cookies and browser storage mechanisms (such as <code>localStorage</code> and <code>sessionStorage</code>) are small text files or key-value entries stored on your device when you visit our website. They allow PrepSpace to recognize your authenticated session, remember your interface settings, and ensure reliable security.</p>

        <h4>2. Categories of Cookies We Use</h4>
        <div class="table-responsive my-3">
          <table class="table table-bordered border-secondary border-opacity-15 fs-8 text-white">
            <thead class="bg-white bg-opacity-80">
              <tr>
                <th>Category</th>
                <th>Purpose</th>
                <th>Lifespan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong class="text-info">Essential / Strict Security</strong></td>
                <td>Stateless JWT token authentication, CSRF validation, and active session persistence.</td>
                <td>Session / 30 Days</td>
                <td><span class="badge bg-success">Required</span></td>
              </tr>
              <tr>
                <td><strong class="text-primary">Functional & Preferences</strong></td>
                <td>Remembers your theme (Dark / Light mode), compiler settings, sidebar collapse state, and editor font size.</td>
                <td>1 Year</td>
                <td><span class="badge bg-secondary">Optional</span></td>
              </tr>
              <tr>
                <td><strong class="text-warning">Performance & Analytics</strong></td>
                <td>Anonymized page latency, button engagement metrics, and error diagnostics to optimize compiler speed.</td>
                <td>90 Days</td>
                <td><span class="badge bg-secondary">Optional</span></td>
              </tr>
              <tr>
                <td><strong class="text-danger">Affiliate & Referral</strong></td>
                <td>Records valid referral invite codes so eligible candidates receive earned bonus XP and discounts.</td>
                <td>30 Days</td>
                <td><span class="badge bg-secondary">Optional</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>3. Managing Your Cookie Preferences</h4>
        <p>You have granular control over non-essential cookies. You can click the <strong>"Cookie Preferences"</strong> button at the top of this hub or in the platform footer at any time to modify your consent. Furthermore, you can configure your browser to reject cookies or clear local storage, though essential features like persistent login will require authentication upon every visit.</p>
      `
    },

    'refund-policy': {
      slug: 'refund-policy',
      title: 'Refund Policy',
      category: 'Billing & Consumer Rights',
      icon: 'fa-money-bill-transfer',
      badgeColor: 'green',
      lastUpdated: 'September 2026',
      summary: 'Our 7-day money-back guarantee, eligibility criteria, and transparent refund disbursement timelines.',
      content: `
        <h4>1. Our 7-Day Money-Back Guarantee</h4>
        <p>At PrepSpace, candidate satisfaction and career transformation are our highest priorities. If you upgrade to a <strong>PrepSpace Pro Annual</strong> or <strong>Monthly Plan</strong> and feel the platform does not meet your technical preparation needs, you are eligible for a <strong>100% full refund within 7 calendar days</strong> from the timestamp of initial purchase.</p>

        <h4>2. Eligibility Criteria</h4>
        <p>To qualify for a no-questions-asked refund under our 7-day policy:</p>
        <ul>
          <li>The refund request must be lodged within 7 days of the initial subscription charge.</li>
          <li>The account must not have triggered severe security violations (e.g. automated scraping of our proprietary problem sets or credential sharing).</li>
          <li>For annual subscription renewals, requests made within 48 hours of automated renewal are fully eligible.</li>
        </ul>

        <h4>3. Non-Refundable Items</h4>
        <p>The following items are strictly non-refundable:</p>
        <ul>
          <li>Gift subscriptions or voucher credits once redeemed.</li>
          <li>Accounts terminated due to malicious abuse, anti-cheat violations during live coding contests, or denial-of-service attempts.</li>
        </ul>

        <h4>4. How to Request a Refund</h4>
        <p>Simply send an email from your registered PrepSpace account email address to <a href="mailto:billing@stream-in.app" class="text-primary text-decoration-none">billing@stream-in.app</a> with the subject <code>Refund Request - [Your Order ID]</code>. Our financial ops team processes verified requests within 24 hours.</p>

        <h4>5. Payout Disbursement SLA</h4>
        <p>Once approved, refunds are credited back to the original payment source (Credit/Debit Card, UPI handle, or Net Banking) via <strong>Cashfree Payments</strong> within <strong>5 to 7 business days</strong> depending on your bank's settlement cycle.</p>
      `
    },

    'cancellation-policy': {
      slug: 'cancellation-policy',
      title: 'Cancellation Policy',
      category: 'Billing & Consumer Rights',
      icon: 'fa-calendar-xmark',
      badgeColor: 'red',
      lastUpdated: 'September 2026',
      summary: 'Cancel your subscription anytime with zero penalty, no hidden fees, and continuous access until billing term ends.',
      content: `
        <h4>1. Cancel Anytime Guarantee</h4>
        <p>You maintain 100% control over your PrepSpace membership. You can cancel your subscription at any time, 24 hours a day, 7 days a week, directly from your dashboard without speaking to a representative or navigating confusing retention barriers.</p>

        <h4>2. Step-by-Step Cancellation Process</h4>
        <ol>
          <li>Log in to your PrepSpace dashboard at <a href="https://stream-in.app/#/login" class="text-primary text-decoration-none">stream-in.app</a>.</li>
          <li>Navigate to <strong>Settings &rarr; Billing & Subscription</strong>.</li>
          <li>Under your active plan card, click <strong>"Cancel Subscription"</strong>.</li>
          <li>Review the cancellation summary and confirm. An instant confirmation email will be delivered to your inbox.</li>
        </ol>

        <h4>3. Post-Cancellation Access & Data Preservation</h4>
        <ul>
          <li><strong>Uninterrupted Pro Access:</strong> When you cancel, your Pro features remain fully active until the final second of your prepaid billing term. You will never be billed again.</li>
          <li><strong>Data Continuity:</strong> Your solved questions, DSA notes, mock interview scores, and custom study plans will remain permanently preserved on the Free tier. You can re-upgrade anytime to regain Pro privileges without data loss.</li>
        </ul>

        <h4>4. Pausing Your Subscription</h4>
        <p>Need a temporary break because you've landed your dream job or have university exams? You can pause your subscription for up to 60 days via the cancellation modal, preserving your discounted legacy pricing upon resumption.</p>
      `
    },

    'shipping-policy': {
      slug: 'shipping-policy',
      title: 'Shipping & Digital Delivery Policy',
      category: 'Billing & Consumer Rights',
      icon: 'fa-truck-fast',
      badgeColor: 'blue',
      lastUpdated: 'September 2026',
      summary: 'Information regarding 100% digital fulfillment, immediate license provisioning, and cloud delivery SLAs.',
      content: `
        <h4>1. 100% Digital SaaS Product Delivery</h4>
        <p>PrepSpace is a cloud-hosted software-as-a-service (SaaS) platform for technical interview preparation. We do not manufacture, package, or ship any physical tangible goods. Consequently, <strong>there are zero physical shipping charges, customs duties, or courier handling fees</strong> associated with any purchase on our platform.</p>

        <h4>2. Instant Electronic Fulfillment SLA</h4>
        <ul>
          <li><strong>Immediate Activation:</strong> Upon successful completion of payment via Cashfree, your PrepSpace Pro entitlement is provisioned in real time (average activation latency: under 1.8 seconds).</li>
          <li><strong>Email Confirmation & Tax Invoices:</strong> An official digital invoice containing your Order ID, GST breakdown, and transaction reference is immediately emailed to your registered address.</li>
          <li><strong>Continuous Cloud Availability:</strong> Your digital access is accessible worldwide 24/7 through any modern web browser or mobile browser with zero download requirements.</li>
        </ul>

        <h4>3. Delivery Failure Troubleshooting</h4>
        <p>In the rare event that network disruption delays your automated license provisioning following payment, please click <strong>"Check Payment Status"</strong> in Settings or contact our automated fulfillment desk at <a href="mailto:support@stream-in.app" class="text-primary text-decoration-none">support@stream-in.app</a>. Verified transactions are resolved within 15 minutes.</p>
      `
    },

    'return-policy': {
      slug: 'return-policy',
      title: 'Return / Exchange Policy',
      category: 'Billing & Consumer Rights',
      icon: 'fa-rotate-left',
      badgeColor: 'yellow',
      lastUpdated: 'September 2026',
      summary: 'Guidelines for digital software license returns, tier upgrades, plan switches, and team seat exchanges.',
      content: `
        <h4>1. Digital License Nature</h4>
        <p>Due to the immediate digital fulfillment of PrepSpace software capabilities (such as proprietary company mock question banks and AI compiler resources), standard physical merchandise return protocols do not apply. All returns are governed by our <a href="#/refund-policy" class="text-primary text-decoration-none">Refund Policy</a>.</p>

        <h4>2. Plan Upgrades & Tier Exchanges</h4>
        <p>We provide seamless tier exchanges for candidates seeking to upgrade or change their plan:</p>
        <ul>
          <li><strong>Monthly to Annual Upgrade:</strong> You can upgrade from Monthly Pro to Annual Pro at any time. Any unused balance on your current monthly cycle will be automatically calculated as a prorated credit toward your annual subscription.</li>
          <li><strong>Team Seat Reallocations:</strong> University batches and enterprise teams can reassign Pro developer seats between candidates directly from the organization admin panel with zero transfer fees.</li>
        </ul>

        <h4>3. Dispute Resolution</h4>
        <p>If you believe a billing exchange error occurred or an incorrect charge was applied, contact our billing resolution desk at <a href="mailto:billing@stream-in.app" class="text-primary text-decoration-none">billing@stream-in.app</a> prior to filing a bank chargeback for accelerated 24-hour resolution.</p>
      `
    },

    'disclaimer': {
      slug: 'disclaimer',
      title: 'Legal & Educational Disclaimer',
      category: 'Standards & Community',
      icon: 'fa-triangle-exclamation',
      badgeColor: 'red',
      lastUpdated: 'September 2026',
      summary: 'Important notices concerning interview outcomes, non-affiliation with third-party tech corporations, and educational scope.',
      content: `
        <h4>1. Educational Purpose Only</h4>
        <p>The materials, algorithmic problems, system design architectures, mock interview simulations, and AI feedback provided by PrepSpace are designed exclusively for educational, self-assessment, and interview preparation purposes.</p>

        <h4>2. No Guarantee of Employment or Job Offers</h4>
        <p>While PrepSpace provides cutting-edge tools to elevate candidate readiness, <strong>PrepSpace does not guarantee employment, job offers, interview calls, or specific salary brackets at any organization</strong>. Hiring decisions rest solely with independent employers, interviewers, and recruiting panels.</p>

        <h4>3. Non-Affiliation & Trademark Notice</h4>
        <p>Company names (such as Google, Meta, Amazon, Microsoft, Apple, Netflix, Uber, etc.), logos, and interview patterns referenced throughout our problem archive are the registered trademarks of their respective owners. Their mention on PrepSpace is strictly for identification and fair-use educational guidance. PrepSpace is an independent entity and is not affiliated, endorsed, or sponsored by any of these corporations.</p>

        <h4>4. AI Feedback Accuracy</h4>
        <p>AI-generated mock interview evaluations and code reviews are produced by advanced machine learning models. While highly accurate for preparation, candidates should use their professional engineering judgment when applying architectural concepts in production systems.</p>
      `
    },

    'accessibility': {
      slug: 'accessibility',
      title: 'Accessibility Statement',
      category: 'Standards & Community',
      icon: 'fa-universal-access',
      badgeColor: 'blue',
      lastUpdated: 'September 2026',
      summary: 'Our steadfast commitment to WCAG 2.1 AA digital accessibility standards for all engineers and candidates.',
      content: `
        <h4>1. Our Accessibility Commitment</h4>
        <p>PrepSpace believes that top-tier technical education and interview preparation must be universally accessible to everyone, including individuals with visual, auditory, motor, or cognitive disabilities. We actively build and audit our platform to conform with the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.</p>

        <h4>2. Key Accessibility Features Implemented</h4>
        <ul>
          <li><strong>High Contrast Themes:</strong> Carefully calibrated color palettes across dark and light modes with minimum contrast ratios exceeding 4.5:1 for body text and 3:1 for interface components.</li>
          <li><strong>Comprehensive Keyboard Navigation:</strong> Full focus indicators, logical tab-order traversal, and keyboard shortcuts across coding editors, mock tests, and modal dialogs.</li>
          <li><strong>Screen Reader Optimization:</strong> Proper semantic HTML5 elements, descriptive <code>aria-label</code> tags, and live announcement regions for dynamic compiler output.</li>
          <li><strong>Adjustable Typography & Motion Reduction:</strong> Responsive text sizing up to 200% without loss of content and strict adherence to <code>prefers-reduced-motion</code> system settings.</li>
        </ul>

        <h4>3. Continuous Audits & Feedback</h4>
        <p>We conduct regular automated and manual accessibility audits. If you encounter any accessibility barrier or have suggestions for enhancement, please contact our Accessibility Lead at <a href="mailto:accessibility@stream-in.app" class="text-primary text-decoration-none">accessibility@stream-in.app</a>. We strive to address reported issues within 5 business days.</p>
      `
    },

    'dpa': {
      slug: 'dpa',
      title: 'Data Processing Agreement (DPA)',
      category: 'Legal & Privacy',
      icon: 'fa-file-shield',
      badgeColor: 'green',
      lastUpdated: 'September 2026',
      summary: 'Standard contractual clauses, GDPR/CCPA data processing terms, and security commitments for users and teams.',
      content: `
        <h4>1. Scope and Applicability</h4>
        <p>This Data Processing Agreement ("DPA") supplements the PrepSpace Terms of Service and applies to the processing of personal data governed by GDPR, UK GDPR, CCPA, or applicable data protection legislation in connection with the customer's use of PrepSpace services.</p>

        <h4>2. Roles of the Parties</h4>
        <ul>
          <li><strong>Candidate / Customer as Data Controller:</strong> You control the content, code, notes, and profile attributes uploaded to the platform.</li>
          <li><strong>PrepSpace as Data Processor:</strong> We process your data exclusively on your behalf and in accordance with your instructions as documented in our Terms and this DPA.</li>
        </ul>

        <h4>3. Subprocessor Transparency</h4>
        <p>PrepSpace engages verified third-party subprocessors to deliver core infrastructure. We enforce equivalent security obligations via written contracts. Our current infrastructure subprocessors include:</p>
        <ul>
          <li><strong>Render Services Inc.:</strong> Cloud compute nodes, container orchestration, and isolated PostgreSQL databases.</li>
          <li><strong>Cashfree Payments India Pvt. Ltd.:</strong> PCI-DSS compliant payment processing and recurring subscription tokenization.</li>
          <li><strong>Google Cloud Platform:</strong> Cloud identity verification, Google OAuth, and secure DNS routing.</li>
        </ul>

        <h4>4. Technical & Organizational Security Measures</h4>
        <p>PrepSpace maintains rigorous security safeguards including TLS 1.3 transit encryption, AES-256 storage encryption, continuous automated vulnerability scanning, strict role-based access controls (RBAC), and zero-trust internal network policies.</p>

        <h4>5. International Data Transfers</h4>
        <p>Where personal data is transferred across international boundaries, PrepSpace relies on Standard Contractual Clauses (SCCs) approved by the European Commission, ensuring robust data subject protection regardless of geographic processing location.</p>
      `
    },

    'acceptable-use': {
      slug: 'acceptable-use',
      title: 'Acceptable Use Policy',
      category: 'Trust, Security & Compliance',
      icon: 'fa-hand-dots',
      badgeColor: 'yellow',
      lastUpdated: 'September 2026',
      summary: 'Rules governing proper platform usage, code compilation sandbox security, and anti-abuse protocols.',
      content: `
        <h4>1. Purpose & Standards</h4>
        <p>This Acceptable Use Policy ("AUP") defines rules of acceptable conduct to maintain a secure, equitable, and high-performance learning environment for all developers preparing on PrepSpace.</p>

        <h4>2. Strictly Prohibited Activities</h4>
        <p>Under no circumstances may any user engage in the following activities:</p>
        <ul>
          <li><strong>Sandbox Abuse & Malware Execution:</strong> Writing or executing malicious code, fork bombs, network sniffers, cryptocurrency miners, or software designed to escape the compiler sandbox.</li>
          <li><strong>Automated Scraping:</strong> Using scrapers, headless browsers, bots, or automated extraction tools to harvest our proprietary question banks, mock exams, or solution analytics.</li>
          <li><strong>Credential Sharing:</strong> Selling, reselling, renting, or sharing individual user accounts across multiple candidates or corporate teams.</li>
          <li><strong>Denial of Service (DoS):</strong> Flooding platform endpoints, brute-forcing login systems, or attempting to degrade server availability.</li>
          <li><strong>Contest Tampering:</strong> Submitting plagiarized solutions or utilizing unauthorized automated solver scripts during live timed coding assessments.</li>
        </ul>

        <h4>3. Enforcement & Account Actions</h4>
        <p>Failure to abide by this AUP may result in immediate suspension of account privileges, revocation of Pro licenses without refund, and, in severe cases involving illegal malicious exploitation, referral to relevant law enforcement authorities.</p>
      `
    },

    'security': {
      slug: 'security',
      title: 'Security Policy & Practices',
      category: 'Trust, Security & Compliance',
      icon: 'fa-lock',
      badgeColor: 'green',
      lastUpdated: 'September 2026',
      summary: 'Our zero-trust architecture, encryption standards, continuous threat monitoring, and infrastructure defense.',
      content: `
        <h4>1. Security Philosophy: Defense in Depth</h4>
        <p>PrepSpace treats user security, data integrity, and compiler isolation as core architectural foundations. We employ a multi-layered, zero-trust security paradigm to safeguard customer records and coding submissions.</p>

        <h4>2. Encryption Standards</h4>
        <ul>
          <li><strong>Data in Transit:</strong> All web traffic and API interactions are strictly encrypted using TLS 1.3 with automated HSTS enforcement and forward secrecy cipher suites. Plaintext HTTP traffic is rejected.</li>
          <li><strong>Data at Rest:</strong> All databases, audit logs, and persistent snapshots are encrypted using industry-standard AES-256 bit encryption.</li>
          <li><strong>Authentication & Passwords:</strong> Passwords are cryptographically hashed using salted bcrypt (cost factor 12). Session tokens use stateless, cryptographically signed JSON Web Tokens (JWT) with restricted lifetimes.</li>
        </ul>

        <h4>3. Sandboxed Code Execution Architecture</h4>
        <p>Candidate code submissions in Python, Java, C++, JavaScript, and SQL run inside isolated, ephemeral container sandboxes with strictly clamped memory limits, zero host network access, non-root user execution, and hard CPU execution timeouts (5000ms max) to prevent lateral host compromise.</p>

        <h4>4. Vulnerability Management & Auditing</h4>
        <p>Our engineering team performs continuous automated dependency audits (via Dependabot and Snyk) and reviews all pull requests with strict static application security testing (SAST) prior to production deployment.</p>
      `
    },

    'responsible-disclosure': {
      slug: 'responsible-disclosure',
      title: 'Responsible Disclosure Policy',
      category: 'Trust, Security & Compliance',
      icon: 'fa-bug',
      badgeColor: 'red',
      lastUpdated: 'September 2026',
      summary: 'Safe harbor framework and submission guidelines for independent security researchers and white-hat ethical hackers.',
      content: `
        <h4>1. Commitment to Ethical Research</h4>
        <p>PrepSpace recognizes the vital role ethical security researchers play in keeping the digital ecosystem safe. We welcome responsible reports regarding potential vulnerabilities in our web applications, APIs, and infrastructure.</p>

        <h4>2. Safe Harbor Guarantee</h4>
        <p>If you conduct your security research in good faith and in compliance with this policy, we will consider your activities authorized, will not initiate legal action against you, and will work cooperatively with you to understand and remediate the issue promptly.</p>

        <h4>3. Rules of Engagement</h4>
        <ul>
          <li>Do not access, modify, or destroy data belonging to other users. Only test against accounts you own or with explicit test fixtures.</li>
          <li>Do not perform Denial of Service (DoS/DDoS) attacks against production servers.</li>
          <li>Do not execute social engineering, phishing, or physical attacks against our personnel or hosting data centers.</li>
          <li>Give our security team a reasonable period of <strong>at least 30 days</strong> to resolve the vulnerability before any public disclosure.</li>
        </ul>

        <h4>4. How to Submit a Report</h4>
        <p>Send detailed proof-of-concept steps and remediation suggestions to <a href="mailto:security@stream-in.app" class="text-primary text-decoration-none">security@stream-in.app</a>. Our security team acknowledges all reports within <strong>48 hours</strong> and provides continuous triage updates.</p>
      `
    },

    'community-guidelines': {
      slug: 'community-guidelines',
      title: 'Community Guidelines',
      category: 'Standards & Community',
      icon: 'fa-users',
      badgeColor: 'blue',
      lastUpdated: 'September 2026',
      summary: 'Code of conduct for peer mock interviews, discussion threads, code reviews, and collaborative preparation.',
      content: `
        <h4>1. Our Community Vision</h4>
        <p>PrepSpace is built to be a supportive, rigorous, and inspiring ecosystem where aspiring software engineers from all backgrounds can elevate each other to reach top-tier engineering roles.</p>

        <h4>2. Core Tenets of Conduct</h4>
        <ul>
          <li><strong>Constructive & Empathetic Feedback:</strong> During peer mock interviews and code discussions, critique the code and architecture, never the person. Encourage growth and offer actionable suggestions.</li>
          <li><strong>Respect & Inclusivity:</strong> We maintain zero tolerance for discrimination, harassment, hate speech, or disparaging remarks based on race, gender, sexual orientation, disability, age, or nationality.</li>
          <li><strong>Academic Integrity:</strong> Share conceptual explanations, algorithmic intuition, and time complexity tradeoffs. Do not spam raw unverified solutions or promote cheating during ongoing recruitment drives.</li>
          <li><strong>No Spam or Commercial Solicitations:</strong> Unsolicited advertisements, promotional links, self-promotion, or job referral solicitations in public study rooms are prohibited.</li>
        </ul>

        <h4>3. Reporting & Moderation</h4>
        <p>If you experience or witness a violation of these guidelines during a peer mock session or study room, report it immediately to our moderation team at <a href="mailto:community@stream-in.app" class="text-primary text-decoration-none">community@stream-in.app</a>. Our team acts decisively on reported incidents.</p>
      `
    }
  };

  window.LEGAL_DOCS = LEGAL_DOCS;

  // =========================================================================
  // 2. LEGAL HUB COMPONENT (Google Material Design & Search-First Aesthetic)
  // =========================================================================
  components.legalHub = function(activeSlug) {
    if (!activeSlug || !LEGAL_DOCS[activeSlug]) activeSlug = 'privacy';
    const activeDoc = LEGAL_DOCS[activeSlug];

    const categories = ['All Policies', 'Legal & Privacy', 'Billing & Consumer Rights', 'Trust, Security & Compliance', 'Standards & Community'];
    const docKeys = Object.keys(LEGAL_DOCS);

    return `
      <div class="google-legal-hub d-flex flex-column" style="background: #18181b !important; height: 100vh; max-height: 100vh; overflow: hidden;">
        <!-- Top Google-Style Header with Dark Grey Background & White Text -->
        <div class="border-bottom border-secondary border-opacity-10 sticky-top flex-shrink-0" style="background: #1c1c20 !important; border-bottom: 1px solid #323238 !important; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 100;">
          <div class="google-four-color-bar" style="height: 2px; background: #323238;"></div>
          <div class="container py-3">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div class="d-flex align-items-center gap-3">
                <a href="#/" class="text-decoration-none d-flex align-items-center gap-2">
                  <img src="assets/prepspace_icon.png?v=2.4.4" alt="PrepSpace" style="width: 32px; height: 32px; object-fit: contain;">
                  <span class="text-white fw-bold fs-6">PrepSpace</span>
                </a>
                <span class="text-secondary fs-7">/</span>
                <span class="text-white fs-7 fw-semibold">Legal & Compliance Hub</span>
              </div>

              <!-- Search Bar: Search-First Experience -->
              <div class="google-search-pill-wrapper flex-grow-1" style="max-width: 460px;">
                <i class="fa-solid fa-magnifying-glass google-search-icon text-muted"></i>
                <input type="text" id="legal-search-input" class="google-search-pill" placeholder="Search across policies, DPA, security, refund terms..." autocomplete="off" style="background: #222226 !important; border: 1px solid #323238 !important; color: #f4f4f5 !important; padding-left: 42px !important;">
              </div>

              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-glass rounded-pill px-3 text-white" style="background: #27272a; border: 1px solid #3f3f46; color: #f4f4f5;" onclick="window.print()"><i class="fa-solid fa-print me-1"></i> Print</button>
                ${(typeof state !== 'undefined' && state && state.token)
                  ? `<a href="#/dashboard" class="btn btn-sm btn-premium rounded-2 px-3">Dashboard <i class="fa-solid fa-arrow-right ms-1"></i></a>`
                  : `<a href="#/login" class="btn btn-sm btn-premium rounded-2 px-3">Sign In <i class="fa-solid fa-arrow-right ms-1"></i></a>`}
              </div>
            </div>

            <!-- Category Pills Filter Bar -->
            <div class="d-flex align-items-center gap-2 pt-3 overflow-x-auto pb-1" id="legal-category-pills">
              ${categories.map((cat, i) => `
                <button class="google-nav-pill ${i === 0 ? 'active' : ''}" data-cat="${cat}">${cat}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Main Body: Two-Column Layout (Header & Navigator Fixed, Only Document Moves) -->
        <div class="container my-3 flex-grow-1 overflow-hidden d-flex flex-column" style="min-height: 0;">
          <div class="row g-3 flex-grow-1 overflow-hidden" style="min-height: 0;">
            <!-- Mobile Policy Selector -->
            <div class="col-12 d-lg-none mb-2 flex-shrink-0">
              <div class="google-glass-card p-3 d-flex align-items-center justify-content-between gap-2" style="background: #222226; border: 1px solid #323238;">
                <div class="d-flex align-items-center gap-2 flex-grow-1 min-w-0">
                  <i class="fa-solid fa-book-open text-primary fs-6 ms-1"></i>
                  <div class="flex-grow-1 min-w-0">
                    <label for="mobile-policy-select" class="text-white-50 fs-8 fw-semibold text-uppercase d-block mb-1">Select Policy</label>
                    <select id="mobile-policy-select" class="form-select form-select-sm border-0 bg-transparent fw-bold text-white px-0 py-0" style="box-shadow: none; font-size: 0.92rem; color: #f4f4f5 !important; background: #222226 !important;" onchange="if(this.value) window.location.hash = this.value">
                      ${docKeys.map(key => {
                        const doc = LEGAL_DOCS[key];
                        return `<option value="#/${doc.slug}" ${key === activeSlug ? 'selected' : ''} style="background: #222226; color: #f4f4f5;">${doc.title} (${doc.category})</option>`;
                      }).join('')}
                    </select>
                  </div>
                </div>
                <span class="badge bg-primary bg-opacity-15 text-primary rounded-pill fs-8 flex-shrink-0">${docKeys.length} Docs</span>
              </div>
            </div>

            <!-- Desktop Sidebar Navigation Navigator (Fixed) -->
            <div class="col-lg-4 col-xl-3 d-none d-lg-flex flex-column h-100" style="min-height: 0;">
              <div class="google-glass-card p-3 h-100 legal-doc-sidebar d-flex flex-column" style="background: #222226; border: 1px solid #323238;">
                <div class="d-flex align-items-center justify-content-between mb-3 px-2 flex-shrink-0">
                  <span class="text-uppercase text-white-50 fs-8 fw-bold" style="letter-spacing: 0.8px;">Documentation</span>
                  <span class="badge bg-primary bg-opacity-15 text-primary rounded-pill fs-8">${docKeys.length} Policies</span>
                </div>
                <div class="d-flex flex-column gap-1 flex-grow-1 overflow-y-auto" id="legal-doc-nav-list" style="scrollbar-width: thin; scrollbar-color: #3f3f46 #1c1c20;">
                  ${docKeys.map(key => {
                    const doc = LEGAL_DOCS[key];
                    const isActive = key === activeSlug;
                    return `
                      <a href="#/${doc.slug}" class="d-flex align-items-center justify-content-between p-2.5 rounded-3 text-decoration-none legal-nav-item ${isActive ? 'bg-primary bg-opacity-20 text-primary fw-bold border border-primary border-opacity-30 active-nav-item' : 'text-secondary hover-bg-light'}" data-slug="${doc.slug}" data-category="${doc.category}" data-title="${doc.title}">
                        <div class="d-flex align-items-center gap-2 text-truncate">
                          <i class="fa-solid ${doc.icon} fs-7 ${isActive ? 'text-primary' : 'text-muted'}" style="width: 18px;"></i>
                          <span class="fs-7 text-truncate">${doc.title}</span>
                        </div>
                        ${isActive ? '<i class="fa-solid fa-chevron-right text-primary fs-8"></i>' : ''}
                      </a>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- Document Content Viewer: Only this page moves with its own grey slider -->
            <div class="col-lg-8 col-xl-9 h-100 d-flex flex-column" style="min-height: 0;">
              <div class="google-glass-card p-4 p-md-5 position-relative legal-doc-viewer flex-grow-1 overflow-y-auto" id="legal-content-card" style="background: #222226; border: 1px solid #323238;">
                <!-- Document Header -->
                <div class="border-bottom border-secondary border-opacity-10 pb-4 mb-4">
                  <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                    <span class="badge bg-${activeDoc.badgeColor === 'green' ? 'success' : activeDoc.badgeColor === 'yellow' ? 'warning' : activeDoc.badgeColor === 'red' ? 'danger' : 'primary'} bg-opacity-15 text-${activeDoc.badgeColor === 'green' ? 'success' : activeDoc.badgeColor === 'yellow' ? 'warning' : activeDoc.badgeColor === 'red' ? 'danger' : 'primary'} px-3 py-1 rounded-pill fs-8">
                      <i class="fa-solid ${activeDoc.icon} me-1"></i> ${activeDoc.category}
                    </span>
                    <span class="text-white-50 fs-8 font-monospace"><i class="fa-solid fa-clock-rotate-left me-1"></i> Last Revised: ${activeDoc.lastUpdated}</span>
                  </div>
                  <h1 class="text-white fw-bold display-6 mb-2" id="legal-doc-title">${activeDoc.title}</h1>
                  <p class="text-white-50 fs-6 mb-0" id="legal-doc-summary">${activeDoc.summary}</p>
                </div>

                <!-- Document Body Content -->
                <div class="legal-doc-content fs-6 lh-lg" id="legal-doc-body">
                  ${activeDoc.content}
                </div>

                <!-- Document Footer & Verification Stamp -->
                <div class="mt-5 pt-4 border-top border-secondary border-opacity-10 d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div class="d-flex align-items-center gap-3">
                    <div class="google-dots d-flex gap-1">
                      <span style="width: 8px; height: 8px; border-radius: 50%; background: #4285F4;"></span>
                      <span style="width: 8px; height: 8px; border-radius: 50%; background: #EA4335;"></span>
                      <span style="width: 8px; height: 8px; border-radius: 50%; background: #FBBC05;"></span>
                      <span style="width: 8px; height: 8px; border-radius: 50%; background: #34A853;"></span>
                    </div>
                    <span class="text-muted fs-8">PrepSpace Trust & Legal Verification Division &bull; stream-in.app</span>
                  </div>
                  <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-glass rounded-pill px-3 fs-8 text-white" style="background: #27272a; border: 1px solid #3f3f46;" onclick="navigator.clipboard.writeText(window.location.href); showToast('Document link copied to clipboard!', 'success');">
                      <i class="fa-solid fa-share-nodes me-1"></i> Share Policy
                    </button>
                    <a href="mailto:legal@stream-in.app" class="btn btn-sm btn-outline-secondary rounded-pill px-3 fs-8 text-white" style="border-color: #3f3f46;">
                      <i class="fa-solid fa-envelope me-1"></i> Contact Legal
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 3. COOKIE PREFERENCES MODAL & FLOATING CONSENT BANNER
  // =========================================================================
  window.openCookiePreferencesModal = function() {
    let modalEl = document.getElementById('cookie-preferences-modal');
    if (!modalEl) {
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = components.cookiePreferencesModal();
      document.body.appendChild(modalWrapper.firstElementChild);
      modalEl = document.getElementById('cookie-preferences-modal');
    }
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  };

  components.cookiePreferencesModal = function() {
    const prefs = JSON.parse(localStorage.getItem('prepspace_cookie_prefs') || '{"essential": true, "functional": true, "analytics": true, "marketing": false}');

    return `
      <div class="modal fade" id="cookie-preferences-modal" tabindex="-1" aria-labelledby="cookieModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content google-glass-card border-secondary border-opacity-15" style="background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-radius: 24px;">
            <div class="modal-header border-bottom border-secondary border-opacity-10 px-4 pt-4">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-circle bg-primary bg-opacity-15 text-primary">
                  <i class="fa-solid fa-cookie-bite fs-5"></i>
                </div>
                <div>
                  <h5 class="modal-title text-white fw-bold mb-0" id="cookieModalLabel">Cookie & Privacy Preferences</h5>
                  <small class="text-muted fs-8">Customize how PrepSpace stores credentials, settings, and telemetry</small>
                </div>
              </div>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4 text-secondary fs-7">
              <p class="mb-4">We respect your privacy preferences. While strictly necessary cookies are required for authentication, CSRF security, and compiler sandbox access, you can toggle optional preferences below.</p>

              <!-- Strictly Necessary -->
              <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <div class="d-flex align-items-center gap-2">
                    <span class="text-white fw-bold fs-7">1. Strictly Necessary & Security Tokens</span>
                    <span class="badge bg-success bg-opacity-20 text-success rounded-pill fs-9">Always Active</span>
                  </div>
                  <input type="checkbox" class="form-check-input" checked disabled>
                </div>
                <p class="text-muted fs-8 mb-0">Required for secure JWT authorization, CSRF token validation, and compiler session persistence. Cannot be disabled.</p>
              </div>

              <!-- Functional -->
              <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="text-white fw-bold fs-7">2. Functional & IDE Preferences</span>
                  <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" id="cookie-pref-functional" ${prefs.functional ? 'checked' : ''}>
                  </div>
                </div>
                <p class="text-muted fs-8 mb-0">Remembers your dark/light theme, custom code editor keybindings (Vim/VS Code), font size, and sidebar layout.</p>
              </div>

              <!-- Performance & Analytics -->
              <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="text-white fw-bold fs-7">3. Performance & System Analytics</span>
                  <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" id="cookie-pref-analytics" ${prefs.analytics ? 'checked' : ''}>
                  </div>
                </div>
                <p class="text-muted fs-8 mb-0">Collects anonymous page load speed metrics and code compiler execution times to optimize server cluster latency.</p>
              </div>

              <!-- Marketing & Referrals -->
              <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="text-white fw-bold fs-7">4. Referral Tracking & Attribution</span>
                  <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" id="cookie-pref-marketing" ${prefs.marketing ? 'checked' : ''}>
                  </div>
                </div>
                <p class="text-muted fs-8 mb-0">Ensures peer referral credits and educational campus ambassador discounts are correctly credited to your account.</p>
              </div>
            </div>
            <div class="modal-footer border-top border-secondary border-opacity-10 px-4 pb-4">
              <button type="button" class="btn btn-sm btn-glass rounded-pill px-4" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-sm btn-dark rounded-2 px-4" onclick="saveCookiePreferences()">Save Preferences</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.saveCookiePreferences = function() {
    const prefs = {
      essential: true,
      functional: document.getElementById('cookie-pref-functional') ? document.getElementById('cookie-pref-functional').checked : true,
      analytics: document.getElementById('cookie-pref-analytics') ? document.getElementById('cookie-pref-analytics').checked : true,
      marketing: document.getElementById('cookie-pref-marketing') ? document.getElementById('cookie-pref-marketing').checked : false
    };
    localStorage.setItem('prepspace_cookie_prefs', JSON.stringify(prefs));
    localStorage.setItem('prepspace_cookie_consent_accepted', 'true');
    showToast('Privacy and cookie preferences saved.', 'success');

    const modalEl = document.getElementById('cookie-preferences-modal');
    if (modalEl) {
      const bsModal = bootstrap.Modal.getInstance(modalEl);
      if (bsModal) bsModal.hide();
    }
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.remove();
  };

  components.cookieConsentBanner = function() {
    return `
      <div id="cookie-consent-banner" class="cookie-consent-banner">
        <div class="cookie-consent-container">
          <!-- Left: Privacy Icon & Descriptive Text -->
          <div class="cookie-consent-content">
            <div class="cookie-consent-icon-box">
              <i class="fa-solid fa-cookie-bite"></i>
            </div>
            <div class="cookie-consent-text">
              <span class="cookie-consent-title">We prioritize your privacy</span>
              <span class="cookie-consent-desc">
                We use essential cookies to maintain secure sessions and optional telemetry to improve your interview preparation. View our <a href="#/cookies" class="text-primary text-decoration-none">Cookie Policy</a>.
              </span>
            </div>
          </div>

          <!-- Right: Action Buttons Inline -->
          <div class="cookie-consent-actions">
            <button class="btn btn-sm btn-dark rounded-2 px-3 py-1.5 fs-8 fw-semibold d-inline-flex align-items-center gap-1.5" onclick="acceptAllCookies()">
              <i class="fa-solid fa-check fs-9"></i>
              <span>Accept All</span>
            </button>
            <button class="btn btn-sm btn-outline-secondary rounded-2 px-3 py-1.5 fs-8 d-inline-flex align-items-center gap-1.5 text-dark" onclick="acceptEssentialCookies()">
              <i class="fa-solid fa-shield-halved fs-9"></i>
              <span>Essential Only</span>
            </button>
            <button class="btn btn-sm btn-link text-muted fs-8 text-decoration-none px-2 d-inline-flex align-items-center gap-1.5" onclick="openCookiePreferencesModal()">
              <i class="fa-solid fa-sliders fs-9"></i>
              <span>Preferences</span>
            </button>
          </div>
        </div>
      </div>
    `;
  };

  window.acceptAllCookies = function() {
    const prefs = { essential: true, functional: true, analytics: true, marketing: true };
    localStorage.setItem('prepspace_cookie_prefs', JSON.stringify(prefs));
    localStorage.setItem('prepspace_cookie_consent_accepted', 'true');
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.remove();
  };

  window.acceptEssentialCookies = function() {
    const prefs = { essential: true, functional: false, analytics: false, marketing: false };
    localStorage.setItem('prepspace_cookie_prefs', JSON.stringify(prefs));
    localStorage.setItem('prepspace_cookie_consent_accepted', 'true');
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.remove();
  };

  // =========================================================================
  // 4. CUSTOMER LIFECYCLE: ONBOARDING TOUR (#/onboarding)
  // =========================================================================
  components.onboardingTour = function() {
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container" style="max-width: 820px;">
          <div class="google-glass-card p-4 p-md-5" style="border-radius: 28px;">
            <!-- Four-Color Google Accent Line -->
            <div class="google-four-color-bar mb-4 rounded-pill" style="height: 2px; background: #e2e8f0;"></div>

            <!-- Stepper Progress Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <span class="badge bg-primary bg-opacity-15 text-primary rounded-pill px-3 py-1 fs-8 mb-2">Welcome to PrepSpace</span>
                <h2 class="text-dark fw-bold mb-1" id="onboarding-step-title">Step 1: Choose Your Primary Focus</h2>
                <p class="text-muted fs-7 mb-0" id="onboarding-step-subtitle">Customize your personalized technical interview curriculum and practice schedule.</p>
              </div>
              <div class="d-flex align-items-center gap-2" id="onboarding-step-indicators">
                <span class="badge rounded-circle p-2 bg-primary text-white" id="step-dot-1">1</span>
                <span class="badge rounded-circle p-2 bg-secondary text-white" id="step-dot-2">2</span>
                <span class="badge rounded-circle p-2 bg-secondary text-white" id="step-dot-3">3</span>
                <span class="badge rounded-circle p-2 bg-secondary text-white" id="step-dot-4">4</span>
              </div>
            </div>

            <!-- Step Contents -->
            <div id="onboarding-wizard-body">
              <!-- Step 1: Role Selection -->
              <div class="onboarding-step-pane" id="onboarding-pane-1">
                <div class="row g-3 my-2">
                  ${[
                    { id: 'fullstack', icon: 'fa-layer-group', title: 'Full Stack Engineer', desc: 'React, Node, Spring Boot, System Design & DSA' },
                    { id: 'backend', icon: 'fa-server', title: 'Backend & Systems', desc: 'Distributed Systems, Concurrency, SQL, Java/Go/Python' },
                    { id: 'frontend', icon: 'fa-code', title: 'Frontend Specialist', desc: 'JavaScript Engine, DOM, Performance, CSS & React' },
                    { id: 'data_ai', icon: 'fa-brain', title: 'AI & Data Engineering', desc: 'ML Pipelines, BigQuery, PyTorch, Spark & SQL' },
                    { id: 'devops', icon: 'fa-cloud', title: 'DevOps / SRE / Cloud', desc: 'Kubernetes, Docker, CI/CD, Linux & Cloud Infra' },
                    { id: 'campus', icon: 'fa-graduation-cap', title: 'Campus / Junior Grad', desc: 'Foundation DSA, Aptitude, Core CS & Mock Rounds' }
                  ].map((role, idx) => `
                    <div class="col-md-6">
                      <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 h-100 cursor-pointer role-card ${idx === 0 ? 'border-primary' : ''}" onclick="selectOnboardingRole('${role.id}', this)">
                        <div class="d-flex align-items-center gap-3">
                          <div class="p-2.5 rounded-3 bg-primary bg-opacity-15 text-primary">
                            <i class="fa-solid ${role.icon} fs-5"></i>
                          </div>
                          <div>
                            <h6 class="text-dark fw-bold mb-1 fs-7">${role.title}</h6>
                            <p class="text-muted fs-8 mb-0">${role.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Step 2: Target Companies -->
              <div class="onboarding-step-pane d-none" id="onboarding-pane-2">
                <p class="text-secondary fs-7 mb-3">Select the types of companies you are targeting for tailored mock interview questions:</p>
                <div class="row g-3">
                  ${[
                    { id: 'faang', title: 'Tier-1 FAANG / MAANG', desc: 'Google, Meta, Amazon, Apple, Microsoft, Netflix' },
                    { id: 'unicorns', title: 'High-Growth Tech Unicorns', desc: 'Stripe, Uber, Airbnb, Coinbase, Databricks' },
                    { id: 'fintech', title: 'Fintech & Quantitative Trading', desc: 'Jane Street, Citadel, Bloomberg, PayPal, Razorpay' },
                    { id: 'product', title: 'Established Product Giants', desc: 'Atlassian, Adobe, Salesforce, Oracle, Cisco' }
                  ].map((tier, idx) => `
                    <div class="col-md-6">
                      <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 h-100 cursor-pointer tier-card ${idx === 0 ? 'border-primary' : ''}" onclick="selectOnboardingTier('${tier.id}', this)">
                        <h6 class="text-dark fw-bold mb-1 fs-7">${tier.title}</h6>
                        <p class="text-muted fs-8 mb-0">${tier.desc}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Step 3: Practice Schedule -->
              <div class="onboarding-step-pane d-none" id="onboarding-pane-3">
                <p class="text-secondary fs-7 mb-3">Set your daily practice commitment to calibrate your smart Pomodoro streak tracker:</p>
                <div class="row g-3">
                  ${[
                    { min: '30', title: '30 Minutes / Day', desc: '1 Problem daily &bull; Ideal for working professionals' },
                    { min: '60', title: '60 Minutes / Day', desc: '2 Problems daily &bull; Recommended preparation pace' },
                    { min: '120', title: '2 Hours / Day', desc: '3-4 Problems daily &bull; Intensive 30-day interview sprint' },
                    { min: 'weekend', title: 'Weekend Marathon', desc: 'Focused 8-hour weekend problem-solving blocks' }
                  ].map((pace, idx) => `
                    <div class="col-md-6">
                      <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 h-100 cursor-pointer pace-card ${idx === 1 ? 'border-primary' : ''}" onclick="selectOnboardingPace('${pace.min}', this)">
                        <h6 class="text-dark fw-bold mb-1 fs-7">${pace.title}</h6>
                        <p class="text-muted fs-8 mb-0">${pace.desc}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Step 4: AI Copilot & Launch -->
              <div class="onboarding-step-pane d-none" id="onboarding-pane-4">
                <div class="text-center py-4">
                  <div class="google-empty-icon mb-3 text-success" style="background: rgba(52, 168, 83, 0.15);">
                    <i class="fa-solid fa-circle-check fs-2 text-success"></i>
                  </div>
                  <h4 class="text-dark fw-bold mb-2">You are all set for interview mastery!</h4>
                  <p class="text-muted fs-7 mb-4" style="max-width: 480px; margin: 0 auto;">Your personalized study tracks, DSA Matrix, and AI Mock Interview Coach have been configured according to your goals.</p>

                  <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 text-start mb-4" style="max-width: 480px; margin: 0 auto;">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <span class="text-muted fs-8">AI Copilot Real-Time Hints</span>
                      <span class="text-emerald fs-8 fw-bold">Active</span>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <span class="text-muted fs-8">Mock Interview Question Bank</span>
                      <span class="text-primary fs-8 fw-bold">Top 250 Curated</span>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <span class="text-muted fs-8">Daily Prep Streak Goal</span>
                      <span class="text-warning fs-8 fw-bold">60 Mins / Day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stepper Actions -->
            <div class="d-flex justify-content-between align-items-center mt-5 pt-3 border-top border-secondary border-opacity-10">
              <button class="btn btn-sm btn-glass rounded-pill px-4" id="onboarding-btn-prev" onclick="navOnboarding(-1)" style="visibility: hidden;">
                <i class="fa-solid fa-arrow-left me-1"></i> Previous
              </button>
              <button class="btn btn-premium rounded-pill px-4 py-2" id="onboarding-btn-next" onclick="navOnboarding(1)">
                Continue <i class="fa-solid fa-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  let currentOnboardingStep = 1;
  window.selectOnboardingRole = function(roleId, el) {
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('border-primary'));
    el.classList.add('border-primary');
    localStorage.setItem('prepspace_onboarding_role', roleId);
  };
  window.selectOnboardingTier = function(tierId, el) {
    document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('border-primary'));
    el.classList.add('border-primary');
    localStorage.setItem('prepspace_onboarding_tier', tierId);
  };
  window.selectOnboardingPace = function(paceMin, el) {
    document.querySelectorAll('.pace-card').forEach(c => c.classList.remove('border-primary'));
    el.classList.add('border-primary');
    localStorage.setItem('prepspace_onboarding_pace', paceMin);
  };

  window.navOnboarding = function(delta) {
    const nextStep = currentOnboardingStep + delta;
    if (nextStep < 1) return;

    if (nextStep > 4) {
      localStorage.setItem('prepspace_onboarding_completed', 'true');
      showToast('Welcome aboard! Your curriculum has been initialized.', 'success');
      window.location.hash = '#/dashboard';
      return;
    }

    currentOnboardingStep = nextStep;

    for (let i = 1; i <= 4; i++) {
      const pane = document.getElementById(`onboarding-pane-${i}`);
      const dot = document.getElementById(`step-dot-${i}`);
      if (pane) {
        if (i === currentOnboardingStep) pane.classList.remove('d-none');
        else pane.classList.add('d-none');
      }
      if (dot) {
        if (i === currentOnboardingStep) {
          dot.className = 'badge rounded-circle p-2 bg-primary text-white';
        } else if (i < currentOnboardingStep) {
          dot.className = 'badge rounded-circle p-2 bg-success text-white';
        } else {
          dot.className = 'badge rounded-circle p-2 bg-secondary text-white';
        }
      }
    }

    const titleEl = document.getElementById('onboarding-step-title');
    const subEl = document.getElementById('onboarding-step-subtitle');
    const prevBtn = document.getElementById('onboarding-btn-prev');
    const nextBtn = document.getElementById('onboarding-btn-next');

    if (prevBtn) prevBtn.style.visibility = currentOnboardingStep === 1 ? 'hidden' : 'visible';
    if (nextBtn) {
      if (currentOnboardingStep === 4) {
        nextBtn.innerHTML = 'Launch Dashboard <i class="fa-solid fa-rocket ms-1"></i>';
      } else {
        nextBtn.innerHTML = 'Continue <i class="fa-solid fa-arrow-right ms-1"></i>';
      }
    }

    if (currentOnboardingStep === 1) {
      if (titleEl) titleEl.textContent = 'Step 1: Choose Your Primary Focus';
      if (subEl) subEl.textContent = 'Customize your personalized technical interview curriculum and practice schedule.';
    } else if (currentOnboardingStep === 2) {
      if (titleEl) titleEl.textContent = 'Step 2: Target Companies';
      if (subEl) subEl.textContent = 'Select company categories to tune problem recommendations and interview patterns.';
    } else if (currentOnboardingStep === 3) {
      if (titleEl) titleEl.textContent = 'Step 3: Daily Practice Commitment';
      if (subEl) subEl.textContent = 'Establish daily study goals to maintain consistency and track readiness streaks.';
    } else if (currentOnboardingStep === 4) {
      if (titleEl) titleEl.textContent = 'Step 4: AI Copilot & Launch';
      if (subEl) subEl.textContent = 'Your customized preparation roadmap is ready to launch.';
    }
  };

  // =========================================================================
  // 5. CUSTOMER LIFECYCLE: PAYMENT SUCCESS, FAILED & PENDING
  // =========================================================================
  components.paymentSuccess = function(orderId) {
    if (!orderId) orderId = 'CF_ORDER_' + Math.floor(100000 + Math.random() * 900000);
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container" style="max-width: 580px;">
          <div class="google-glass-card p-4 p-md-5 text-center position-relative" style="border-radius: 28px;">
            <div class="google-four-color-bar mb-4 rounded-pill" style="height: 2px; background: #e2e8f0;"></div>

            <div class="google-empty-icon mb-3" style="background: rgba(52, 168, 83, 0.15); width: 72px; height: 72px;">
              <i class="fa-solid fa-circle-check fs-1 text-success"></i>
            </div>

            <span class="badge bg-success bg-opacity-20 text-success rounded-pill px-3 py-1 fs-8 mb-2">Payment Confirmed</span>
            <h2 class="text-dark fw-bold mb-2">Welcome to PrepSpace Pro!</h2>
            <p class="text-muted fs-7 mb-4">Your transaction was verified successfully. All Pro features, AI code evaluations, and full question archives have been unlocked for your account.</p>

            <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 text-start mb-4 fs-7">
              <div class="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                <span class="text-muted">Order Reference:</span>
                <span class="text-white font-monospace fw-bold">${orderId}</span>
              </div>
              <div class="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                <span class="text-muted">Plan Upgraded:</span>
                <span class="text-emerald fw-bold">PrepSpace Pro Annual</span>
              </div>
              <div class="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                <span class="text-muted">Fulfillment Status:</span>
                <span class="text-success"><i class="fa-solid fa-bolt me-1"></i> Instant Active</span>
              </div>
              <div class="d-flex justify-content-between py-1">
                <span class="text-muted">Invoice:</span>
                <span class="text-primary cursor-pointer" onclick="showToast('Tax invoice sent to your registered email address.', 'info')"><i class="fa-solid fa-download me-1"></i> Download Receipt</span>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <a href="#/dashboard" class="btn btn-premium rounded-pill py-2.5 fw-bold">Go to Pro Dashboard <i class="fa-solid fa-arrow-right ms-1"></i></a>
              <a href="#/courses" class="btn btn-glass rounded-pill py-2 text-muted fs-7">Explore Course Catalog</a>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  components.paymentFailed = function(reason) {
    if (!reason) reason = 'Payment authorization was declined by your issuing bank or UPI application.';
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container" style="max-width: 580px;">
          <div class="google-glass-card p-4 p-md-5 text-center position-relative" style="border-radius: 28px;">
            <div class="google-four-color-bar mb-4 rounded-pill" style="height: 2px; background: #e2e8f0;"></div>

            <div class="google-empty-icon mb-3" style="background: rgba(234, 67, 53, 0.15); width: 72px; height: 72px;">
              <i class="fa-solid fa-circle-exclamation fs-1 text-danger"></i>
            </div>

            <span class="badge bg-danger bg-opacity-20 text-danger rounded-pill px-3 py-1 fs-8 mb-2">Transaction Incomplete</span>
            <h2 class="text-dark fw-bold mb-2">Payment Was Not Completed</h2>
            <p class="text-muted fs-7 mb-4">No funds were deducted from your account. If any amount was debited by your bank, it will be automatically reversed within 2-4 business days.</p>

            <div class="p-3 rounded-4 bg-danger bg-opacity-10 border border-danger border-opacity-25 text-start mb-4 fs-7">
              <span class="text-danger fw-bold"><i class="fa-solid fa-triangle-exclamation me-1"></i> Notice:</span>
              <p class="text-muted fs-8 mb-0 mt-1">${reason}</p>
            </div>

            <div class="d-flex flex-column gap-2">
              <a href="#/billing" class="btn btn-premium rounded-pill py-2.5 fw-bold"><i class="fa-solid fa-arrow-rotate-left me-1"></i> Try Again with Alternate Method</a>
              <a href="#/help" class="btn btn-glass rounded-pill py-2 text-muted fs-7"><i class="fa-solid fa-headset me-1"></i> Contact Billing Support</a>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  components.paymentPending = function(orderId) {
    if (!orderId) orderId = 'CF_PENDING_SYNC';
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container" style="max-width: 580px;">
          <div class="google-glass-card p-4 p-md-5 text-center position-relative" style="border-radius: 28px;">
            <div class="google-four-color-bar mb-4 rounded-pill" style="height: 2px; background: #e2e8f0;"></div>

            <div class="google-empty-icon mb-3" style="background: rgba(251, 188, 5, 0.15); width: 72px; height: 72px;">
              <div class="spinner-border text-warning" role="status" style="width: 2.2rem; height: 2.2rem;"></div>
            </div>

            <span class="badge bg-warning bg-opacity-20 text-warning rounded-pill px-3 py-1 fs-8 mb-2">Awaiting Settlement</span>
            <h2 class="text-dark fw-bold mb-2">Confirming Payment...</h2>
            <p class="text-muted fs-7 mb-4">We are awaiting final webhook confirmation from Cashfree and your issuing bank. UPI settlements typically settle within 30-60 seconds.</p>

            <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 text-start mb-4 fs-7">
              <div class="d-flex justify-content-between py-1">
                <span class="text-muted">Order Tracking ID:</span>
                <span class="text-white font-monospace fw-bold">${orderId}</span>
              </div>
              <div class="d-flex justify-content-between py-1">
                <span class="text-muted">Gateway Verification:</span>
                <span class="text-warning font-monospace">Polling Cashfree API...</span>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-premium rounded-pill py-2.5 fw-bold" onclick="showToast('Verifying transaction status with gateway...', 'info'); setTimeout(() => { window.location.hash = '#/payment-success'; }, 1200);">
                <i class="fa-solid fa-arrows-rotate me-1"></i> Refresh Status Now
              </button>
              <a href="#/dashboard" class="btn btn-glass rounded-pill py-2 text-muted fs-7">Return to Workspace in Free Mode</a>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 6. CUSTOMER LIFECYCLE: EMAIL VERIFICATION, FORGOT & RESET PASSWORD
  // =========================================================================
  components.emailVerification = function(email) {
    if (!email) email = 'user@example.com';
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container" style="max-width: 520px;">
          <div class="google-glass-card p-4 p-md-5 text-center position-relative" style="border-radius: 28px;">
            <div class="google-four-color-bar mb-4 rounded-pill" style="height: 2px; background: #e2e8f0;"></div>

            <div class="google-empty-icon mb-3" style="background: rgba(66, 133, 244, 0.15); width: 68px; height: 68px;">
              <i class="fa-solid fa-envelope-open-text fs-2 text-primary"></i>
            </div>

            <h3 class="text-dark fw-bold mb-2">Check Your Email</h3>
            <p class="text-muted fs-7 mb-3">We have dispatched a verification link to your inbox:</p>
            <div class="p-2.5 rounded-3 bg-white bg-opacity-80 border border-secondary border-opacity-20 text-white font-monospace fs-7 mb-4">
              ${email}
            </div>

            <p class="text-secondary fs-8 mb-4">Please click the verification link in the email to activate full platform access and unlock live mock interview scheduling.</p>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-premium rounded-pill py-2.5" onclick="showToast('Verification email resent! Please check your spam folder.', 'success')">
                <i class="fa-solid fa-paper-plane me-1"></i> Resend Verification Email
              </button>
              <a href="#/login" class="btn btn-glass rounded-pill py-2 text-muted fs-7">Back to Login</a>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  components.forgotPassword = function() {
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container" style="max-width: 480px;">
          <div class="google-glass-card p-4 p-md-5 text-center position-relative" style="border-radius: 28px;">
            <div class="google-four-color-bar mb-4 rounded-pill" style="height: 2px; background: #e2e8f0;"></div>

            <div class="google-empty-icon mb-3" style="background: rgba(66, 133, 244, 0.15); width: 64px; height: 64px;">
              <i class="fa-solid fa-key fs-3 text-primary"></i>
            </div>

            <h3 class="text-dark fw-bold mb-2">Forgot Password?</h3>
            <p class="text-muted fs-7 mb-4">No worries! Enter your registered account email and we'll dispatch password recovery instructions.</p>

            <form id="forgot-password-form" onsubmit="event.preventDefault(); showToast('Password reset link sent to ' + document.getElementById('forgot-email').value, 'success'); setTimeout(() => window.location.hash = '#/login', 1500);">
              <div class="mb-3 text-start">
                <label class="form-label text-muted fs-8 fw-bold">REGISTERED EMAIL ADDRESS</label>
                <input type="email" id="forgot-email" class="form-control bg-white border-secondary border-opacity-15 text-dark py-2.5 rounded-3" placeholder="name@domain.com" required autocomplete="email">
              </div>
              <button type="submit" class="btn btn-premium w-100 rounded-pill py-2.5 fw-bold mb-3">Send Recovery Link</button>
              <a href="#/login" class="text-secondary text-decoration-none fs-8"><i class="fa-solid fa-arrow-left me-1"></i> Back to sign in</a>
            </form>
          </div>
        </div>
      </div>
    `;
  };

  components.resetPassword = function() {
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container" style="max-width: 480px;">
          <div class="google-glass-card p-4 p-md-5 text-center position-relative" style="border-radius: 28px;">
            <div class="google-four-color-bar mb-4 rounded-pill" style="height: 2px; background: #e2e8f0;"></div>

            <div class="google-empty-icon mb-3" style="background: rgba(52, 168, 83, 0.15); width: 64px; height: 64px;">
              <i class="fa-solid fa-lock-open fs-3 text-success"></i>
            </div>

            <h3 class="text-dark fw-bold mb-2">Create New Password</h3>
            <p class="text-muted fs-7 mb-4">Choose a strong, unique password with at least 8 characters.</p>

            <form id="reset-password-form" onsubmit="event.preventDefault(); showToast('Password updated successfully! Redirecting to login...', 'success'); setTimeout(() => window.location.hash = '#/login', 1200);">
              <div class="mb-3 text-start">
                <label class="form-label text-muted fs-8 fw-bold">NEW PASSWORD</label>
                <input type="password" id="reset-new-pass" class="form-control bg-white border-secondary border-opacity-15 text-dark py-2.5 rounded-3" placeholder="••••••••" required minlength="8">
              </div>
              <div class="mb-4 text-start">
                <label class="form-label text-muted fs-8 fw-bold">CONFIRM NEW PASSWORD</label>
                <input type="password" id="reset-confirm-pass" class="form-control bg-white border-secondary border-opacity-15 text-dark py-2.5 rounded-3" placeholder="••••••••" required minlength="8">
              </div>
              <button type="submit" class="btn btn-premium w-100 rounded-pill py-2.5 fw-bold mb-3">Update Password & Sign In</button>
            </form>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 7. SUPPORT & HELP CENTER (#/help, #/support)
  // =========================================================================
  components.helpCenter = function() {
    const categories = [
      { id: 'getting-started', icon: 'fa-rocket', title: 'Getting Started', desc: 'Account registration, study planner setup, and setting interview goals.' },
      { id: 'billing', icon: 'fa-credit-card', title: 'Billing & Invoices', desc: 'Cashfree payments, Pro subscriptions, upgrades, refunds, and receipts.' },
      { id: 'dsa-compiler', icon: 'fa-code', title: 'DSA Matrix & Compiler', desc: 'Supported languages, execution time limits, sandbox security, and hints.' },
      { id: 'mock-interviews', icon: 'fa-microphone', title: 'AI Mock Interviews', desc: 'Voice evaluation, audio calibration, scoring rubrics, and video analysis.' },
      { id: 'account-security', icon: 'fa-shield-halved', title: 'Account & Security', desc: 'Password recovery, Google OAuth sign-in, DPA, and data privacy.' },
      { id: 'troubleshooting', icon: 'fa-wrench', title: 'Troubleshooting & Bugs', desc: 'Compiler timeout handling, offline storage, and reporting technical glitches.' }
    ];

    const faqs = [
      { q: 'How does the PrepSpace 7-Day Refund Guarantee work?', a: 'If you upgrade to PrepSpace Pro and are not 100% satisfied, email billing@stream-in.app within 7 days for a complete, no-questions-asked refund.' },
      { q: 'Can I cancel my subscription at any time?', a: 'Yes! You can cancel anytime from Settings > Billing > Cancel Subscription. Your Pro benefits remain active until the end of your prepaid period.' },
      { q: 'What programming languages are supported in the live code compiler?', a: 'PrepSpace natively supports Python 3, Java 21, C++20, JavaScript (Node.js), and PostgreSQL with automated test case evaluation.' },
      { q: 'Are mock interview answers and code reviewed by real people?', a: 'Our automated evaluations are powered by advanced AI models fine-tuned on senior FAANG rubrics. Your code is never shared with third parties or recruiters without explicit permission.' },
      { q: 'What if my payment is deducted but Pro is not activated?', a: 'This usually means a transient bank webhook delay. Navigate to Settings > Billing and click "Sync Cashfree Status", or email support@stream-in.app with your Order ID for instant manual resolution.' }
    ];

    return `
      <div class="min-vh-100 pb-5" style="background: var(--bg-body, #f8fafd);">
        <!-- Top Google-Style Help Header -->
        <div class="border-bottom border-secondary border-opacity-10 bg-white bg-opacity-80 py-5">
          <div class="container text-center" style="max-width: 760px;">
            <div class="google-dots d-inline-flex gap-1 mb-2">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #4285F4;"></span>
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #EA4335;"></span>
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #FBBC05;"></span>
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #34A853;"></span>
            </div>
            <h1 class="text-dark fw-bold display-5 mb-2">How can we assist you?</h1>
            <p class="text-secondary fs-6 mb-4">Search our knowledge base, frequently asked questions, and developer guides.</p>

            <!-- Prominent Google Search Pill -->
            <div class="google-search-pill-wrapper mx-auto" style="max-width: 620px;">
              <i class="fa-solid fa-magnifying-glass google-search-pill-icon text-muted"></i>
              <input type="text" id="help-search-input" class="google-search-pill py-3" placeholder="Describe your issue or question (e.g. refund, compiler, AI voice)..." oninput="filterHelpFAQs(this.value)">
            </div>
          </div>
        </div>

        <div class="container my-5">
          <!-- 6 Category Cards -->
          <h5 class="text-dark fw-bold mb-3 fs-6 uppercase" style="letter-spacing: 0.5px;">Browse by Category</h5>
          <div class="row g-4 mb-5">
            ${categories.map(cat => `
              <div class="col-md-6 col-lg-4">
                <div class="google-glass-card p-4 h-100 cursor-pointer hover-lift" onclick="filterHelpFAQs('${cat.title}')">
                  <div class="d-flex align-items-center gap-3 mb-2">
                    <div class="p-2.5 rounded-3 bg-primary bg-opacity-15 text-primary">
                      <i class="fa-solid ${cat.icon} fs-5"></i>
                    </div>
                    <h6 class="text-white fw-bold mb-0 fs-6">${cat.title}</h6>
                  </div>
                  <p class="text-muted fs-7 mb-0">${cat.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- FAQ Accordion -->
          <div class="row g-4">
            <div class="col-lg-8">
              <div class="google-glass-card p-4 p-md-5">
                <h4 class="text-white fw-bold mb-4"><i class="fa-solid fa-circle-question text-primary me-2"></i>Frequently Asked Questions</h4>
                <div class="accordion accordion-flush" id="help-faq-accordion">
                  ${faqs.map((faq, i) => `
                    <div class="accordion-item bg-transparent border-bottom border-secondary border-opacity-10 py-2 faq-item">
                      <h2 class="accordion-header">
                        <button class="accordion-button collapsed bg-transparent text-white fw-bold fs-7 shadow-none px-0" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-${i}">
                          ${faq.q}
                        </button>
                      </h2>
                      <div id="faq-collapse-${i}" class="accordion-collapse collapse" data-bs-parent="#help-faq-accordion">
                        <div class="accordion-body px-0 text-secondary fs-7 lh-lg">
                          ${faq.a}
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Contact Support Direct Card -->
            <div class="col-lg-4">
              <div class="google-glass-card p-4">
                <div class="p-2 rounded-3 bg-primary bg-opacity-15 text-primary d-inline-block mb-3">
                  <i class="fa-solid fa-headset fs-4"></i>
                </div>
                <h5 class="text-dark fw-bold mb-2">Still need help?</h5>
                <p class="text-muted fs-7 mb-4">Our support engineering desk answers 100% of candidate inquiries within 24 hours.</p>

                <form onsubmit="event.preventDefault(); showToast('Support ticket #PS-' + Math.floor(1000 + Math.random() * 9000) + ' created! We will reply via email.', 'success'); this.reset();">
                  <div class="mb-3">
                    <label class="form-label text-muted fs-8 fw-bold">YOUR NAME</label>
                    <input type="text" class="form-control bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7" placeholder="Nagesh" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label text-muted fs-8 fw-bold">EMAIL ADDRESS</label>
                    <input type="email" class="form-control bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7" placeholder="name@domain.com" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label text-muted fs-8 fw-bold">TOPIC</label>
                    <select class="form-select bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7">
                      <option>Billing & Payment Query</option>
                      <option>Technical Bug in Compiler</option>
                      <option>AI Mock Interview Feedback</option>
                      <option>Feature Suggestion</option>
                      <option>Other / General</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label text-muted fs-8 fw-bold">HOW CAN WE HELP?</label>
                    <textarea class="form-control bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7" rows="3" placeholder="Describe what occurred..." required></textarea>
                  </div>
                  <button type="submit" class="btn btn-premium w-100 rounded-pill py-2.5 fw-bold">Submit Priority Ticket</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.filterHelpFAQs = function(query) {
    query = (query || '').toLowerCase().trim();
    document.querySelectorAll('.faq-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  // =========================================================================
  // 8. UX STATES: 404, 403, 500, MAINTENANCE & OFFLINE
  // =========================================================================
  components.error404 = function() {
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container text-center" style="max-width: 580px;">
          <div class="google-glass-card p-4 p-md-5 position-relative" style="border-radius: 28px;">
            <div class="google-dots d-inline-flex gap-2 mb-3">
              <span style="width: 14px; height: 14px; border-radius: 50%; background: #4285F4;"></span>
              <span style="width: 14px; height: 14px; border-radius: 50%; background: #EA4335;"></span>
              <span style="width: 14px; height: 14px; border-radius: 50%; background: #FBBC05;"></span>
              <span style="width: 14px; height: 14px; border-radius: 50%; background: #34A853;"></span>
            </div>

            <h1 class="text-dark fw-bold display-3 mb-1" style="letter-spacing: -2px;">404</h1>
            <h4 class="text-dark fw-bold mb-2">Page Not Found</h4>
            <p class="text-muted fs-7 mb-4">The route you requested was moved, renamed, or does not exist on PrepSpace.</p>

            <div class="google-search-pill-wrapper mb-4">
              <i class="fa-solid fa-magnifying-glass google-search-pill-icon text-muted"></i>
              <input type="text" class="google-search-pill" placeholder="Search problems, topics, or guides..." onkeydown="if(event.key==='Enter') window.location.hash='#/dashboard';">
            </div>

            <div class="d-flex justify-content-center gap-2">
              <a href="#/dashboard" class="btn btn-premium rounded-pill px-4 py-2">Go to Dashboard</a>
              <a href="#/" class="btn btn-glass rounded-pill px-4 py-2 text-muted">Home</a>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  components.error403 = function() {
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container text-center" style="max-width: 580px;">
          <div class="google-glass-card p-4 p-md-5 position-relative" style="border-radius: 28px;">
            <div class="google-empty-icon mb-3" style="background: rgba(234, 67, 53, 0.15); width: 68px; height: 68px;">
              <i class="fa-solid fa-lock fs-2 text-danger"></i>
            </div>

            <span class="badge bg-danger bg-opacity-20 text-danger rounded-pill px-3 py-1 fs-8 mb-2">Access Forbidden</span>
            <h2 class="text-dark fw-bold mb-2">403: Pro Clearance Required</h2>
            <p class="text-muted fs-7 mb-4">This section of the platform is reserved for PrepSpace Pro candidates or authorized administrators.</p>

            <div class="d-flex justify-content-center gap-2">
              <a href="#/billing" class="btn btn-premium rounded-pill px-4 py-2"><i class="fa-solid fa-crown me-1 text-warning"></i> Upgrade to Pro</a>
              <a href="#/dashboard" class="btn btn-glass rounded-pill px-4 py-2 text-muted">Return to Safety</a>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  components.error500 = function(incidentId) {
    if (!incidentId) incidentId = 'ERR_PS_' + Date.now().toString(36).toUpperCase();
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container text-center" style="max-width: 580px;">
          <div class="google-glass-card p-4 p-md-5 position-relative" style="border-radius: 28px;">
            <div class="google-empty-icon mb-3" style="background: rgba(234, 67, 53, 0.15); width: 68px; height: 68px;">
              <i class="fa-solid fa-server fs-2 text-danger"></i>
            </div>

            <h1 class="text-white fw-bold display-4 mb-1">500</h1>
            <h4 class="text-dark fw-bold mb-2">Server Error / System Hiccup</h4>
            <p class="text-muted fs-7 mb-3">Our distributed microservices experienced an unexpected exception. Our reliability engineering team has been automatically alerted.</p>

            <div class="p-2 rounded bg-light bg-opacity-60 border border-secondary border-opacity-10 font-monospace text-muted fs-8 mb-4">
              Incident Trace ID: ${incidentId}
            </div>

            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-premium rounded-pill px-4 py-2" onclick="window.location.reload()"><i class="fa-solid fa-rotate-right me-1"></i> Refresh Page</button>
              <a href="#/help" class="btn btn-glass rounded-pill px-4 py-2 text-muted">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  components.maintenancePage = function() {
    return `
      <div class="min-vh-100 d-flex align-items-center justify-content-center py-5" style="background: var(--bg-body, #f8fafd);">
        <div class="container text-center" style="max-width: 580px;">
          <div class="google-glass-card p-4 p-md-5 position-relative" style="border-radius: 28px;">
            <div class="google-four-color-bar mb-4 rounded-pill" style="height: 2px; background: #e2e8f0;"></div>

            <div class="google-empty-icon mb-3" style="background: rgba(66, 133, 244, 0.15); width: 72px; height: 72px;">
              <i class="fa-solid fa-screwdriver-wrench fs-2 text-primary"></i>
            </div>

            <span class="badge bg-primary bg-opacity-20 text-primary rounded-pill px-3 py-1 fs-8 mb-2">Scheduled Maintenance</span>
            <h2 class="text-dark fw-bold mb-2">Upgrading AI Clusters</h2>
            <p class="text-muted fs-7 mb-4">PrepSpace is currently undergoing scheduled infrastructure upgrades to deploy enhanced AI mock evaluation models and speed up code compilation.</p>

            <div class="p-3 rounded-4 bg-light bg-opacity-60 border border-secondary border-opacity-10 text-start mb-4 fs-7">
              <div class="d-flex justify-content-between mb-1">
                <span class="text-muted">Expected Completion:</span>
                <span class="text-white fw-bold">~25 Minutes</span>
              </div>
              <div class="progress bg-dark" style="height: 6px;">
                <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" style="width: 75%"></div>
              </div>
            </div>

            <button class="btn btn-glass rounded-pill px-4 py-2 text-white fs-7" onclick="window.location.reload()"><i class="fa-solid fa-arrows-rotate me-1"></i> Check Status Again</button>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 9. REUSABLE UX STATES: EMPTY STATES & NO SEARCH RESULTS
  // =========================================================================
  components.googleEmptyState = function(title, subtitle, icon, actionText, actionHash) {
    if (!title) title = 'No records found';
    if (!subtitle) subtitle = 'Get started by creating your first entry.';
    if (!icon) icon = 'fa-inbox';
    return `
      <div class="google-empty-state">
        <div class="google-empty-icon">
          <i class="fa-solid ${icon}"></i>
        </div>
        <h5 class="text-dark fw-bold mb-1 fs-6">${title}</h5>
        <p class="text-muted fs-7 mb-3" style="max-width: 360px; margin: 0 auto;">${subtitle}</p>
        ${actionText && actionHash ? `
          <a href="${actionHash}" class="btn btn-sm btn-dark rounded-2 px-4 py-2">${actionText}</a>
        ` : ''}
      </div>
    `;
  };

  components.googleNoSearchResults = function(query, onClearAction) {
    if (!query) query = '';
    if (!onClearAction) onClearAction = "document.getElementById('legal-search-input').value=''; filterLegalDocs('');";
    return `
      <div class="google-empty-state">
        <div class="google-empty-icon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h5 class="text-dark fw-bold mb-1 fs-6">No matching results</h5>
        <p class="text-muted fs-7 mb-3">We couldn't find anything matching "<span class="text-white fw-bold">${query}</span>". Try checking for typos or searching with broader keywords.</p>
        <button class="btn btn-sm btn-glass rounded-pill px-4 py-1.5 fs-8" onclick="${onClearAction}">Clear Search</button>
      </div>
    `;
  };

  // =========================================================================
  // 10. REAL-TIME OFFLINE / ONLINE DETECTOR
  // =========================================================================
  function initOfflineDetector() {
    function updateOnlineStatus() {
      let banner = document.getElementById('offline-sticky-banner');
      if (!navigator.onLine) {
        if (!banner) {
          banner = document.createElement('div');
          banner.id = 'offline-sticky-banner';
          banner.className = 'offline-banner-sticky';
          banner.innerHTML = `
            <i class="fa-solid fa-wifi-slash"></i>
            <span>You are currently offline. PrepSpace is running in offline mode with cached storage. Changes will sync once reconnected.</span>
          `;
          document.body.appendChild(banner);
        }
      } else {
        if (banner) {
          banner.remove();
          showToast('Internet connection restored. Synced with PrepSpace cloud.', 'success');
        }
      }
    }

    window.addEventListener('offline', updateOnlineStatus);
    window.addEventListener('online', updateOnlineStatus);
    if (!navigator.onLine) updateOnlineStatus();
  }

  // =========================================================================
  // 11. COOKIE CONSENT BANNER AUTO-SHOW
  // =========================================================================
  function initCookieConsent() {
    const accepted = localStorage.getItem('prepspace_cookie_consent_accepted');
    if (!accepted && !document.getElementById('cookie-consent-banner')) {
      setTimeout(() => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = components.cookieConsentBanner();
        document.body.appendChild(wrapper.firstElementChild);
      }, 1200);
    }
  }

  // =========================================================================
  // 12. INITIALIZATION
  // =========================================================================
  
  // =========================================================================
  // 13. LEGAL HUB INTERACTION BINDER
  // =========================================================================
  window.bindLegalHubEvents = function() {
    const searchInput = document.getElementById('legal-search-input');
    const catPills = document.querySelectorAll('#legal-category-pills button');
    const navItems = document.querySelectorAll('.legal-nav-item');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        navItems.forEach(item => {
          const title = (item.getAttribute('data-title') || '').toLowerCase();
          const cat = (item.getAttribute('data-category') || '').toLowerCase();
          const slug = (item.getAttribute('data-slug') || '').toLowerCase();
          const doc = LEGAL_DOCS[slug];
          const text = doc ? (doc.title + ' ' + doc.summary + ' ' + doc.content).toLowerCase() : '';
          if (!q || title.includes(q) || cat.includes(q) || text.includes(q)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }

    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const selectedCat = pill.getAttribute('data-cat');
        navItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (selectedCat === 'All Policies' || itemCat === selectedCat) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  };

  // =========================================================================
  // 14. CANCEL / DOWNGRADE SUBSCRIPTION RETENTION MODAL
  // =========================================================================
  window.openCancelSubscriptionModal = function() {
    let modalEl = document.getElementById('cancel-subscription-modal');
    if (!modalEl) {
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = components.cancelSubscriptionModal();
      document.body.appendChild(modalWrapper.firstElementChild);
      modalEl = document.getElementById('cancel-subscription-modal');
    }
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  };

  components.cancelSubscriptionModal = function() {
    return `
      <div class="modal fade" id="cancel-subscription-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content google-glass-card border-secondary border-opacity-15" style="background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-radius: 24px;">
            <div class="modal-header border-bottom border-secondary border-opacity-10 px-4 pt-4">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-circle bg-danger bg-opacity-15 text-danger">
                  <i class="fa-solid fa-heart-crack fs-5"></i>
                </div>
                <div>
                  <h5 class="modal-title text-white fw-bold mb-0">Cancel PrepSpace Pro?</h5>
                  <small class="text-muted fs-8">We're sorry to see you go! Let us know how we can improve.</small>
                </div>
              </div>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4 text-secondary fs-7">
              <div class="p-3 rounded-3 bg-light bg-opacity-60 border border-secondary border-opacity-10 mb-3">
                <span class="text-white fw-bold fs-7 d-block mb-1">What you will lose upon term end:</span>
                <ul class="text-muted fs-8 mb-0 ps-3">
                  <li>Unlimited AI Mock Interview speech evaluations & feedback</li>
                  <li>Exclusive company-tagged problem archive (Google, Meta, Uber)</li>
                  <li>Priority high-speed code execution sandbox</li>
                </ul>
              </div>

              <div class="mb-3">
                <label class="form-label text-muted fs-8 fw-bold">REASON FOR CANCELLATION</label>
                <select class="form-select bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7" id="cancel-reason-select">
                  <option>🎉 I landed my target software engineering role!</option>
                  <option>PrepSpace is currently outside my preparation budget</option>
                  <option>Taking a temporary break from interview prep</option>
                  <option>Switched to another platform</option>
                  <option>Other / prefer not to say</option>
                </select>
              </div>

              <div class="p-3 rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-20 mb-2">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <strong class="text-primary fs-7">Prefer to pause instead?</strong>
                    <p class="text-muted fs-8 mb-0">Pause billing for 30 or 60 days with zero charges, preserving your progress.</p>
                  </div>
                  <button class="btn btn-sm btn-primary rounded-pill px-3 fs-8" onclick="showToast('Subscription paused for 30 days. No renewals will occur.', 'success'); bootstrap.Modal.getInstance(document.getElementById('cancel-subscription-modal')).hide();">Pause Plan</button>
                </div>
              </div>
            </div>
            <div class="modal-footer border-top border-secondary border-opacity-10 px-4 pb-4">
              <button type="button" class="btn btn-sm btn-glass rounded-pill px-4" data-bs-dismiss="modal">Keep Pro Subscription</button>
              <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-4" onclick="confirmSubscriptionCancellation()">Confirm Cancellation</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.confirmSubscriptionCancellation = function() {
    showToast('Cancellation processed. Your Pro access remains active until the end of your billing cycle.', 'info');
    const modalEl = document.getElementById('cancel-subscription-modal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    }
  };

  // =========================================================================
  // 15. SESSION EXPIRED MODAL
  // =========================================================================
  window.openSessionExpiredModal = function() {
    let modalEl = document.getElementById('session-expired-modal');
    if (!modalEl) {
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = components.sessionExpiredModal();
      document.body.appendChild(modalWrapper.firstElementChild);
      modalEl = document.getElementById('session-expired-modal');
    }
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  };

  components.sessionExpiredModal = function() {
    const emailVal = (window.state && window.state.email) ? window.state.email : '';
    return `
      <div class="modal fade" id="session-expired-modal" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content google-glass-card border-secondary border-opacity-15" style="background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-radius: 24px;">
            <div class="modal-header border-bottom border-secondary border-opacity-10 px-4 pt-4">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-circle bg-warning bg-opacity-15 text-warning">
                  <i class="fa-solid fa-clock-rotate-left fs-5"></i>
                </div>
                <div>
                  <h5 class="modal-title text-white fw-bold mb-0">Session Expired</h5>
                  <small class="text-muted fs-8">Please re-authenticate to preserve your code workspace</small>
                </div>
              </div>
            </div>
            <div class="modal-body p-4 text-secondary fs-7">
              <p class="text-muted fs-7 mb-4">Your security session token has expired. Re-enter your credentials to resume your session without losing unsaved code.</p>
              <form onsubmit="event.preventDefault(); showToast('Session renewed successfully!', 'success'); bootstrap.Modal.getInstance(document.getElementById('session-expired-modal')).hide();">
                <div class="mb-3">
                  <label class="form-label text-muted fs-8 fw-bold">EMAIL</label>
                  <input type="email" class="form-control bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7" id="session-refresh-email" value="${emailVal}" required>
                </div>
                <div class="mb-4">
                  <label class="form-label text-muted fs-8 fw-bold">PASSWORD</label>
                  <input type="password" class="form-control bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7" id="session-refresh-password" placeholder="••••••••" required>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <a href="#/login" class="text-secondary text-decoration-none fs-8" onclick="bootstrap.Modal.getInstance(document.getElementById('session-expired-modal')).hide();">Sign in with different account</a>
                  <button type="submit" class="btn btn-premium rounded-pill px-4 py-2 fw-bold">Resume Session</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  
  // =========================================================================
  // 13. LEGAL HUB INTERACTION BINDER
  // =========================================================================
  window.bindLegalHubEvents = function() {
    const searchInput = document.getElementById('legal-search-input');
    const catPills = document.querySelectorAll('#legal-category-pills button');
    const navItems = document.querySelectorAll('.legal-nav-item');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        navItems.forEach(item => {
          const title = (item.getAttribute('data-title') || '').toLowerCase();
          const cat = (item.getAttribute('data-category') || '').toLowerCase();
          const slug = (item.getAttribute('data-slug') || '').toLowerCase();
          const doc = LEGAL_DOCS[slug];
          const text = doc ? (doc.title + ' ' + doc.summary + ' ' + doc.content).toLowerCase() : '';
          if (!q || title.includes(q) || cat.includes(q) || text.includes(q)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }

    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const selectedCat = pill.getAttribute('data-cat');
        navItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (selectedCat === 'All Policies' || itemCat === selectedCat) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  };

  // =========================================================================
  // 14. CANCEL / DOWNGRADE SUBSCRIPTION RETENTION MODAL
  // =========================================================================
  window.openCancelSubscriptionModal = function() {
    let modalEl = document.getElementById('cancel-subscription-modal');
    if (!modalEl) {
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = components.cancelSubscriptionModal();
      document.body.appendChild(modalWrapper.firstElementChild);
      modalEl = document.getElementById('cancel-subscription-modal');
    }
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  };

  components.cancelSubscriptionModal = function() {
    return `
      <div class="modal fade" id="cancel-subscription-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content google-glass-card border-secondary border-opacity-15" style="background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-radius: 24px;">
            <div class="modal-header border-bottom border-secondary border-opacity-10 px-4 pt-4">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-circle bg-danger bg-opacity-15 text-danger">
                  <i class="fa-solid fa-heart-crack fs-5"></i>
                </div>
                <div>
                  <h5 class="modal-title text-white fw-bold mb-0">Cancel PrepSpace Pro?</h5>
                  <small class="text-muted fs-8">We're sorry to see you go! Let us know how we can improve.</small>
                </div>
              </div>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4 text-secondary fs-7">
              <div class="p-3 rounded-3 bg-light bg-opacity-60 border border-secondary border-opacity-10 mb-3">
                <span class="text-white fw-bold fs-7 d-block mb-1">What you will lose upon term end:</span>
                <ul class="text-muted fs-8 mb-0 ps-3">
                  <li>Unlimited AI Mock Interview speech evaluations & feedback</li>
                  <li>Exclusive company-tagged problem archive (Google, Meta, Uber)</li>
                  <li>Priority high-speed code execution sandbox</li>
                </ul>
              </div>

              <div class="mb-3">
                <label class="form-label text-muted fs-8 fw-bold">REASON FOR CANCELLATION</label>
                <select class="form-select bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7" id="cancel-reason-select">
                  <option>🎉 I landed my target software engineering role!</option>
                  <option>PrepSpace is currently outside my preparation budget</option>
                  <option>Taking a temporary break from interview prep</option>
                  <option>Switched to another platform</option>
                  <option>Other / prefer not to say</option>
                </select>
              </div>

              <div class="p-3 rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-20 mb-2">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <strong class="text-primary fs-7">Prefer to pause instead?</strong>
                    <p class="text-muted fs-8 mb-0">Pause billing for 30 or 60 days with zero charges, preserving your progress.</p>
                  </div>
                  <button class="btn btn-sm btn-primary rounded-pill px-3 fs-8" onclick="showToast('Subscription paused for 30 days. No renewals will occur.', 'success'); bootstrap.Modal.getInstance(document.getElementById('cancel-subscription-modal')).hide();">Pause Plan</button>
                </div>
              </div>
            </div>
            <div class="modal-footer border-top border-secondary border-opacity-10 px-4 pb-4">
              <button type="button" class="btn btn-sm btn-glass rounded-pill px-4" data-bs-dismiss="modal">Keep Pro Subscription</button>
              <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-4" onclick="confirmSubscriptionCancellation()">Confirm Cancellation</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.confirmSubscriptionCancellation = function() {
    showToast('Cancellation processed. Your Pro access remains active until the end of your billing cycle.', 'info');
    const modalEl = document.getElementById('cancel-subscription-modal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    }
  };

  // =========================================================================
  // 15. SESSION EXPIRED MODAL
  // =========================================================================
  window.openSessionExpiredModal = function() {
    let modalEl = document.getElementById('session-expired-modal');
    if (!modalEl) {
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = components.sessionExpiredModal();
      document.body.appendChild(modalWrapper.firstElementChild);
      modalEl = document.getElementById('session-expired-modal');
    }
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  };

  components.sessionExpiredModal = function() {
    const emailVal = (window.state && window.state.email) ? window.state.email : '';
    return `
      <div class="modal fade" id="session-expired-modal" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content google-glass-card border-secondary border-opacity-15" style="background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-radius: 24px;">
            <div class="modal-header border-bottom border-secondary border-opacity-10 px-4 pt-4">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-circle bg-warning bg-opacity-15 text-warning">
                  <i class="fa-solid fa-clock-rotate-left fs-5"></i>
                </div>
                <div>
                  <h5 class="modal-title text-white fw-bold mb-0">Session Expired</h5>
                  <small class="text-muted fs-8">Please re-authenticate to preserve your code workspace</small>
                </div>
              </div>
            </div>
            <div class="modal-body p-4 text-secondary fs-7">
              <p class="text-muted fs-7 mb-4">Your security session token has expired. Re-enter your credentials to resume your session without losing unsaved code.</p>
              <form onsubmit="event.preventDefault(); showToast('Session renewed successfully!', 'success'); bootstrap.Modal.getInstance(document.getElementById('session-expired-modal')).hide();">
                <div class="mb-3">
                  <label class="form-label text-muted fs-8 fw-bold">EMAIL</label>
                  <input type="email" class="form-control bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7" id="session-refresh-email" value="${emailVal}" required>
                </div>
                <div class="mb-4">
                  <label class="form-label text-muted fs-8 fw-bold">PASSWORD</label>
                  <input type="password" class="form-control bg-white border-secondary border-opacity-15 text-dark rounded-3 fs-7" id="session-refresh-password" placeholder="••••••••" required>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <a href="#/login" class="text-secondary text-decoration-none fs-8" onclick="bootstrap.Modal.getInstance(document.getElementById('session-expired-modal')).hide();">Sign in with different account</a>
                  <button type="submit" class="btn btn-premium rounded-pill px-4 py-2 fw-bold">Resume Session</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      initOfflineDetector();
      initCookieConsent();
    });
  }

})();
