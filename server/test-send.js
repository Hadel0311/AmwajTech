import nodemailer from 'nodemailer';
import path from 'path';

async function testSend() {
  const transporter = nodemailer.createTransport({
    host: 'mail.amwaj-tech.com',
    port: 465,
    secure: true,
    auth: {
      user: 'sohaib@amwaj-tech.com',
      pass: 'S0h@!B@amwaj2024'
    },
    debug: true,
    logger: true
  });

  const mailOptions = {
    from: '"AmwajTech HR" <sohaib@amwaj-tech.com>',
    to: 'hadeelmuhammadhad@gmail.com',
    subject: 'Test',
    html: '<p>Test</p>',
    attachments: [
      {
        filename: 'dummy.pdf',
        path: path.join(process.cwd(), 'server', '/uploads/dummy.pdf') // this file doesn't exist
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.log('CAUGHT ERROR:', error);
    console.log('ERROR MESSAGE:', error.message);
  }
}

testSend();
