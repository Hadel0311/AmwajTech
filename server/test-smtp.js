import nodemailer from 'nodemailer';

async function testConnection() {
  const transporter = nodemailer.createTransport({
    host: 'mail.amwaj-tech.com',
    port: 465,
    secure: true,
    auth: {
      user: 'sohaib@amwaj-tech.com',
      pass: 'testpass' // password doesn't matter for initial connection/TLS check
    },
    debug: true,
    logger: true
  });

  try {
    await transporter.verify();
    console.log('Connection successful');
  } catch (error) {
    console.error('ERROR MESSAGE:', error.message);
    console.error('FULL ERROR:', error);
  }
}

testConnection();
