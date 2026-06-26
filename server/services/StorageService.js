import multer from 'multer';
import path from 'path';
import fs from 'fs';

const UPLOADS_DIR = path.join(process.cwd(), 'server', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename: timestamp-random-originalName
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const uploadMiddleware = multer({ storage });

export class LocalStorageService {
  /**
   * Abstracted upload method.
   * If we switch to S3 later, this method signature remains the same,
   * but the underlying implementation changes.
   */
  async uploadFile(file) {
    if (!file) throw new Error('No file provided');
    
    // In LocalStorage, the file is already saved to disk by Multer at this point.
    // We just return the relative public URL path.
    // In S3, we would read file.path, upload to AWS, then delete the local file, and return the S3 URL.
    
    return `/uploads/${file.filename}`;
  }

  async deleteFile(fileUrl) {
    if (!fileUrl || !fileUrl.startsWith('/uploads/')) return;

    try {
      const filename = path.basename(fileUrl);
      const filePath = path.join(UPLOADS_DIR, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Failed to delete local file:', error);
    }
  }
}

export const storageService = new LocalStorageService();
