import { Router } from "express";
import rateLimit from "express-rate-limit";
import { scan } from "../controllers/scan.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import env from "../config/env.js";

const router = Router();

const scanLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: Math.max(10, Math.floor(env.rateLimitMax / 2)),
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many scan attempts", code: "SCAN_RATE_LIMITED" },
});

router.post("/", authMiddleware, roleMiddleware("admin"), scanLimiter, scan);

export default router;
