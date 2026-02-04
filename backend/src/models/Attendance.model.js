import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    scannedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    scannedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

attendanceSchema.index({ eventId: 1, ticketId: 1 }, { unique: true });

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;
