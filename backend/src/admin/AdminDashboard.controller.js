import Event from "../models/Event.model.js";
import User from "../models/User.model.js";
import Member from "../members/Member.model.js";
import Media from "../media/Media.model.js";
import { resolvePermissions } from "./permissions.js";

const getDashboard = async (req, res, next) => {
  try {
    const [users, events, members, media] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Member.countDocuments(),
      Media.countDocuments(),
    ]);

    res.json({
      message: "Admin dashboard fetched",
      code: "ADMIN_DASHBOARD_FETCHED",
      data: {
        counts: { users, events, members, media },
        permissions: resolvePermissions(req.user?.role),
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getDashboard };
