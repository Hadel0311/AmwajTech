import express from 'express';
import { login, refresh, logout } from '../controllers/authController.js';
import { validate } from '../middleware/validateMiddleware.js';
import { loginSchema, refreshTokenSchema } from '../validations/authSchema.js';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshTokenSchema), refresh);
router.post('/logout', validate(refreshTokenSchema), logout);

export default router;
