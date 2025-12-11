import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client';

/**
/ PUBLIC_INTERFACE
/ AuthContext provides user authentication state and actions.
/ Uses cookie-based session via backend endpoints:
/ - GET /auth/me to fetch current user from cookie
/ - POST /auth/login to login (sets cookie)
/ - POST /auth/register to create user
/ - POST /auth/logout to clear cookie
*/
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access authentication context. */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides authenticated user and actions across the app.
   * On mount, fetches /auth/me to set user if cookie session exists.
   */
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch (e) {
      setUser(null);
    } finally {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    await fetchMe();
    return data;
  }, [fetchMe]);

  const register = useCallback(async (email, password, name) => {
    const { data } = await api.post('/auth/register', { email, password, name });
    await fetchMe();
    return data;
  }, [fetchMe]);

  const logout = useCallback(async () => {
    await api.post('/auth/logout');
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    initializing,
    login,
    register,
    logout,
    refresh: fetchMe,
  }), [user, initializing, login, register, logout, fetchMe]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
