/**
 * Authentication Middleware
 * Handles JWT token generation, verification, and role-based access control
 */

const jwt = require('jsonwebtoken');
const { findUserById } = require('../data/mockUsers');

// Use environment variable for JWT secret, fallback to default for learning purposes
// In production, ALWAYS use environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'accreditrak-secret-key-2025';
const JWT_EXPIRATION = '24h';

/**
 * Generate a JWT token for a user
 * @param {object} user - User object with userId and role
 * @returns {string} JWT token
 */
function generateToken(user) {
  const payload = {
    userId: user.userId,
    role: user.role
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token
 * @returns {object|null} Decoded payload or null if invalid
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Middleware to authenticate requests using JWT
 * Checks Authorization header for Bearer token
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }
  
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
  
  // Verify user still exists in our mock database
  const user = findUserById(decoded.userId);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Attach user info to request
  req.user = {
    userId: decoded.userId,
    role: decoded.role
  };
  
  next();
}

/**
 * Middleware factory to check if user has required role(s)
 * @param {...string} allowedRoles - Roles that are allowed to access the route
 * @returns {function} Middleware function
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    
    next();
  };
}

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
  requireRole
};
