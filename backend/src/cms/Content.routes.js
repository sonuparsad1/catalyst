import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {
  createMenu,
  createPage,
  createSection,
  deleteMenu,
  deletePage,
  deleteSection,
  getPage,
  getSiteSettings,
  listMenus,
  listPages,
  listSections,
  updateMenu,
  updatePage,
  updateSection,
  updateSiteSettings,
} from "./Content.controller.js";

const router = Router();

router.use(authMiddleware, roleMiddleware("admin"));

router.get("/pages", listPages);
router.get("/pages/:id", getPage);
router.post("/pages", createPage);
router.put("/pages/:id", updatePage);
router.delete("/pages/:id", deletePage);

router.get("/sections", listSections);
router.post("/sections", createSection);
router.put("/sections/:id", updateSection);
router.delete("/sections/:id", deleteSection);

router.get("/menus", listMenus);
router.post("/menus", createMenu);
router.put("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);

router.get("/settings", getSiteSettings);
router.put("/settings", updateSiteSettings);

export default router;
