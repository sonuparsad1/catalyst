import User from "../models/User.js";
import AppError from "../utils/appError.js";
import env from "../config/env.js";

const ensureDatabaseEnabled = () => {
  if (!env.useDb) {
    throw new AppError("Service unavailable", 503, "DB_DISABLED");
  }
};

const listUsers = async ({ page = 1, limit = 20 } = {}) => {
  ensureDatabaseEnabled();
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const [users, total] = await Promise.all([
    User.find()
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .select("_id name email role createdAt"),
    User.countDocuments(),
  ]);

  return {
    data: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    })),
    meta: {
      page: safePage,
      limit: safeLimit,
      total,
    },
  };
};

const getMe = async (userId) => {
  ensureDatabaseEnabled();
  const user = await User.findById(userId).select("_id name email role");
  if (!user) {
    throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export { getMe, listUsers };
