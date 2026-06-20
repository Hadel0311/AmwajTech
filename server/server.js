import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

import contentRoutes from './routes/contentRoutes.js';

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Amwaj Tech Backend is running' });
});

// API Routes
app.use('/api/content', contentRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
