import { useEffect, useState } from "react";
import Seo from "../../components/Seo.jsx";
import { getAdminSettings, updateSettings } from "../../api/cms.js";

const emptySettings = {
  siteName: "",
  logoUrl: "",
  primaryColor: "",
  accentColor: "",
  footerText: "",
  contactEmail: "",
  socialLinks: {
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },
};

const AdminSettings = () => {
  const [settings, setSettings] = useState(emptySettings);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        const data = await getAdminSettings();
        if (isMounted && data) {
          setSettings({ ...emptySettings, ...data });
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error?.message || "Unable to load settings.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");
    try {
      const updated = await updateSettings(settings);
      setSettings({ ...emptySettings, ...updated });
      setStatusMessage("Settings updated.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to update settings.");
    }
  };

  return (
    <section className="space-y-6">
      <Seo title="Admin Settings" description="Manage global site settings." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Settings</p>
          <h2 className="text-3xl font-semibold text-textPrimary">Site settings</h2>
          <p className="mt-2 text-sm text-textSecondary">
            Update global branding, colors, and contact details.
          </p>
        </div>
        <button
          type="submit"
          form="settings-form"
          className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background"
          disabled={loading}
        >
          Save changes
        </button>
      </header>

      {(statusMessage || errorMessage) && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            errorMessage
              ? "border-red-500/40 bg-red-500/10 text-red-200"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          }`}
        >
          {errorMessage || statusMessage}
        </div>
      )}

      <form id="settings-form" className="grid gap-4" onSubmit={handleSave}>
        <div className="grid gap-4 lg:grid-cols-2">
          <input
            type="text"
            placeholder="Site name"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            value={settings.siteName}
            onChange={(event) =>
              setSettings((prev) => ({ ...prev, siteName: event.target.value }))
            }
            required
          />
          <input
            type="text"
            placeholder="Logo URL"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            value={settings.logoUrl}
            onChange={(event) =>
              setSettings((prev) => ({ ...prev, logoUrl: event.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Primary color"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            value={settings.primaryColor}
            onChange={(event) =>
              setSettings((prev) => ({ ...prev, primaryColor: event.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Accent color"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            value={settings.accentColor}
            onChange={(event) =>
              setSettings((prev) => ({ ...prev, accentColor: event.target.value }))
            }
          />
        </div>
        <textarea
          placeholder="Footer text"
          className="min-h-[80px] rounded-lg border border-border bg-background px-3 py-2 text-sm"
          value={settings.footerText}
          onChange={(event) =>
            setSettings((prev) => ({ ...prev, footerText: event.target.value }))
          }
        />
        <input
          type="email"
          placeholder="Contact email"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          value={settings.contactEmail}
          onChange={(event) =>
            setSettings((prev) => ({ ...prev, contactEmail: event.target.value }))
          }
        />
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="text"
            placeholder="Instagram"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            value={settings.socialLinks.instagram}
            onChange={(event) =>
              setSettings((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, instagram: event.target.value },
              }))
            }
          />
          <input
            type="text"
            placeholder="LinkedIn"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            value={settings.socialLinks.linkedin}
            onChange={(event) =>
              setSettings((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, linkedin: event.target.value },
              }))
            }
          />
          <input
            type="text"
            placeholder="Twitter"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            value={settings.socialLinks.twitter}
            onChange={(event) =>
              setSettings((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, twitter: event.target.value },
              }))
            }
          />
          <input
            type="text"
            placeholder="YouTube"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            value={settings.socialLinks.youtube}
            onChange={(event) =>
              setSettings((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, youtube: event.target.value },
              }))
            }
          />
        </div>
      </form>
    </section>
  );
};

export default AdminSettings;
