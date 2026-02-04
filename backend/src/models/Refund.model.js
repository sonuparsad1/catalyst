import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    actor: { type: String },
    metadata: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const refundSchema = new mongoose.Schema(
  {
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, uppercase: true },
    status: {
      type: String,
      enum: ["requested", "processing", "succeeded", "failed"],
      default: "requested",
    },
    reason: { type: String, trim: true },
    providerRefundId: { type: String },
    requestedAt: { type: Date, default: Date.now },
    processedAt: { type: Date },
    auditLog: { type: [auditSchema], default: [] },
  },
  { timestamps: true }
);

refundSchema.index({ payment: 1 });
refundSchema.index({ user: 1, requestedAt: -1 });

const Refund = mongoose.model("Refund", refundSchema);

export default Refund;
