import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, uppercase: true },
    status: { type: String, enum: ["issued", "refunded"], default: "issued" },
    invoiceNumber: { type: String, required: true, unique: true },
    issuedAt: { type: Date, default: Date.now },
    pdfBuffer: { type: Buffer },
    pdfMime: { type: String, default: "application/pdf" },
  },
  { timestamps: true }
);

invoiceSchema.index({ user: 1, issuedAt: -1 });

const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;
