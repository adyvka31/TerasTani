/**
 * Async Handler Wrapper
 * Eliminates repetitive try-catch blocks in Express route controllers
 * @param {Function} fn
 * @returns {Function}
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
