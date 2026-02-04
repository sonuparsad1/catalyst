import Seo from "../../components/Seo.jsx";

const ticketBatches = [
  {
    id: "batch-901",
    event: "Catalyst Gala",
    tier: "VIP",
    sold: 180,
    total: 200,
  },
  {
    id: "batch-902",
    event: "Founder’s Salon",
    tier: "Standard",
    sold: 74,
    total: 120,
  },
  {
    id: "batch-903",
    event: "Investor Roundtable",
    tier: "Invite",
    sold: 58,
    total: 64,
  },
];

const AdminTickets = () => {
  return (
    <section className="space-y-6">
      <Seo title="Admin Tickets" description="Manage ticket inventory and access tiers." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Tickets
          </p>
          <h2 className="text-3xl font-semibold text-textPrimary">
            Ticket inventory
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Monitor capacity, release waves, and VIP allocations.
          </p>
        </div>
        <button className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10">
          Release new wave
        </button>
      </header>

      <div className="grid gap-4">
        {ticketBatches.map((batch) => (
          <div
            key={batch.id}
            className="rounded-2xl border border-border bg-surface/70 p-4"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  {batch.event}
                </p>
                <h3 className="text-lg font-semibold text-textPrimary">
                  {batch.tier} Access
                </h3>
                <p className="text-sm text-textSecondary">
                  {batch.sold} / {batch.total} sold
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button className="rounded-full border border-border px-3 py-1 text-textPrimary transition hover:border-primary/70">
                  Adjust cap
                </button>
                <button className="rounded-full border border-primary px-3 py-1 text-primary transition hover:bg-primary/10">
                  Export list
                </button>
              </div>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-border">
              <div
                className="h-2 rounded-full bg-gold-gradient"
                style={{ width: `${(batch.sold / batch.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminTickets;
