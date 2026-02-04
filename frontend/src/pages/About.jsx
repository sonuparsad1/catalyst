const About = () => {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">About Us</p>
        <h1 className="text-3xl font-semibold text-textPrimary sm:text-4xl">
          Catalyst Society
        </h1>
        <p className="text-base text-textSecondary">
          Catalyst Society empowers students to ignite ideas, innovate boldly, and lead
          transformational change across campus communities.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/20">
          <h2 className="text-lg font-semibold text-textPrimary">Vision</h2>
          <p className="mt-3 text-sm text-textSecondary">
            A campus culture where every student is equipped to create, collaborate, and lead
            meaningful impact.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/20">
          <h2 className="text-lg font-semibold text-textPrimary">Mission</h2>
          <p className="mt-3 text-sm text-textSecondary">
            Deliver experiential programs, mentorship, and events that spark innovation and
            elevate student leadership.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/20">
          <h2 className="text-lg font-semibold text-textPrimary">About</h2>
          <p className="mt-3 text-sm text-textSecondary">
            From hackathons to community initiatives, we curate high-impact experiences that
            connect students with industry, alumni, and peers.
          </p>
        </div>
      </section>
      <section className="rounded-3xl border border-border bg-elevated p-8 shadow-sm shadow-black/20">
        <h3 className="text-xl font-semibold text-textPrimary">What we value</h3>
        <ul className="mt-4 grid gap-4 text-sm text-textSecondary sm:grid-cols-2">
          <li className="rounded-xl border border-border bg-surface p-4">
            Collaborative learning and shared leadership across disciplines.
          </li>
          <li className="rounded-xl border border-border bg-surface p-4">
            Innovation driven by community needs and sustainable outcomes.
          </li>
          <li className="rounded-xl border border-border bg-surface p-4">
            Inclusive spaces that empower new voices and fresh ideas.
          </li>
          <li className="rounded-xl border border-border bg-surface p-4">
            Growth-focused mentorship and professional development opportunities.
          </li>
        </ul>
      </section>
    </main>
  );
};

export default About;
