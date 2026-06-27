import nodemailer from 'nodemailer';

async function testHref() {
  const transporter = nodemailer.createTransport({
    streamTransport: true // mock transport
  });

  try {
    await transporter.sendMail({
      from: 'test@test.com',
      to: 'test2@test.com',
      subject: 'Test',
      text: 'Test',
      attachments: [
        {
          filename: 'test.pdf',
          href: '/uploads/12345.pdf'
        }
      ]
    });
    console.log('Success');
  } catch (error) {
    console.log('ERROR MESSAGE:', error.message);
  }
}

testHref();
