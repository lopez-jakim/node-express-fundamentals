/**
 * Tasks and Artifacts Data
 * In-memory storage for benchmark tasks and their artifacts
 */

// Task storage with auto-incrementing ID
let tasks = [
  {
    id: 1,
    accreditationBenchmarkId: 101,
    assignedUserId: 'FACULTY-001',
    cycleId: 2,
    dueDate: '2025-03-31',
    status: 'pending',
    createdAt: '2025-01-15T10:00:00Z',
    uploadedAt: null,
    reviewedAt: null,
    coordinatorComment: null
  },
  {
    id: 2,
    accreditationBenchmarkId: 102,
    assignedUserId: 'FACULTY-002',
    cycleId: 2,
    dueDate: '2025-04-15',
    status: 'submitted',
    createdAt: '2025-01-20T10:00:00Z',
    uploadedAt: '2025-02-10T14:30:00Z',
    reviewedAt: null,
    coordinatorComment: null
  }
];

// Artifact storage with auto-incrementing ID
let artifacts = [
  {
    id: 1,
    taskId: 2,
    fileName: 'artifact-1708441800000-abc123.pdf',
    originalName: 'submission-report.pdf',
    filePath: 'uploads/artifacts/artifact-1708441800000-abc123.pdf',
    fileSize: 245678,
    uploadedAt: '2025-02-10T14:30:00Z'
  }
];

let nextTaskId = 3;
let nextArtifactId = 2;

/**
 * Get all tasks with optional filters
 * @param {object} filters - Query filters
 * @returns {array} Array of task objects
 */
function getAllTasks(filters = {}) {
  let filteredTasks = [...tasks];
  
  if (filters.assigned_user_id) {
    filteredTasks = filteredTasks.filter(t => t.assignedUserId === filters.assigned_user_id);
  }
  
  if (filters.cycle_id) {
    const cycleId = parseInt(filters.cycle_id);
    filteredTasks = filteredTasks.filter(t => t.cycleId === cycleId);
  }
  
  return filteredTasks;
}

/**
 * Get a task by ID
 * @param {number} taskId - Task ID
 * @returns {object|null} Task object or null if not found
 */
function getTaskById(taskId) {
  return tasks.find(t => t.id === taskId) || null;
}

/**
 * Create a new task
 * @param {object} taskData - Task data
 * @returns {object} Created task
 */
function createTask(taskData) {
  const newTask = {
    id: nextTaskId++,
    accreditationBenchmarkId: taskData.accreditationBenchmarkId,
    assignedUserId: taskData.assignedUserId,
    cycleId: taskData.cycleId,
    dueDate: taskData.dueDate,
    status: 'pending',
    createdAt: new Date().toISOString(),
    uploadedAt: null,
    reviewedAt: null,
    coordinatorComment: null
  };
  
  tasks.push(newTask);
  return newTask;
}

/**
 * Update a task
 * @param {number} taskId - Task ID
 * @param {object} updates - Fields to update
 * @returns {object|null} Updated task or null if not found
 */
function updateTask(taskId, updates) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return null;
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  return tasks[taskIndex];
}

/**
 * Create a new artifact
 * @param {object} artifactData - Artifact data
 * @returns {object} Created artifact
 */
function createArtifact(artifactData) {
  const newArtifact = {
    id: nextArtifactId++,
    taskId: artifactData.taskId,
    fileName: artifactData.fileName,
    originalName: artifactData.originalName,
    filePath: artifactData.filePath,
    fileSize: artifactData.fileSize,
    uploadedAt: new Date().toISOString()
  };
  
  artifacts.push(newArtifact);
  return newArtifact;
}

/**
 * Get artifacts for a task
 * @param {number} taskId - Task ID
 * @returns {array} Array of artifact objects
 */
function getArtifactsByTaskId(taskId) {
  return artifacts.filter(a => a.taskId === taskId);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  createArtifact,
  getArtifactsByTaskId
};
