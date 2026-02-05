import Page from "../models/Page.model.js";
import Section from "../models/Section.model.js";
import Menu from "../models/Menu.model.js";
import SiteSettings from "../models/SiteSettings.model.js";
import PageContent from "../models/PageContent.model.js";

const getPublishedPageBySlug = async (slug) =>
  Page.findOne({ slug, isPublished: true }).populate({
    path: "sections",
    options: { sort: { order: 1 } },
  });

const listMenuItems = async ({ visibleOnly } = {}) =>
  Menu.find(visibleOnly ? { visible: true } : {}).sort({ order: 1 });

const getSiteSettings = async () => SiteSettings.findOne();

const updateSiteSettings = async (payload) =>
  SiteSettings.findOneAndUpdate({}, payload, {
    new: true,
    runValidators: true,
    upsert: true,
  });

const listSectionsByPage = async (pageId) =>
  Section.find({ pageId }).sort({ order: 1 });

const deletePageWithSections = async (pageId) => {
  await Section.deleteMany({ pageId });
  return Page.findByIdAndDelete(pageId);
};

const deleteCorePageWithSections = async (pageId) => {
  await Section.deleteMany({ pageContentId: pageId });
  return PageContent.findByIdAndDelete(pageId);
};

export {
  deletePageWithSections,
  deleteCorePageWithSections,
  getPublishedPageBySlug,
  getSiteSettings,
  listMenuItems,
  listSectionsByPage,
  updateSiteSettings,
};
