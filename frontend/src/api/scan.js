import { request } from "./client.js";

const scanTicket = async (qrData, token) => {
  const response = await request({
    path: "/api/v1/scan",
    method: "POST",
    body: { qrData },
    token,
  });
  return response.data;
};

export { scanTicket };
