import Seo from "../../components/Seo.jsx";

const refunds = [
  { id: "ref-105", member: "Carmen Lee", amount: "$320", reason: "Schedule" },
  { id: "ref-106", member: "Dev Patel", amount: "$540", reason: "Travel" },
  { id: "ref-107", member: "Nina Cole", amount: "$220", reason: "Duplicate" },
];

const AdminRefunds = () => {
  return (
    <section className="space-y-6">
      <Seo title="Admin Refunds" description="Manage refund approvals." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Refunds
          </p>
          <h2 className="text-3xl font-semibold text-textPrimary">
            Refund management
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Approve requests and maintain member trust.
          </p>
        </div>
        <button className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background shadow-accent-glow">
          Approve all
        </button>
      </header>

      <div className="grid gap-3">
        {refunds.map((refund) => (
          <div
            key={refund.id}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/70 p-4 text-sm md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                {refund.id}
              </p>
              <p className="text-base font-semibold text-textPrimary">
                {refund.member}
              </p>
              <p className="text-xs text-textSecondary">{refund.reason}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-textPrimary">
                {refund.amount}
              </span>
              <button className="rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/10">
                Approve
              </button>
              <button className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-textSecondary transition hover:border-primary/70">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminRefunds;
