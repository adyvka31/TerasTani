/**
 * Global Authentication Context Provider
 * Manages user session, token storage, and evaluator role switching
 */
import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants/storage.keys';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [isLoading] = useState(false);

  const login = useCallback((newToken, newUser) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  }, []);

  const switchRole = useCallback((newRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    setUser(updated);
  }, [user]);

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
