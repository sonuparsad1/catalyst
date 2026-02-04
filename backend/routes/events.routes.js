import { Router } from "express";
import { create, index, show } from "../controllers/events.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", authMiddleware, roleMiddleware("admin"), create);

export default router;
