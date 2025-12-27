/**
 * Authentication Routes
 * Handles user login and token generation
 */

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../data/mockUsers');
const { generateToken } = require('../middleware/auth');

/**
 * POST /api/auth/login
 * Login endpoint - validates credentials and returns JWT token
 */
router.post('/login', (req, res) => {
  try {
    const { userId, password } = req.body;
    
    // Validate required fields
    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: 'userId and password are required'
      });
    }
    
    // Authenticate user
    const user = authenticateUser(userId, password);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
