const metrics = [
  { label: "Total Revenue", value: "₹ 4.92M", note: "Net verified payments" },
  { label: "Active Tickets", value: "12,408", note: "Webhook activated" },
  { label: "Refund Volume", value: "₹ 84,300", note: "Last 30 days" },
  { label: "Payment Success", value: "98.4%", note: "Conversion rate" },
];

const insights = [
  {
    title: "Peak Payment Hours",
    description: "Most completions occur between 6 PM and 9 PM IST.",
  },
  {
    title: "Fraud Signals",
    description: "Zero high-risk flags triggered in the last 14 days.",
  },
  {
    title: "Webhook Reliability",
    description: "99.98% of webhook events processed within 5 seconds.",
  },
];

const AdminAnalytics = () => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Admin Analytics
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-textPrimary">
            Catalyst Revenue Intelligence
          </h1>
          <p className="mt-2 text-sm text-textSecondary">
            Live operational metrics with webhook-verified transaction integrity.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {metric.label}
              </p>
              <p className="mt-3 text-2xl font-semibold text-textPrimary">
                {metric.value}
              </p>
              <p className="mt-2 text-xs text-textSecondary">{metric.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border bg-surface/70 p-6 shadow-card-ambient">
            <h2 className="text-lg font-semibold text-textPrimary">
              Payment Flow Health
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Success vs Failure
                </p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-[92%] bg-gold-gradient" />
                </div>
                <p className="mt-2 text-xs text-textSecondary">
                  92% verified payments, 8% pending or failed
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Refund Approval Cycle
                </p>
                <p className="mt-2 text-sm text-textPrimary">2.1 hours average</p>
                <p className="text-xs text-textSecondary">
                  Automated fraud scoring accelerates approvals.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient">
            <h2 className="text-lg font-semibold text-textPrimary">Executive Insights</h2>
            <div className="mt-4 space-y-4">
              {insights.map((insight) => (
                <div key={insight.title} className="rounded-xl border border-border bg-surface/70 p-4">
                  <p className="text-sm font-semibold text-textPrimary">
                    {insight.title}
                  </p>
                  <p className="mt-2 text-xs text-textSecondary">
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAnalytics;
