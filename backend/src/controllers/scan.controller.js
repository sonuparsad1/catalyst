import Attendance from "../models/Attendance.model.js";
import Event from "../models/Event.model.js";
import Ticket from "../models/Ticket.model.js";
import { verifyQrData } from "../services/qr.service.js";
import AppError from "../utils/appError.js";

const isEventActive = (event) => {
  if (!event?.date || !event?.time) {
    return false;
  }
  const start = new Date(`${event.date}T${event.time}`);
  const end = new Date(start.getTime() + 12 * 60 * 60 * 1000);
  const now = new Date();
  return now >= start && now <= end;
};

const scan = async (req, res, next) => {
  try {
    const { qrData } = req.body;
    if (!qrData) {
      throw new AppError("QR data required", 400, "VALIDATION_ERROR");
    }

    const { ticketId, eventId } = verifyQrData(qrData);

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new AppError("Ticket not found", 404, "TICKET_NOT_FOUND");
    }

    if (ticket.eventId.toString() !== eventId) {
      throw new AppError("Wrong event", 400, "EVENT_MISMATCH");
    }

    if (ticket.status !== "VALID") {
      throw new AppError("Ticket already used", 409, "TICKET_USED");
    }

    const event = await Event.findById(eventId);
    if (!event || event.status !== "PUBLISHED") {
      throw new AppError("Event not active", 400, "EVENT_INACTIVE");
    }

    if (!isEventActive(event)) {
      throw new AppError("Event not active", 400, "EVENT_INACTIVE");
    }

    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: ticketId, status: "VALID" },
      { status: "USED", usedAt: new Date() },
      { new: true }
    );

    if (!updatedTicket) {
      throw new AppError("Ticket already used", 409, "TICKET_USED");
    }

    try {
      await Attendance.create({
        eventId,
        ticketId,
        userId: updatedTicket.userId,
        scannedBy: req.user.id,
        scannedAt: new Date(),
      });
    } catch (error) {
      if (error?.code === 11000) {
        throw new AppError("Ticket already scanned", 409, "ATTENDANCE_EXISTS");
      }
      throw error;
    }

    res.json({
      message: "Scan successful",
      code: "SCAN_SUCCESS",
      data: {
        ticketId: updatedTicket.id,
        status: updatedTicket.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { scan };
