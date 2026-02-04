import { Router } from "express";
import {
  adminIndex,
  index,
  register,
} from "../controllers/tickets.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.get("/", authMiddleware, index);
router.get(
  "/event/:eventId",
  authMiddleware,
  roleMiddleware("admin"),
  adminIndex
);
router.post("/register", authMiddleware, register);

export default router;
