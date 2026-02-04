import { request } from "./client.js";

const login = (credentials) =>
  request({ path: "/auth/login", method: "POST", body: credentials });

const register = (payload) =>
  request({ path: "/auth/register", method: "POST", body: payload });

const me = (token) => request({ path: "/auth/me", token });

const logout = (token) => request({ path: "/auth/logout", method: "POST", token });

export { login, logout, me, register };
