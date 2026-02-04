import bcrypt from "bcrypt";
import env from "../config/env.js";
import User from "../models/User.js";
import AppError from "../utils/appError.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./token.service.js";

const ensureDatabaseEnabled = () => {
  if (!env.useDb) {
    throw new AppError("Service unavailable", 503, "DB_DISABLED");
  }
};

const normalizeEmail = (email) => email.trim().toLowerCase();

const registerUser = async ({ name, email, password }) => {
  ensureDatabaseEnabled();

  if (!name || !email || !password) {
    throw new AppError("Unable to register", 400, "VALIDATION_ERROR");
  }

  const normalizedEmail = normalizeEmail(email);
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    throw new AppError("Unable to register", 400, "EMAIL_IN_USE");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
  });

  return { message: "Registration successful" };
};

const loginUser = async ({ email, password }) => {
  ensureDatabaseEnabled();

  if (!email || !password) {
    throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  }

  const user = await User.findOne({ email: normalizeEmail(email) });
  if (!user) {
    throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  }

  const token = signAccessToken({ id: user.id, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id, role: user.role });

  return refreshToken ? { token, refreshToken } : { token };
};

const getProfile = async (userId) => {
  ensureDatabaseEnabled();

  const user = await User.findById(userId).select("_id name email role");
  if (!user) {
    throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const refreshAccessToken = async (refreshToken) => {
  ensureDatabaseEnabled();

  if (!env.enableRefreshTokens) {
    throw new AppError("Refresh disabled", 400, "REFRESH_DISABLED");
  }

  if (!refreshToken) {
    throw new AppError("Invalid refresh token", 401, "INVALID_REFRESH");
  }

  const payload = verifyRefreshToken(refreshToken);
  const token = signAccessToken({ id: payload.id, role: payload.role });

  return { token };
};

export { getProfile, loginUser, refreshAccessToken, registerUser };
