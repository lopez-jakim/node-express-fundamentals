/**
 * Accreditation Cycles Data
 * Stores information about accreditation time periods
 */

const cycles = [
  {
    id: 1,
    name: '2024 Accreditation Cycle',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'completed'
  },
  {
    id: 2,
    name: '2025 Accreditation Cycle',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active'
  }
];

/**
 * Get all cycles
 * @returns {array} Array of cycle objects
 */
function getAllCycles() {
  return cycles;
}

/**
 * Get a cycle by ID
 * @param {number} cycleId - Cycle ID
 * @returns {object|null} Cycle object or null if not found
 */
function getCycleById(cycleId) {
  return cycles.find(c => c.id === cycleId) || null;
}

/**
 * Check if a cycle exists
 * @param {number} cycleId - Cycle ID
 * @returns {boolean} True if cycle exists, false otherwise
 */
function cycleExists(cycleId) {
  return cycles.some(c => c.id === cycleId);
}

module.exports = {
  getAllCycles,
  getCycleById,
  cycleExists
};
