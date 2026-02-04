import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { dashboard } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/dashboard", authMiddleware, roleMiddleware("admin"), dashboard);

export default router;
