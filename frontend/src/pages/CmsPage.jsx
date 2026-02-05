import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { getCorePageByKey, getPageBySlug } from "../api/cms.js";

const SectionHero = ({ content }) => (
  <section className="rounded-3xl border border-border bg-card-gradient px-6 py-12 text-center text-textPrimary shadow-card-ambient">
    <p className="text-xs uppercase tracking-[0.3em] text-muted">
      {content?.eyebrow || "Catalyst Society"}
    </p>
    <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
      {content?.title || "Welcome"}
    </h1>
    {content?.subtitle && (
      <p className="mx-auto mt-4 max-w-2xl text-sm text-textSecondary">
        {content.subtitle}
      </p>
    )}
    {content?.ctaLabel && content?.ctaLink && (
      <a
        href={content.ctaLink}
        className="mt-6 inline-flex items-center justify-center rounded-full border border-primary px-6 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
      >
        {content.ctaLabel}
      </a>
    )}
  </section>
);

const SectionText = ({ content }) => (
  <section className="rounded-3xl border border-border bg-surface/70 px-6 py-8 shadow-card-ambient">
    <h2 className="text-2xl font-semibold text-textPrimary">
      {content?.heading || "Section"}
    </h2>
    <p className="mt-3 text-sm text-textSecondary">
      {content?.body || "Add content in the CMS to populate this section."}
    </p>
  </section>
);

const SectionImage = ({ content }) => (
  <section className="overflow-hidden rounded-3xl border border-border bg-surface/70 shadow-card-ambient">
    {content?.src && (
      <img src={content.src} alt={content?.alt || ""} className="h-64 w-full object-cover" />
    )}
    {content?.caption && (
      <p className="px-6 py-4 text-xs text-textSecondary">{content.caption}</p>
    )}
  </section>
);

const SectionGrid = ({ content }) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold text-textPrimary">
      {content?.heading || "Highlights"}
    </h2>
    <div className="grid gap-4 md:grid-cols-3">
      {(content?.items || []).map((item, index) => (
        <div
          key={`${item?.title}-${index}`}
          className="rounded-2xl border border-border bg-surface/70 p-4 text-sm text-textSecondary"
        >
          <p className="text-base font-semibold text-textPrimary">{item?.title}</p>
          <p className="mt-2 text-xs">{item?.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const SectionStats = ({ content }) => (
  <section className="rounded-3xl border border-border bg-surface/70 px-6 py-8">
    <h2 className="text-2xl font-semibold text-textPrimary">
      {content?.heading || "Impact"}
    </h2>
    <div className="mt-4 grid gap-4 md:grid-cols-3">
      {(content?.stats || []).map((stat, index) => (
        <div key={`${stat?.label}-${index}`} className="rounded-2xl border border-border p-4">
          <p className="text-2xl font-semibold text-textPrimary">{stat?.value}</p>
          <p className="text-xs text-textSecondary">{stat?.label}</p>
        </div>
      ))}
    </div>
  </section>
);

const SectionCta = ({ content }) => (
  <section className="rounded-3xl border border-border bg-card-gradient px-6 py-10 text-center">
    <h2 className="text-2xl font-semibold text-textPrimary">
      {content?.heading || "Ready to join?"}
    </h2>
    {content?.body && (
      <p className="mt-3 text-sm text-textSecondary">{content.body}</p>
    )}
    {content?.buttonLabel && content?.buttonLink && (
      <a
        href={content.buttonLink}
        className="mt-5 inline-flex items-center justify-center rounded-full border border-primary px-6 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
      >
        {content.buttonLabel}
      </a>
    )}
  </section>
);

const sectionRenderers = {
  hero: SectionHero,
  text: SectionText,
  image: SectionImage,
  grid: SectionGrid,
  stats: SectionStats,
  cta: SectionCta,
};

const CmsPage = ({ slug: slugProp, pageKey, fallback, children }) => {
  const params = useParams();
  const slug = slugProp || params.slug;
  const resolvedKey = pageKey || slug;
  const [page, setPage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadPage = async () => {
      setLoading(true);
      setError("");
      try {
        const data = pageKey ? await getCorePageByKey(pageKey) : await getPageBySlug(slug);
        if (isMounted) {
          setPage(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Page unavailable.");
          setPage(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (resolvedKey) {
      loadPage();
    }

    return () => {
      isMounted = false;
    };
  }, [pageKey, resolvedKey, slug]);

  const seo = useMemo(
    () => ({
      title:
        page?.seoTitle ||
        page?.title ||
        fallback?.seoTitle ||
        fallback?.title ||
        "Catalyst Society",
      description:
        page?.seoDescription ||
        fallback?.seoDescription ||
        "Catalyst Society content",
    }),
    [fallback, page]
  );

  const sections = (page?.sections || []).length > 0 ? page.sections : fallback?.sections || [];

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6 text-sm text-muted">
        Loading page...
      </section>
    );
  }

  if (!page && (!fallback || sections.length === 0)) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6 text-sm text-muted">
        {error || "Page not found."}
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <Seo title={seo.title} description={seo.description} />
      {sections.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-surface/70 px-6 py-12 text-center text-sm text-textSecondary">
          No sections have been published for this page yet.
        </div>
      ) : (
        sections
          .sort((a, b) => a.order - b.order)
          .map((section) => {
            const Renderer = sectionRenderers[section.type];
            if (!Renderer) {
              return (
                <div
                  key={section._id || section.id || `${section.type}-${section.order}`}
                  className="rounded-2xl border border-border bg-surface/70 p-4 text-sm text-textSecondary"
                >
                  Unsupported section type: {section.type}
                </div>
              );
            }
            return (
              <Renderer
                key={section._id || section.id || `${section.type}-${section.order}`}
                content={section.content}
              />
            );
          })
      )}
      {children}
    </section>
  );
};

export default CmsPage;
