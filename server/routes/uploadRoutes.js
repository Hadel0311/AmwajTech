import express from 'express';
import { uploadMiddleware, storageService } from '../services/StorageService.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 20, // limit each IP to 20 uploads per hour
  message: 'Too many files uploaded from this IP, please try again after an hour'
});

const router = express.Router();

router.post('/', uploadLimiter, uploadMiddleware.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileUrl = await storageService.uploadFile(req.file);

    res.status(201).json({
      success: true,
      url: fileUrl,
      filename: req.file.originalname
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/', verifyToken, authorizeRoles('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, error: 'File URL is required' });
    }

    await storageService.deleteFile(url);
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
