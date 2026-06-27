import prisma from './index.js';

async function check() {
  const s = await prisma.setting.findMany();
  console.log(JSON.stringify(s, null, 2));
}

check();
