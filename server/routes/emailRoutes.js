import express from 'express';
import { emailService } from '../services/EmailService.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Used for manual testing of email settings from the dashboard, 
// or if the frontend explicitly needs to trigger an email.
// Normal form submissions now trigger emails directly from contentController.
router.post('/send', verifyToken, authorizeRoles('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    const { type, data } = req.body;
    
    if (!type || !data) {
      return res.status(400).json({ success: false, error: 'Type and data are required' });
    }

    const result = await emailService.sendNotification(type, data);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ success: false, error: error.message || 'Server Error' });
  }
});

export default router;
