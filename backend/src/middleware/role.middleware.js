const roleMiddleware = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ message: "Forbidden", code: "FORBIDDEN", status: 403 });
  }

  return next();
};

export default roleMiddleware;
