import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: process.env.VITE_APP_URL || 'http://localhost:5173', // Restrict to frontend domain
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  contentSecurityPolicy: false,
  hsts: false
}));
app.use(express.json());
app.use(cookieParser());

// Global API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Static folder for local uploads
const UPLOADS_DIR = path.join(process.cwd(), 'server', 'uploads');
app.use('/uploads', express.static(UPLOADS_DIR));

// Import routes
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Amwaj Tech Backend is running (PostgreSQL)' });
});

// IP Restriction Middleware for Admin/Login
const restrictToLocal = (req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  
  // Define local/internal IP prefixes (IPv4 and IPv6 loopback, and private network ranges)
  const isLocal = clientIp === '::1' || 
                  clientIp === '127.0.0.1' || 
                  clientIp.startsWith('192.168.') || 
                  clientIp.startsWith('10.') ||
                  clientIp.startsWith('::ffff:192.168.') ||
                  clientIp.startsWith('::ffff:10.') ||
                  clientIp.startsWith('::ffff:127.0.0.1');

  if (!isLocal) {
    // Return a generic 404 Not Found to make it look like the page doesn't exist
    return res.status(404).send('<!DOCTYPE html>\\n<html lang="en">\\n<head>\\n<meta charset="utf-8">\\n<title>Error</title>\\n</head>\\n<body>\\n<pre>Cannot GET ' + req.path + '</pre>\\n</body>\\n</html>');
  }
  next();
};

// API Routes
app.use('/api/auth', restrictToLocal, authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/uploads', uploadRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  
  // SPA Fallback: Any unknown route (not starting with /api or /uploads) returns index.html
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
      return next();
    }
    
    // Block the frontend /login and /admin pages from external IPs
    if (req.path.startsWith('/login') || req.path.startsWith('/admin')) {
      return restrictToLocal(req, res, () => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
    
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Restarted for Prisma client update part 5
