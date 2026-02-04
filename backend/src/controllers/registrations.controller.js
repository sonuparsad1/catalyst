import {
  listRegistrationsForUser,
  registerForEvent,
} from "../services/registrations.service.js";

const index = async (req, res, next) => {
  try {
    const result = await listRegistrationsForUser(req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await registerForEvent(req.user.id, req.body.eventId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export { create, index };
