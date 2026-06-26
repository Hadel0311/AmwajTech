import express from 'express';
import nodemailer from 'nodemailer';
import prisma from '../prisma/index.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  console.log('--- EMAIL ROUTE HIT (SMTP) ---');
  console.log('Request body:', req.body);
  try {
    const { type, data } = req.body;
    
    // 1. Fetch SMTP settings from PostgreSQL based on form type
    const docId = type === 'job' ? 'email_jobs' : 'email_general';
    const settingsDoc = await prisma.setting.findUnique({
      where: { type: docId }
    });
    
    if (!settingsDoc || !settingsDoc.data) {
      console.error(`SMTP Settings not configured in dashboard for ${docId}`);
      return res.status(500).json({ success: false, error: `Email settings have not been configured for ${docId} in the dashboard.` });
    }

    const settings = settingsDoc.data;

    if (!settings.host || !settings.user || !settings.pass || !settings.adminEmail) {
      return res.status(500).json({ success: false, error: 'Incomplete SMTP settings in the dashboard.' });
    }

    // 2. Create Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port || 465,
      secure: settings.secure !== undefined ? settings.secure : true, // true for 465, false for other ports
      auth: {
        user: settings.user,
        pass: settings.pass,
      },
    });

    // 3. Prepare Email Content
    let subject = 'New Form Submission';
    let html = '<p>New submission received.</p>';
    let replyTo = '';

    if (type === 'contact') {
      subject = `New Contact Message from ${data.fullName}`;
      replyTo = data.email;
      html = `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `;
    } else if (type === 'consultation') {
      subject = `New Consultation Request from ${data.fullName}`;
      replyTo = data.email;
      html = `
        <h3>New Consultation Request</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Service:</strong> ${data.serviceTitle}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `;
    } else if (type === 'job') {
      subject = `New Job Application from ${data.fullName}`;
      replyTo = data.email;
      html = `
        <h3>New Job Application</h3>
        <p><strong>Applicant Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Job Title:</strong> ${data.jobTitle}</p>
        <p><strong>LinkedIn:</strong> ${data.linkedin || 'N/A'}</p>
        <p><strong>CV:</strong> Attached to this email</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || 'N/A'}</p>
      `;
    } else {
       return res.status(400).json({ success: false, message: 'Invalid form type' });
    }

    // 4. Send Email
    console.log('Sending email with Nodemailer...');
    
    const fromDisplay = settings.fromName ? `"${settings.fromName}" <${settings.user}>` : settings.user;

    const mailOptions = {
      from: fromDisplay,
      to: settings.adminEmail,
      replyTo: replyTo,
      subject: subject,
      html: html,
    };

    if (type === 'job' && data.cvUrl) {
      let filename = 'Applicant_CV';
      try {
        const urlString = data.cvUrl.split('?')[0];
        const parts = urlString.split('%2F');
        if (parts.length > 1) {
          filename = decodeURIComponent(parts[parts.length - 1]);
        } else {
          const normalParts = urlString.split('/');
          filename = decodeURIComponent(normalParts[normalParts.length - 1]);
        }
      } catch (e) {
        console.error('Error parsing CV filename:', e);
      }
      
      mailOptions.attachments = [
        {
          filename: filename,
          href: data.cvUrl
        }
      ];
    }

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ success: true, messageId: info.messageId });

  } catch (error) {
    console.error('Error sending email:', error);
    // Return the actual SMTP error message to the frontend so the admin can see it
    res.status(500).json({ success: false, error: error.message || 'SMTP Connection Error' });
  }
});

export default router;
