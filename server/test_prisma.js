import prisma from './prisma/index.js';

async function test() {
  try {
    // Just try an update with a fake ID to see if it throws PrismaClientValidationError
    await prisma.user.update({
      where: { id: 'fake-id' },
      data: { refreshToken: 'test' }
    });
  } catch (e) {
    if (e.name === 'PrismaClientValidationError') {
      console.error('Validation Error:', e.message);
    } else {
      console.log('Success! It threw a RecordNotFound error, NOT a Validation error:', e.message);
    }
  }
}

test();
