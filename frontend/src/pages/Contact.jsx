import { useState } from "react";
import CmsPage from "./CmsPage.jsx";

const fallbackContent = {
  title: "Contact",
  seoTitle: "Contact",
  seoDescription: "Contact Catalyst Society for partnerships and support.",
  sections: [
    {
      type: "hero",
      order: 0,
      content: {
        eyebrow: "Contact",
        title: "Get in Touch",
        subtitle: "Reach out to collaborate, sponsor, or learn more about Catalyst Society.",
      },
    },
  ],
};

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
  };

  return (
    <CmsPage pageKey="contact" fallback={fallbackContent}>
      <form
        className="space-y-4 rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient"
        onSubmit={handleSubmit}
      >
        <label className="block text-sm text-textSecondary">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
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
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help"
            rows={5}
            className="mt-2 w-full rounded-xl border border-border bg-elevated px-4 py-2 text-sm text-textPrimary focus:border-primary focus:outline-none"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-background shadow-accent-glow transition hover:brightness-105"
        >
          Send Message
        </button>
      </form>
    </CmsPage>
  );
};

export default Contact;
