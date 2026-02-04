const sendResponse = (res, status, payload) => res.status(status).json(payload);

const sendSuccess = (res, payload, status = 200) =>
  sendResponse(res, status, payload);

export { sendResponse, sendSuccess };
