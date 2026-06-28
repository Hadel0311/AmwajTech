import prisma from './prisma/index.js';

async function test() {
  const doc = await prisma.setting.findUnique({
    where: { type: 'email_jobs' }
  });
  console.log('DB settings:', doc?.data);
}

test();
