const teamMembers = [
  { name: "Ariana Patel", role: "President" },
  { name: "Jordan Lee", role: "Vice President" },
  { name: "Camila Gomez", role: "Head of Events" },
  { name: "Noah Brooks", role: "Education Lead" },
  { name: "Priya Singh", role: "Sponsorship Lead" },
  { name: "Ethan Park", role: "Community Lead" },
];

const Team = () => {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Team</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          Meet the Catalyst Team
        </h1>
        <p className="text-base text-slate-300">
          Our leadership team drives every program, event, and partnership.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-lg font-semibold text-cyan-200">
              {member.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-white">{member.name}</h2>
            <p className="text-sm text-slate-400">{member.role}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Team;
