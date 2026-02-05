import { Router } from "express";
import {
  attachSection,
  createPage,
  deletePage,
  getPage,
  listPages,
  updatePage,
} from "../controllers/pages.controller.js";

const router = Router();

router.get("/", listPages);
router.get("/:id", getPage);
router.post("/", createPage);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);
router.post("/attach", attachSection);

export default router;
