import nodemailer from 'nodemailer';

async function testConnection() {
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

  try {
    await transporter.verify();
    console.log('Connection successful');
  } catch (error) {
    console.error('ERROR MESSAGE:', error.message);
    console.error('FULL ERROR:', error);
  }
}

testConnection();
