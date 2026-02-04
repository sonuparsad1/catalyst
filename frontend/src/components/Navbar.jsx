import { NavLink } from "react-router-dom";

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
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-lg font-semibold text-slate-950">
            CS
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Catalyst Society
            </p>
            <p className="text-base font-semibold text-white">Ignite • Innovate • Lead</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition hover:text-white ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
