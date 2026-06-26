import express from 'express';
import { uploadMiddleware, storageService } from '../services/StorageService.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', uploadMiddleware.single('file'), async (req, res, next) => {
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
