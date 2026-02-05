import Section from "../models/Section.model.js";
import Page from "../models/Page.model.js";
import logAdminAction from "../../admin/audit.log.js";
import { listSectionsByPage } from "../services/cms.service.js";

const listSections = async (req, res, next) => {
  try {
    const { pageId } = req.query;
    const sections = pageId
      ? await listSectionsByPage(pageId)
      : await Section.find().sort({ updatedAt: -1 });
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
    await Page.findByIdAndUpdate(section.pageId, {
      $addToSet: { sections: section.id },
    });
    await logAdminAction({
      actor: req.user,
      action: "SECTION_CREATED",
      target: section.id,
      meta: { pageId: section.pageId, type: section.type },
    });
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
    await logAdminAction({
      actor: req.user,
      action: "SECTION_UPDATED",
      target: section.id,
      meta: { pageId: section.pageId, type: section.type },
    });
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
    await Page.findByIdAndUpdate(section.pageId, { $pull: { sections: section.id } });
    await logAdminAction({
      actor: req.user,
      action: "SECTION_DELETED",
      target: section.id,
      meta: { pageId: section.pageId },
    });
    return res.json({ message: "Section deleted", code: "SECTION_DELETED" });
  } catch (error) {
    return next(error);
  }
};

export { createSection, deleteSection, listSections, updateSection };
