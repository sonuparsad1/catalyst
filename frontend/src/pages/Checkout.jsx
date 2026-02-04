const lineItems = [
  { label: "Premium Event Pass", value: "Catalyst Summit 2024" },
  { label: "Access Tier", value: "Founder Circle" },
  { label: "Seat", value: "Priority Floor" },
];

const trustSignals = [
  "256-bit encryption for all transactions",
  "Webhook-verified ticket activation",
  "Instant invoice delivery with audit logs",
];

const Checkout = () => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border bg-card-gradient p-8 shadow-card-ambient">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold text-textPrimary">
            Secure Payment Verification
          </h1>
          <p className="mt-2 text-sm text-textSecondary">
            Complete your purchase with server-verified payment confirmation. Tickets
            activate only after webhook validation.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {lineItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-surface/70 p-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-textPrimary">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-border bg-surface/80 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-textSecondary">Total</p>
              <p className="text-2xl font-semibold text-textPrimary">₹ 2,499.00</p>
            </div>
            <div className="mt-4 grid gap-3 text-xs text-textSecondary">
              {trustSignals.map((signal) => (
                <p key={signal} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {signal}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface/70 p-8 shadow-card-ambient">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Payment Method
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-textPrimary">
            Card & UPI Enabled
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Payments are routed through Stripe with real-time fraud screening and
            webhook verification.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-border bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Cardholder Name
              </p>
              <div className="mt-2 h-10 rounded-lg border border-border bg-surface/60" />
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Card Details
              </p>
              <div className="mt-2 h-10 rounded-lg border border-border bg-surface/60" />
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                UPI ID
              </p>
              <div className="mt-2 h-10 rounded-lg border border-border bg-surface/60" />
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-background shadow-accent-glow transition hover:opacity-90"
          >
            Pay & Activate Ticket
          </button>
          <p className="mt-4 text-xs text-textSecondary">
            Payment confirmation can take a few seconds. Do not refresh the page
            during processing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
