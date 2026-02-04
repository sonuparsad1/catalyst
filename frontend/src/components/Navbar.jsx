import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

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

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          {logoVisible ? (
            <img
              src={logo}
              alt="Catalyst Society logo"
              className="h-11 w-11 rounded-full border border-border object-cover shadow-sm"
              onError={() => setLogoVisible(false)}
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-semibold text-slate-950 shadow-sm">
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
        <div className="hidden items-center gap-2 text-sm font-medium text-muted md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition-colors duration-200 hover:text-textPrimary ${
                  isActive
                    ? "bg-surface text-textPrimary"
                    : "text-muted hover:bg-surface/70"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
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
                      ? "bg-background text-textPrimary"
                      : "text-muted hover:bg-background/60 hover:text-textPrimary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
