import { useEffect, useState } from "react";
import Seo from "../../components/Seo.jsx";
import {
  createMenu,
  deleteMenu,
  listMenus,
  updateMenu,
} from "../../api/cms.js";

const emptyMenuForm = {
  label: "",
  slug: "",
  order: 0,
  visible: true,
  parent: "",
};

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuForm, setMenuForm] = useState(emptyMenuForm);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadMenus = async () => {
    try {
      const data = await listMenus();
      setMenuItems(data || []);
    } catch (error) {
      setErrorMessage(error?.message || "Unable to load menu items.");
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");
    try {
      const payload = {
        ...menuForm,
        order: Number(menuForm.order) || 0,
        parent: menuForm.parent || null,
      };
      const created = await createMenu(payload);
      setMenuItems((prev) => [...prev, created].sort((a, b) => a.order - b.order));
      setMenuForm(emptyMenuForm);
      setStatusMessage("Menu item created.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to create menu item.");
    }
  };

  const handleUpdate = async (itemId, updates) => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      const updated = await updateMenu(itemId, updates);
      setMenuItems((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      setStatusMessage("Menu item updated.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to update menu item.");
    }
  };

  const handleDelete = async (itemId) => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      await deleteMenu(itemId);
      setMenuItems((prev) => prev.filter((item) => item._id !== itemId));
      setStatusMessage("Menu item deleted.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to delete menu item.");
    }
  };

  return (
    <section className="space-y-6">
      <Seo title="Admin Menu" description="Manage navbar and footer menus." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Menu</p>
          <h2 className="text-3xl font-semibold text-textPrimary">Navigation menu</h2>
          <p className="mt-2 text-sm text-textSecondary">
            Control the navigation structure and visibility.
          </p>
        </div>
        <button
          type="button"
          onClick={loadMenus}
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

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-border bg-surface/70 p-4">
          <h3 className="text-sm font-semibold text-textPrimary">Add menu item</h3>
          <form className="mt-4 grid gap-3" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Label"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={menuForm.label}
              onChange={(event) =>
                setMenuForm((prev) => ({ ...prev, label: event.target.value }))
              }
              required
            />
            <input
              type="text"
              placeholder="Slug (e.g. about)"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={menuForm.slug}
              onChange={(event) =>
                setMenuForm((prev) => ({ ...prev, slug: event.target.value }))
              }
              required
            />
            <input
              type="number"
              placeholder="Order"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={menuForm.order}
              onChange={(event) =>
                setMenuForm((prev) => ({ ...prev, order: event.target.value }))
              }
            />
            <select
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={menuForm.parent}
              onChange={(event) =>
                setMenuForm((prev) => ({ ...prev, parent: event.target.value }))
              }
            >
              <option value="">Top level</option>
              {menuItems.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.label}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-xs text-textSecondary">
              <input
                type="checkbox"
                checked={menuForm.visible}
                onChange={(event) =>
                  setMenuForm((prev) => ({ ...prev, visible: event.target.checked }))
                }
              />
              Visible
            </label>
            <button
              type="submit"
              className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background"
            >
              Add menu item
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-border bg-surface/70 p-4">
          <h3 className="text-sm font-semibold text-textPrimary">Menu items</h3>
          <div className="mt-4 grid gap-3">
            {menuItems.map((item) => (
              <div key={item._id} className="rounded-2xl border border-border bg-background p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.slug}</p>
                    <p className="text-base font-semibold text-textPrimary">{item.label}</p>
                    <p className="text-xs text-textSecondary">
                      Order {item.order} • {item.visible ? "Visible" : "Hidden"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => handleUpdate(item._id, { visible: !item.visible })}
                      className="rounded-full border border-primary px-3 py-1 text-primary"
                    >
                      {item.visible ? "Hide" : "Show"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdate(item._id, { order: item.order + 1 })
                      }
                      className="rounded-full border border-border px-3 py-1 text-textSecondary"
                    >
                      Move down
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="rounded-full border border-border px-3 py-1 text-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {menuItems.length === 0 && (
              <p className="text-xs text-textSecondary">No menu items yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminMenu;
