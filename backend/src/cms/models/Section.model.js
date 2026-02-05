import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    pageId: { type: mongoose.Schema.Types.ObjectId, ref: "Page" },
    pageContentId: { type: mongoose.Schema.Types.ObjectId, ref: "PageContent" },
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

sectionSchema.pre("validate", function validatePageLinks(next) {
  if (!this.pageId && !this.pageContentId) {
    next(new Error("Section must reference either pageId or pageContentId."));
    return;
  }
  next();
});

sectionSchema.index({ pageId: 1, order: 1 });
sectionSchema.index({ pageContentId: 1, order: 1 });

const Section =
  mongoose.models.Section || mongoose.model("Section", sectionSchema);

export default Section;
