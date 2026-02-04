import { Router } from "express";
import { sendSuccess } from "../utils/response.util.js";

const router = Router();

router.get("/", (_req, res) => {
  sendSuccess(res, { name: "Catalyst Society API", status: "running" });
});

router.get("/health", (_req, res) => {
  sendSuccess(res, { status: "OK" });
});

export default router;
