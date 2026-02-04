import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    capacity: { type: Number, default: 0 },
    ticketPrice: { type: Number, default: 0 },
    currency: { type: String, default: "INR", uppercase: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

eventSchema.index({ startsAt: 1 });
eventSchema.index({ isPublished: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
