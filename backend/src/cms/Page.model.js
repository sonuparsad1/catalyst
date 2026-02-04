import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      default: "DRAFT",
    },
    summary: { type: String, trim: true },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
    seo: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      imageUrl: { type: String, trim: true },
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

pageSchema.index({ slug: 1 });
pageSchema.index({ status: 1, updatedAt: -1 });

const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);

export default Page;
