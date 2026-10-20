/**
 * UI Display Formatters
 */

/**
 * Format number into Indonesian Rupiah (IDR)
 * @param {number} amount
 * @returns {string}
 */
export function formatIDR(amount) {
  if (typeof amount !== 'number') return 'Rp 0';
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

/**
 * Format weight in kilograms
 * @param {number|string} kg
 * @returns {string}
 */
export function formatWeight(kg) {
  const num = typeof kg === 'number' ? kg : parseFloat(kg) || 0;
  return `${num.toLocaleString('id-ID')} kg`;
}

/**
 * Format timestamp into Indonesian date string
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
