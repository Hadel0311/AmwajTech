import express from 'express';
import { getAll, getOne, createDoc, updateDoc, deleteDoc } from '../controllers/contentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public Routes (For the website)
router.get('/:collection', getAll);
router.get('/:collection/:id', getOne);

// Protected Routes (For the Admin Dashboard)
router.post('/:collection', verifyToken, createDoc);
router.put('/:collection/:id', verifyToken, updateDoc);
router.delete('/:collection/:id', verifyToken, deleteDoc);

export default router;
