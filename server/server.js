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
// Trust IIS Reverse Proxy to get the real public IP Address
app.set('trust proxy', true);

// Block external IP access to Admin and Auth routes
app.use((req, res, next) => {
  const isRestrictedRoute = req.path.startsWith('/login') || 
                            req.path.startsWith('/admin') || 
                            req.path.startsWith('/api/auth');
                            
  if (isRestrictedRoute) {
    // Because trust proxy is true, req.ip automatically gets the real client IP from X-Forwarded-For
    const clientIp = req.ip || req.headers['x-iisnode-remote_addr'] || '';
    
    // Check if IP is local (localhost, 192.168.x.x, 10.x.x.x, 172.16.x.x-172.31.x.x)
    const isLocal = clientIp.includes('127.0.0.1') || 
                    clientIp === '::1' ||
                    clientIp.match(/^::ffff:192\.168\./) ||
                    clientIp.match(/^192\.168\./) ||
                    clientIp.match(/^::ffff:10\./) ||
                    clientIp.match(/^10\./) ||
                    clientIp.match(/^::ffff:172\.(1[6-9]|2[0-9]|3[0-1])\./) ||
                    clientIp.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./);
                    
    if (!isLocal) {
      return res.status(403).send('<div style="text-align:center; padding: 50px; font-family: sans-serif; color: #333;"><h1>Access Denied</h1><p>The Amwaj Tech administration portal is strictly restricted to the internal company network.</p></div>');
    }
  }
  next();
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
