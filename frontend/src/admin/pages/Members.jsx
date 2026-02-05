import { useEffect, useState } from "react";
import Seo from "../../components/Seo.jsx";
import {
  createMember,
  deleteMember,
  listMembers,
  updateMember,
} from "../../api/members.js";

const emptyMemberForm = {
  name: "",
  email: "",
  designation: "",
  status: "ACTIVE",
  order: 0,
  avatarUrl: "",
};

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [memberForm, setMemberForm] = useState(emptyMemberForm);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadMembers = async () => {
    try {
      const data = await listMembers();
      setMembers(data || []);
    } catch (error) {
      setErrorMessage(error?.message || "Unable to load members.");
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleCreateMember = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");
    try {
      const payload = {
        name: memberForm.name,
        email: memberForm.email,
        designation: memberForm.designation,
        status: memberForm.status,
        order: Number(memberForm.order) || 0,
        profile: { avatarUrl: memberForm.avatarUrl },
      };
      const created = await createMember(payload);
      setMembers((prev) => [created, ...prev]);
      setMemberForm(emptyMemberForm);
      setStatusMessage("Member created.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to create member.");
    }
  };

  const handleUpdateMember = async (memberId, updates) => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      const updated = await updateMember(memberId, updates);
      setMembers((prev) => prev.map((member) => (member._id === updated._id ? updated : member)));
      setStatusMessage("Member updated.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to update member.");
    }
  };

  const handleDeleteMember = async (memberId) => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      await deleteMember(memberId);
      setMembers((prev) => prev.filter((member) => member._id !== memberId));
      setStatusMessage("Member deleted.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to delete member.");
    }
  };

  return (
    <section className="space-y-6">
      <Seo title="Admin Members" description="Manage member profiles and access." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Members</p>
          <h2 className="text-3xl font-semibold text-textPrimary">Member directory</h2>
          <p className="mt-2 text-sm text-textSecondary">
            Maintain premium access tiers and member support.
          </p>
        </div>
        <button
          type="button"
          onClick={loadMembers}
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
          <h3 className="text-sm font-semibold text-textPrimary">Add member</h3>
          <form className="mt-4 grid gap-3" onSubmit={handleCreateMember}>
            <input
              type="text"
              placeholder="Name"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={memberForm.name}
              onChange={(event) =>
                setMemberForm((prev) => ({ ...prev, name: event.target.value }))
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={memberForm.email}
              onChange={(event) =>
                setMemberForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
            <input
              type="text"
              placeholder="Designation"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={memberForm.designation}
              onChange={(event) =>
                setMemberForm((prev) => ({ ...prev, designation: event.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Avatar URL"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={memberForm.avatarUrl}
              onChange={(event) =>
                setMemberForm((prev) => ({ ...prev, avatarUrl: event.target.value }))
              }
            />
            <div className="grid gap-3 md:grid-cols-2">
              <select
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={memberForm.status}
                onChange={(event) =>
                  setMemberForm((prev) => ({ ...prev, status: event.target.value }))
                }
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="ALUMNI">Alumni</option>
              </select>
              <input
                type="number"
                placeholder="Order"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={memberForm.order}
                onChange={(event) =>
                  setMemberForm((prev) => ({ ...prev, order: event.target.value }))
                }
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background"
            >
              Add member
            </button>
          </form>
        </div>

        <div className="grid gap-3">
          {members.map((member) => (
            <div
              key={member._id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/70 p-4 text-sm md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-base font-semibold text-textPrimary">{member.name}</p>
                <p className="text-xs text-textSecondary">
                  {member.designation || "Member"} • {member.email}
                </p>
                <p className="text-xs text-textSecondary">Order {member.order ?? 0}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    member.status === "ACTIVE"
                      ? "border-primary text-primary"
                      : "border-border text-textSecondary"
                  }`}
                >
                  {member.status}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateMember(member._id, {
                      status: member.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
                    })
                  }
                  className="rounded-full border border-primary px-3 py-1 text-primary transition hover:bg-primary/10"
                >
                  Toggle status
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteMember(member._id)}
                  className="rounded-full border border-border px-3 py-1 text-red-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <p className="text-sm text-textSecondary">No members found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminMembers;
