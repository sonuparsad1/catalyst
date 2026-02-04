const errorMiddleware = (err, _req, res, _next) => {
  const status = Number.isInteger(err.status) ? err.status : 500;
  const message =
    status === 500 ? "Internal server error" : err.message || "Request failed";
  const code = err.code || (status === 500 ? "INTERNAL_ERROR" : "REQUEST_FAILED");

  res.status(status).json({ message, code });
};

export default errorMiddleware;
