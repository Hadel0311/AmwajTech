import express from 'express';
import { getAll, getOne, createDoc, updateDoc, deleteDoc } from '../controllers/contentController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

// Public routes
router.get('/:collection', getAll);
router.get('/:collection/:id', getOne);

const publicPostCollections = ['applicants', 'contact_messages', 'consultation_requests'];

const conditionalPostAuth = (req, res, next) => {
  if (publicPostCollections.includes(req.params.collection)) {
    return next();
  }
  return verifyToken(req, res, () => {
    return authorizeRoles('ADMIN', 'HR', 'MANAGER')(req, res, next);
  });
};

// Protected routes (Admin, Manager, HR)
router.post('/:collection', conditionalPostAuth, createDoc);
router.put('/:collection/:id', verifyToken, authorizeRoles('ADMIN', 'HR', 'MANAGER'), updateDoc);
router.delete('/:collection/:id', verifyToken, authorizeRoles('ADMIN', 'MANAGER'), deleteDoc);

export default router;
