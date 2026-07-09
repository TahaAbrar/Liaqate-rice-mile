import { useState } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";
import { useAdminData, type BrandItem } from "../../context/AdminDataContext";
import ImagePicker from "./ImagePicker";
import ConfirmModal from "./ConfirmModal";

const EMPTY_BRAND = (): BrandItem => ({
  id: "",
  name: "",
  image: "",
  description: "",
});

export default function BrandsAdmin() {
  const { brandsPage, updateData } = useAdminData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BrandItem>(EMPTY_BRAND());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const inputClass =
    "w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary";
  const labelClass = "text-[10px] font-bold text-on-surface-variant uppercase";

  const isFormOpen = editingId !== null || form.id === "__new__";

  const patchPage = (patch: Partial<typeof brandsPage>) => {
    updateData("brandsPage", { ...brandsPage, ...patch });
  };

  const startAdd = () => {
    setEditingId(null);
    setForm({ ...EMPTY_BRAND(), id: "__new__" });
  };

  const startEdit = (brand: BrandItem) => {
    setEditingId(brand.id);
    setForm({ ...brand });
  };

  const closeForm = () => {
    setEditingId(null);
    setForm(EMPTY_BRAND());
  };

  const saveForm = () => {
    if (!form.name.trim()) return;
    const brand: BrandItem = {
      ...form,
      id: form.id === "__new__" ? `brand-${Date.now()}` : form.id,
    };
    const brands =
      form.id === "__new__"
        ? [...brandsPage.brands, brand]
        : brandsPage.brands.map((b) => (b.id === brand.id ? brand : b));
    patchPage({ brands });
    closeForm();
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    patchPage({ brands: brandsPage.brands.filter((b) => b.id !== deleteId) });
    if (editingId === deleteId) closeForm();
    setDeleteId(null);
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="font-serif-title text-lg text-secondary font-semibold">Brands Page</h3>
        <p className="text-xs text-on-surface-variant mt-1">Public URL: /brands</p>
      </div>

      {/* Page header */}
      <div className="p-5 bg-slate-50 rounded-xl border border-outline-variant/25 space-y-4">
        <h4 className="text-xs font-bold uppercase text-primary tracking-wider">Page Header</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Badge Tag</label>
            <input
              type="text"
              value={brandsPage.badge}
              onChange={(e) => patchPage({ badge: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Page Title</label>
            <input
              type="text"
              value={brandsPage.title}
              onChange={(e) => patchPage({ title: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Page Subtitle</label>
          <textarea
            value={brandsPage.subtitle}
            rows={2}
            onChange={(e) => patchPage({ subtitle: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>
        <ImagePicker
          label="Page Banner Image"
          value={brandsPage.bannerImage}
          onChange={(url) => patchPage({ bannerImage: url })}
        />
      </div>

      {/* Brand story */}
      <div className="p-5 bg-slate-50 rounded-xl border border-outline-variant/25 space-y-4">
        <h4 className="text-xs font-bold uppercase text-primary tracking-wider">Brand Story Section</h4>
        <div className="space-y-1">
          <label className={labelClass}>Story Heading</label>
          <input
            type="text"
            value={brandsPage.storyHeading}
            onChange={(e) => patchPage({ storyHeading: e.target.value })}
            className={inputClass}
          />
        </div>
        <ImagePicker
          label="Story Image"
          value={brandsPage.storyImage}
          onChange={(url) => patchPage({ storyImage: url })}
        />
        <div className="space-y-1">
          <label className={labelClass}>Story Description</label>
          <textarea
            value={brandsPage.storyDescription}
            rows={5}
            onChange={(e) => patchPage({ storyDescription: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {/* Brands list */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase text-primary tracking-wider">Brand Items</h4>
          <button
            type="button"
            onClick={startAdd}
            className="px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold uppercase flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Brand
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {brandsPage.brands.map((brand) => (
            <div
              key={brand.id}
              className={`flex items-center gap-3 p-3 border rounded-xl ${
                editingId === brand.id ? "border-primary bg-primary/5" : "border-outline-variant/30"
              }`}
            >
              {brand.image ? (
                <img src={brand.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary truncate">{brand.name || "Unnamed"}</p>
                <p className="text-[10px] text-slate-400 line-clamp-2">{brand.description}</p>
              </div>
              <button type="button" onClick={() => startEdit(brand)} className="p-2 hover:bg-slate-100 rounded-lg">
                <Edit className="w-4 h-4 text-primary" />
              </button>
              <button type="button" onClick={() => setDeleteId(brand.id)} className="p-2 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {brandsPage.brands.length === 0 && (
          <p className="text-center text-sm text-on-surface-variant py-6">No brands yet. Click Add Brand.</p>
        )}
      </div>

      {isFormOpen && (
        <div className="border-t border-outline-variant/20 pt-8 space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-serif-title text-base text-secondary font-semibold">
              {form.id === "__new__" ? "New Brand" : `Edit: ${form.name}`}
            </h3>
            <button type="button" onClick={closeForm} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Brand Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Brand Description</label>
            <textarea
              value={form.description}
              rows={4}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <ImagePicker label="Brand Image" value={form.image} onChange={(url) => setForm({ ...form, image: url })} />

          <button
            type="button"
            onClick={saveForm}
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            {form.id === "__new__" ? "Add Brand" : "Update Brand"}
          </button>
        </div>
      )}

      <ConfirmModal
        open={deleteId !== null}
        title="Delete Brand?"
        message="Remove this brand from the Brands page?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
