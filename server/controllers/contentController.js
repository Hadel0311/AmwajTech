import prisma from '../prisma/index.js';
import { emailService } from '../services/EmailService.js';
import { partnersList } from '../../src/data/partners.js';
import { clientsList } from '../../src/data/clients.js';

// Map URL collection names to Prisma model names
const getModel = (collection) => {
  const map = {
    'announcements': prisma.announcement,
    'partners': prisma.partner,
    'clients': prisma.client,
    'settings': prisma.setting,
    'services': prisma.service,
    'jobs': prisma.job,
    'applicants': prisma.applicant,
    'contact_messages': prisma.contactMessage,
    'consultation_requests': prisma.consultationRequest
  };
  return map[collection];
};

export const getAll = async (req, res, next) => {
  const { collection } = req.params;
  const model = getModel(collection);
  
  if (!model) {
    return res.status(400).json({ error: 'Invalid collection' });
  }

  try {
    const data = await model.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  const { collection, id } = req.params;
  const model = getModel(collection);
  
  if (!model) {
    return res.status(400).json({ error: 'Invalid collection' });
  }

  try {
    const doc = await model.findUnique({ where: { id } });
    if (!doc) {
      // Check if it's searched by key/type
      if (collection === 'settings') {
        const setting = await model.findUnique({ where: { type: id } });
        if (setting) return res.json(setting.data); // Unwrap data field
      } else if (['partners', 'clients', 'services'].includes(collection)) {
         const item = await model.findUnique({ where: { key: id } });
         if (item) return res.json(item);
      }
      return res.status(404).json({ error: 'Document not found' });
    }
    // Unwrap settings
    if (collection === 'settings') return res.json(doc.data);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const createDoc = async (req, res, next) => {
  const { collection } = req.params;
  const model = getModel(collection);
  
  if (!model) {
    return res.status(400).json({ error: 'Invalid collection' });
  }

  try {
    let payload = { ...req.body };
    
    // Security: Whitelist allowed fields for public submissions to prevent mass assignment
    const isPublicUser = !req.user;
    if (isPublicUser) {
      if (collection === 'applicants') {
        const allowed = ['jobId', 'jobTitle', 'fullName', 'email', 'phone', 'linkedin', 'cvUrl', 'message', 'dynamicFields'];
        payload = Object.keys(payload)
          .filter(key => allowed.includes(key))
          .reduce((obj, key) => { obj[key] = payload[key]; return obj; }, {});
      } else if (collection === 'contact_messages') {
        const allowed = ['fullName', 'email', 'phone', 'subject', 'message'];
        payload = Object.keys(payload)
          .filter(key => allowed.includes(key))
          .reduce((obj, key) => { obj[key] = payload[key]; return obj; }, {});
      } else if (collection === 'consultation_requests') {
        const allowed = ['companyName', 'fullName', 'jobTitle', 'businessEmail', 'phoneNumber', 'industry', 'requiredService', 'projectSize', 'projectTimeline', 'message'];
        payload = Object.keys(payload)
          .filter(key => allowed.includes(key))
          .reduce((obj, key) => { obj[key] = payload[key]; return obj; }, {});
      }
    }

    if (collection === 'settings') {
      // Wrap in data field, and extract type if present (assume type is passed in body or URL)
      payload = { type: req.body.type, data: req.body };
    } else if (['partners', 'clients', 'services'].includes(collection)) {
      if (!payload.key) {
        // Auto-generate key from name or title
        const source = payload.name || payload.title || 'doc';
        payload.key = source.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' + Date.now();
      }
    }
    const newDoc = await model.create({
      data: payload
    });

    // Fire and forget email notifications
    if (collection === 'applicants') {
      emailService.sendNotification('job', payload).catch(err => console.error(err));
    } else if (collection === 'contact_messages') {
      emailService.sendNotification('contact', payload).catch(err => console.error(err));
    } else if (collection === 'consultation_requests') {
      emailService.sendNotification('consultation', payload).catch(err => console.error(err));
    }

    if (collection === 'settings') return res.status(201).json(newDoc.data);
    res.status(201).json(newDoc);
  } catch (error) {
    next(error);
  }
};

export const updateDoc = async (req, res, next) => {
  const { collection, id } = req.params;
  const model = getModel(collection);
  
  if (!model) {
    return res.status(400).json({ error: 'Invalid collection' });
  }

  try {
    if (collection === 'settings') {
      // Upsert setting because dashboard saves might hit update before create
      const upserted = await model.upsert({
        where: { type: id },
        update: { data: req.body },
        create: { type: id, data: req.body }
      });
      return res.json(upserted.data);
    }

    const updatedDoc = await model.update({
      where: { id },
      data: req.body
    });
    res.json(updatedDoc);
  } catch (error) {
    // Check if updating by type/key
    try {
      if (['partners', 'clients', 'services'].includes(collection)) {
         const updated = await model.update({ where: { key: id }, data: req.body });
         return res.json(updated);
      }
    } catch(err) {
      next(err);
      return;
    }
    next(error);
  }
};

export const deleteDoc = async (req, res, next) => {
  const { collection, id } = req.params;
  const model = getModel(collection);
  
  if (!model) {
    return res.status(400).json({ error: 'Invalid collection' });
  }

  try {
    if (collection === 'settings') {
      await model.delete({ where: { type: id } });
      return res.json({ message: 'Document deleted successfully' });
    }
    
    await model.delete({ where: { id } });
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    try {
      if (['partners', 'clients', 'services'].includes(collection)) {
         await model.delete({ where: { key: id } });
         return res.json({ message: 'Document deleted successfully' });
      }
    } catch(err) {
      next(err);
      return;
    }
    next(error);
  }
};

// ── Visit Tracking ──────────────────────────────────────────────────────────
export const trackVisit = async (req, res, next) => {
  try {
    // Only track public pages (non-admin routes)
    const { path } = req.body;
    if (!path || path.startsWith('/admin') || path.startsWith('/login')) {
      return res.json({ ok: true });
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const settingKey = 'page_visits';

    const existing = await prisma.setting.findUnique({ where: { type: settingKey } }).catch(() => null);
    let data = (existing?.data) || {};
    // Ensure it's a plain object
    if (typeof data !== 'object' || Array.isArray(data)) data = {};

    data[today] = (data[today] || 0) + 1;

    // Keep only the last 90 days to prevent unbounded growth
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);
    for (const key of Object.keys(data)) {
      if (new Date(key) < cutoff) delete data[key];
    }

    if (existing) {
      await prisma.setting.update({ where: { type: settingKey }, data: { data } });
    } else {
      await prisma.setting.create({ data: { type: settingKey, data } });
    }
    res.json({ ok: true });
  } catch (error) {
    // Never fail the user-facing request because of analytics
    res.json({ ok: true });
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      jobs,
      applicants,
      consultationRequests,
      contactMessages,
      clients,
      partners,
      visitSetting
    ] = await Promise.all([
      prisma.job.findMany().catch(() => []),
      prisma.applicant.findMany().catch(() => []),
      prisma.consultationRequest.findMany().catch(() => []),
      prisma.contactMessage.findMany().catch(() => []),
      prisma.client.findMany().catch(() => []),
      prisma.partner.findMany().catch(() => []),
      prisma.setting.findUnique({ where: { type: 'page_visits' } }).catch(() => null)
    ]);

    // Aggregate KPIs
    const openJobs = jobs.filter(j => j.status !== 'Closed').length;
    const totalApplications = applicants.length;
    const interviewsScheduled = applicants.filter(a => a.status === 'Interview Scheduled').length;
    const acceptedCandidates = applicants.filter(a => a.status === 'Accepted').length;

    // Calculate Trend Metrics (This Week vs Last Week / Month)
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(now.getDate() - 14);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    // 1. Consultations trend (weekly)
    const thisWeekConsultations = consultationRequests.filter(r => new Date(r.createdAt) >= sevenDaysAgo).length;
    const lastWeekConsultations = consultationRequests.filter(r => {
      const d = new Date(r.createdAt);
      return d >= fourteenDaysAgo && d < sevenDaysAgo;
    }).length;
    const consultationsChange = thisWeekConsultations - lastWeekConsultations;
    const consultationsTrendPercent = lastWeekConsultations > 0 
      ? Math.round((consultationsChange / lastWeekConsultations) * 100)
      : (thisWeekConsultations > 0 ? 100 : 0);

    // 2. Contacts trend (weekly)
    const thisWeekContacts = contactMessages.filter(m => new Date(m.createdAt) >= sevenDaysAgo).length;
    const lastWeekContacts = contactMessages.filter(m => {
      const d = new Date(m.createdAt);
      return d >= fourteenDaysAgo && d < sevenDaysAgo;
    }).length;
    const contactsChange = thisWeekContacts - lastWeekContacts;
    const contactsTrendPercent = lastWeekContacts > 0
      ? Math.round((contactsChange / lastWeekContacts) * 100)
      : (thisWeekContacts > 0 ? 100 : 0);

    // 3. Partners trend (monthly)
    const thisMonthPartners = partners.filter(p => new Date(p.createdAt) >= thirtyDaysAgo).length;
    const previousPartners = partners.filter(p => new Date(p.createdAt) < thirtyDaysAgo).length;
    const partnersChange = previousPartners > 0 ? (partners.length - previousPartners) : 2;
    const partnersTrendPercent = previousPartners > 0
      ? Math.round((partnersChange / previousPartners) * 100)
      : 10; // +10% baseline fallback

    // 4. Clients trend (monthly)
    const thisMonthClients = clients.filter(c => new Date(c.createdAt) >= thirtyDaysAgo).length;
    const previousClients = clients.filter(c => new Date(c.createdAt) < thirtyDaysAgo).length;
    const clientsChange = previousClients > 0 ? (clients.length - previousClients) : 1;
    const clientsTrendPercent = previousClients > 0
      ? Math.round((clientsChange / previousClients) * 100)
      : 25; // +25% baseline fallback

    // Aggregate Application Statuses
    const applicationStatuses = applicants.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    // Aggregate Consultation Statuses
    const consultationStatuses = consultationRequests.reduce((acc, cr) => {
      const status = cr.status || 'New';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Aggregate Consultations by Service
    const consultationsByService = consultationRequests.reduce((acc, req) => {
      const service = req.requiredService || 'Unknown';
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {});

    // Aggregate Consultations by Industry (normalized for form values and seeds)
    const consultationsByIndustry = consultationRequests.reduce((acc, req) => {
      let ind = req.industry || 'Other';
      ind = ind.toLowerCase().trim();
      
      let norm = 'Other';
      if (ind === 'gov' || ind === 'government') {
        norm = 'Government';
      } else if (ind === 'bank' || ind === 'banking' || ind === 'finance') {
        norm = 'Finance';
      } else if (ind === 'health' || ind === 'healthcare') {
        norm = 'Healthcare';
      } else if (ind === 'edu' || ind === 'education') {
        norm = 'Education';
      } else if (ind === 'ent' || ind === 'enterprise' || ind === 'ind' || ind === 'industrial') {
        norm = 'Enterprise';
      }
      
      if (norm !== 'Other') {
        acc[norm] = (acc[norm] || 0) + 1;
      }
      return acc;
    }, {
      'Government': 0,
      'Finance': 0,
      'Healthcare': 0,
      'Education': 0,
      'Enterprise': 0
    });

    // Aggregate Activity Over Last 7 Days (grouped by Date)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    // Website visits from Setting store
    const rawVisits = (visitSetting?.data && typeof visitSetting.data === 'object') ? visitSetting.data : {};
    const visitsByDay = last7Days.map(dateStr => {
      const dateObj = new Date(dateStr);
      return {
        date: dateStr,
        label: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
        visits: rawVisits[dateStr] || 0
      };
    });

    // Applicants by month – current + last month only
    const applicantsByMonth = (() => {
      const months = [];
      for (let i = 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() - i);
        months.push({
          year: d.getFullYear(),
          month: d.getMonth(),
          label: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          isCurrentMonth: i === 0
        });
      }
      return months.map(m => {
        const monthApps = applicants.filter(a => {
          const d = new Date(a.createdAt);
          return d.getFullYear() === m.year && d.getMonth() === m.month;
        });
        const byJob = monthApps.reduce((acc, a) => {
          const title = a.jobTitle || 'Other';
          acc[title] = (acc[title] || 0) + 1;
          return acc;
        }, {});
        return {
          label: m.label,
          isCurrentMonth: m.isCurrentMonth,
          total: monthApps.length,
          byJob
        };
      });
    })();

    const activityOverTime = last7Days.map(dateStr => {
      const dayConsultations = consultationRequests.filter(
        r => new Date(r.createdAt).toISOString().split('T')[0] === dateStr
      ).length;
      
      const dayContacts = contactMessages.filter(
        m => new Date(m.createdAt).toISOString().split('T')[0] === dateStr
      ).length;

      const dateObj = new Date(dateStr);
      const dayLabel = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

      return {
        date: dateStr,
        label: dayLabel,
        consultations: dayConsultations,
        contacts: dayContacts
      };
    });

    res.json({
      kpis: {
        openJobs,
        totalApplications,
        interviewsScheduled,
        acceptedCandidates,
        totalConsultations: consultationRequests.length,
        totalContacts: contactMessages.length,
        totalClients: clients.length,
        totalPartners: partners.length
      },
      trends: {
        consultations: {
          change: consultationsChange,
          percent: consultationsTrendPercent,
          label: 'from last week',
          isPositive: consultationsChange >= 0
        },
        contacts: {
          change: contactsChange,
          percent: contactsTrendPercent,
          label: 'from last week',
          isPositive: contactsChange >= 0
        },
        partners: {
          change: partnersChange,
          percent: partnersTrendPercent,
          label: 'from last month',
          isPositive: partnersChange >= 0
        },
        clients: {
          change: clientsChange,
          percent: clientsTrendPercent,
          label: 'from last month',
          isPositive: clientsChange >= 0
        }
      },
      applicationStatuses,
      consultationStatuses,
      consultationsByService,
      consultationsByIndustry,
      activityOverTime,
      visitsByDay,
      applicantsByMonth
    });
  } catch (error) {
    next(error);
  }
};

export const seedDemoData = async (req, res, next) => {
  try {
    if (!req.user || !['ADMIN', 'HR', 'MANAGER'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Unauthorized role' });
    }

    console.log('🌱 Starting to seed demo data via HTTP request...');

    await prisma.applicant.deleteMany().catch(() => {});
    await prisma.job.deleteMany().catch(() => {});
    await prisma.consultationRequest.deleteMany().catch(() => {});
    await prisma.contactMessage.deleteMany().catch(() => {});

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

    // Seed Partners
    for (const partner of partnersList) {
      await prisma.partner.upsert({
        where: { key: partner.key },
        update: partner,
        create: partner
      });
    }

    // Seed Clients
    for (const client of clientsList) {
      await prisma.client.upsert({
        where: { key: client.key },
        update: client,
        create: client
      });
    }

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

    res.json({ message: 'Demo data seeded successfully' });
  } catch (error) {
    next(error);
  }
};

