const payments = [
  {
    id: "PMT-02493",
    member: "Aarav Kapoor",
    email: "aarav@catalystsociety.org",
    event: "Catalyst Summit 2024",
    amount: "₹ 2,499.00",
    status: "Verified",
  },
  {
    id: "PMT-02451",
    member: "Meera Shah",
    email: "meera@catalystsociety.org",
    event: "Innovation Gala",
    amount: "₹ 1,750.00",
    status: "Pending",
  },
  {
    id: "PMT-02402",
    member: "Rahul Verma",
    email: "rahul@catalystsociety.org",
    event: "Leadership Forum",
    amount: "₹ 2,100.00",
    status: "Refunded",
  },
];

const statusBadge = {
  Verified: "bg-emerald-500/10 text-emerald-300",
  Pending: "bg-yellow-500/10 text-yellow-300",
  Refunded: "bg-rose-500/10 text-rose-300",
};

const AdminPayments = () => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Admin Payments
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-textPrimary">
              Payment Operations Console
            </h1>
            <p className="mt-2 text-sm text-textSecondary">
              Monitor payment activity with audit logs and webhook verification.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
          >
            Export Report
          </button>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card-gradient shadow-card-ambient">
          <div className="grid grid-cols-[1.2fr_1fr_1.2fr_0.8fr_0.8fr] gap-4 border-b border-border px-6 py-4 text-xs uppercase tracking-[0.2em] text-muted">
            <span>Member</span>
            <span>Email</span>
            <span>Event</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-border">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="grid grid-cols-[1.2fr_1fr_1.2fr_0.8fr_0.8fr] gap-4 px-6 py-5 text-sm text-textPrimary"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {payment.id}
                  </p>
                  <p className="mt-2 font-semibold">{payment.member}</p>
                </div>
                <p className="text-xs text-textSecondary">{payment.email}</p>
                <p>{payment.event}</p>
                <p className="font-semibold">{payment.amount}</p>
                <span
                  className={`inline-flex h-7 items-center justify-center rounded-full px-3 text-xs ${
                    statusBadge[payment.status]
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPayments;
