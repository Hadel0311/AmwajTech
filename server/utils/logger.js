import fs from 'fs';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'server', 'error_log.txt');

export const logger = {
  info: (message, meta = {}) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, Object.keys(meta).length ? meta : '');
  },
  error: (message, error) => {
    const errorMsg = `[ERROR] ${new Date().toISOString()} - ${message}\n${error?.stack || error}\n\n`;
    console.error(errorMsg);
    try {
      fs.appendFileSync(logFilePath, errorMsg);
    } catch (fsErr) {
      console.error('Failed to write to log file:', fsErr);
    }
  },
  warn: (message, meta = {}) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, Object.keys(meta).length ? meta : '');
  }
};
