import { useState } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";
import { useAdminData, type RecipeItem } from "../../context/AdminDataContext";
import ImagePicker from "./ImagePicker";
import RichTextEditor from "./RichTextEditor";
import ConfirmModal from "./ConfirmModal";
import { formatDescriptionForDisplay } from "../../lib/richText";

const EMPTY_RECIPE = (): RecipeItem => ({
  id: "",
  name: "",
  image: "",
  description: "",
  fullRecipe: "",
});

export default function RecipesAdmin() {
  const { recipesPage, updateData } = useAdminData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RecipeItem>(EMPTY_RECIPE());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const inputClass =
    "w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary";
  const labelClass = "text-[10px] font-bold text-on-surface-variant uppercase";

  const isFormOpen = editingId !== null || form.id === "__new__";

  const patchPage = (patch: Partial<typeof recipesPage>) => {
    updateData("recipesPage", { ...recipesPage, ...patch });
  };

  const startAdd = () => {
    setEditingId(null);
    setForm({ ...EMPTY_RECIPE(), id: "__new__" });
  };

  const startEdit = (recipe: RecipeItem) => {
    setEditingId(recipe.id);
    setForm({ ...recipe });
  };

  const closeForm = () => {
    setEditingId(null);
    setForm(EMPTY_RECIPE());
  };

  const saveForm = () => {
    if (!form.name.trim()) return;
    const recipe: RecipeItem = {
      ...form,
      id: form.id === "__new__" ? `recipe-${Date.now()}` : form.id,
      fullRecipe: formatDescriptionForDisplay(form.fullRecipe),
    };
    const recipes =
      form.id === "__new__"
        ? [...recipesPage.recipes, recipe]
        : recipesPage.recipes.map((r) => (r.id === recipe.id ? recipe : r));
    patchPage({ recipes });
    closeForm();
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    patchPage({ recipes: recipesPage.recipes.filter((r) => r.id !== deleteId) });
    if (editingId === deleteId) closeForm();
    setDeleteId(null);
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="font-serif-title text-lg text-secondary font-semibold">Recipes Page</h3>
        <p className="text-xs text-on-surface-variant mt-1">Public URL: /recipes</p>
      </div>

      <div className="p-5 bg-slate-50 rounded-xl border border-outline-variant/25 space-y-4">
        <h4 className="text-xs font-bold uppercase text-primary tracking-wider">Page Header</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Badge Tag</label>
            <input
              type="text"
              value={recipesPage.badge}
              onChange={(e) => patchPage({ badge: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Page Title</label>
            <input
              type="text"
              value={recipesPage.title}
              onChange={(e) => patchPage({ title: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Page Subtitle</label>
          <textarea
            value={recipesPage.subtitle}
            rows={2}
            onChange={(e) => patchPage({ subtitle: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>
        <ImagePicker
          label="Page Banner Image"
          value={recipesPage.bannerImage}
          onChange={(url) => patchPage({ bannerImage: url })}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase text-primary tracking-wider">Recipe Items</h4>
          <button
            type="button"
            onClick={startAdd}
            className="px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold uppercase flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Recipe
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recipesPage.recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`flex items-center gap-3 p-3 border rounded-xl ${
                editingId === recipe.id ? "border-primary bg-primary/5" : "border-outline-variant/30"
              }`}
            >
              {recipe.image ? (
                <img src={recipe.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary truncate">{recipe.name || "Unnamed"}</p>
                <p className="text-[10px] text-slate-400 line-clamp-2">{recipe.description}</p>
              </div>
              <button type="button" onClick={() => startEdit(recipe)} className="p-2 hover:bg-slate-100 rounded-lg">
                <Edit className="w-4 h-4 text-primary" />
              </button>
              <button type="button" onClick={() => setDeleteId(recipe.id)} className="p-2 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {recipesPage.recipes.length === 0 && (
          <p className="text-center text-sm text-on-surface-variant py-6">No recipes yet. Click Add Recipe.</p>
        )}
      </div>

      {isFormOpen && (
        <div className="border-t border-outline-variant/20 pt-8 space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-serif-title text-base text-secondary font-semibold">
              {form.id === "__new__" ? "New Recipe" : `Edit: ${form.name}`}
            </h3>
            <button type="button" onClick={closeForm} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Recipe Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Short Description (card preview)</label>
            <textarea
              value={form.description}
              rows={3}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`${inputClass} resize-none`}
              placeholder="Brief summary shown on the recipe card"
            />
          </div>

          <RichTextEditor
            label="Full Recipe (detail page)"
            value={form.fullRecipe}
            onChange={(html) => setForm({ ...form, fullRecipe: html })}
            editorKey={form.id}
            minHeight="200px"
            placeholder="Ingredients, steps, cooking instructions…"
          />

          <ImagePicker label="Recipe Image" value={form.image} onChange={(url) => setForm({ ...form, image: url })} />

          <button
            type="button"
            onClick={saveForm}
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            {form.id === "__new__" ? "Add Recipe" : "Update Recipe"}
          </button>
        </div>
      )}

      <ConfirmModal
        open={deleteId !== null}
        title="Delete Recipe?"
        message="Remove this recipe from the Recipes page?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
