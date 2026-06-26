import express from 'express';
import { login, getMe, updateCredentials } from '../controllers/authController.js';
import { validate } from '../middleware/validateMiddleware.js';
import { loginSchema, updateCredentialsSchema } from '../validations/authSchema.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.get('/me', verifyToken, getMe);
router.put('/update-credentials', verifyToken, validate(updateCredentialsSchema), updateCredentials);

export default router;
