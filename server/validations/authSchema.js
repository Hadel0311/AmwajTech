import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
});

export const updateCredentialsSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').optional(),
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters').optional().or(z.literal(''))
  })
});
