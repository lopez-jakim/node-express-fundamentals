/**
 * Task Routes
 * Handles all benchmark task operations including CRUD, submission, and review
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { cycleExists } = require('../data/cycles');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  createArtifact,
  getArtifactsByTaskId
} = require('../data/tasks');

/**
 * GET /api/benchmark-tasks
 * Get all tasks with optional filters
 * Requires: Authentication
 */
router.get('/', authenticateToken, (req, res) => {
  try {
    const filters = {
      assigned_user_id: req.query.assigned_user_id,
      cycle_id: req.query.cycle_id
    };
    
    const tasks = getAllTasks(filters);
    
    res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * POST /api/benchmark-tasks
 * Create a new task
 * Requires: Authentication + coordinator/admin role
 */
router.post('/', authenticateToken, requireRole('coordinator', 'admin'), (req, res) => {
  try {
    const { accreditationBenchmarkId, assignedUserId, cycleId, dueDate } = req.body;
    
    // Validate required fields
    if (!accreditationBenchmarkId || !assignedUserId || !cycleId || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: accreditationBenchmarkId, assignedUserId, cycleId, dueDate'
      });
    }
    
    // Validate cycle exists
    if (!cycleExists(cycleId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cycle ID'
      });
    }
    
    // Create task
    const newTask = createTask({
      accreditationBenchmarkId,
      assignedUserId,
      cycleId,
      dueDate
    });
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * POST /api/benchmark-tasks/:taskId/submit
 * Submit a task with PDF artifact
 * Requires: Authentication + faculty role
 */
router.post('/:taskId/submit', authenticateToken, requireRole('faculty'), upload.single('file'), (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    
    // Validate task exists
    const task = getTaskById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Validate file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'PDF file is required'
      });
    }
    
    // Create artifact record
    const artifact = createArtifact({
      taskId: taskId,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size
    });
    
    // Update task status
    const updatedTask = updateTask(taskId, {
      status: 'submitted',
      uploadedAt: new Date().toISOString()
    });
    
    res.status(200).json({
      success: true,
      message: 'Task submitted successfully',
      data: {
        task: updatedTask,
        artifact: artifact
      }
    });
  } catch (error) {
    console.error('Submit task error:', error);
    
    // Handle multer errors
    if (error.message === 'Only PDF files are allowed') {
      return res.status(400).json({
        success: false,
        message: 'Only PDF files are allowed'
      });
    }
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 10MB limit'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * PATCH /api/benchmark-tasks/:taskId/review
 * Review a submitted task
 * Requires: Authentication + coordinator/admin role
 */
router.patch('/:taskId/review', authenticateToken, requireRole('coordinator', 'admin'), (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const { status, comment } = req.body;
    
    // Validate task exists
    const task = getTaskById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Validate task is in submitted status
    if (task.status !== 'submitted') {
      return res.status(400).json({
        success: false,
        message: 'Can only review tasks with status "submitted"'
      });
    }
    
    // Validate required fields
    if (!status || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Status and comment are required'
      });
    }
    
    // Validate status value
    if (status !== 'approved' && status !== 'for_revision') {
      return res.status(400).json({
        success: false,
        message: 'Status must be either "approved" or "for_revision"'
      });
    }
    
    // Update task with review
    const updatedTask = updateTask(taskId, {
      status: status,
      coordinatorComment: comment,
      reviewedAt: new Date().toISOString()
    });
    
    res.status(200).json({
      success: true,
      message: 'Task reviewed successfully',
      data: updatedTask
    });
  } catch (error) {
    console.error('Review task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
