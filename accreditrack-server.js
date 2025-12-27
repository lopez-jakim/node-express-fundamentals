/**
 * AccrediTrack Server
 * REST API for Accreditation Tracking System
 * 
 * This server implements a complete REST API for managing accreditation tasks,
 * including authentication, task management, file uploads, and workflow management.
 * 
 * =============================================================================
 * API ENDPOINTS
 * =============================================================================
 * 
 * AUTHENTICATION
 * --------------
 * POST /api/auth/login
 *   - Body: { userId: string, password: string }
 *   - Returns: { success, message, data: { token, user } }
 * 
 * TASK MANAGEMENT
 * ---------------
 * GET /api/benchmark-tasks
 *   - Headers: Authorization: Bearer <token>
 *   - Query: ?assigned_user_id=FACULTY-001&cycle_id=2
 *   - Returns: List of tasks
 * 
 * POST /api/benchmark-tasks
 *   - Headers: Authorization: Bearer <token>
 *   - Role: coordinator, admin
 *   - Body: { accreditationBenchmarkId, assignedUserId, cycleId, dueDate }
 *   - Returns: Created task
 * 
 * POST /api/benchmark-tasks/:taskId/submit
 *   - Headers: Authorization: Bearer <token>
 *   - Role: faculty
 *   - Body: multipart/form-data with 'file' field (PDF only, max 10MB)
 *   - Returns: Updated task with artifact info
 * 
 * PATCH /api/benchmark-tasks/:taskId/review
 *   - Headers: Authorization: Bearer <token>
 *   - Role: coordinator, admin
 *   - Body: { status: 'approved' | 'for_revision', comment: string }
 *   - Returns: Updated task
 * 
 * =============================================================================
 * MOCK USER CREDENTIALS
 * =============================================================================
 * 
 * Admin:        ADMIN-001 / admin123
 * Coordinator:  COORD-001 / coord123
 * Faculty 1:    FACULTY-001 / faculty123
 * Faculty 2:    FACULTY-002 / faculty123
 * 
 * =============================================================================
 * TESTING EXAMPLES
 * =============================================================================
 * 
 * 1. LOGIN (Get JWT Token)
 * ------------------------
 * curl -X POST http://localhost:3000/api/auth/login \
 *   -H "Content-Type: application/json" \
 *   -d '{"userId": "COORD-001", "password": "coord123"}'
 * 
 * Save the token from the response for subsequent requests.
 * 
 * 2. GET TASKS (with filters)
 * ---------------------------
 * curl -X GET "http://localhost:3000/api/benchmark-tasks?assigned_user_id=FACULTY-001&cycle_id=2" \
 *   -H "Authorization: Bearer YOUR_TOKEN_HERE"
 * 
 * 3. CREATE TASK (Coordinator only)
 * ---------------------------------
 * curl -X POST http://localhost:3000/api/benchmark-tasks \
 *   -H "Authorization: Bearer YOUR_TOKEN_HERE" \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "accreditationBenchmarkId": 103,
 *     "assignedUserId": "FACULTY-001",
 *     "cycleId": 2,
 *     "dueDate": "2025-05-31"
 *   }'
 * 
 * 4. SUBMIT TASK (Faculty only)
 * -----------------------------
 * curl -X POST http://localhost:3000/api/benchmark-tasks/1/submit \
 *   -H "Authorization: Bearer YOUR_TOKEN_HERE" \
 *   -F "file=@/path/to/your/document.pdf"
 * 
 * 5. REVIEW TASK (Coordinator only)
 * ---------------------------------
 * curl -X PATCH http://localhost:3000/api/benchmark-tasks/2/review \
 *   -H "Authorization: Bearer YOUR_TOKEN_HERE" \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "status": "approved",
 *     "comment": "Well done! All requirements met."
 *   }'
 * 
 * =============================================================================
 * POSTMAN TESTING
 * =============================================================================
 * 
 * 1. Import as Collection:
 *    - Create requests for each endpoint above
 *    - Use environment variables for token and base URL
 * 
 * 2. Setup:
 *    - Base URL: http://localhost:3000
 *    - Create environment variable: token
 * 
 * 3. Workflow:
 *    a. Login → Save token to environment
 *    b. Use {{token}} in Authorization headers for other requests
 *    c. Test different user roles by logging in as different users
 * 
 * =============================================================================
 */

const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/benchmark-tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AccrediTrack API Server',
    version: '1.0.0',
    endpoints: {
      authentication: 'POST /api/auth/login',
      tasks: {
        list: 'GET /api/benchmark-tasks',
        create: 'POST /api/benchmark-tasks',
        submit: 'POST /api/benchmark-tasks/:taskId/submit',
        review: 'PATCH /api/benchmark-tasks/:taskId/review'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         AccrediTrack API Server - Running                  ║
╠════════════════════════════════════════════════════════════╣
║  Server:  http://localhost:${PORT}                            ║
║  Status:  Ready to accept requests                         ║    
╠════════════════════════════════════════════════════════════╣
║  API Documentation: See comments in accreditrack-server.js ║
╚════════════════════════════════════════════════════════════╝
  `);
  
  // Security warning if using default JWT secret
  if (!process.env.JWT_SECRET) {
    console.warn(`
⚠️  WARNING: Using default JWT secret key!
    This is acceptable for learning/development, but NEVER in production.
    Set JWT_SECRET environment variable for production:
    
    export JWT_SECRET="your-secure-random-secret-here"
    `);
  }
});

module.exports = app;
