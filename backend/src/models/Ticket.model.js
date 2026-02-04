import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ticketCode: { type: String, required: true, unique: true },
    qrData: { type: String, required: true },
    status: {
      type: String,
      enum: ["VALID", "USED", "CANCELLED"],
      default: "VALID",
    },
    purchasedAt: { type: Date, default: Date.now },
    usedAt: { type: Date },
  },
  { timestamps: true }
);

ticketSchema.index({ eventId: 1, userId: 1 }, { unique: true });

ticketSchema.index({ status: 1 });

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
