import Menu from "./Menu.model.js";
import Page from "./Page.model.js";
import Section from "./Section.model.js";
import SiteSettings from "./SiteSettings.model.js";

const listPages = async (_req, res, next) => {
  try {
    const pages = await Page.find().sort({ updatedAt: -1 });
    res.json({ message: "Pages fetched", code: "PAGES_FETCHED", data: pages });
  } catch (error) {
    next(error);
  }
};

const getPage = async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id).populate("sections");
    if (!page) {
      return res.status(404).json({ message: "Page not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Page fetched", code: "PAGE_FETCHED", data: page });
  } catch (error) {
    return next(error);
  }
};

const createPage = async (req, res, next) => {
  try {
    const page = await Page.create(req.body);
    res.status(201).json({ message: "Page created", code: "PAGE_CREATED", data: page });
  } catch (error) {
    next(error);
  }
};

const updatePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!page) {
      return res.status(404).json({ message: "Page not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Page updated", code: "PAGE_UPDATED", data: page });
  } catch (error) {
    return next(error);
  }
};

const deletePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ message: "Page not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Page deleted", code: "PAGE_DELETED" });
  } catch (error) {
    return next(error);
  }
};

const listSections = async (_req, res, next) => {
  try {
    const sections = await Section.find().sort({ updatedAt: -1 });
    res.json({
      message: "Sections fetched",
      code: "SECTIONS_FETCHED",
      data: sections,
    });
  } catch (error) {
    next(error);
  }
};

const createSection = async (req, res, next) => {
  try {
    const section = await Section.create(req.body);
    res
      .status(201)
      .json({ message: "Section created", code: "SECTION_CREATED", data: section });
  } catch (error) {
    next(error);
  }
};

const updateSection = async (req, res, next) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!section) {
      return res.status(404).json({ message: "Section not found", code: "NOT_FOUND" });
    }
    return res.json({
      message: "Section updated",
      code: "SECTION_UPDATED",
      data: section,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteSection = async (req, res, next) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) {
      return res.status(404).json({ message: "Section not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Section deleted", code: "SECTION_DELETED" });
  } catch (error) {
    return next(error);
  }
};

const listMenus = async (_req, res, next) => {
  try {
    const menus = await Menu.find().sort({ updatedAt: -1 });
    res.json({ message: "Menus fetched", code: "MENUS_FETCHED", data: menus });
  } catch (error) {
    next(error);
  }
};

const createMenu = async (req, res, next) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json({ message: "Menu created", code: "MENU_CREATED", data: menu });
  } catch (error) {
    next(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Menu updated", code: "MENU_UPDATED", data: menu });
  } catch (error) {
    return next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Menu deleted", code: "MENU_DELETED" });
  } catch (error) {
    return next(error);
  }
};

const getSiteSettings = async (_req, res, next) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json({
      message: "Settings fetched",
      code: "SETTINGS_FETCHED",
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

const updateSiteSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    res.json({
      message: "Settings updated",
      code: "SETTINGS_UPDATED",
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createMenu,
  createPage,
  createSection,
  deleteMenu,
  deletePage,
  deleteSection,
  getPage,
  getSiteSettings,
  listMenus,
  listPages,
  listSections,
  updateMenu,
  updatePage,
  updateSection,
  updateSiteSettings,
};
