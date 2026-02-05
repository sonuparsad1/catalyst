import logAdminAction from "../../admin/audit.log.js";
import { getSiteSettings, updateSiteSettings } from "../services/cms.service.js";

const getSettings = async (_req, res, next) => {
  try {
    const settings = await getSiteSettings();
    res.json({ message: "Settings fetched", code: "SETTINGS_FETCHED", data: settings });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const settings = await updateSiteSettings(req.body);
    await logAdminAction({
      actor: req.user,
      action: "SETTINGS_UPDATED",
      target: settings.id,
    });
    res.json({ message: "Settings updated", code: "SETTINGS_UPDATED", data: settings });
  } catch (error) {
    next(error);
  }
};

export { getSettings, updateSettings };
