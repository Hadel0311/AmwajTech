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

// Local IP check helper
function isLocalIp(ip) {
  if (!ip) return false;
  // Handle IPv6 mapped IPv4
  if (ip.includes('::ffff:')) {
    ip = ip.split('::ffff:')[1];
  }
  
  if (ip === '127.0.0.1' || ip === '::1') return true;
  
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  if (parts[0] === '10') return true;
  if (parts[0] === '192' && parts[1] === '168') return true;
  if (parts[0] === '172') {
    const second = parseInt(parts[1], 10);
    if (second >= 16 && second <= 31) return true;
  }
  
  return false;
}

// IP Filtering Middleware for Admin Routes
app.use((req, res, next) => {
  const restrictedPaths = ['/login', '/admin', '/api/auth', '/api/content'];
  const isRestricted = restrictedPaths.some(p => req.path === p || req.path.startsWith(`${p}/`));
  
  if (isRestricted) {
    // Get client IP (handle proxies like IIS)
    const forwardedFor = req.headers['x-forwarded-for'];
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : req.socket.remoteAddress;
    
    if (!isLocalIp(clientIp)) {
      console.log(`Blocked public access to ${req.path} from IP: ${clientIp}`);
      // Return a plain 404 to make it look like the page doesn't exist
      return res.status(404).send('<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET ' + req.path + '</pre>\n</body>\n</html>');
    }
  }
  next();
});

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

// API Routes
app.use('/api/auth', authRoutes);
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
