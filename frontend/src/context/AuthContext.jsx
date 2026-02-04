import { createContext, useCallback, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = (token) =>
  token ? { Authorization: `Bearer ${token}` } : {};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  const fetchProfile = useCallback(
    async (activeToken) => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(activeToken),
          },
        });
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        const data = await response.json();
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
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    setToken(data.token);
    await fetchProfile(data.token);
  }, [fetchProfile]);

  const register = useCallback(async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error("Unable to register");
    }
    return response.json();
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(token),
        },
      });
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
