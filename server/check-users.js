import prisma from './prisma/index.js';

async function getUsers() {
  const users = await prisma.user.findMany();
  console.log(users);
}

getUsers();
