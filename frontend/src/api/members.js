import { request } from "./client.js";

const listMembers = async () => {
  const response = await request({ path: "/api/v1/members" });
  return response.data;
};

const createMember = async (payload) => {
  const response = await request({
    path: "/api/v1/members",
    method: "POST",
    body: payload,
  });
  return response.data;
};

const updateMember = async (id, payload) => {
  const response = await request({
    path: `/api/v1/members/${id}`,
    method: "PUT",
    body: payload,
  });
  return response.data;
};

const deleteMember = async (id) =>
  request({ path: `/api/v1/members/${id}`, method: "DELETE" });

export { createMember, deleteMember, listMembers, updateMember };
