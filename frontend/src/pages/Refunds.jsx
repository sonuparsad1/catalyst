const refunds = [
  {
    id: "RFD-1120",
    event: "Innovation Gala",
    amount: "₹ 1,750.00",
    status: "Processing",
    date: "21 Mar 2024",
  },
  {
    id: "RFD-1101",
    event: "Leadership Forum",
    amount: "₹ 2,100.00",
    status: "Completed",
    date: "08 Mar 2024",
  },
];

const Refunds = () => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Refunds</p>
          <h1 className="mt-2 text-3xl font-semibold text-textPrimary">
            Refund Request Center
          </h1>
          <p className="mt-2 text-sm text-textSecondary">
            Submit refund requests securely. Processing begins after admin approval.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient">
            <h2 className="text-lg font-semibold text-textPrimary">
              Submit a Refund Request
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-border bg-surface/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Payment Reference
                </p>
                <div className="mt-2 h-10 rounded-lg border border-border bg-background/60" />
              </div>
              <div className="rounded-xl border border-border bg-surface/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Reason
                </p>
                <div className="mt-2 h-20 rounded-lg border border-border bg-background/60" />
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-background shadow-accent-glow transition hover:opacity-90"
              >
                Request Refund
              </button>
              <p className="text-xs text-textSecondary">
                Refunds are verified against payment and ticket activation records.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface/70 p-6 shadow-card-ambient">
            <h2 className="text-lg font-semibold text-textPrimary">
              Recent Refunds
            </h2>
            <div className="mt-4 space-y-4">
              {refunds.map((refund) => (
                <div key={refund.id} className="rounded-xl border border-border bg-card-gradient p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {refund.id}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-textPrimary">
                    {refund.event}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-textSecondary">
                    <span>{refund.date}</span>
                    <span>{refund.amount}</span>
                  </div>
                  <p className="mt-2 text-xs text-primary">{refund.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Refunds;
