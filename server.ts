import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

// Initialize Express app
const app = express();
const PORT = 3000;

// Body parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// In-memory rate limiter to prevent spam attacks
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per 10 minutes per IP

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
};

// Cleanup old rate limit records every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 30 * 60 * 1000);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    contactEmail: process.env.CONTACT_EMAIL || 'nangyalkhan0988@gmail.com',
  });
});

// Helper for sending project enquiry email
async function handleEnquirySubmission(req: express.Request, res: express.Response) {
  try {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';

    // 1. Rate Limiting Check
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many submissions received from this network. Please wait a few minutes or email nangyalkhan0988@gmail.com directly.',
      });
    }

    const {
      name,
      email,
      projectType = 'General Inquiry',
      budget = 'Not specified',
      details = '',
      honeypot = '',
    } = req.body;

    // 2. Honeypot Anti-Spam Check
    // If the hidden honeypot field was filled, silently discard spam without alerting the bot
    if (honeypot && String(honeypot).trim().length > 0) {
      console.warn(`[Spam Blocked] Honeypot triggered from IP: ${clientIp}`);
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully. Thanks for reaching out. I\'ll review your project details and get back to you soon.',
      });
    }

    // 3. Server-side Input Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your full name.',
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name is too long (maximum 100 characters).',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    if (email.trim().length > 200) {
      return res.status(400).json({
        success: false,
        error: 'Email address is too long.',
      });
    }

    if (!details || typeof details !== 'string' || details.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Project details must be at least 5 characters long.',
      });
    }

    if (details.trim().length > 6000) {
      return res.status(400).json({
        success: false,
        error: 'Project details exceed the maximum allowed length (6,000 characters).',
      });
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedProjectType = String(projectType).trim() || 'General Project Enquiry';
    const sanitizedBudget = String(budget).trim() || 'To be discussed';
    const sanitizedDetails = details.trim();

    // 4. Check for Resend API Key
    const resendApiKey = process.env.RESEND_API_KEY;
    const destinationEmail = process.env.CONTACT_EMAIL || 'nangyalkhan0988@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Enquiry <onboarding@resend.dev>';

    if (!resendApiKey) {
      console.warn('[Resend Warning] RESEND_API_KEY environment variable is not configured.');
      return res.status(503).json({
        success: false,
        isConfigError: true,
        error: 'Something went wrong while sending your message. Please email nangyalkhan0988@gmail.com directly.',
        systemMessage:
          'RESEND_API_KEY is not configured in the server environment. Please configure RESEND_API_KEY in your settings/env variables.',
      });
    }

    // 5. Initialize Resend Client
    const resend = new Resend(resendApiKey);

    // Subject format strictly requested:
    // "New Project Enquiry — [Visitor Name] — [Project Type]"
    const subject = `New Project Enquiry — ${sanitizedName} — ${sanitizedProjectType}`;

    // Plain text version for high deliverability & client fallbacks
    const textContent = `
New Project Enquiry Received via Portfolio:

---------------------------------------------
Name: ${sanitizedName}
Email: ${sanitizedEmail}
Project Type: ${sanitizedProjectType}
Budget: ${sanitizedBudget}
---------------------------------------------

Project Details:
${sanitizedDetails}

---------------------------------------------
Sent at: ${new Date().toUTCString()}
Reply-To: ${sanitizedEmail}
`.trim();

    // HTML email template matching Nangyal Khan's luxury dark & gold branding
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0c0c0e;
      color: #e4e4e7;
      margin: 0;
      padding: 30px 15px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #121216;
      border: 1px solid #27272a;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .header {
      background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
      padding: 24px 30px;
      border-bottom: 2px solid #C5A059;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 4px 0 0 0;
      color: #C5A059;
      font-size: 12px;
      font-family: monospace;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
    }
    .field-card {
      background-color: #18181b;
      border: 1px solid #27272a;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 16px;
    }
    .field-label {
      font-size: 11px;
      font-family: monospace;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #a1a1aa;
      margin-bottom: 4px;
    }
    .field-value {
      font-size: 15px;
      color: #ffffff;
      font-weight: 600;
    }
    .field-value a {
      color: #C5A059;
      text-decoration: none;
    }
    .details-box {
      background-color: #09090b;
      border: 1px solid #27272a;
      border-left: 3px solid #C5A059;
      border-radius: 6px;
      padding: 20px;
      margin-top: 10px;
      font-size: 14px;
      line-height: 1.6;
      color: #e4e4e7;
      white-space: pre-wrap;
    }
    .actions {
      margin-top: 24px;
      text-align: center;
    }
    .reply-btn {
      display: inline-block;
      background-color: #C5A059;
      color: #000000 !important;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 6px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .footer {
      background-color: #09090b;
      padding: 16px 30px;
      border-top: 1px solid #1f1f23;
      text-align: center;
      font-size: 11px;
      color: #71717a;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Project Enquiry</h1>
      <p>Direct Portfolio Client Inbox // Nangyal Khan</p>
    </div>
    
    <div class="content">
      <div class="field-card">
        <div class="field-label">Client / Sender</div>
        <div class="field-value">${sanitizedName} &lt;<a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a>&gt;</div>
      </div>

      <div style="display: flex; gap: 12px; margin-bottom: 16px;">
        <div class="field-card" style="flex: 1; margin-bottom: 0;">
          <div class="field-label">Project Type</div>
          <div class="field-value">${sanitizedProjectType}</div>
        </div>
        <div class="field-card" style="flex: 1; margin-bottom: 0;">
          <div class="field-label">Budget Range</div>
          <div class="field-value" style="color: #C5A059;">${sanitizedBudget}</div>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <div class="field-label" style="margin-bottom: 8px;">Project Details & Scope:</div>
        <div class="details-box">${sanitizedDetails}</div>
      </div>

      <div class="actions">
        <a href="mailto:${sanitizedEmail}?subject=Re:%20Project%20Enquiry%20%E2%80%94%20Nangyal%20Khan" class="reply-btn">
          Reply Directly to ${sanitizedName} &rarr;
        </a>
      </div>
    </div>

    <div class="footer">
      Delivered directly to ${destinationEmail} &bull; Reply-To set to ${sanitizedEmail}
    </div>
  </div>
</body>
</html>
`.trim();

    // 6. Send Email via Resend
    const resendResponse = await resend.emails.send({
      from: fromEmail,
      to: destinationEmail,
      replyTo: sanitizedEmail,
      subject,
      text: textContent,
      html: htmlContent,
    });

    if (resendResponse.error) {
      console.error('[Resend Error]', resendResponse.error);
      return res.status(500).json({
        success: false,
        error: 'Something went wrong while sending your message. Please email nangyalkhan0988@gmail.com directly.',
        details: resendResponse.error.message,
      });
    }

    console.log(`[Resend Success] Email delivered to ${destinationEmail}, ID: ${resendResponse.data?.id}`);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully. Thanks for reaching out. I\'ll review your project details and get back to you soon.',
      id: resendResponse.data?.id,
    });
  } catch (err: any) {
    console.error('[Server Error /api/contact]', err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong while sending your message. Please email nangyalkhan0988@gmail.com directly.',
      details: err?.message || 'Internal server error',
    });
  }
}

// Map both routes for high API compatibility
app.post('/api/contact', handleEnquirySubmission);
app.post('/api/send-enquiry', handleEnquirySubmission);

// Setup Vite development server or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Server active and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
