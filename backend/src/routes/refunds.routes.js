import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {
  createRefund,
  listRefunds,
  listRefundsAdmin,
  processRefundRequest,
} from "../controllers/refunds.controller.js";

const router = Router();

router.post("/", authMiddleware, createRefund);
router.get("/", authMiddleware, listRefunds);
router.get("/admin", authMiddleware, roleMiddleware("admin"), listRefundsAdmin);
router.post("/:id/process", authMiddleware, roleMiddleware("admin"), processRefundRequest);

export default router;
