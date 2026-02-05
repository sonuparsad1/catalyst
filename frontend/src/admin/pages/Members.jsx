import Seo from "../../components/Seo.jsx";

const members = [
  { name: "Aiden Cole", tier: "Founder", status: "Active" },
  { name: "Morgan Keys", tier: "Executive", status: "Active" },
  { name: "Selena Tran", tier: "Member", status: "Paused" },
];

const AdminMembers = () => {
  return (
    <section className="space-y-6">
      <Seo title="Admin Members" description="Manage member profiles and access." />
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
        <button
          type="button"
          disabled
          title="Member exports are handled by the CRM integration."
          className="rounded-full border border-primary/50 px-4 py-2 text-xs font-semibold text-primary/70 opacity-70"
        >
          Export members
        </button>
      </header>

      <div className="grid gap-3">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/70 p-4 text-sm md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-base font-semibold text-textPrimary">
                {member.name}
              </p>
              <p className="text-xs text-textSecondary">{member.tier} tier</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  member.status === "Active"
                    ? "border-primary text-primary"
                    : "border-border text-textSecondary"
                }`}
              >
                {member.status}
              </span>
              <button
                type="button"
                disabled
                title="Member management requires elevated permissions."
                className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-textSecondary opacity-60 cursor-not-allowed"
              >
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminMembers;
