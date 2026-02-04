import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["education", "sports", "general"],
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    totalSeats: { type: Number, required: true, min: 0 },
    seatsAvailable: { type: Number, required: true, min: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CLOSED"],
      default: "DRAFT",
    },
  },
  { timestamps: true }
);

eventSchema.index({ status: 1, date: 1 });

eventSchema.pre("validate", function updateSeatsAvailable(next) {
  if (this.isNew) {
    this.seatsAvailable = this.totalSeats;
  }
  next();
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
