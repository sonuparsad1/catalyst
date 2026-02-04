import Event from "../models/Event.js";
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
  if (!event || !event.isPublished) {
    throw new AppError("Event not found", 404, "EVENT_NOT_FOUND");
  }

  const registration = await Registration.create({
    user: userId,
    event: event.id,
  });

  return {
    id: registration.id,
    eventId: registration.event,
    status: registration.status,
  };
};

const listRegistrationsForUser = async (userId) => {
  ensureDatabaseEnabled();

  const registrations = await Registration.find({ user: userId })
    .populate("event", "title startsAt endsAt location")
    .sort({ createdAt: -1 });

  return registrations.map((registration) => ({
    id: registration.id,
    status: registration.status,
    event: registration.event
      ? {
          id: registration.event.id,
          title: registration.event.title,
          startsAt: registration.event.startsAt,
          endsAt: registration.event.endsAt,
          location: registration.event.location,
        }
      : null,
  }));
};

export { listRegistrationsForUser, registerForEvent };
