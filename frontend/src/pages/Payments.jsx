const payments = [
  {
    id: "PMT-02493",
    event: "Catalyst Summit 2024",
    amount: "₹ 2,499.00",
    status: "Verified",
    date: "24 Mar 2024",
  },
  {
    id: "PMT-02420",
    event: "Innovation Gala",
    amount: "₹ 1,750.00",
    status: "Pending",
    date: "19 Mar 2024",
  },
  {
    id: "PMT-02381",
    event: "Leadership Forum",
    amount: "₹ 2,100.00",
    status: "Failed",
    date: "05 Mar 2024",
  },
];

const statusStyles = {
  Verified: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Pending: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
  Failed: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const Payments = () => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Payments</p>
            <h1 className="mt-2 text-3xl font-semibold text-textPrimary">
              Payment Verification Center
            </h1>
            <p className="mt-2 text-sm text-textSecondary">
              All payments are confirmed through secure webhooks before activating
              tickets.
            </p>
          </div>
          <div className="rounded-full border border-border bg-surface/70 px-4 py-2 text-xs text-textSecondary">
            3 Transactions
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {payment.id}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-textPrimary">
                    {payment.event}
                  </p>
                  <p className="mt-1 text-xs text-textSecondary">
                    {payment.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-textPrimary">
                    {payment.amount}
                  </p>
                  <span
                    className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs ${
                      statusStyles[payment.status]
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 grid gap-3 text-xs text-textSecondary md:grid-cols-2">
                <p className="rounded-lg border border-border bg-surface/70 px-3 py-2">
                  Ticket activation: {payment.status === "Verified" ? "Active" : "On hold"}
                </p>
                <p className="rounded-lg border border-border bg-surface/70 px-3 py-2">
                  Webhook verification: {payment.status === "Failed" ? "Rejected" : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Payments;
