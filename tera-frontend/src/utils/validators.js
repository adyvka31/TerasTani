/**
 * Form Validation & Strength Utilities
 */

/**
 * Calculate password security score from 0 to 4
 * @param {string} password
 * @returns {number}
 */
export function getPasswordStrength(password = '') {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export const STRENGTH_LABELS = ['Belum diisi', 'Cukup Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'];
export const STRENGTH_COLORS = ['bg-graphite/20', 'bg-red-500', 'bg-ochre-500', 'bg-leaf-400', 'bg-leaf-500'];

/**
 * Validate email address format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
