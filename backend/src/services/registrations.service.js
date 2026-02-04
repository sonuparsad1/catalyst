import Event from "../models/Event.model.js";
import Registration from "../models/Registration.js";
import { ServiceState, getServiceState } from "../config/serviceState.js";
import AppError from "../utils/appError.js";

const ensureDatabaseEnabled = () => {
  if (getServiceState() !== ServiceState.READY) {
    throw new AppError("Service temporarily unavailable", 503, "DB_DISABLED");
  }
};

const registerForEvent = async (userId, eventId) => {
  ensureDatabaseEnabled();

  const event = await Event.findById(eventId);
  if (!event || event.status !== "PUBLISHED") {
    throw new AppError("Event not found", 404, "EVENT_NOT_FOUND");
  }

  if (event.price > 0) {
    throw new AppError("Payment required", 402, "PAYMENT_REQUIRED");
  }

  const registration = await Registration.create({
    user: userId,
    event: event.id,
    status: "registered",
    paymentStatus: "waived",
    isActive: true,
  });

  return {
    id: registration.id,
    eventId: registration.event,
    status: registration.status,
    paymentStatus: registration.paymentStatus,
    isActive: registration.isActive,
  };
};

const listRegistrationsForUser = async (userId) => {
  ensureDatabaseEnabled();

  const registrations = await Registration.find({ user: userId })
    .populate("event", "title date time venue price")
    .sort({ createdAt: -1 });

  return registrations.map((registration) => ({
    id: registration.id,
    status: registration.status,
    paymentStatus: registration.paymentStatus,
    isActive: registration.isActive,
    event: registration.event
      ? {
          id: registration.event.id,
          title: registration.event.title,
          date: registration.event.date,
          time: registration.event.time,
          venue: registration.event.venue,
          price: registration.event.price,
        }
      : null,
  }));
};

export { listRegistrationsForUser, registerForEvent };
