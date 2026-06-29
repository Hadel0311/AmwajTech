import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(err.message || 'An unexpected error occurred', err);

  let statusCode = err.statusCode || 500;
  let errorMessage = statusCode === 500 ? 'Internal Server Error' : err.message;

  // Handle Prisma Validation Errors
  if (err.name === 'PrismaClientValidationError') {
    statusCode = 400;
    errorMessage = 'Database validation failed. Please check your input data types.';
  } else if (err.code === 'P2002') {
    statusCode = 409;
    errorMessage = 'Unique constraint violation. This record already exists.';
  }

  res.status(statusCode).json({
    success: false,
    error: errorMessage
  });
};
