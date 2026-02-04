import crypto from "crypto";
import Event from "../models/Event.model.js";
import Ticket from "../models/Ticket.model.js";
import AppError from "../utils/appError.js";
import env from "../config/env.js";
import { createQrData } from "./qr.service.js";

const ensureDatabaseEnabled = () => {
  if (!env.useDb) {
    throw new AppError("Database not enabled", 503, "DB_DISABLED");
  }
};

const generateTicketCode = () => crypto.randomBytes(16).toString("hex");

const toTicketResponse = (ticket, event) => ({
  id: ticket.id,
  eventId: ticket.eventId,
  userId: ticket.userId,
  ticketCode: ticket.ticketCode,
  qrData: ticket.qrData,
  status: ticket.status,
  purchasedAt: ticket.purchasedAt,
  usedAt: ticket.usedAt,
  event: event
    ? {
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        venue: event.venue,
      }
    : undefined,
});

const registerTicket = async (userId, eventId) => {
  ensureDatabaseEnabled();

  const existing = await Ticket.findOne({ userId, eventId });
  if (existing) {
    throw new AppError("Ticket already exists", 409, "TICKET_EXISTS");
  }

  const event = await Event.findById(eventId);
  if (!event || event.status !== "PUBLISHED") {
    throw new AppError("Event not found", 404, "EVENT_NOT_FOUND");
  }

  if (event.price > 0) {
    return {
      requiresPayment: true,
      amount: event.price,
      eventId: event.id,
    };
  }

  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId, seatsAvailable: { $gt: 0 }, status: "PUBLISHED" },
    { $inc: { seatsAvailable: -1 } },
    { new: true }
  );

  if (!updatedEvent) {
    throw new AppError("No seats available", 409, "EVENT_FULL");
  }

  const ticketCode = generateTicketCode();
  const { encoded } = createQrData("pending", eventId);

  let ticket;
  try {
    ticket = await Ticket.create({
      eventId,
      userId,
      ticketCode,
      qrData: encoded,
      status: "VALID",
      purchasedAt: new Date(),
    });
  } catch (error) {
    await Event.findByIdAndUpdate(eventId, { $inc: { seatsAvailable: 1 } });
    if (error?.code === 11000) {
      throw new AppError("Ticket already exists", 409, "TICKET_EXISTS");
    }
    throw error;
  }

  const { encoded: finalized } = createQrData(ticket.id, eventId);
  ticket.qrData = finalized;
  await ticket.save();

  return toTicketResponse(ticket, updatedEvent);
};

const listTicketsForUser = async (userId) => {
  ensureDatabaseEnabled();
  const tickets = await Ticket.find({ userId })
    .populate("eventId", "title date time venue")
    .sort({ purchasedAt: -1 });

  return tickets.map((ticket) =>
    toTicketResponse(ticket, ticket.eventId)
  );
};

const listTicketsForEvent = async (eventId) => {
  ensureDatabaseEnabled();
  const tickets = await Ticket.find({ eventId })
    .populate("userId", "name email")
    .sort({ purchasedAt: -1 });

  return tickets.map((ticket) => ({
    id: ticket.id,
    status: ticket.status,
    ticketCode: ticket.ticketCode,
    user: ticket.userId
      ? {
          id: ticket.userId.id,
          name: ticket.userId.name,
          email: ticket.userId.email,
        }
      : null,
    purchasedAt: ticket.purchasedAt,
    usedAt: ticket.usedAt,
  }));
};

export { listTicketsForEvent, listTicketsForUser, registerTicket };
