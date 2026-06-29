import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import prisma from '../prisma/index.js';
import { logger } from '../utils/logger.js';

class EmailService {
  /**
   * Safely fetches SMTP settings from the database for the given form type.
   */
  async getSettings(type) {
    const docId = type === 'job' ? 'email_jobs' : 'email_general';
    const settingsDoc = await prisma.setting.findUnique({
      where: { type: docId }
    });
    
    if (!settingsDoc || !settingsDoc.data) {
      throw new Error(`Email settings not configured for ${docId}`);
    }

    const settings = settingsDoc.data;
    if (!settings.host || !settings.user || !settings.pass || !settings.adminEmail) {
      throw new Error(`Incomplete SMTP settings in the dashboard for ${docId}`);
    }

    return settings;
  }

  /**
   * Generates the email subject, HTML content, and reply-to based on form type and data.
   */
  prepareEmailContent(type, data) {
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
      replyTo = data.businessEmail || data.email;
      html = `
        <h3>New Consultation Request</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.businessEmail || data.email}</p>
        <p><strong>Phone:</strong> ${data.phoneNumber || data.phone}</p>
        <p><strong>Company:</strong> ${data.companyName || 'N/A'}</p>
        <p><strong>Service:</strong> ${data.requiredService || 'N/A'}</p>
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
        <p><strong>CV:</strong> Attached to this email (if provided)</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || 'N/A'}</p>
      `;
    } else {
       throw new Error('Invalid form type');
    }

    return { subject, html, replyTo };
  }

  /**
   * Prepares attachments safely, ensuring files actually exist on disk to prevent crashes.
   */
  prepareAttachments(type, data) {
    const attachments = [];
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
      
      const isLocalPath = data.cvUrl.startsWith('/uploads/');
      const attachment = { filename };
      
      if (isLocalPath) {
        const filePath = path.join(process.cwd(), 'server', data.cvUrl);
        // CRITICAL CHECK: ensure file exists before attaching to prevent SMTP crash
        if (fs.existsSync(filePath)) {
          attachment.path = filePath;
          attachments.push(attachment);
        } else {
          console.warn(`File not found for attachment: ${filePath}`);
        }
      } else {
        attachment.href = data.cvUrl;
        attachments.push(attachment);
      }
    }
    return attachments;
  }

  /**
   * Main method to send notification asynchronously and safely.
   */
  async sendNotification(type, data) {
    try {
      const settings = await this.getSettings(type);
      const { subject, html, replyTo } = this.prepareEmailContent(type, data);
      const attachments = this.prepareAttachments(type, data);

      const transporter = nodemailer.createTransport({
        host: settings.host,
        port: settings.port || 465,
        secure: settings.secure !== undefined ? settings.secure : true,
        auth: {
          user: settings.user,
          pass: settings.pass,
        },
      });

      const fromDisplay = settings.fromName ? `"${settings.fromName}" <${settings.user}>` : settings.user;

      const mailOptions = {
        from: fromDisplay,
        to: settings.adminEmail,
        replyTo,
        subject,
        html,
        attachments
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info(`Successfully sent ${type} notification to ${settings.adminEmail}. MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      // Catch all errors (DB lookup fails, SMTP fails, invalid credentials)
      // Log them safely so the main Node.js process does not crash
      console.error(`[EmailService] Failed to send ${type} notification:`, error.message);
      return { success: false, error: error.message };
    }
  }
}

export const emailService = new EmailService();
