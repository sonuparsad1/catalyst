import {
  createEvent,
  getEventById,
  listEvents,
} from "../services/events.service.js";

const index = async (_req, res, next) => {
  try {
    const result = await listEvents();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getEventById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createEvent(req.body, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export { create, index, show };
