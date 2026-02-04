import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "ALUMNI"],
      default: "ACTIVE",
    },
    joinedAt: { type: Date, default: Date.now },
    profile: {
      bio: { type: String, trim: true },
      avatarUrl: { type: String, trim: true },
      graduationYear: { type: String, trim: true },
      major: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

memberSchema.index({ email: 1 });
memberSchema.index({ status: 1, joinedAt: -1 });

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;
