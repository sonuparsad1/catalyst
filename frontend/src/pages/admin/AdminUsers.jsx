import Seo from "../../components/Seo.jsx";

const users = [
  { name: "Aiden Cole", tier: "Founder", status: "Active" },
  { name: "Morgan Keys", tier: "Executive", status: "Active" },
  { name: "Selena Tran", tier: "Member", status: "Paused" },
];

const AdminUsers = () => {
  return (
    <section className="space-y-6">
      <Seo title="Admin Users" description="Manage member profiles and access." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Members
          </p>
          <h2 className="text-3xl font-semibold text-textPrimary">
            Member directory
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Maintain premium access tiers and member support.
          </p>
        </div>
        <button className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10">
          Export members
        </button>
      </header>

      <div className="grid gap-3">
        {users.map((user) => (
          <div
            key={user.name}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/70 p-4 text-sm md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-base font-semibold text-textPrimary">
                {user.name}
              </p>
              <p className="text-xs text-textSecondary">{user.tier} tier</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  user.status === "Active"
                    ? "border-primary text-primary"
                    : "border-border text-textSecondary"
                }`}
              >
                {user.status}
              </span>
              <button className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-textSecondary transition hover:border-primary/70">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminUsers;
