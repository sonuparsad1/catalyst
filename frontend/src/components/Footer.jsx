import { useEffect, useState } from "react";
import { getSettings, listPublicMenus } from "../api/cms.js";

const Footer = () => {
  const [settings, setSettings] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [settingsData, menuData] = await Promise.all([
          getSettings(),
          listPublicMenus(),
        ]);
        if (isMounted) {
          setSettings(settingsData || null);
          setMenuItems(menuData || []);
        }
      } catch (error) {
        if (isMounted) {
          setSettings(null);
          setMenuItems([]);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const footerText = settings?.footerText || "Ignite • Innovate • Lead";
  const siteName = settings?.siteName || "Catalyst Society";
  const normalizePath = (path) => {
    if (!path) return "/";
    return path.startsWith("/") ? path : `/${path}`;
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-textSecondary md:flex-row md:items-center md:justify-between">
        <div>
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p className="text-muted">{footerText}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted">
          {menuItems.slice(0, 5).map((item) => (
            <a
              key={item._id}
              href={normalizePath(item.slug)}
              className="hover:text-textPrimary"
            >
              {item.label}
            </a>
          ))}
          {settings?.contactEmail && (
            <a href={`mailto:${settings.contactEmail}`} className="hover:text-textPrimary">
              {settings.contactEmail}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
