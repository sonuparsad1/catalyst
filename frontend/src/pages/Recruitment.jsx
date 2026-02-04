import { useState } from "react";

const Recruitment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">Recruitment</p>
        <h1 className="text-3xl font-semibold text-textPrimary sm:text-4xl">
          Join the Catalyst Team
        </h1>
        <p className="text-base text-textSecondary">
          We are always looking for passionate members to help us deliver impactful
          experiences across campus.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient">
          <h2 className="text-lg font-semibold text-textPrimary">Open Roles</h2>
          <ul className="mt-4 space-y-4 text-sm text-textSecondary">
            <li className="rounded-xl border border-border bg-elevated p-4">
              Events Coordinator - Plan and execute signature campus events.
            </li>
            <li className="rounded-xl border border-border bg-elevated p-4">
              Partnerships Lead - Build relationships with sponsors and alumni.
            </li>
            <li className="rounded-xl border border-border bg-elevated p-4">
              Community Lead - Grow our membership and student engagement.
            </li>
            <li className="rounded-xl border border-border bg-elevated p-4">
              Media & Design - Craft visuals, social content, and brand storytelling.
            </li>
          </ul>
        </div>

        <form
          className="space-y-4 rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-semibold text-textPrimary">Application Form</h2>
          <div className="space-y-3">
            <label className="block text-sm text-textSecondary">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="mt-2 w-full rounded-xl border border-border bg-elevated px-4 py-2 text-sm text-textPrimary focus:border-primary focus:outline-none"
                required
              />
            </label>
            <label className="block text-sm text-textSecondary">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-border bg-elevated px-4 py-2 text-sm text-textPrimary focus:border-primary focus:outline-none"
                required
              />
            </label>
            <label className="block text-sm text-textSecondary">
              Department
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Computer Science"
                className="mt-2 w-full rounded-xl border border-border bg-elevated px-4 py-2 text-sm text-textPrimary focus:border-primary focus:outline-none"
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-background shadow-accent-glow transition hover:brightness-105"
          >
            Apply
          </button>
        </form>
      </section>
    </main>
  );
};

export default Recruitment;
