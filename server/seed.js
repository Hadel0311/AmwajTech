import { db } from './config/firebase.js';
import { newsList } from '../src/data/news.js';
import { partnersList } from '../src/data/partners.js';
import { clientsList } from '../src/data/clients.js';

const seedData = async () => {
  console.log('🌱 Starting to seed data to Firestore...');

  try {
    // 1. Seed Announcements (News)
    console.log('Seeding Announcements...');
    for (const news of newsList) {
      await db.collection('announcements').doc(news.id).set(news);
    }

    // 2. Seed Partners
    console.log('Seeding Partners...');
    for (const partner of partnersList) {
      await db.collection('partners').doc(partner.id).set(partner);
    }

    // 3. Seed Clients
    console.log('Seeding Clients...');
    for (const client of clientsList) {
      await db.collection('clients').doc(client.id).set(client);
    }

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
