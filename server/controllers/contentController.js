import prisma from '../prisma/index.js';
import { emailService } from '../services/EmailService.js';

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
