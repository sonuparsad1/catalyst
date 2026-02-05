import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, required: true, trim: true },
    logoUrl: { type: String, trim: true },
    primaryColor: { type: String, trim: true },
    accentColor: { type: String, trim: true },
    footerText: { type: String, trim: true },
    contactEmail: { type: String, trim: true },
    socialLinks: {
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      youtube: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;
