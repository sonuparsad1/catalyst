import { useEffect, useMemo, useState } from "react";
import Seo from "../../components/Seo.jsx";
import {
  createSection,
  deleteSection,
  ensureCorePages,
  listCorePages,
  listSections,
  updateCorePage,
  updateSection,
} from "../../api/cms.js";

const emptySectionForm = {
  type: "hero",
  order: 0,
  content: "{}",
};

const AdminPages = () => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [pageForm, setPageForm] = useState({
    title: "",
    seoTitle: "",
    seoDescription: "",
    isPublished: true,
  });
  const [sectionForm, setSectionForm] = useState(emptySectionForm);
  const [sections, setSections] = useState([]);
  const [sectionEdits, setSectionEdits] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedPage = useMemo(
    () => pages.find((page) => page._id === selectedPageId),
    [pages, selectedPageId]
  );
  const orderedSections = useMemo(
    () => [...sections].sort((a, b) => a.order - b.order),
    [sections]
  );

  const loadPages = async () => {
    setLoading(true);
    try {
      await ensureCorePages();
      const data = await listCorePages();
      setPages(data || []);
    } catch (error) {
      setErrorMessage(error?.message || "Unable to load pages.");
    } finally {
      setLoading(false);
    }
  };

  const loadSections = async (pageId) => {
    if (!pageId) {
      setSections([]);
      setSectionEdits({});
      return;
    }
    try {
      const data = await listSections({ pageContentId: pageId });
      const loaded = data || [];
      setSections(loaded);
      setSectionEdits(
        loaded.reduce((acc, section) => {
          acc[section._id] = JSON.stringify(section.content, null, 2);
          return acc;
        }, {})
      );
    } catch (error) {
      setErrorMessage(error?.message || "Unable to load sections.");
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    loadSections(selectedPageId);
  }, [selectedPageId]);

  useEffect(() => {
    if (selectedPage) {
      setPageForm({
        title: selectedPage.title || "",
        seoTitle: selectedPage.seoTitle || "",
        seoDescription: selectedPage.seoDescription || "",
        isPublished: selectedPage.isPublished ?? true,
      });
    }
  }, [selectedPage]);

  const handleUpdatePage = async (pageId, updates) => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      const updated = await updateCorePage(pageId, updates);
      setPages((prev) => prev.map((page) => (page._id === updated._id ? updated : page)));
      setStatusMessage("Page updated.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to update page.");
    }
  };

  const handleCreateSection = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");
    if (!selectedPageId) {
      setErrorMessage("Select a page before adding sections.");
      return;
    }
    try {
      const content = JSON.parse(sectionForm.content || "{}");
      const created = await createSection({
        pageContentId: selectedPageId,
        type: sectionForm.type,
        order: Number(sectionForm.order) || 0,
        content,
      });
      setSections((prev) => [...prev, created].sort((a, b) => a.order - b.order));
      setSectionEdits((prev) => ({
        ...prev,
        [created._id]: JSON.stringify(created.content, null, 2),
      }));
      setSectionForm(emptySectionForm);
      setStatusMessage("Section added.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to create section.");
    }
  };

  const handleUpdateSection = async (sectionId, updates) => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      const updated = await updateSection(sectionId, updates);
      setSections((prev) =>
        prev.map((section) => (section._id === updated._id ? updated : section))
      );
      setSectionEdits((prev) => ({
        ...prev,
        [updated._id]: JSON.stringify(updated.content, null, 2),
      }));
      setStatusMessage("Section updated.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to update section.");
    }
  };

  const handleDeleteSection = async (sectionId) => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      await deleteSection(sectionId);
      setSections((prev) => prev.filter((section) => section._id !== sectionId));
      setSectionEdits((prev) => {
        const next = { ...prev };
        delete next[sectionId];
        return next;
      });
      setStatusMessage("Section deleted.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to delete section.");
    }
  };

  return (
    <section className="space-y-6">
      <Seo title="Admin Pages" description="Manage CMS pages and sections." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Pages</p>
          <h2 className="text-3xl font-semibold text-textPrimary">Core pages</h2>
          <p className="mt-2 text-sm text-textSecondary">
            Edit core pages and keep their routes intact.
          </p>
        </div>
        <button
          type="button"
          onClick={loadPages}
          className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
        >
          Refresh
        </button>
      </header>

      {(statusMessage || errorMessage) && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            errorMessage
              ? "border-red-500/40 bg-red-500/10 text-red-200"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          }`}
        >
          {errorMessage || statusMessage}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface/70 p-4">
            <h3 className="text-sm font-semibold text-textPrimary">Edit page metadata</h3>
            {selectedPage ? (
              <form
                className="mt-4 grid gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleUpdatePage(selectedPage._id, pageForm);
                }}
              >
                <input
                  type="text"
                  placeholder="Title"
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  value={pageForm.title}
                  onChange={(event) =>
                    setPageForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="SEO title"
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  value={pageForm.seoTitle}
                  onChange={(event) =>
                    setPageForm((prev) => ({ ...prev, seoTitle: event.target.value }))
                  }
                />
                <textarea
                  placeholder="SEO description"
                  className="min-h-[80px] rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  value={pageForm.seoDescription}
                  onChange={(event) =>
                    setPageForm((prev) => ({ ...prev, seoDescription: event.target.value }))
                  }
                />
                <button
                  type="submit"
                  className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background"
                >
                  Save metadata
                </button>
              </form>
            ) : (
              <p className="mt-4 text-xs text-textSecondary">
                Select a core page to edit its metadata.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-surface/70 p-4">
            <h3 className="text-sm font-semibold text-textPrimary">Pages</h3>
            {loading ? (
              <p className="mt-4 text-xs text-textSecondary">Loading pages...</p>
            ) : (
              <div className="mt-4 grid gap-3">
                {pages.map((page) => (
                  <div
                    key={page._id}
                    className={`rounded-2xl border px-4 py-3 text-sm transition ${
                      selectedPageId === page._id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted">
                          {page.pageKey}
                        </p>
                        <p className="text-base font-semibold text-textPrimary">{page.title}</p>
                        <p className="text-xs text-textSecondary">
                          {page.isPublished ? "Published" : "Draft"}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setSelectedPageId(page._id)}
                          className="rounded-full border border-border px-3 py-1 text-textSecondary transition hover:border-primary hover:text-primary"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdatePage(page._id, { isPublished: !page.isPublished })
                          }
                          className="rounded-full border border-primary px-3 py-1 text-primary transition hover:bg-primary/10"
                        >
                          {page.isPublished ? "Unpublish" : "Publish"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {pages.length === 0 && (
                  <p className="text-xs text-textSecondary">No pages yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface/70 p-4">
            <h3 className="text-sm font-semibold text-textPrimary">Selected page</h3>
            {selectedPage ? (
              <div className="mt-4 space-y-2 text-xs text-textSecondary">
                <p className="text-base font-semibold text-textPrimary">{selectedPage.title}</p>
                <p>Page key: {selectedPage.pageKey}</p>
                <p>Status: {selectedPage.isPublished ? "Published" : "Draft"}</p>
              </div>
            ) : (
              <p className="mt-4 text-xs text-textSecondary">Select a page to manage sections.</p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-surface/70 p-4">
            <h3 className="text-sm font-semibold text-textPrimary">Add section</h3>
            <form className="mt-4 grid gap-3" onSubmit={handleCreateSection}>
              <select
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={sectionForm.type}
                onChange={(event) =>
                  setSectionForm((prev) => ({ ...prev, type: event.target.value }))
                }
              >
                {[
                  "hero",
                  "text",
                  "image",
                  "grid",
                  "stats",
                  "cta",
                ].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={sectionForm.order}
                onChange={(event) =>
                  setSectionForm((prev) => ({ ...prev, order: event.target.value }))
                }
              />
              <textarea
                className="min-h-[120px] rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={sectionForm.content}
                onChange={(event) =>
                  setSectionForm((prev) => ({ ...prev, content: event.target.value }))
                }
                placeholder='{"title":"Hero title"}'
              />
              <button
                type="submit"
                className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background"
              >
                Add section
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-surface/70 p-4">
            <h3 className="text-sm font-semibold text-textPrimary">Sections</h3>
            <div className="mt-4 grid gap-3">
              {orderedSections.map((section) => (
                <div key={section._id} className="rounded-2xl border border-border bg-background p-3">
                  <div className="flex items-center justify-between text-xs text-textSecondary">
                    <span>{section.type}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSection(section._id)}
                      className="text-red-200"
                    >
                      Remove
                    </button>
                  </div>
                  <label className="mt-2 flex items-center gap-2 text-xs text-textSecondary">
                    Order
                    <input
                      type="number"
                      className="w-20 rounded border border-border bg-surface/70 px-2 py-1 text-xs"
                      value={section.order}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        setSections((prev) =>
                          prev.map((item) =>
                            item._id === section._id ? { ...item, order: value } : item
                          )
                        );
                      }}
                      onBlur={(event) => {
                        const value = Number(event.target.value);
                        if (!Number.isNaN(value)) {
                          handleUpdateSection(section._id, { order: value });
                        }
                      }}
                    />
                  </label>
                  <textarea
                    className="mt-2 min-h-[90px] w-full rounded-lg border border-border bg-surface/70 px-2 py-2 text-xs"
                    value={sectionEdits[section._id] || ""}
                    onChange={(event) =>
                      setSectionEdits((prev) => ({
                        ...prev,
                        [section._id]: event.target.value,
                      }))
                    }
                    onBlur={() => {
                      try {
                        const parsed = JSON.parse(sectionEdits[section._id] || "{}");
                        handleUpdateSection(section._id, { content: parsed });
                      } catch (error) {
                        setErrorMessage("Section content must be valid JSON.");
                      }
                    }}
                  />
                </div>
              ))}
              {sections.length === 0 && (
                <p className="text-xs text-textSecondary">No sections yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPages;
