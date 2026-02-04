import Seo from "../../components/Seo.jsx";

const metrics = [
  { label: "Active members", value: "1,482", delta: "+4.2%" },
  { label: "Upcoming events", value: "12", delta: "+2" },
  { label: "Tickets sold", value: "3,910", delta: "+9.1%" },
  { label: "Monthly revenue", value: "$128k", delta: "+6.8%" },
];

const alerts = [
  {
    title: "VIP Gala is 87% sold",
    detail: "Release the final 120 tickets and notify waitlist members.",
  },
  {
    title: "Refund queue",
    detail: "5 requests are awaiting approval within 24 hours.",
  },
  {
    title: "Attendance check",
    detail: "Scanner uptime 99.4% across last weekend events.",
  },
];

const AdminDashboard = () => {
  return (
    <section className="space-y-8">
      <Seo title="Admin Dashboard" description="Catalyst Society admin command center." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Command center
          </p>
          <h2 className="text-3xl font-semibold text-textPrimary">
            Administration overview
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Monitor engagement, revenue, and operations across Catalyst Society.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10">
            Export report
          </button>
          <button className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background shadow-accent-glow">
            Publish update
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-border bg-surface/70 p-4"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              {metric.label}
            </p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-2xl font-semibold text-textPrimary">
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-primary">
                {metric.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-surface/70 p-6">
          <h3 className="text-lg font-semibold text-textPrimary">
            Live operations
          </h3>
          <p className="mt-2 text-sm text-textSecondary">
            Track active initiatives and keep team alignment tight.
          </p>
          <div className="mt-6 grid gap-4">
            {alerts.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-background/60 p-4"
              >
                <p className="text-sm font-semibold text-textPrimary">
                  {item.title}
                </p>
                <p className="mt-2 text-xs text-textSecondary">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface/70 p-6">
          <h3 className="text-lg font-semibold text-textPrimary">
            Quick actions
          </h3>
          <p className="mt-2 text-sm text-textSecondary">
            Keep the momentum with instant admin controls.
          </p>
          <div className="mt-6 grid gap-3 text-sm">
            {[
              "Publish new event",
              "Start attendance scan",
              "Issue refund batch",
              "Invite VIP members",
            ].map((action) => (
              <button
                key={action}
                className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-left text-textPrimary transition hover:border-primary/70"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
