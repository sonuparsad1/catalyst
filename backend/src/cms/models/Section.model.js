import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    pageId: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
    type: {
      type: String,
      required: true,
      enum: ["hero", "text", "image", "grid", "stats", "cta"],
    },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

sectionSchema.index({ pageId: 1, order: 1 });

const Section =
  mongoose.models.Section || mongoose.model("Section", sectionSchema);

export default Section;
