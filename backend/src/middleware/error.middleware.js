const errorMiddleware = (err, _req, res, _next) => {
  const status = Number.isInteger(err.status) ? err.status : 500;
  const message = err.message || "Request failed";
  const code = err.code;

  if (status === 500) {
    return res
      .status(500)
      .json({ message: "Internal server error", code: code || "INTERNAL_ERROR" });
  }

  return res.status(status).json({ message, ...(code ? { code } : {}) });
};

export default errorMiddleware;
