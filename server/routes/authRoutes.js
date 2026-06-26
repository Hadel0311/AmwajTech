import express from 'express';
import { login } from '../controllers/authController.js';
import { validate } from '../middleware/validateMiddleware.js';
import { loginSchema } from '../validations/authSchema.js';

const router = express.Router();

router.post('/login', validate(loginSchema), login);

export default router;
