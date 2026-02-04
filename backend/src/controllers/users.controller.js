import { getMe, listUsers } from "../services/users.service.js";

const me = async (req, res, next) => {
  try {
    const result = await getMe(req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await listUsers(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export { index, me };
