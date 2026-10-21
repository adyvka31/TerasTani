/**
 * Core React Context definition for Authentication
 * Kept in a standalone file to comply with React Fast Refresh requirements
 */
import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
});

export default AuthContext;
