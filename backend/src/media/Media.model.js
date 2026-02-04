import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    altText: { type: String, trim: true },
    contentType: { type: String, trim: true },
    size: { type: Number, min: 0 },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

mediaSchema.index({ createdAt: -1 });

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);

export default Media;
