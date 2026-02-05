import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext.jsx";

const AdminTopbar = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleBackToSite = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-card-gradient px-4 py-3 shadow-card-ambient">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded-full border border-border px-3 py-1 text-xs text-textSecondary transition hover:border-primary/60 lg:hidden"
        >
          Menu
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Admin workspace
          </p>
          <p className="text-sm font-semibold text-textPrimary">
            Secure control center
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleBackToSite}
          className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
        >
          Back to Website
        </button>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background shadow-accent-glow disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;
