import Page from "../models/Page.model.js";
import PageContent, { PAGE_KEYS } from "../models/PageContent.model.js";
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

const listCorePages = async (_req, res, next) => {
  try {
    const pages = await PageContent.find().sort({ pageKey: 1 });
    res.json({ message: "Core pages fetched", code: "CORE_PAGES_FETCHED", data: pages });
  } catch (error) {
    next(error);
  }
};

const getCorePage = async (req, res, next) => {
  try {
    const page = await PageContent.findById(req.params.id).populate({
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

const getCorePageByKey = async (req, res, next) => {
  try {
    const page = await PageContent.findOne({
      pageKey: req.params.pageKey,
      isPublished: true,
    }).populate({
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

const updateCorePage = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    delete updates.pageKey;
    const page = await PageContent.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!page) {
      return res.status(404).json({ message: "Page not found", code: "NOT_FOUND" });
    }
    await logAdminAction({
      actor: req.user,
      action: "CORE_PAGE_UPDATED",
      target: page.id,
      meta: { pageKey: page.pageKey },
    });
    return res.json({ message: "Page updated", code: "PAGE_UPDATED", data: page });
  } catch (error) {
    return next(error);
  }
};

const attachCoreSection = async (req, res, next) => {
  try {
    const { pageId, sectionId } = req.body;
    const page = await PageContent.findById(pageId);
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
      action: "CORE_SECTION_ATTACHED",
      target: page.id,
      meta: { sectionId: section.id, pageKey: page.pageKey },
    });
    return res.json({ message: "Section attached", code: "SECTION_ATTACHED", data: page });
  } catch (error) {
    return next(error);
  }
};

const ensureCorePages = async (_req, res, next) => {
  try {
    const existing = await PageContent.find({ pageKey: { $in: PAGE_KEYS } });
    const existingKeys = new Set(existing.map((page) => page.pageKey));
    const toCreate = PAGE_KEYS.filter((key) => !existingKeys.has(key)).map((key) => ({
      pageKey: key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      seoTitle: `Catalyst Society ${key.charAt(0).toUpperCase() + key.slice(1)}`,
      seoDescription: `Catalyst Society ${key} page`,
      isPublished: true,
      sections: [],
    }));
    if (toCreate.length > 0) {
      await PageContent.insertMany(toCreate);
    }
    return res.json({ message: "Core pages ensured", code: "CORE_PAGES_READY" });
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
  attachCoreSection,
  createPage,
  deletePage,
  getPage,
  getCorePage,
  getCorePageByKey,
  getPublishedPage,
  listCorePages,
  listPages,
  ensureCorePages,
  updateCorePage,
  updatePage,
};
