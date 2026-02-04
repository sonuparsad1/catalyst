import {
  createEvent,
  deleteEvent,
  getEventById,
  listEvents,
  updateEvent,
} from "../services/events.service.js";

const index = async (req, res, next) => {
  try {
    const result = await listEvents({
      includeAll: req.user?.role === "admin" && req.query.includeAll === "true",
    });
    res.json({ message: "Events fetched", code: "EVENTS_FETCHED", data: result });
  } catch (error) {
    next(error);
  }
};

const adminIndex = async (_req, res, next) => {
  try {
    const result = await listEvents({ includeAll: true });
    res.json({ message: "Events fetched", code: "EVENTS_FETCHED", data: result });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const includeUnpublished = req.user?.role === "admin";
    const result = await getEventById(req.params.id, { includeUnpublished });
    res.json({ message: "Event fetched", code: "EVENT_FETCHED", data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createEvent(req.body, req.user.id);
    res.status(201).json({ message: "Event created", code: "EVENT_CREATED", data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateEvent(req.params.id, req.body);
    res.json({ message: "Event updated", code: "EVENT_UPDATED", data: result });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await deleteEvent(req.params.id);
    res.json({ message: "Event deleted", code: "EVENT_DELETED" });
  } catch (error) {
    next(error);
  }
};

export { adminIndex, create, destroy, index, show, update };
