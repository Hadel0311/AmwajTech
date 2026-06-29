import prisma from './prisma/index.js';

async function main() {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      key: true,
      title: true
    }
  })
  console.log(services)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
