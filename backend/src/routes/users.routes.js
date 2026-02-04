import { Router } from "express";
import { index, me } from "../controllers/users.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/me", me);
router.get("/", roleMiddleware("admin"), index);

export default router;
