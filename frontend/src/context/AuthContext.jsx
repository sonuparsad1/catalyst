import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import {
  login as loginRequest,
  logout as logoutRequest,
  me,
  register as registerRequest,
} from "../api/auth.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  const fetchProfile = useCallback(
    async (activeToken) => {
      try {
        const data = await me(activeToken);
        setUser(data);
      } catch (error) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
      setUser(null);
    }
  }, [fetchProfile, token]);

  const login = useCallback(async (email, password) => {
    const data = await loginRequest({ email, password });
    localStorage.setItem("authToken", data.token);
    setToken(data.token);
    await fetchProfile(data.token);
  }, [fetchProfile]);

  const register = useCallback(async (name, email, password) => {
    return registerRequest({ name, email, password });
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest(token);
    } finally {
      localStorage.removeItem("authToken");
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token && user),
    }),
    [token, user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
