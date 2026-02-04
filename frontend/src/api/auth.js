import { request } from "./client.js";

const login = (credentials) =>
  request({ path: "/api/v1/auth/login", method: "POST", body: credentials });

const register = (payload) =>
  request({ path: "/api/v1/auth/register", method: "POST", body: payload });

const me = () => request({ path: "/api/v1/auth/me" });

const logout = () => request({ path: "/api/v1/auth/logout", method: "POST" });

export { login, logout, me, register };
