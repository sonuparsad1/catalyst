import Seo from "../../components/Seo.jsx";

const AdminSettings = () => {
  return (
    <section className="space-y-6">
      <Seo title="Admin Settings" description="Secure platform settings and policy controls." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Settings
          </p>
          <h2 className="text-3xl font-semibold text-textPrimary">
            Platform controls
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Adjust domain readiness, security, and member access policies.
          </p>
        </div>
        <button className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background shadow-accent-glow">
          Save changes
        </button>
      </header>

      <div className="grid gap-4">
        <div className="rounded-2xl border border-border bg-surface/70 p-4">
          <p className="text-sm font-semibold text-textPrimary">Domain</p>
          <p className="mt-2 text-xs text-textSecondary">
            Primary domain configured: catalystsociety.com
          </p>
          <button className="mt-4 rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/10">
            Update DNS status
          </button>
        </div>
        <div className="rounded-2xl border border-border bg-surface/70 p-4">
          <p className="text-sm font-semibold text-textPrimary">Security</p>
          <p className="mt-2 text-xs text-textSecondary">
            CSP, rate limits, and audit logging are enforced.
          </p>
          <button className="mt-4 rounded-full border border-border px-3 py-1 text-xs font-semibold text-textSecondary transition hover:border-primary/70">
            Review policies
          </button>
        </div>
        <div className="rounded-2xl border border-border bg-surface/70 p-4">
          <p className="text-sm font-semibold text-textPrimary">Exports</p>
          <p className="mt-2 text-xs text-textSecondary">
            Schedule recurring exports for finance and attendance.
          </p>
          <button className="mt-4 rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/10">
            Configure exports
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminSettings;
