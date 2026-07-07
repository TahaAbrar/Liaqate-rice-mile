import { useState } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";
import { useAdminData, type TeamMember } from "../../context/AdminDataContext";
import ImagePicker from "./ImagePicker";
import ConfirmModal from "./ConfirmModal";

const EMPTY_MEMBER = (): TeamMember => ({
  id: "",
  name: "",
  rank: "",
  image: "",
  description: "",
});

export default function TeamAdmin() {
  const { teamSection, updateData } = useAdminData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TeamMember>(EMPTY_MEMBER());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const isFormOpen = editingId !== null || form.id === "__new__";

  const startAdd = () => {
    setEditingId(null);
    setForm({ ...EMPTY_MEMBER(), id: "__new__" });
  };

  const startEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setForm({ ...member });
  };

  const closeForm = () => {
    setEditingId(null);
    setForm(EMPTY_MEMBER());
  };

  const saveForm = () => {
    if (!form.name.trim()) return;
    const member: TeamMember = {
      ...form,
      id: form.id === "__new__" ? `team-${Date.now()}` : form.id,
    };
    const members =
      form.id === "__new__"
        ? [...teamSection.members, member]
        : teamSection.members.map((m) => (m.id === member.id ? member : m));
    updateData("teamSection", { ...teamSection, members });
    closeForm();
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    updateData("teamSection", {
      ...teamSection,
      members: teamSection.members.filter((m) => m.id !== deleteId),
    });
    if (editingId === deleteId) closeForm();
    setDeleteId(null);
  };

  const labelClass = "text-[10px] font-bold text-on-surface-variant uppercase";

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-serif-title text-lg text-secondary font-semibold">Team Employees</h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Shown on About Us — &ldquo;The Architects of Quality&rdquo; section.
          </p>
        </div>
        <button
          type="button"
          onClick={startAdd}
          className="px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold uppercase flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {teamSection.members.map((member) => (
          <div
            key={member.id}
            className={`flex items-center gap-3 p-3 border rounded-xl ${
              editingId === member.id ? "border-primary bg-primary/5" : "border-outline-variant/30"
            }`}
          >
            {member.image ? (
              <img src={member.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary truncate">{member.name || "Unnamed"}</p>
              <p className="text-[10px] text-slate-400 uppercase truncate">{member.rank}</p>
            </div>
            <button type="button" onClick={() => startEdit(member)} className="p-2 hover:bg-slate-100 rounded-lg">
              <Edit className="w-4 h-4 text-primary" />
            </button>
            <button
              type="button"
              onClick={() => setDeleteId(member.id)}
              className="p-2 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {teamSection.members.length === 0 && (
        <p className="text-center text-sm text-on-surface-variant py-8">No employees yet. Click Add Employee.</p>
      )}

      {isFormOpen && (
        <div className="border-t border-outline-variant/20 pt-8 space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-serif-title text-base text-secondary font-semibold">
              {form.id === "__new__" ? "New Employee" : `Edit: ${form.name}`}
            </h3>
            <button type="button" onClick={closeForm} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Rank / Title</label>
              <input
                type="text"
                value={form.rank}
                onChange={(e) => setForm({ ...form, rank: e.target.value })}
                className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              rows={4}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <ImagePicker
            label="Employee Photo"
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />

          <button
            type="button"
            onClick={saveForm}
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            {form.id === "__new__" ? "Add to List" : "Update Employee"}
          </button>
        </div>
      )}

      <ConfirmModal
        open={deleteId !== null}
        title="Delete Employee?"
        message="Remove this team member from the About page?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
