import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from './prisma/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedServices = async () => {
  try {
    const dataPath = path.resolve(__dirname, '../src/i18n/locales/en.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const enJson = JSON.parse(rawData);

    const servicesList = enJson.services.items;
    const detailsList = enJson.services.details;

    const mapKeyToIcon = {
      'network_infrastructure': 'Network',
      'network_security': 'ShieldCheck',
      'data_center': 'Database',
      'cloud_services': 'Cloud',
      'software_solutions': 'Code',
      'technical_support': 'Headset'
    };

    let order = 1;
    for (const key in servicesList) {
      const basic = servicesList[key];
      const detail = detailsList[key] || {};
      
      const serviceData = {
        key: key,
        title: basic.title,
        icon: mapKeyToIcon[key] || 'Layers',
        description: basic.description,
        heroValueProp: detail.heroValueProp || null,
        visualIntro: detail.visualIntro || null,
        challenges: detail.challenges || null,
        workflow: detail.workflow || null,
        relatedServices: detail.relatedServices || [],
        order: order++
      };

      await prisma.service.upsert({
        where: { key: key },
        update: serviceData,
        create: serviceData
      });
      console.log(`Seeded service: ${basic.title}`);
    }

    console.log('✅ Services seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
