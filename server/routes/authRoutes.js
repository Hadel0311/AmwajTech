import express from 'express';
import { login, refresh, logout, changePassword } from '../controllers/authController.js';
import { validate } from '../middleware/validateMiddleware.js';
import { loginSchema, refreshTokenSchema, changePasswordSchema } from '../validations/authSchema.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshTokenSchema), refresh);
router.post('/logout', validate(refreshTokenSchema), logout);
router.post('/change-password', verifyToken, validate(changePasswordSchema), changePassword);

export default router;
