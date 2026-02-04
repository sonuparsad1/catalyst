import { Router } from "express";
import {
  adminIndex,
  create,
  destroy,
  index,
  show,
  update,
} from "../controllers/events.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.get("/", index);
router.get("/admin", authMiddleware, roleMiddleware("admin"), adminIndex);
router.get("/:id", show);
router.post("/", authMiddleware, roleMiddleware("admin"), create);
router.put("/:id", authMiddleware, roleMiddleware("admin"), update);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), destroy);

export default router;
