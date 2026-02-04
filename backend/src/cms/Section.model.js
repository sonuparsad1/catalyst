import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    isReusable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

sectionSchema.index({ type: 1, order: 1 });

const Section =
  mongoose.models.Section || mongoose.model("Section", sectionSchema);

export default Section;
