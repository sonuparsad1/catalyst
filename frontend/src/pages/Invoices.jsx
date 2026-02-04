const invoices = [
  {
    id: "INV-4093",
    event: "Catalyst Summit 2024",
    amount: "₹ 2,499.00",
    date: "24 Mar 2024",
    status: "Issued",
  },
  {
    id: "INV-4021",
    event: "Innovation Gala",
    amount: "₹ 1,750.00",
    date: "19 Mar 2024",
    status: "Issued",
  },
];

const Invoices = () => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Invoices</p>
          <h1 className="mt-2 text-3xl font-semibold text-textPrimary">
            Premium Invoice Vault
          </h1>
          <p className="mt-2 text-sm text-textSecondary">
            Download verified invoices generated after successful webhook confirmation.
          </p>
        </div>
        <div className="mt-8 grid gap-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {invoice.id}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-textPrimary">
                    {invoice.event}
                  </p>
                  <p className="mt-1 text-xs text-textSecondary">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-textPrimary">
                    {invoice.amount}
                  </p>
                  <p className="mt-2 text-xs text-emerald-300">{invoice.status}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
                >
                  Download PDF
                </button>
                <span className="text-xs text-textSecondary">
                  Stored in secure invoice vault
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Invoices;
