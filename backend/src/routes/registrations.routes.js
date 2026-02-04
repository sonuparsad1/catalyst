import { Router } from "express";
import { create, index } from "../controllers/registrations.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/me", index);
router.post("/", create);

export default router;
