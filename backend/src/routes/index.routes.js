import { Router } from "express";
import { getServiceSnapshot } from "../config/serviceState.js";
import { sendSuccess } from "../utils/response.util.js";

const router = Router();

router.get("/", (_req, res) => {
  sendSuccess(res, { name: "Catalyst Society API", status: "running" });
});

router.get("/health", (_req, res) => {
  sendSuccess(res, { status: "OK", service: getServiceSnapshot() });
});

export default router;
