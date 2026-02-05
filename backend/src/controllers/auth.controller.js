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
        .json({
          message: "Unable to register",
          code: "VALIDATION_ERROR",
          status: 400,
        });
    }

    const normalizedEmail = normalizeEmail(email);
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Unable to register", code: "EMAIL_IN_USE", status: 400 });
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
        .json({
          message: "Invalid credentials",
          code: "INVALID_CREDENTIALS",
          status: 401,
        });
    }

    const user = await User.findOne({ email: normalizeEmail(email) });
    if (!user) {
      return res
        .status(401)
        .json({
          message: "Invalid credentials",
          code: "INVALID_CREDENTIALS",
          status: 401,
        });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(401)
        .json({
          message: "Invalid credentials",
          code: "INVALID_CREDENTIALS",
          status: 401,
        });
    }

    const token = signAccessToken({
      sub: user.id,
      role: user.role,
      ver: user.tokenVersion,
    });
    const refreshToken = signRefreshToken({
      sub: user.id,
      role: user.role,
      ver: user.tokenVersion,
    });

    setAuthCookie(res, token);

    return res.json(refreshToken ? { token, refreshToken } : { token });
  } catch (error) {
    return next(error);
  }
};

const me = async (req, res) =>
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { tokenVersion: 1 },
    });
    clearAuthCookie(res);
    res.json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    if (!env.enableRefreshTokens) {
      return res
        .status(400)
        .json({ message: "Refresh disabled", code: "REFRESH_DISABLED", status: 400 });
    }

    const refreshToken = req.body?.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({
          message: "Invalid refresh token",
          code: "INVALID_REFRESH",
          status: 401,
        });
    }

    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.sub).select("_id role tokenVersion");
    if (!user || user.tokenVersion !== payload.ver) {
      return res
        .status(401)
        .json({
          message: "Invalid refresh token",
          code: "INVALID_REFRESH",
          status: 401,
        });
    }

    const token = signAccessToken({
      sub: user.id,
      role: user.role,
      ver: user.tokenVersion,
    });
    setAuthCookie(res, token);

    return res.json({ token });
  } catch (error) {
    return next(error);
  }
};

export { login, logout, me, refresh, register };
