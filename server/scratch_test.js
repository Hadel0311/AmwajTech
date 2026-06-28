import prisma from './prisma/index.js';

async function test() {
  try {
    const upserted = await prisma.setting.upsert({
      where: { type: 'email_jobs' },
      update: { data: { port: 465, host: 'mail.amwaj-tech.com' } },
      create: { type: 'email_jobs', data: { port: 465, host: 'mail.amwaj-tech.com' } }
    });
    console.log('Success:', upserted);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
