import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import User from "../models/User.js";

const ensureDatabaseEnabled = () => {
  if (!env.useDb) {
    const error = new Error("Service unavailable");
    error.status = 503;
    throw error;
  }
};

const normalizeEmail = (email) => email.trim().toLowerCase();

const registerUser = async ({ name, email, password }) => {
  ensureDatabaseEnabled();

  if (!name || !email || !password) {
    const error = new Error("Unable to register");
    error.status = 400;
    throw error;
  }

  const normalizedEmail = normalizeEmail(email);
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    const error = new Error("Unable to register");
    error.status = 400;
    throw error;
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
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const user = await User.findOne({ email: normalizeEmail(email) });
  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  if (!env.jwtSecret) {
    const error = new Error("Service unavailable");
    error.status = 503;
    throw error;
  }

  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return { token };
};

const getProfile = async (userId) => {
  ensureDatabaseEnabled();

  const user = await User.findById(userId).select("_id name email role");
  if (!user) {
    const error = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export { getProfile, loginUser, registerUser };
