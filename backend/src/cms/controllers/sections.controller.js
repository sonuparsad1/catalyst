import Section from "../models/Section.model.js";
import Page from "../models/Page.model.js";
import PageContent from "../models/PageContent.model.js";
import logAdminAction from "../../admin/audit.log.js";
import { listSectionsByPage } from "../services/cms.service.js";

const listSections = async (req, res, next) => {
  try {
    const { pageId, pageContentId } = req.query;
    const sections = pageId
      ? await listSectionsByPage(pageId)
      : pageContentId
      ? await Section.find({ pageContentId }).sort({ order: 1 })
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
    if (section.pageId) {
      await Page.findByIdAndUpdate(section.pageId, {
        $addToSet: { sections: section.id },
      });
    }
    if (section.pageContentId) {
      await PageContent.findByIdAndUpdate(section.pageContentId, {
        $addToSet: { sections: section.id },
      });
    }
    await logAdminAction({
      actor: req.user,
      action: "SECTION_CREATED",
      target: section.id,
      meta: {
        pageId: section.pageId,
        pageContentId: section.pageContentId,
        type: section.type,
      },
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
      meta: {
        pageId: section.pageId,
        pageContentId: section.pageContentId,
        type: section.type,
      },
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
    if (section.pageId) {
      await Page.findByIdAndUpdate(section.pageId, { $pull: { sections: section.id } });
    }
    if (section.pageContentId) {
      await PageContent.findByIdAndUpdate(section.pageContentId, {
        $pull: { sections: section.id },
      });
    }
    await logAdminAction({
      actor: req.user,
      action: "SECTION_DELETED",
      target: section.id,
      meta: { pageId: section.pageId, pageContentId: section.pageContentId },
    });
    return res.json({ message: "Section deleted", code: "SECTION_DELETED" });
  } catch (error) {
    return next(error);
  }
};

export { createSection, deleteSection, listSections, updateSection };
