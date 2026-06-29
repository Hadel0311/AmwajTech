import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from './prisma/index.js';
import { newsList } from './data/news.js';
import { partnersList } from './data/partners.js';
import { clientsList } from './data/clients.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedData = async () => {
  console.log('🌱 Starting to seed data to PostgreSQL...');

  try {
    // Clean up existing dynamic data
    console.log('Cleaning up existing jobs, applicants, consultations, and contacts...');
    await prisma.applicant.deleteMany().catch(() => {});
    await prisma.job.deleteMany().catch(() => {});
    await prisma.consultationRequest.deleteMany().catch(() => {});
    await prisma.contactMessage.deleteMany().catch(() => {});

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

    // 3.5 Seed Services
    console.log('Seeding Services...');
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

    let serviceOrder = 1;
    for (const key in servicesList) {
      const basic = servicesList[key];
      const detail = detailsList[key] || {};
      
      const imagePath = `/images/services/${key.replace('_', '-')}-hero.jpg`;
      const fsPath = path.join(__dirname, `../public${imagePath}`);
      const hasImage = fs.existsSync(fsPath);

      const serviceData = {
        key: key,
        title: basic.title,
        icon: mapKeyToIcon[key] || 'Layers',
        description: basic.description,
        image: hasImage ? imagePath : null,
        heroValueProp: detail.heroValueProp || null,
        visualIntro: detail.visualIntro || null,
        challenges: detail.challenges || null,
        workflow: detail.workflow || null,
        relatedServices: detail.relatedServices || [],
        order: serviceOrder++
      };

      await prisma.service.upsert({
        where: { key: key },
        update: serviceData,
        create: serviceData
      });
    }
    console.log('✅ Services seeded.');

    // 4. Seed Jobs
    console.log('Seeding Jobs...');
    const jobs = [
      {
        title: 'Senior Cloud Architect',
        department: 'Engineering',
        type: 'Full-time',
        location: 'Riyadh, Saudi Arabia',
        description: 'Lead the cloud transformation strategy and design modern AWS/Azure architectures.',
        requirements: ['8+ years cloud experience', 'AWS Certified Solutions Architect Professional', 'Terraform and Kubernetes proficiency'],
        status: 'open',
        order: 1
      },
      {
        title: 'Cybersecurity Engineer',
        department: 'Security',
        type: 'Full-time',
        location: 'Riyadh, Saudi Arabia',
        description: 'Monitor, detect, and remediate cybersecurity threats across client infrastructures.',
        requirements: ['5+ years security experience', 'CISSP, CEH, or equivalent', 'Hands-on firewall and SIEM tools experience'],
        status: 'open',
        order: 2
      },
      {
        title: 'Frontend Web Developer',
        department: 'Engineering',
        type: 'Contract',
        location: 'Remote',
        description: 'Build premium, responsive, and high-fidelity user experiences using Vue 3 and modern CSS.',
        requirements: ['3+ years frontend experience', 'Proficiency in Vue 3, Vite, and CSS grid/flexbox', 'Strong UI/UX design sense'],
        status: 'open',
        order: 3
      },
      {
        title: 'IT Project Manager',
        department: 'Operations',
        type: 'Full-time',
        location: 'Jeddah, Saudi Arabia',
        description: 'Manage tech deployments and network infrastructure projects from inception to sign-off.',
        requirements: ['5+ years project management experience', 'PMP or PRINCE2 certification', 'Background in networking or telecom projects'],
        status: 'open',
        order: 4
      }
    ];

    const seededJobs = [];
    for (const job of jobs) {
      const newJob = await prisma.job.create({ data: job });
      seededJobs.push(newJob);
    }
    console.log(`✅ Seeded ${seededJobs.length} jobs.`);

    // 5. Seed Applicants
    console.log('Seeding Applicants...');
    const applicantData = [
      { fullName: 'Ahmad Al-Mansour', email: 'ahmad@example.com', phone: '+966501234567', status: 'New', cvUrl: '/uploads/dummy.pdf', message: 'Excited about the role!' },
      { fullName: 'Sarah Bin-Saeed', email: 'sarah@example.com', phone: '+966507654321', status: 'Reviewing', cvUrl: '/uploads/dummy.pdf', message: 'Experienced in AWS.' },
      { fullName: 'Khalid Al-Otaibi', email: 'khalid@example.com', phone: '+966501112223', status: 'Interview Scheduled', cvUrl: '/uploads/dummy.pdf', message: 'Ready for interview.' },
      { fullName: 'Hana Al-Sudairi', email: 'hana@example.com', phone: '+966504445556', status: 'Accepted', cvUrl: '/uploads/dummy.pdf', message: 'Thank you for the offer.' },
      { fullName: 'Omar Al-Ghamdi', email: 'omar@example.com', phone: '+966507778889', status: 'Rejected', cvUrl: '/uploads/dummy.pdf', message: 'Applying again.' },
      { fullName: 'Fatimah Al-Harbi', email: 'fatimah@example.com', phone: '+966508889990', status: 'New', cvUrl: '/uploads/dummy.pdf' },
      { fullName: 'Tareq Al-Jamil', email: 'tareq@example.com', phone: '+966509990001', status: 'Reviewing', cvUrl: '/uploads/dummy.pdf' },
      { fullName: 'Yasmin Al-Saud', email: 'yasmin@example.com', phone: '+966502223334', status: 'Interview Scheduled', cvUrl: '/uploads/dummy.pdf' },
      { fullName: 'Faisal Al-Zahrani', email: 'faisal@example.com', phone: '+966503334445', status: 'Accepted', cvUrl: '/uploads/dummy.pdf' },
      { fullName: 'Lama Al-Obeid', email: 'lama@example.com', phone: '+966505556667', status: 'New', cvUrl: '/uploads/dummy.pdf' },
      { fullName: 'Majed Al-Mutairi', email: 'majed@example.com', phone: '+966506667778', status: 'Reviewing', cvUrl: '/uploads/dummy.pdf' },
      { fullName: 'Reem Al-Qahtani', email: 'reem@example.com', phone: '+966507778889', status: 'Interview Scheduled', cvUrl: '/uploads/dummy.pdf' },
      { fullName: 'Sultan Al-Shammari', email: 'sultan@example.com', phone: '+966509998887', status: 'Rejected', cvUrl: '/uploads/dummy.pdf' },
      { fullName: 'Norah Al-Dossari', email: 'norah@example.com', phone: '+966502221110', status: 'New', cvUrl: '/uploads/dummy.pdf' },
      { fullName: 'Bandar Al-Enazi', email: 'bandar@example.com', phone: '+966503332221', status: 'Reviewing', cvUrl: '/uploads/dummy.pdf' }
    ];

    for (let i = 0; i < applicantData.length; i++) {
      const data = applicantData[i];
      const job = seededJobs[i % seededJobs.length];
      await prisma.applicant.create({
        data: {
          ...data,
          jobId: job.id,
          jobTitle: job.title
        }
      });
    }
    console.log('✅ Seeded 15 applicants.');

    // 6. Seed Consultations with varying dates (Last 7 Days)
    console.log('Seeding Consultation Requests...');
    const services = ['Cloud Solutions', 'Cybersecurity', 'Network Architecture', 'IT Consulting', 'Managed Services'];
    const companies = ['Aramco', 'SABIC', 'STC', 'Neom', 'Riyadh Bank', 'Al-Rajhi', 'Maaden', 'Elm', 'Tawuniya', 'Bupa Arabia', 'Mobily', 'Zain'];
    const consultationStatusesList = ['New', 'Replied', 'In Progress', 'Resolved'];
    
    // Seed Consultations with realistic organic weekday peaks
    const dailyConsultationCounts = [3, 5, 2, 7, 4, 1, 0]; // Mon to Sun pattern
    const industriesList = ['Government', 'Finance', 'Healthcare', 'Education', 'Enterprise'];
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const baseCount = dailyConsultationCounts[6 - dayOffset] || 2;
      for (let j = 0; j < baseCount; j++) {
        const date = new Date();
        date.setDate(date.getDate() - dayOffset);
        date.setHours(9 + (j * 2) % 8, (j * 17) % 60, 0, 0);

        await prisma.consultationRequest.create({
          data: {
            companyName: companies[(dayOffset * 3 + j) % companies.length],
            fullName: `Client Manager ${dayOffset}_${j}`,
            jobTitle: 'IT Director',
            businessEmail: `lead_${dayOffset}_${j}@company.com`,
            phoneNumber: `+96650${dayOffset}${j}1234`,
            industry: industriesList[(dayOffset + j) % industriesList.length],
            requiredService: services[(dayOffset + j) % services.length],
            projectSize: j % 3 === 0 ? 'Enterprise' : 'Medium-sized',
            projectTimeline: '3-6 months',
            message: `Organic inquiry regarding our ${services[(dayOffset + j) % services.length]} integration.`,
            status: consultationStatusesList[(dayOffset + j) % consultationStatusesList.length],
            createdAt: date
          }
        });
      }
    }
    console.log('✅ Seeded consultation requests.');

    // 7. Seed Contact Messages with varying dates (Last 7 Days)
    console.log('Seeding Contact Messages...');
    const subjects = ['Partnership Inquiry', 'Technical Support', 'Career Questions', 'General Inquiry', 'Feedback'];
    // Seed Contact Messages with realistic B2B lead peaks
    const dailyInquiryCounts = [8, 12, 6, 15, 9, 3, 2]; // Mon to Sun pattern
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const baseCount = dailyInquiryCounts[6 - dayOffset] || 3;
      for (let j = 0; j < baseCount; j++) {
        const date = new Date();
        date.setDate(date.getDate() - dayOffset);
        date.setHours(8 + (j * 2) % 10, (j * 13) % 60, 0, 0);

        await prisma.contactMessage.create({
          data: {
            fullName: `Visitor ${dayOffset}_${j}`,
            email: `visitor_${dayOffset}_${j}@gmail.com`,
            phone: `+96650${dayOffset}${j}9876`,
            subject: subjects[(dayOffset + j) % subjects.length],
            message: `This is a realistic, organic client feedback or general inquiry text for day offset ${dayOffset}.`,
            status: j % 4 === 0 ? 'Resolved' : 'New',
            createdAt: date
          }
        });
      }
    }
    console.log('✅ Seeded contact messages.');

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
