import env from "../config/env.js";
import User from "../models/User.model.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

const setAuthCookie = (res, token) => {
  const secure = env.cookieSecure || env.nodeEnv === "production";
  const options = {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    maxAge: 1000 * 60 * 60,
  };

  if (env.cookieDomain) {
    options.domain = env.cookieDomain;
  }

  res.cookie(env.cookieName, token, options);
};

const clearAuthCookie = (res) => {
  const secure = env.cookieSecure || env.nodeEnv === "production";
  const options = {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
  };

  if (env.cookieDomain) {
    options.domain = env.cookieDomain;
  }

  res.clearCookie(env.cookieName, options);
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Unable to register", code: "VALIDATION_ERROR" });
    }

    const normalizedEmail = normalizeEmail(email);
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Unable to register", code: "EMAIL_IN_USE" });
    }

    const passwordHash = await hashPassword(password);
    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", code: "INVALID_CREDENTIALS" });
    }

    const user = await User.findOne({ email: normalizeEmail(email) });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", code: "INVALID_CREDENTIALS" });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", code: "INVALID_CREDENTIALS" });
    }

    const token = signAccessToken({ id: user.id, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id, role: user.role });

    setAuthCookie(res, token);

    return res.json(refreshToken ? { token, refreshToken } : { token });
  } catch (error) {
    return next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("_id name email role");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized", code: "UNAUTHORIZED" });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return next(error);
  }
};

const logout = (_req, res) => {
  clearAuthCookie(res);
  res.json({ message: "Logged out" });
};

const refresh = async (req, res, next) => {
  try {
    if (!env.enableRefreshTokens) {
      return res
        .status(400)
        .json({ message: "Refresh disabled", code: "REFRESH_DISABLED" });
    }

    const refreshToken = req.body?.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token", code: "INVALID_REFRESH" });
    }

    const payload = verifyRefreshToken(refreshToken);
    const token = signAccessToken({ id: payload.id, role: payload.role });
    setAuthCookie(res, token);

    return res.json({ token });
  } catch (error) {
    return next(error);
  }
};

export { login, logout, me, refresh, register };
