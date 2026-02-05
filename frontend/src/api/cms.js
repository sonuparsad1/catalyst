import { request } from "./client.js";

const listPages = async () => {
  const response = await request({ path: "/api/v1/cms/pages" });
  return response.data;
};

const listCorePages = async () => {
  const response = await request({ path: "/api/v1/cms/core-pages" });
  return response.data;
};

const ensureCorePages = async () => {
  await request({ path: "/api/v1/cms/core-pages/ensure", method: "POST" });
};

const getPage = async (id) => {
  const response = await request({ path: `/api/v1/cms/pages/${id}` });
  return response.data;
};

const getCorePage = async (id) => {
  const response = await request({ path: `/api/v1/cms/core-pages/${id}` });
  return response.data;
};

const getPageBySlug = async (slug) => {
  const response = await request({ path: `/api/v1/cms/public/pages/${slug}` });
  return response.data;
};

const getCorePageByKey = async (pageKey) => {
  const response = await request({
    path: `/api/v1/cms/public/core-pages/${pageKey}`,
  });
  return response.data;
};

const createPage = async (payload) => {
  const response = await request({
    path: "/api/v1/cms/pages",
    method: "POST",
    body: payload,
  });
  return response.data;
};

const updatePage = async (id, payload) => {
  const response = await request({
    path: `/api/v1/cms/pages/${id}`,
    method: "PUT",
    body: payload,
  });
  return response.data;
};

const updateCorePage = async (id, payload) => {
  const response = await request({
    path: `/api/v1/cms/core-pages/${id}`,
    method: "PUT",
    body: payload,
  });
  return response.data;
};

const deletePage = async (id) =>
  request({ path: `/api/v1/cms/pages/${id}`, method: "DELETE" });

const listSections = async ({ pageId, pageContentId } = {}) => {
  const params = new URLSearchParams();
  if (pageId) {
    params.append("pageId", pageId);
  }
  if (pageContentId) {
    params.append("pageContentId", pageContentId);
  }
  const path =
    params.toString().length > 0
      ? `/api/v1/cms/sections?${params.toString()}`
      : "/api/v1/cms/sections";
  const response = await request({ path });
  return response.data;
};

const createSection = async (payload) => {
  const response = await request({
    path: "/api/v1/cms/sections",
    method: "POST",
    body: payload,
  });
  return response.data;
};

const updateSection = async (id, payload) => {
  const response = await request({
    path: `/api/v1/cms/sections/${id}`,
    method: "PUT",
    body: payload,
  });
  return response.data;
};

const deleteSection = async (id) =>
  request({ path: `/api/v1/cms/sections/${id}`, method: "DELETE" });

const listMenus = async () => {
  const response = await request({ path: "/api/v1/cms/menu" });
  return response.data;
};

const listPublicMenus = async () => {
  const response = await request({ path: "/api/v1/cms/public/menu" });
  return response.data;
};

const createMenu = async (payload) => {
  const response = await request({
    path: "/api/v1/cms/menu",
    method: "POST",
    body: payload,
  });
  return response.data;
};

const updateMenu = async (id, payload) => {
  const response = await request({
    path: `/api/v1/cms/menu/${id}`,
    method: "PUT",
    body: payload,
  });
  return response.data;
};

const deleteMenu = async (id) =>
  request({ path: `/api/v1/cms/menu/${id}`, method: "DELETE" });

const getSettings = async () => {
  const response = await request({ path: "/api/v1/cms/public/settings" });
  return response.data;
};

const getAdminSettings = async () => {
  const response = await request({ path: "/api/v1/cms/settings" });
  return response.data;
};

const updateSettings = async (payload) => {
  const response = await request({
    path: "/api/v1/cms/settings",
    method: "PUT",
    body: payload,
  });
  return response.data;
};

export {
  createMenu,
  createPage,
  createSection,
  deleteMenu,
  deletePage,
  deleteSection,
  ensureCorePages,
  getAdminSettings,
  getCorePage,
  getCorePageByKey,
  getPage,
  getPageBySlug,
  getSettings,
  listCorePages,
  listMenus,
  listPages,
  listPublicMenus,
  listSections,
  updateMenu,
  updateCorePage,
  updatePage,
  updateSection,
  updateSettings,
};
