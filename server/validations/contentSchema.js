import { z } from 'zod';

export const announcementSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    category: z.string().min(1, 'Category is required'),
    excerpt: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
    date: z.string().min(1, 'Date is required'),
    image: z.string().optional()
  })
});

export const partnerSchema = z.object({
  body: z.object({
    key: z.string().min(1, 'Key is required'),
    name: z.string().min(1, 'Name is required'),
    website: z.string().optional(),
    services: z.array(z.string()).optional()
  })
});

export const clientSchema = z.object({
  body: z.object({
    key: z.string().min(1, 'Key is required'),
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    industry: z.string().optional(),
    services: z.array(z.string()).optional()
  })
});

export const settingsSchema = z.object({
  body: z.object({
    type: z.string().min(1, 'Type is required'),
    data: z.any()
  })
});
