import mongoose from "mongoose";

const PAGE_KEYS = [
  "home",
  "about",
  "events",
  "education",
  "sports",
  "team",
  "contact",
];

const pageContentSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      enum: PAGE_KEYS,
      immutable: true,
    },
    title: { type: String, required: true, trim: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    isPublished: { type: Boolean, default: true },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  },
  { timestamps: true }
);

pageContentSchema.index({ isPublished: 1, updatedAt: -1 });

const PageContent =
  mongoose.models.PageContent || mongoose.model("PageContent", pageContentSchema);

export { PAGE_KEYS };
export default PageContent;
