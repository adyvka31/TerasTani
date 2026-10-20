/**
 * Authentication Input Validation Schemas
 * Validates, trims, and sanitizes registration and login payloads
 */

function validateRegister(data = {}) {
  const errors = [];
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const password = typeof data.password === 'string' ? data.password : '';
  const role = typeof data.role === 'string' && ['user', 'distributor', 'admin'].includes(data.role)
    ? data.role
    : 'user';

  if (!name || name.length < 2) {
    errors.push('Nama lengkap harus diisi minimal 2 karakter.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Format alamat email tidak valid.');
  }

  if (!password || password.length < 6) {
    errors.push('Kata sandi harus minimal 6 karakter.');
  }

  return {
    errors,
    sanitizedData: { name, email, password, role },
  };
}

function validateLogin(data = {}) {
  const errors = [];
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const password = typeof data.password === 'string' ? data.password : '';

  if (!email) {
    errors.push('Alamat email wajib diisi.');
  }

  if (!password) {
    errors.push('Kata sandi wajib diisi.');
  }

  return {
    errors,
    sanitizedData: { email, password },
  };
}

module.exports = {
  validateRegister,
  validateLogin,
};
