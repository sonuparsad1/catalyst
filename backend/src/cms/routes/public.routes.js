import { Router } from "express";
import { getCorePageByKey, getPublishedPage } from "../controllers/pages.controller.js";
import { listPublicMenus } from "../controllers/menu.controller.js";
import { getSettings } from "../controllers/settings.controller.js";

const router = Router();

router.get("/pages/:slug", getPublishedPage);
router.get("/core-pages/:pageKey", getCorePageByKey);
router.get("/menu", listPublicMenus);
router.get("/settings", getSettings);

export default router;
