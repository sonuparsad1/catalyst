const plans = [
  {
    name: "Bronze",
    price: "$500",
    perks: [
      "Logo placement on event materials",
      "Social media thank-you post",
      "2 complimentary event tickets",
    ],
  },
  {
    name: "Silver",
    price: "$1,500",
    perks: [
      "Featured logo on website",
      "Co-host one workshop",
      "5 complimentary event tickets",
    ],
  },
  {
    name: "Gold",
    price: "$3,000",
    perks: [
      "Premium logo placement & stage mentions",
      "Dedicated recruitment session",
      "10 complimentary event tickets",
    ],
  },
];

const Sponsorship = () => {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">Sponsorship</p>
        <h1 className="text-3xl font-semibold text-textPrimary sm:text-4xl">
          Partner With Catalyst Society
        </h1>
        <p className="text-base text-textSecondary">
          Support student innovation and connect with emerging leaders through our sponsor
          packages.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/20"
          >
            <div>
              <h2 className="text-xl font-semibold text-textPrimary">{plan.name}</h2>
              <p className="mt-2 text-2xl font-semibold text-primary">{plan.price}</p>
              <ul className="mt-4 space-y-3 text-sm text-textSecondary">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-6 w-full rounded-full border border-border px-4 py-2 text-sm font-semibold text-textPrimary transition hover:bg-elevated">
              Become a Sponsor
            </button>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Sponsorship;
