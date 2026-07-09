import React, { useState, useEffect, useRef } from "react";
import { useAdminData } from "../../context/AdminDataContext";
import ImagePicker from "./ImagePicker";
import MultiImagePicker from "./MultiImagePicker";
import RichTextEditor from "./RichTextEditor";
import type {
  CatalogProduct,
  PackagingOption,
  ProductCollection,
  PackageWeight,
  PackagingBagType,
  TechnicalSpec,
} from "../../types/catalog";
import { formatWeight, slugify } from "../../types/catalog";
import { formatDescriptionForDisplay, richTextIsEmpty, stripHtml } from "../../lib/richText";
import {
  Plus,
  X,
  Save,
  Trash2,
  Edit,
  Package,
  Tags,
  Scale,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";
import ConfirmModal from "./ConfirmModal";

type CatalogTab = "collections" | "weights" | "bags" | "products";

const EMPTY_PRODUCT = (): CatalogProduct => ({
  id: "",
  slug: "",
  tagName: "",
  name: "",
  subtitle: "",
  collectionIds: [],
  image: "",
  catalogImage: "",
  galleryImages: [],
  age: "",
  length: "",
  description: "",
  fullDescription: "",
  exquisiteAroma: "",
  silkPolished: "",
  qualityPromises: [""],
  technicalSpecs: [{ parameter: "", standardRequirement: "", testingMethod: "" }],
  packagingOptions: [],
  showOnHome: false,
});

interface ProductCatalogAdminProps {
  onNotify: (msg: string, type?: "success" | "error") => void;
}

export default function ProductCatalogAdmin({ onNotify }: ProductCatalogAdminProps) {
  const {
    collections,
    packageWeights,
    packagingBagTypes,
    products,
    setCollections,
    setPackageWeights,
    setPackagingBagTypes,
    saveCatalogItems,
    createProduct,
    updateProduct,
    removeProduct,
  } = useAdminData();

  const [tab, setTab] = useState<CatalogTab>("collections");
  const [saving, setSaving] = useState(false);

  // Collections form
  const [newCollectionName, setNewCollectionName] = useState("");

  // Weights form
  const [newWeightValue, setNewWeightValue] = useState("");

  // Bags form
  const [newBagName, setNewBagName] = useState("");

  // Product form
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productForm, setProductForm] = useState<CatalogProduct>(EMPTY_PRODUCT());
  const [packDraft, setPackDraft] = useState<{ weightId: string; bagTypeId: string }>({
    weightId: "",
    bagTypeId: "",
  });
  const [collectionDraft, setCollectionDraft] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
  } | null>(null);
  const productFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFormOpen || tab !== "products") return;
    const timer = window.setTimeout(() => {
      productFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstField = productFormRef.current?.querySelector<HTMLElement>(
        "input:not([type='hidden']), textarea, select"
      );
      firstField?.focus();
    }, 150);
    return () => window.clearTimeout(timer);
  }, [isFormOpen, editingSlug, tab]);

  const askConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmLabel = "Delete"
  ) => {
    setConfirmDialog({ title, message, confirmLabel, onConfirm });
  };

  const closeProductForm = () => {
    setEditingSlug(null);
    setIsFormOpen(false);
    setProductForm(EMPTY_PRODUCT());
    setPackDraft({ weightId: "", bagTypeId: "" });
    setCollectionDraft("");
  };

  const genId = (prefix: string) => `${prefix}-${Date.now().toString(36)}`;

  const addCollection = async () => {
    const name = newCollectionName.trim();
    if (!name) return;
    const item: ProductCollection = { id: slugify(name), name };
    if (collections.some((c) => c.id === item.id)) return;
    const updated = [...collections, item];
    setSaving(true);
    try {
      await saveCatalogItems("productCollections", updated);
      setCollections(updated);
      setNewCollectionName("");
      onNotify("Collections saved successfully!", "success");
    } catch {
      onNotify("Failed to save Collections. Is backend running?", "error");
    } finally {
      setSaving(false);
    }
  };

  const removeCollection = (id: string) => {
    askConfirm(
      "Delete Collection?",
      "Products using this collection will need reassignment. This cannot be undone.",
      async () => {
        const updated = collections.filter((c) => c.id !== id);
        setSaving(true);
        try {
          await saveCatalogItems("productCollections", updated);
          setCollections(updated);
          onNotify("Collections saved successfully!", "success");
        } catch {
          onNotify("Failed to save Collections. Is backend running?", "error");
        } finally {
          setSaving(false);
        }
      }
    );
  };

  const addWeight = async () => {
    const num = parseFloat(newWeightValue);
    if (!num || num <= 0) return;
    const item: PackageWeight = { id: genId("w"), value: num };
    const updated = [...packageWeights, item];
    setSaving(true);
    try {
      await saveCatalogItems("packageWeights", updated);
      setPackageWeights(updated);
      setNewWeightValue("");
      onNotify("Package Weights saved successfully!", "success");
    } catch {
      onNotify("Failed to save Package Weights. Is backend running?", "error");
    } finally {
      setSaving(false);
    }
  };

  const removeWeight = (id: string) => {
    askConfirm("Delete Weight?", "Remove this package weight from the catalog?", async () => {
      const updated = packageWeights.filter((w) => w.id !== id);
      setSaving(true);
      try {
        await saveCatalogItems("packageWeights", updated);
        setPackageWeights(updated);
        onNotify("Package Weights saved successfully!", "success");
      } catch {
        onNotify("Failed to save Package Weights. Is backend running?", "error");
      } finally {
        setSaving(false);
      }
    });
  };

  const addBagType = async () => {
    const name = newBagName.trim();
    if (!name) return;
    const item: PackagingBagType = { id: genId("bag"), name };
    const updated = [...packagingBagTypes, item];
    setSaving(true);
    try {
      await saveCatalogItems("packagingBagTypes", updated);
      setPackagingBagTypes(updated);
      setNewBagName("");
      onNotify("Packaging Bag Types saved successfully!", "success");
    } catch {
      onNotify("Failed to save Packaging Bag Types. Is backend running?", "error");
    } finally {
      setSaving(false);
    }
  };

  const removeBagType = (id: string) => {
    askConfirm("Delete Bag Type?", "Remove this packaging bag type from the catalog?", async () => {
      const updated = packagingBagTypes.filter((b) => b.id !== id);
      setSaving(true);
      try {
        await saveCatalogItems("packagingBagTypes", updated);
        setPackagingBagTypes(updated);
        onNotify("Packaging Bag Types saved successfully!", "success");
      } catch {
        onNotify("Failed to save Packaging Bag Types. Is backend running?", "error");
      } finally {
        setSaving(false);
      }
    });
  };

  const startNewProduct = () => {
    setEditingSlug(null);
    setIsFormOpen(true);
    setProductForm({
      ...EMPTY_PRODUCT(),
      qualityPromises: [""],
      technicalSpecs: [{ parameter: "", standardRequirement: "", testingMethod: "" }],
    });
    setPackDraft({ weightId: "", bagTypeId: "" });
    setCollectionDraft("");
    setTab("products");
  };

  const startEditProduct = (p: CatalogProduct) => {
    setEditingSlug(p.id);
    setIsFormOpen(true);
    setProductForm({
      ...p,
      collectionIds: [...p.collectionIds],
      galleryImages: [...(p.galleryImages || [])],
      qualityPromises: p.qualityPromises.length ? [...p.qualityPromises] : [""],
      technicalSpecs: p.technicalSpecs.length
        ? p.technicalSpecs.map((s) => ({ ...s }))
        : [{ parameter: "", standardRequirement: "", testingMethod: "" }],
      packagingOptions: [...p.packagingOptions],
    });
    setPackDraft({ weightId: "", bagTypeId: "" });
    setCollectionDraft("");
    setTab("products");
  };

  const updateForm = (patch: Partial<CatalogProduct>) => {
    setProductForm((prev) => ({ ...prev, ...patch }));
  };

  const usedWeightIds = productForm.packagingOptions.map((p) => p.weightId);
  const availableWeights = packageWeights.filter((w) => !usedWeightIds.includes(w.id));
  const availableCollections = collections.filter((c) => !productForm.collectionIds.includes(c.id));

  const addProductCollection = () => {
    if (!collectionDraft) return;
    updateForm({ collectionIds: [...productForm.collectionIds, collectionDraft] });
    setCollectionDraft("");
  };

  const removeProductCollection = (id: string) => {
    updateForm({ collectionIds: productForm.collectionIds.filter((collectionId) => collectionId !== id) });
  };

  const confirmPackaging = () => {
    if (!packDraft.weightId || !packDraft.bagTypeId) return;
    const option: PackagingOption = { ...packDraft };
    updateForm({ packagingOptions: [...productForm.packagingOptions, option] });
    setPackDraft({ weightId: "", bagTypeId: "" });
  };

  const removePackaging = (idx: number) => {
    updateForm({
      packagingOptions: productForm.packagingOptions.filter((_, i) => i !== idx),
    });
  };

  const validateProduct = (): string | null => {
    if (!productForm.tagName.trim()) return "Product tag name is required";
    if (!productForm.name.trim()) return "Product name is required";
    if (!productForm.collectionIds.length) return "Please add at least one collection";
    if (!productForm.image.trim()) return "Product image is required";
    if (!productForm.age.trim()) return "Rice age is required";
    if (!productForm.length.trim()) return "Length is required";
    if (richTextIsEmpty(productForm.fullDescription)) return "Product description is required";
    const promises = productForm.qualityPromises.filter((p) => p.trim());
    if (promises.length === 0) return "At least one Quality Promise is required";
    return null;
  };

  const handleSaveProduct = async () => {
    const err = validateProduct();
    if (err) {
      onNotify(err, "error");
      return;
    }
    const slug = editingSlug || slugify(productForm.name);
    if (!slug) {
      onNotify("Invalid product name for URL slug", "error");
      return;
    }
    const payload: CatalogProduct = {
      ...productForm,
      id: slug,
      slug,
      catalogImage: productForm.catalogImage || productForm.image,
      fullDescription: formatDescriptionForDisplay(productForm.fullDescription),
      description: productForm.description || stripHtml(productForm.fullDescription).slice(0, 200),
      qualityPromises: productForm.qualityPromises.filter((p) => p.trim()),
      technicalSpecs: productForm.technicalSpecs.filter(
        (s) => s.parameter.trim() || s.standardRequirement.trim() || s.testingMethod.trim()
      ),
    };
    setSaving(true);
    try {
      if (editingSlug) {
        await updateProduct(slug, payload);
        onNotify(`Product "${payload.name}" updated!`, "success");
        closeProductForm();
      } else {
        if (products.some((p) => p.id === slug)) {
          onNotify("A product with this name already exists", "error");
          setSaving(false);
          return;
        }
        await createProduct(slug, payload);
        onNotify(`Product "${payload.name}" created!`, "success");
        closeProductForm();
      }
    } catch {
      onNotify("Failed to save product. Is backend running?", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleHome = async (product: CatalogProduct) => {
    try {
      await updateProduct(product.id, { ...product, showOnHome: !product.showOnHome });
      onNotify(
        product.showOnHome ? `"${product.name}" removed from home page` : `"${product.name}" added to home page`,
        "success"
      );
    } catch {
      onNotify("Failed to update home page visibility", "error");
    }
  };

  const handleDeleteProduct = async (slug: string, name: string) => {
    askConfirm(
      "Delete Product?",
      `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      async () => {
        setSaving(true);
        try {
          await removeProduct(slug);
          if (editingSlug === slug) closeProductForm();
          onNotify(`Product "${name}" deleted`, "success");
        } catch {
          onNotify("Failed to delete product", "error");
        } finally {
          setSaving(false);
        }
      }
    );
  };

  const inputClass =
    "w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary";
  const labelClass = "text-[10px] font-bold text-on-surface-variant uppercase";

  const tabs: { id: CatalogTab; label: string; icon: React.ElementType }[] = [
    { id: "collections", label: "1. Collections", icon: Tags },
    { id: "weights", label: "2. Package Weights", icon: Scale },
    { id: "bags", label: "3. Bag Types", icon: Package },
    { id: "products", label: "4. Products", icon: ShoppingBag },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                tab === t.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* COLLECTIONS */}
      {tab === "collections" && (
        <div className="space-y-6">
          <p className="text-xs text-on-surface-variant">
            Add collection tags to group products. These appear as filters on the Products page.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="e.g. Basmati"
              className={inputClass}
              onKeyDown={(e) => e.key === "Enter" && addCollection()}
            />
            <button
              type="button"
              onClick={addCollection}
              className="px-5 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {collections.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-4 bg-slate-50 border border-outline-variant/30 rounded-xl"
              >
                <span className="font-sans text-sm font-semibold text-primary">{c.name}</span>
                <button
                  type="button"
                  onClick={() => removeCollection(c.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {collections.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-8">No collections yet. Add one above.</p>
            )}
          </div>
        </div>
      )}

      {/* WEIGHTS */}
      {tab === "weights" && (
        <div className="space-y-6">
          <p className="text-xs text-on-surface-variant">
            Enter only the number — &quot;kg&quot; is added automatically (e.g. 5 becomes 5 kg).
          </p>
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <input
                type="number"
                min="1"
                step="0.1"
                value={newWeightValue}
                onChange={(e) => setNewWeightValue(e.target.value)}
                placeholder="5"
                className={inputClass}
                onKeyDown={(e) => e.key === "Enter" && addWeight()}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                kg
              </span>
            </div>
            <button
              type="button"
              onClick={addWeight}
              className="px-5 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Weight
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {packageWeights.map((w) => (
              <div
                key={w.id}
                className="relative p-5 bg-white border border-outline-variant/30 rounded-xl text-center group"
              >
                <p className="font-serif-title text-2xl text-primary font-bold">{formatWeight(w.value)}</p>
                <button
                  type="button"
                  onClick={() => removeWeight(w.id)}
                  className="absolute top-2 right-2 p-1 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BAG TYPES */}
      {tab === "bags" && (
        <div className="space-y-6">
          <p className="text-xs text-on-surface-variant">
            Define packaging bag types used when configuring product export packaging.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={newBagName}
              onChange={(e) => setNewBagName(e.target.value)}
              placeholder="e.g. BOPP / Jute Retail Bag"
              className={inputClass}
              onKeyDown={(e) => e.key === "Enter" && addBagType()}
            />
            <button
              type="button"
              onClick={addBagType}
              className="px-5 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Bag Type
            </button>
          </div>
          <div className="space-y-2">
            {packagingBagTypes.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-4 bg-slate-50 border border-outline-variant/30 rounded-xl"
              >
                <span className="font-sans text-sm text-primary">{b.name}</span>
                <button
                  type="button"
                  onClick={() => removeBagType(b.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      {tab === "products" && (
        <div className="space-y-8">
          {/* Product list */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-title text-lg text-secondary font-semibold">All Products</h3>
              <button
                type="button"
                onClick={startNewProduct}
                className="px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold uppercase flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-3 p-3 border rounded-xl ${
                    editingSlug === p.id ? "border-primary bg-primary/5" : "border-outline-variant/30"
                  }`}
                >
                  {p.image && (
                    <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary truncate">{p.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase">{p.tagName}</p>
                    {p.collectionIds.length > 0 && (
                      <p className="text-[10px] text-secondary truncate">
                        {p.collectionIds
                          .map((id) => collections.find((c) => c.id === id)?.name || id)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleHome(p)}
                    title={p.showOnHome ? "Shown on home page" : "Show on home page"}
                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all shrink-0 ${
                      p.showOnHome
                        ? "bg-secondary text-white border-secondary"
                        : "bg-white text-slate-400 border-outline-variant/40 hover:border-secondary"
                    }`}
                  >
                    Home
                  </button>
                  <button type="button" onClick={() => startEditProduct(p)} className="p-2 hover:bg-slate-100 rounded-lg">
                    <Edit className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(p.id, p.name)}
                    className="p-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Product form */}
          {(isFormOpen || editingSlug !== null) && (
            <div ref={productFormRef} className="border-t border-outline-variant/20 pt-8 space-y-8 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-serif-title text-lg text-secondary font-semibold">
                  {editingSlug ? `Edit: ${productForm.name}` : "New Product"}
                </h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-[10px] font-bold uppercase text-on-surface-variant">Show on Home Page</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={productForm.showOnHome}
                    onClick={() => updateForm({ showOnHome: !productForm.showOnHome })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      productForm.showOnHome ? "bg-secondary" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        productForm.showOnHome ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </label>
              </div>

              {/* Section 1 - Hero (required) */}
              <div className="p-5 bg-slate-50 rounded-xl border border-outline-variant/25 space-y-4">
                <h4 className="text-xs font-bold uppercase text-primary tracking-wider">
                  Section 1 — Product Hero (Required)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClass}>Product Tag Name</label>
                    <input
                      type="text"
                      value={productForm.tagName}
                      onChange={(e) => updateForm({ tagName: e.target.value })}
                      placeholder="PREMIUM EXPORT GRADE"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>Product Name</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => updateForm({ name: e.target.value })}
                      placeholder="1121 Sella Rice"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>Subtitle</label>
                    <input
                      type="text"
                      value={productForm.subtitle}
                      onChange={(e) => updateForm({ subtitle: e.target.value })}
                      placeholder="The Giant of Basmati"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className={labelClass}>Collections</label>
                    {productForm.collectionIds.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {productForm.collectionIds.map((collectionId) => {
                          const collection = collections.find((c) => c.id === collectionId);
                          return (
                            <span
                              key={collectionId}
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold"
                            >
                              {collection?.name || collectionId}
                              <button
                                type="button"
                                onClick={() => removeProductCollection(collectionId)}
                                className="p-0.5 hover:bg-primary/10 rounded-full"
                                aria-label={`Remove ${collection?.name || collectionId}`}
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}
                    {availableCollections.length > 0 ? (
                      <div className="flex gap-2">
                        <select
                          value={collectionDraft}
                          onChange={(e) => setCollectionDraft(e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select collection to add</option>
                          {availableCollections.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={addProductCollection}
                          disabled={!collectionDraft}
                          className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase disabled:opacity-40 shrink-0"
                        >
                          Add
                        </button>
                      </div>
                    ) : productForm.collectionIds.length > 0 ? (
                      <p className="text-[10px] text-slate-400">
                        All collections assigned. Remove one to add another.
                      </p>
                    ) : (
                      <p className="text-[10px] text-amber-600">Add collections in step 1 first.</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>Rice Age</label>
                    <input
                      type="text"
                      value={productForm.age}
                      onChange={(e) => updateForm({ age: e.target.value })}
                      placeholder="1.5 Years"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>Avg. Length</label>
                    <input
                      type="text"
                      value={productForm.length}
                      onChange={(e) => updateForm({ length: e.target.value })}
                      placeholder="8.3mm+"
                      className={inputClass}
                    />
                  </div>
                </div>
                <ImagePicker
                  label="Main Product Image (shown on card & home)"
                  value={productForm.image}
                  onChange={(url) => updateForm({ image: url, catalogImage: url })}
                />
                <MultiImagePicker
                  label="Gallery Images (detail page only)"
                  images={productForm.galleryImages}
                  onChange={(galleryImages) => updateForm({ galleryImages })}
                />
                <div className="space-y-1">
                  <label className={labelClass}>Short Description (catalog card)</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <RichTextEditor
                  label="Full Description (detail page)"
                  value={productForm.fullDescription}
                  onChange={(html) => updateForm({ fullDescription: html })}
                  editorKey={editingSlug || "new-product"}
                  minHeight="160px"
                  placeholder="Write your product description. Use Bold, Italic, or Underline for emphasis."
                />
              </div>

              {/* Section 2 - Sensory */}
              <div className="p-5 bg-slate-50 rounded-xl border border-outline-variant/25 space-y-4">
                <h4 className="text-xs font-bold uppercase text-primary tracking-wider">
                  Section 2 — Sensory Heritage &amp; Purity
                </h4>
                <div className="space-y-1">
                  <label className={labelClass}>Exquisite Aroma Description</label>
                  <textarea
                    value={productForm.exquisiteAroma}
                    onChange={(e) => updateForm({ exquisiteAroma: e.target.value })}
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Silk Polished Description</label>
                  <textarea
                    value={productForm.silkPolished}
                    onChange={(e) => updateForm({ silkPolished: e.target.value })}
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <div className="space-y-3">
                  <label className={labelClass}>Quality Promises (min 1 required)</label>
                  {productForm.qualityPromises.map((promise, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <input
                        type="text"
                        value={promise}
                        onChange={(e) => {
                          const updated = [...productForm.qualityPromises];
                          updated[idx] = e.target.value;
                          updateForm({ qualityPromises: updated });
                        }}
                        placeholder="100% Pure Origin Guarantee"
                        className={inputClass}
                      />
                      {productForm.qualityPromises.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            updateForm({
                              qualityPromises: productForm.qualityPromises.filter((_, i) => i !== idx),
                            })
                          }
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateForm({ qualityPromises: [...productForm.qualityPromises, ""] })}
                    className="text-xs font-bold text-primary uppercase flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add More Quality Promise
                  </button>
                </div>
              </div>

              {/* Section 3 - Technical Specs */}
              <div className="p-5 bg-slate-50 rounded-xl border border-outline-variant/25 space-y-4">
                <h4 className="text-xs font-bold uppercase text-primary tracking-wider">
                  Section 3 — Technical Specifications
                </h4>
                {productForm.technicalSpecs.map((spec, idx) => (
                  <div key={idx} className="relative p-4 bg-white border border-outline-variant/20 rounded-xl space-y-3">
                    {productForm.technicalSpecs.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          updateForm({
                            technicalSpecs: productForm.technicalSpecs.filter((_, i) => i !== idx),
                          })
                        }
                        className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className={labelClass}>Parameter</label>
                        <input
                          type="text"
                          value={spec.parameter}
                          onChange={(e) => {
                            const updated = [...productForm.technicalSpecs] as TechnicalSpec[];
                            updated[idx] = { ...updated[idx], parameter: e.target.value };
                            updateForm({ technicalSpecs: updated });
                          }}
                          placeholder="Moisture Content"
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelClass}>Standard Requirement</label>
                        <input
                          type="text"
                          value={spec.standardRequirement}
                          onChange={(e) => {
                            const updated = [...productForm.technicalSpecs] as TechnicalSpec[];
                            updated[idx] = { ...updated[idx], standardRequirement: e.target.value };
                            updateForm({ technicalSpecs: updated });
                          }}
                          placeholder="Under 11.5% Max"
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelClass}>Testing Method</label>
                        <input
                          type="text"
                          value={spec.testingMethod}
                          onChange={(e) => {
                            const updated = [...productForm.technicalSpecs] as TechnicalSpec[];
                            updated[idx] = { ...updated[idx], testingMethod: e.target.value };
                            updateForm({ technicalSpecs: updated });
                          }}
                          placeholder="ISO 712:2009"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateForm({
                      technicalSpecs: [
                        ...productForm.technicalSpecs,
                        { parameter: "", standardRequirement: "", testingMethod: "" },
                      ],
                    })
                  }
                  className="text-xs font-bold text-primary uppercase flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add More Specification
                </button>
              </div>

              {/* Section 4 - Packaging */}
              <div className="p-5 bg-slate-50 rounded-xl border border-outline-variant/25 space-y-4">
                <h4 className="text-xs font-bold uppercase text-primary tracking-wider">
                  Section 4 — Export Packaging Solutions
                </h4>

                {productForm.packagingOptions.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {productForm.packagingOptions.map((opt, idx) => {
                      const w = packageWeights.find((x) => x.id === opt.weightId);
                      const b = packagingBagTypes.find((x) => x.id === opt.bagTypeId);
                      return (
                        <div
                          key={idx}
                          className="relative p-4 bg-white border border-outline-variant/20 rounded-xl text-center"
                        >
                          <button
                            type="button"
                            onClick={() => removePackaging(idx)}
                            className="absolute top-2 right-2 p-1 text-red-400 hover:bg-red-50 rounded"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <p className="font-serif-title text-xl text-primary font-bold">
                            {w ? formatWeight(w.value) : "—"}
                          </p>
                          <p className="text-xs text-on-surface-variant mt-1">{b?.name || "—"}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {availableWeights.length > 0 && (
                  <div className="space-y-4 p-4 bg-white border border-dashed border-outline-variant/40 rounded-xl">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      {packDraft.weightId ? "Select Bag Type" : "Select Weight"}
                    </p>
                    {!packDraft.weightId ? (
                      <div className="flex flex-wrap gap-2">
                        {availableWeights.map((w) => (
                          <button
                            key={w.id}
                            type="button"
                            onClick={() => setPackDraft({ weightId: w.id, bagTypeId: "" })}
                            className="px-4 py-2 border border-outline-variant rounded-lg text-sm font-bold text-primary hover:border-primary hover:bg-primary/5"
                          >
                            {formatWeight(w.value)}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-secondary font-semibold">
                          Weight: {formatWeight(packageWeights.find((w) => w.id === packDraft.weightId)?.value || 0)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {packagingBagTypes.map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setPackDraft({ ...packDraft, bagTypeId: b.id })}
                              className={`px-3 py-2 border rounded-lg text-xs font-medium transition-all ${
                                packDraft.bagTypeId === b.id
                                  ? "border-primary bg-primary text-white"
                                  : "border-outline-variant text-primary hover:border-primary"
                              }`}
                            >
                              {b.name}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={confirmPackaging}
                            disabled={!packDraft.bagTypeId}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase disabled:opacity-40 flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" /> Add Package
                          </button>
                          <button
                            type="button"
                            onClick={() => setPackDraft({ weightId: "", bagTypeId: "" })}
                            className="px-4 py-2 border border-outline-variant rounded-lg text-xs font-bold uppercase"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {availableWeights.length === 0 && productForm.packagingOptions.length > 0 && (
                  <p className="text-xs text-slate-400">All weights have been assigned. Remove one to add another.</p>
                )}

                {packageWeights.length === 0 && (
                  <p className="text-xs text-amber-600">Add package weights in step 2 first.</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeProductForm}
                  disabled={saving}
                  className="flex-1 py-4 border border-outline-variant rounded-xl text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:bg-slate-50 transition-colors disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  disabled={saving}
                  className="flex-[2] py-4 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editingSlug ? "Update Product" : "Save Product"}
                </button>
              </div>
            </div>
          )}

          {!isFormOpen && editingSlug === null && products.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No products yet. Click &quot;Add Product&quot; to get started.</p>
              <button
                type="button"
                onClick={startNewProduct}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase"
              >
                Add First Product
              </button>
            </div>
          )}
        </div>
      )}
      <ConfirmModal
        open={!!confirmDialog}
        title={confirmDialog?.title ?? ""}
        message={confirmDialog?.message ?? ""}
        confirmLabel={confirmDialog?.confirmLabel}
        onConfirm={() => {
          confirmDialog?.onConfirm();
          setConfirmDialog(null);
        }}
        onCancel={() => setConfirmDialog(null)}
      />
    </div>
  );
}
