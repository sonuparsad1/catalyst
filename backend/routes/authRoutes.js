import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { message: "Invalid credentials" },
});

const normalizeEmail = (email) => email.trim().toLowerCase();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Unable to register" });
    }

    const existing = await User.findOne({ email: normalizeEmail(email) });
    if (existing) {
      return res.status(400).json({ message: "Unable to register" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({
      name: name.trim(),
      email: normalizeEmail(email),
      passwordHash,
    });

    return res.status(201).json({ message: "Registration successful" });
  })
);

router.post(
  "/login",
  loginLimiter,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ email: normalizeEmail(email) });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "20m" }
    );

    return res.json({ token });
  })
);

router.get(
  "/me",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select(
      "_id name email role"
    );
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  })
);

router.post("/logout", (_req, res) => {
  res.json({ message: "Logged out" });
});

export default router;
