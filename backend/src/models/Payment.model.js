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

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, uppercase: true },
    provider: { type: String, enum: ["stripe"], default: "stripe" },
    status: {
      type: String,
      enum: ["created", "pending", "succeeded", "failed", "refunded"],
      default: "created",
    },
    providerPaymentIntentId: { type: String },
    providerChargeId: { type: String },
    idempotencyKey: { type: String },
    webhookEvents: { type: [String], default: [] },
    auditLog: { type: [auditSchema], default: [] },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

paymentSchema.index({ providerPaymentIntentId: 1 }, { unique: true, sparse: true });
paymentSchema.index({ idempotencyKey: 1 }, { unique: true, sparse: true });
paymentSchema.index({ user: 1, createdAt: -1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
