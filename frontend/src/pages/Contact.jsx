import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Contact form submission:", formData);
  };

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Contact</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Get in Touch</h1>
        <p className="text-base text-slate-300">
          Reach out to collaborate, sponsor, or learn more about Catalyst Society.
        </p>
      </header>

      <form
        className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
        onSubmit={handleSubmit}
      >
        <label className="block text-sm text-slate-300">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
            required
          />
        </label>
        <label className="block text-sm text-slate-300">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
            required
          />
        </label>
        <label className="block text-sm text-slate-300">
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help"
            rows={5}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Send Message
        </button>
      </form>
    </main>
  );
};

export default Contact;
