import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoFallback from "../assets/logo.svg";
import AuthContext from "../auth/AuthContext.jsx";
import { getSettings, listPublicMenus } from "../api/cms.js";

const normalizePath = (path) => {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
};

const buildMenuTree = (items) => {
  const nodes = new Map();
  const roots = [];

  items.forEach((item) => {
    nodes.set(item._id, { ...item, children: [] });
  });

  nodes.forEach((item) => {
    const parentId =
      typeof item.parent === "string" ? item.parent : item.parent?._id;
    if (parentId && nodes.has(parentId)) {
      nodes.get(parentId).children.push(item);
    } else {
      roots.push(item);
    }
  });

  const sortByOrder = (a, b) => a.order - b.order;
  const sortTree = (list) => {
    list.sort(sortByOrder);
    list.forEach((node) => sortTree(node.children));
  };

  sortTree(roots);
  return roots;
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [settings, setSettings] = useState(null);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [menuData, settingsData] = await Promise.all([
          listPublicMenus(),
          getSettings(),
        ]);
        if (isMounted) {
          setMenuItems(menuData || []);
          setSettings(settingsData || null);
        }
      } catch (error) {
        if (isMounted) {
          setMenuItems([]);
          setSettings(null);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const navLinks = useMemo(() => buildMenuTree(menuItems), [menuItems]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const logoUrl = settings?.logoUrl || logoFallback;
  const siteName = settings?.siteName || "Catalyst Society";

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          {logoVisible ? (
            <img
              src={logoUrl}
              alt={`${siteName} logo`}
              className="h-11 w-11 rounded-full border border-border object-cover shadow-card-ambient"
              onError={() => setLogoVisible(false)}
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-base font-semibold text-background shadow-accent-glow">
              {siteName.slice(0, 2).toUpperCase()}
            </span>
          )}
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted">
              {siteName}
            </p>
            <p className="text-base font-semibold text-textPrimary">
              {settings?.footerText || "Ignite • Innovate • Lead"}
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {navLinks.map((link) => (
            <div key={link._id} className="relative group">
              <NavLink
                to={normalizePath(link.slug)}
                className={({ isActive }) =>
                  `px-1 py-2 transition-colors duration-200 hover:text-textPrimary ${
                    isActive
                      ? "text-primary drop-shadow-[0_0_12px_rgba(198,168,107,0.35)]"
                      : "text-muted"
                  }`
                }
              >
                {link.label}
              </NavLink>
              {link.children.length > 0 && (
                <div className="absolute left-0 top-full z-10 hidden min-w-[180px] flex-col gap-1 rounded-2xl border border-border bg-surface/95 p-2 text-xs text-textPrimary shadow-card-ambient group-hover:flex">
                  {link.children.map((child) => (
                    <NavLink
                      key={child._id}
                      to={normalizePath(child.slug)}
                      className={({ isActive }) =>
                        `rounded-lg px-3 py-2 transition-colors duration-200 ${
                          isActive
                            ? "text-primary"
                            : "text-muted hover:text-textPrimary"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden items-center gap-4 text-sm md:flex">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  `px-1 py-2 transition-colors duration-200 ${
                    isActive
                      ? "text-primary drop-shadow-[0_0_12px_rgba(198,168,107,0.35)]"
                      : "text-muted hover:text-textPrimary"
                  }`
                }
              >
                My Tickets
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-1 py-2 transition-colors duration-200 ${
                    isActive
                      ? "text-primary drop-shadow-[0_0_12px_rgba(198,168,107,0.35)]"
                      : "text-muted hover:text-textPrimary"
                  }`
                }
              >
                Dashboard
              </NavLink>
              {user?.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `px-1 py-2 transition-colors duration-200 ${
                      isActive
                        ? "text-primary drop-shadow-[0_0_12px_rgba(198,168,107,0.35)]"
                        : "text-muted hover:text-textPrimary"
                    }`
                  }
                >
                  Admin
                </NavLink>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-1 py-2 transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-muted hover:text-textPrimary"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `rounded-full border border-primary px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-primary text-background"
                      : "text-primary hover:bg-primary/10"
                  }`
                }
              >
                Join
              </NavLink>
            </>
          )}
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border bg-surface/80 px-3 py-2 text-lg text-textPrimary transition hover:border-primary hover:text-primary md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </nav>
      {menuOpen && (
        <div className="border-t border-border bg-surface/95 md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4 text-sm font-medium text-textPrimary">
            {navLinks.map((link) => (
              <div key={link._id} className="flex flex-col gap-1">
                <NavLink
                  to={normalizePath(link.slug)}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 transition-colors duration-200 ${
                      isActive
                        ? "text-primary drop-shadow-[0_0_12px_rgba(198,168,107,0.35)]"
                        : "text-muted hover:text-textPrimary"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
                {link.children.map((child) => (
                  <NavLink
                    key={child._id}
                    to={normalizePath(child.slug)}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `ml-4 rounded-lg px-3 py-2 text-xs transition-colors duration-200 ${
                        isActive
                          ? "text-primary"
                          : "text-muted hover:text-textPrimary"
                      }`
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            ))}
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/tickets"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 transition-colors duration-200 ${
                      isActive
                        ? "text-primary drop-shadow-[0_0_12px_rgba(198,168,107,0.35)]"
                        : "text-muted hover:text-textPrimary"
                    }`
                  }
                >
                  My Tickets
                </NavLink>
                <NavLink
                  to="/dashboard"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 transition-colors duration-200 ${
                      isActive
                        ? "text-primary drop-shadow-[0_0_12px_rgba(198,168,107,0.35)]"
                        : "text-muted hover:text-textPrimary"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                {user?.role === "admin" && (
                  <NavLink
                    to="/admin/dashboard"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 transition-colors duration-200 ${
                        isActive
                          ? "text-primary drop-shadow-[0_0_12px_rgba(198,168,107,0.35)]"
                          : "text-muted hover:text-textPrimary"
                      }`
                    }
                  >
                    Admin
                  </NavLink>
                )}
                <button
                  type="button"
                  onClick={async () => {
                    await handleLogout();
                    handleLinkClick();
                  }}
                  className="rounded-lg border border-primary px-3 py-2 text-left text-xs font-semibold text-primary transition hover:bg-primary/10"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 transition-colors duration-200 ${
                      isActive
                        ? "text-primary drop-shadow-[0_0_12px_rgba(198,168,107,0.35)]"
                        : "text-muted hover:text-textPrimary"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `rounded-lg border border-primary px-3 py-2 text-xs font-semibold transition ${
                      isActive
                        ? "bg-primary text-background"
                        : "text-primary hover:bg-primary/10"
                    }`
                  }
                >
                  Join
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
