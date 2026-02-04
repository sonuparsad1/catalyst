import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {
  createOrder,
  listPayments,
  listAdminPayments,
  listInvoices,
  downloadInvoice,
} from "../controllers/payments.controller.js";

const router = Router();

router.post("/orders", authMiddleware, createOrder);
router.get("/", authMiddleware, listPayments);
router.get("/admin", authMiddleware, roleMiddleware("admin"), listAdminPayments);
router.get("/invoices", authMiddleware, listInvoices);
router.get("/invoices/:id/pdf", authMiddleware, downloadInvoice);

export default router;
