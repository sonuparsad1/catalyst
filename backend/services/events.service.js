import Event from "../models/Event.js";
import AppError from "../utils/appError.js";
import env from "../config/env.js";

const ensureDatabaseEnabled = () => {
  if (!env.useDb) {
    throw new AppError("Service unavailable", 503, "DB_DISABLED");
  }
};

const listEvents = async () => {
  ensureDatabaseEnabled();
  const events = await Event.find({ isPublished: true }).sort({ startsAt: 1 });
  return events.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    capacity: event.capacity,
  }));
};

const getEventById = async (eventId) => {
  ensureDatabaseEnabled();
  const event = await Event.findById(eventId);
  if (!event || !event.isPublished) {
    throw new AppError("Event not found", 404, "EVENT_NOT_FOUND");
  }

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    capacity: event.capacity,
  };
};

const createEvent = async (payload, userId) => {
  ensureDatabaseEnabled();
  const { title, description, location, startsAt, endsAt, capacity } = payload;

  if (!title || !description || !location || !startsAt || !endsAt) {
    throw new AppError("Invalid event data", 400, "VALIDATION_ERROR");
  }

  const event = await Event.create({
    title: title.trim(),
    description: description.trim(),
    location: location.trim(),
    startsAt: new Date(startsAt),
    endsAt: new Date(endsAt),
    capacity: Number(capacity) || 0,
    createdBy: userId,
    isPublished: true,
  });

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    capacity: event.capacity,
  };
};

export { createEvent, getEventById, listEvents };
