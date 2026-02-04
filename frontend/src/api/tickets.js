import { request } from "./client.js";

const registerTicket = async (eventId, token) => {
  const response = await request({
    path: "/api/v1/tickets/register",
    method: "POST",
    body: { eventId },
    token,
  });
  return response.data ?? response;
};

const listTickets = async (token) => {
  const response = await request({
    path: "/api/v1/tickets",
    token,
  });
  return response.data;
};

const listEventTickets = async (eventId, token) => {
  const response = await request({
    path: `/api/v1/tickets/event/${eventId}`,
    token,
  });
  return response.data;
};

export { listEventTickets, listTickets, registerTicket };
