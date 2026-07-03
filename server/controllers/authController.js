import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/index.js';
import { logger } from '../utils/logger.js';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // Short-lived access token
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Long-lived refresh token
    );

    const salt = await bcrypt.genSalt(10);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    // Save refresh token to database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken }
    });

    const cookieOptions = {
      httpOnly: true,
      secure: false, // Disabled temporarily for local HTTP testing
      sameSite: 'strict',
      path: '/'
    };

    res.cookie('access_token', token, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refresh_token', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refresh_token || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ success: false, error: 'No refresh token provided' });
    }

    // Verify token structure
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, error: 'Invalid or expired refresh token' });
    }

    // Check against database to ensure it wasn't revoked
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user || !user.refreshToken) {
      return res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }

    const isValidRefresh = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValidRefresh) {
      return res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }

    // Issue new access token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: false, // Disabled temporarily for local HTTP testing
      sameSite: 'strict',
      path: '/'
    };
    
    res.cookie('access_token', token, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

    res.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refresh_token || req.body.refreshToken;
    
    if (refreshToken) {
      // Decode without throwing if expired to get userId
      const decoded = jwt.decode(refreshToken);
      if (decoded && decoded.userId) {
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId }
        });
        if (user && user.refreshToken) {
          const isValidRefresh = await bcrypt.compare(refreshToken, user.refreshToken);
          if (isValidRefresh) {
            // Clear the token in the database
            await prisma.user.update({
              where: { id: decoded.userId },
              data: { refreshToken: null }
            });
          }
        }
      }
    }

    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Incorrect current password' });
    }

    // Prevent reusing current password
    const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);
    if (isSamePassword) {
      return res.status(400).json({ success: false, error: 'New password cannot be the same as the current password' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Generate new tokens
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const refreshSalt = await bcrypt.genSalt(10);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, refreshSalt);

    // Update user record: new password, timestamp, and new refresh token
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newPasswordHash,
        lastPasswordChangedAt: new Date(),
        refreshToken: hashedRefreshToken
      }
    });

    const cookieOptions = {
      httpOnly: true,
      secure: false, // Disabled temporarily for local HTTP testing
      sameSite: 'strict',
      path: '/'
    };

    res.cookie('access_token', token, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refresh_token', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};
