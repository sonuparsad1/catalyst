import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import AuthContext from "../context/AuthContext.jsx";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Education", to: "/education" },
  { label: "Sports", to: "/sports" },
  { label: "Recruitment", to: "/recruitment" },
  { label: "Sponsorship", to: "/sponsorship" },
  { label: "Team", to: "/team" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          {logoVisible ? (
            <img
              src={logo}
              alt="Catalyst Society logo"
              className="h-11 w-11 rounded-full border border-border object-cover shadow-card-ambient"
              onError={() => setLogoVisible(false)}
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-base font-semibold text-background shadow-accent-glow">
              CS
            </span>
          )}
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted">
              Catalyst Society
            </p>
            <p className="text-base font-semibold text-textPrimary">
              Ignite • Innovate • Lead
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
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
          ))}
        </div>
        <div className="hidden items-center gap-4 text-sm md:flex">
          {isAuthenticated ? (
            <>
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
              <NavLink
                key={link.to}
                to={link.to}
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
            ))}
            {isAuthenticated ? (
              <>
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
