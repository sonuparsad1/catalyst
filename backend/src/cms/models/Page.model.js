import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      set: (value) => (value ? value.replace(/^\/+/, "") : value),
    },
    title: { type: String, required: true, trim: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    isPublished: { type: Boolean, default: false },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  },
  { timestamps: true }
);

pageSchema.index({ slug: 1 });
pageSchema.index({ isPublished: 1, updatedAt: -1 });

const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);

export default Page;
