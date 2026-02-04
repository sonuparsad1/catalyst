import {
  listTicketsForEvent,
  listTicketsForUser,
  registerTicket,
} from "../services/ticket.service.js";
import AppError from "../utils/appError.js";

const index = async (req, res, next) => {
  try {
    const result = await listTicketsForUser(req.user.id);
    res.json({ message: "Tickets fetched", code: "TICKETS_FETCHED", data: result });
  } catch (error) {
    next(error);
  }
};

const adminIndex = async (req, res, next) => {
  try {
    if (!req.params.eventId) {
      throw new AppError("Event id required", 400, "VALIDATION_ERROR");
    }
    const result = await listTicketsForEvent(req.params.eventId);
    res.json({
      message: "Event tickets fetched",
      code: "EVENT_TICKETS_FETCHED",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await registerTicket(req.user.id, req.body.eventId);
    if (result?.requiresPayment) {
      return res.status(202).json({
        message: "Payment required",
        code: "PAYMENT_REQUIRED",
        data: result,
      });
    }

    return res
      .status(201)
      .json({ message: "Ticket issued", code: "TICKET_CREATED", data: result });
  } catch (error) {
    next(error);
  }
};

export { adminIndex, index, register };
