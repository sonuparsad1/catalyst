const errorMiddleware = (err, _req, res, _next) => {
  const status = Number.isInteger(err.status) ? err.status : 500;
  const message =
    status === 500 ? "Internal server error" : err.message || "Request failed";

  res.status(status).json({ message });
};

export default errorMiddleware;
