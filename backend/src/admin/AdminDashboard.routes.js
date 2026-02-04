import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { getDashboard } from "./AdminDashboard.controller.js";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("admin"), getDashboard);

export default router;
