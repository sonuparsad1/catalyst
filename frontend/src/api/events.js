import { request } from "./client.js";

const listEvents = async () => {
  const response = await request({ path: "/api/v1/events" });
  return response.data;
};

const listAdminEvents = async (token) => {
  const response = await request({
    path: "/api/v1/events/admin",
    token,
  });
  return response.data;
};

const getEvent = async (eventId, token) => {
  const response = await request({
    path: `/api/v1/events/${eventId}`,
    token,
  });
  return response.data;
};

const createEvent = async (payload, token) => {
  const response = await request({
    path: "/api/v1/events",
    method: "POST",
    body: payload,
    token,
  });
  return response.data;
};

const updateEvent = async (eventId, payload, token) => {
  const response = await request({
    path: `/api/v1/events/${eventId}`,
    method: "PUT",
    body: payload,
    token,
  });
  return response.data;
};

const deleteEvent = async (eventId, token) => {
  return request({
    path: `/api/v1/events/${eventId}`,
    method: "DELETE",
    token,
  });
};

export {
  createEvent,
  deleteEvent,
  getEvent,
  listAdminEvents,
  listEvents,
  updateEvent,
};
