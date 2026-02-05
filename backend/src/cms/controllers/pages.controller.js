import Page from "../models/Page.model.js";
import Section from "../models/Section.model.js";
import logAdminAction from "../../admin/audit.log.js";
import { deletePageWithSections, getPublishedPageBySlug } from "../services/cms.service.js";

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
    const page = await Page.findById(req.params.id).populate({
      path: "sections",
      options: { sort: { order: 1 } },
    });
    if (!page) {
      return res.status(404).json({ message: "Page not found", code: "NOT_FOUND" });
    }
    return res.json({ message: "Page fetched", code: "PAGE_FETCHED", data: page });
  } catch (error) {
    return next(error);
  }
};

const getPublishedPage = async (req, res, next) => {
  try {
    const page = await getPublishedPageBySlug(req.params.slug);
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
    await logAdminAction({
      actor: req.user,
      action: "PAGE_CREATED",
      target: page.id,
      meta: { slug: page.slug },
    });
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
    await logAdminAction({
      actor: req.user,
      action: "PAGE_UPDATED",
      target: page.id,
      meta: { slug: page.slug },
    });
    return res.json({ message: "Page updated", code: "PAGE_UPDATED", data: page });
  } catch (error) {
    return next(error);
  }
};

const deletePage = async (req, res, next) => {
  try {
    const page = await deletePageWithSections(req.params.id);
    if (!page) {
      return res.status(404).json({ message: "Page not found", code: "NOT_FOUND" });
    }
    await logAdminAction({
      actor: req.user,
      action: "PAGE_DELETED",
      target: req.params.id,
      meta: { slug: page.slug },
    });
    return res.json({ message: "Page deleted", code: "PAGE_DELETED" });
  } catch (error) {
    return next(error);
  }
};

const attachSection = async (req, res, next) => {
  try {
    const { pageId, sectionId } = req.body;
    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ message: "Page not found", code: "NOT_FOUND" });
    }
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found", code: "NOT_FOUND" });
    }
    if (!page.sections.includes(section.id)) {
      page.sections.push(section.id);
    }
    await page.save();
    await logAdminAction({
      actor: req.user,
      action: "SECTION_ATTACHED",
      target: page.id,
      meta: { sectionId: section.id },
    });
    return res.json({ message: "Section attached", code: "SECTION_ATTACHED", data: page });
  } catch (error) {
    return next(error);
  }
};

export {
  attachSection,
  createPage,
  deletePage,
  getPage,
  getPublishedPage,
  listPages,
  updatePage,
};
