import Menu from "../models/Menu.model.js";
import logAdminAction from "../../admin/audit.log.js";
import { listMenuItems } from "../services/cms.service.js";

const listMenus = async (_req, res, next) => {
  try {
    const menus = await listMenuItems();
    res.json({ message: "Menus fetched", code: "MENUS_FETCHED", data: menus });
  } catch (error) {
    next(error);
  }
};

const listPublicMenus = async (_req, res, next) => {
  try {
    const menus = await listMenuItems({ visibleOnly: true });
    res.json({ message: "Menus fetched", code: "MENUS_FETCHED", data: menus });
  } catch (error) {
    next(error);
  }
};

const createMenu = async (req, res, next) => {
  try {
    const menu = await Menu.create(req.body);
    await logAdminAction({
      actor: req.user,
      action: "MENU_CREATED",
      target: menu.id,
      meta: { slug: menu.slug },
    });
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
    await logAdminAction({
      actor: req.user,
      action: "MENU_UPDATED",
      target: menu.id,
      meta: { slug: menu.slug },
    });
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
    await logAdminAction({
      actor: req.user,
      action: "MENU_DELETED",
      target: req.params.id,
      meta: { slug: menu.slug },
    });
    return res.json({ message: "Menu deleted", code: "MENU_DELETED" });
  } catch (error) {
    return next(error);
  }
};

export { createMenu, deleteMenu, listMenus, listPublicMenus, updateMenu };
