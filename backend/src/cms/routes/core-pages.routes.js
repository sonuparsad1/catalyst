import { Router } from "express";
import {
  attachCoreSection,
  ensureCorePages,
  getCorePage,
  listCorePages,
  updateCorePage,
} from "../controllers/pages.controller.js";

const router = Router();

router.post("/ensure", ensureCorePages);
router.get("/", listCorePages);
router.get("/:id", getCorePage);
router.put("/:id", updateCorePage);
router.post("/attach", attachCoreSection);

export default router;
