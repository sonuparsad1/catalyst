import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import AppError from "../utils/appError.js";
import env from "../config/env.js";

const ensureDatabaseEnabled = () => {
  if (!env.useDb) {
    throw new AppError("Database not enabled", 503, "DB_DISABLED");
  }
};

const registerForEvent = async (userId, eventId) => {
  ensureDatabaseEnabled();

  const event = await Event.findById(eventId);
  if (!event || !event.isPublished) {
    throw new AppError("Event not found", 404, "EVENT_NOT_FOUND");
  }

  if (event.ticketPrice > 0) {
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
    .populate("event", "title startsAt endsAt location ticketPrice currency")
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
          startsAt: registration.event.startsAt,
          endsAt: registration.event.endsAt,
          location: registration.event.location,
          ticketPrice: registration.event.ticketPrice,
          currency: registration.event.currency,
        }
      : null,
  }));
};

export { listRegistrationsForUser, registerForEvent };
