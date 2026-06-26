import bcrypt from 'bcrypt';
import prisma from './prisma/index.js';
import { newsList } from '../src/data/news.js';
import { partnersList } from '../src/data/partners.js';
import { clientsList } from '../src/data/clients.js';

const seedData = async () => {
  console.log('🌱 Starting to seed data to PostgreSQL...');

  try {
    // 0. Create Initial Admin User
    console.log('Creating Admin User...');
    const adminEmail = 'admin@amwajtech.com';
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: {
          email: adminEmail,
          passwordHash,
          role: 'ADMIN'
        }
      });
      console.log('✅ Admin user created (admin@amwajtech.com / admin123)');
    }

    // 1. Seed Announcements (News)
    console.log('Seeding Announcements...');
    for (const news of newsList) {
      await prisma.announcement.upsert({
        where: { id: news.id },
        update: news,
        create: news
      });
    }

    // 2. Seed Partners
    console.log('Seeding Partners...');
    for (const partner of partnersList) {
      await prisma.partner.upsert({
        where: { key: partner.key },
        update: partner,
        create: partner
      });
    }

    // 3. Seed Clients
    console.log('Seeding Clients...');
    for (const client of clientsList) {
      await prisma.client.upsert({
        where: { key: client.key },
        update: client,
        create: client
      });
    }

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
