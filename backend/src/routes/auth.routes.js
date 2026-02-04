import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  login,
  logout,
  me,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import dbGuard from "../middleware/dbGuard.middleware.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests", code: "RATE_LIMITED" },
});

router.use(authLimiter);
router.use(dbGuard);

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/me", authMiddleware, me);
router.post("/logout", logout);

export default router;
