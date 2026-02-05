import { Router } from "express";
import adminGuard from "../../admin/admin.guard.js";
import pagesRoutes from "./pages.routes.js";
import sectionsRoutes from "./sections.routes.js";
import menuRoutes from "./menu.routes.js";
import settingsRoutes from "./settings.routes.js";

const router = Router();

router.use(adminGuard);
router.use("/pages", pagesRoutes);
router.use("/sections", sectionsRoutes);
router.use("/menu", menuRoutes);
router.use("/settings", settingsRoutes);

export default router;
