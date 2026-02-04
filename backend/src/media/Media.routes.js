import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import Media from "./Media.model.js";

const router = Router();

router.use(authMiddleware, roleMiddleware("admin"));

router.get("/", async (_req, res, next) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json({ message: "Media fetched", code: "MEDIA_FETCHED", data: media });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const media = await Media.create({ ...req.body, uploadedBy: req.user?.id });
    res.status(201).json({ message: "Media created", code: "MEDIA_CREATED", data: media });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!media) {
      return res.status(404).json({ message: "Media not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Media updated", code: "MEDIA_UPDATED", data: media });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Media deleted", code: "MEDIA_DELETED" });
  } catch (error) {
    return next(error);
  }
});

export default router;
