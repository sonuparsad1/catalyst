import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import {
  login as loginRequest,
  logout as logoutRequest,
  me,
  register as registerRequest,
} from "../api/auth.js";
import { AuthStates, isAuthenticatedState } from "./authState.js";

const AuthContext = createContext(null);

const getErrorState = (error) => {
  if (error?.code === "DB_DISABLED") {
    return AuthStates.DB_DISABLED;
  }
  if (error?.status === 401 || error?.code === "UNAUTHORIZED") {
    return AuthStates.UNAUTHENTICATED;
  }
  return AuthStates.ERROR;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(AuthStates.UNKNOWN);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  const loadProfile = useCallback(async () => {
    try {
      const data = await me();
      setUser(data);
      setAuthState(AuthStates.AUTHENTICATED);
      setAuthError("");
    } catch (error) {
      setUser(null);
      setAuthState(getErrorState(error));
      setAuthError(error?.message || "Unable to load session");
    }
  }, []);

  useEffect(() => {
    if (authState === AuthStates.UNKNOWN) {
      loadProfile();
    }
  }, [authState, loadProfile]);

  const login = useCallback(
    async (email, password) => {
      setAuthError("");
      try {
        await loginRequest({ email, password });
        await loadProfile();
      } catch (error) {
        setAuthState(getErrorState(error));
        setAuthError(error?.message || "Unable to sign in");
        throw error;
      }
    },
    [loadProfile]
  );

  const register = useCallback(async (name, email, password) => {
    setAuthError("");
    try {
      return await registerRequest({ name, email, password });
    } catch (error) {
      setAuthState(getErrorState(error));
      setAuthError(error?.message || "Unable to register");
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthError("");
    try {
      await logoutRequest();
      setAuthState(AuthStates.UNAUTHENTICATED);
    } catch (error) {
      setAuthState(getErrorState(error));
      setAuthError(error?.message || "Unable to sign out");
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      authState,
      authError,
      login,
      register,
      logout,
      isAuthenticated: isAuthenticatedState(authState),
    }),
    [user, authState, authError, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
