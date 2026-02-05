import { Router } from "express";
import {
  createSection,
  deleteSection,
  listSections,
  updateSection,
} from "../controllers/sections.controller.js";

const router = Router();

router.get("/", listSections);
router.post("/", createSection);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);

export default router;
