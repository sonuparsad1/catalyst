import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const adminGuard = [authMiddleware, roleMiddleware("admin")];

export default adminGuard;
