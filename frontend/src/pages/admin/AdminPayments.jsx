import Seo from "../../components/Seo.jsx";

const payments = [
  { id: "pay-9921", member: "Lena Ortiz", amount: "$640", status: "Settled" },
  { id: "pay-9922", member: "Drew Park", amount: "$420", status: "Pending" },
  { id: "pay-9923", member: "Amir Nolan", amount: "$980", status: "Settled" },
];

const AdminPayments = () => {
  return (
    <section className="space-y-6">
      <Seo title="Admin Payments" description="Track payments and reconciliation." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Payments
          </p>
          <h2 className="text-3xl font-semibold text-textPrimary">
            Payment monitoring
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Review settlements and manage revenue flow.
          </p>
        </div>
        <button className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10">
          Export ledger
        </button>
      </header>

      <div className="grid gap-3">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-surface/70 p-4 text-sm md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                {payment.id}
              </p>
              <p className="text-base font-semibold text-textPrimary">
                {payment.member}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-textPrimary">
                {payment.amount}
              </span>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  payment.status === "Settled"
                    ? "border-primary text-primary"
                    : "border-border text-textSecondary"
                }`}
              >
                {payment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminPayments;
