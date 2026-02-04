import { ServiceState, getServiceState } from "../config/serviceState.js";
import Event from "../models/Event.model.js";
import AppError from "../utils/appError.js";

const ensureDatabaseEnabled = () => {
  if (getServiceState() !== ServiceState.READY) {
    throw new AppError("Service temporarily unavailable", 503, "DB_DISABLED");
  }
};

const toEventResponse = (event) => ({
  id: event.id,
  title: event.title,
  description: event.description,
  category: event.category,
  date: event.date,
  time: event.time,
  venue: event.venue,
  price: event.price,
  totalSeats: event.totalSeats,
  seatsAvailable: event.seatsAvailable,
  status: event.status,
  createdBy: event.createdBy,
  createdAt: event.createdAt,
});

const listEvents = async ({ includeAll = false } = {}) => {
  ensureDatabaseEnabled();
  const filter = includeAll ? {} : { status: "PUBLISHED" };
  const events = await Event.find(filter).sort({ date: 1, time: 1 });
  return events.map(toEventResponse);
};

const getEventById = async (eventId, { includeUnpublished = false } = {}) => {
  ensureDatabaseEnabled();
  const event = await Event.findById(eventId);
  if (!event || (!includeUnpublished && event.status !== "PUBLISHED")) {
    throw new AppError("Event not found", 404, "EVENT_NOT_FOUND");
  }

  return toEventResponse(event);
};

const createEvent = async (payload, userId) => {
  ensureDatabaseEnabled();
  const {
    title,
    description,
    category,
    date,
    time,
    venue,
    price,
    totalSeats,
    status,
  } = payload;

  if (!title || !description || !category || !date || !time || !venue) {
    throw new AppError("Invalid event data", 400, "VALIDATION_ERROR");
  }

  const event = await Event.create({
    title: title.trim(),
    description: description.trim(),
    category,
    date,
    time,
    venue: venue.trim(),
    price: Number(price) || 0,
    totalSeats: Number(totalSeats) || 0,
    seatsAvailable: Number(totalSeats) || 0,
    createdBy: userId,
    status: status || "DRAFT",
  });

  return toEventResponse(event);
};

const updateEvent = async (eventId, payload) => {
  ensureDatabaseEnabled();
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError("Event not found", 404, "EVENT_NOT_FOUND");
  }

  const updates = { ...payload };

  if (updates.title) {
    updates.title = updates.title.trim();
  }

  if (updates.description) {
    updates.description = updates.description.trim();
  }

  if (updates.venue) {
    updates.venue = updates.venue.trim();
  }

  if (updates.totalSeats !== undefined) {
    const newTotalSeats = Number(updates.totalSeats);
    if (Number.isNaN(newTotalSeats) || newTotalSeats < 0) {
      throw new AppError("Invalid seat count", 400, "VALIDATION_ERROR");
    }
    const soldSeats = event.totalSeats - event.seatsAvailable;
    if (newTotalSeats < soldSeats) {
      throw new AppError("Total seats below sold count", 400, "SEATS_INVALID");
    }
    updates.totalSeats = newTotalSeats;
    updates.seatsAvailable = newTotalSeats - soldSeats;
  }

  if (updates.price !== undefined) {
    updates.price = Number(updates.price);
  }

  Object.assign(event, updates);
  await event.save();

  return toEventResponse(event);
};

const deleteEvent = async (eventId) => {
  ensureDatabaseEnabled();
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError("Event not found", 404, "EVENT_NOT_FOUND");
  }
  await event.deleteOne();
};

export { createEvent, deleteEvent, getEventById, listEvents, updateEvent };
