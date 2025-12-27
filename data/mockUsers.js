/**
 * Mock Users Data
 * Provides hardcoded user data for authentication without a database
 */

const mockUsers = [
  {
    userId: 'ADMIN-001',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    userId: 'COORD-001',
    password: 'coord123',
    role: 'coordinator',
    name: 'Coordinator User'
  },
  {
    userId: 'FACULTY-001',
    password: 'faculty123',
    role: 'faculty',
    name: 'Faculty Member 1'
  },
  {
    userId: 'FACULTY-002',
    password: 'faculty123',
    role: 'faculty',
    name: 'Faculty Member 2'
  }
];

/**
 * Find a user by userId and password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {object|null} User object without password or null if not found
 */
function authenticateUser(userId, password) {
  const user = mockUsers.find(u => u.userId === userId && u.password === password);
  
  if (user) {
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
}

/**
 * Find a user by userId only (for token validation)
 * @param {string} userId - User ID
 * @returns {object|null} User object without password or null if not found
 */
function findUserById(userId) {
  const user = mockUsers.find(u => u.userId === userId);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
}

module.exports = {
  mockUsers,
  authenticateUser,
  findUserById
};
