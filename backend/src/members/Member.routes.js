import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {
  createMember,
  createRole,
  deleteMember,
  deleteRole,
  listMembers,
  listRoles,
  updateMember,
  updateRole,
} from "./Member.controller.js";

const router = Router();

router.use(authMiddleware, roleMiddleware("admin"));

router.get("/", listMembers);
router.post("/", createMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

router.get("/roles", listRoles);
router.post("/roles", createRole);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);

export default router;
