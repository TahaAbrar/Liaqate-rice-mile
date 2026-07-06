import type { CatalogProduct, PackagingOption, TechnicalSpec } from "../types/catalog";

const CATEGORY_TO_COLLECTION: Record<string, string> = {
  Basmati: "basmati",
  "Non-Basmati": "non-basmati",
  Sella: "sella",
  "Premium Export": "premium-export",
};

/** Normalize legacy product JSON from data.ts / old API into CatalogProduct shape. */
export function normalizeProduct(raw: Record<string, unknown>): CatalogProduct {
  const id = String(raw.id || raw.slug || "");

  if (raw.tagName !== undefined && Array.isArray(raw.technicalSpecs)) {
    return {
      id,
      slug: String(raw.slug || id),
      tagName: String(raw.tagName || ""),
      name: String(raw.name || ""),
      subtitle: String(raw.subtitle || ""),
      collectionId: String(raw.collectionId || ""),
      image: String(raw.image || ""),
      catalogImage: String(raw.catalogImage || raw.image || ""),
      age: String(raw.age || ""),
      length: String(raw.length || ""),
      description: String(raw.description || ""),
      fullDescription: String(raw.fullDescription || raw.description || ""),
      exquisiteAroma: String(raw.exquisiteAroma || ""),
      silkPolished: String(raw.silkPolished || ""),
      qualityPromises: Array.isArray(raw.qualityPromises)
        ? (raw.qualityPromises as string[])
        : ["100% Pure Origin Guarantee"],
      technicalSpecs: Array.isArray(raw.technicalSpecs)
        ? (raw.technicalSpecs as TechnicalSpec[])
        : [],
      packagingOptions: Array.isArray(raw.packagingOptions)
        ? (raw.packagingOptions as PackagingOption[])
        : [],
    };
  }

  const category = String(raw.category || "");
  const specs: TechnicalSpec[] = [
    {
      parameter: "Moisture Content",
      standardRequirement: String(raw.moisture || ""),
      testingMethod: String(raw.testingMethodMoisture || ""),
    },
    {
      parameter: "Broken Grains",
      standardRequirement: String(raw.broken || ""),
      testingMethod: String(raw.testingMethodBroken || ""),
    },
    {
      parameter: "Admixture Limit",
      standardRequirement: String(raw.admixture || ""),
      testingMethod: String(raw.testingMethodAdmixture || ""),
    },
    {
      parameter: "Grain Purity",
      standardRequirement: String(raw.purity || ""),
      testingMethod: String(raw.testingMethodPurity || ""),
    },
    {
      parameter: "Polishing & Milling",
      standardRequirement: String(raw.polishing || ""),
      testingMethod: String(raw.testingMethodPolishing || ""),
    },
  ].filter((s) => s.standardRequirement);

  const badges = Array.isArray(raw.badges) ? (raw.badges as string[]) : [];

  return {
    id,
    slug: id,
    tagName: String(raw.grade || raw.tagName || "Premium Export Grade"),
    name: String(raw.name || ""),
    subtitle: String(raw.subtitle || ""),
    collectionId: CATEGORY_TO_COLLECTION[category] || category.toLowerCase().replace(/\s+/g, "-"),
    image: String(raw.image || ""),
    catalogImage: String(raw.catalogImage || raw.image || ""),
    age: String(raw.age || ""),
    length: String(raw.length || ""),
    description: String(raw.description || ""),
    fullDescription: String(raw.fullDescription || raw.description || ""),
    exquisiteAroma:
      "The natural, slow-aging process locks in and enhances the distinctive nutty basmati fragrance. Every single grain releases a subtle, sweet floral perfume upon boiling or steaming.",
    silkPolished:
      "Processed inside our state-of-the-art computer-controlled mill, every grain undergoes rigorous multi-pass polishing to ensure a completely dust-free, bright pearly finish.",
    qualityPromises: badges.length
      ? badges
      : [
          "100% Pure Origin Guarantee",
          "Zero Admixture Verification",
          "Non-GMO Certified Crop",
          "Export Grade A+ Visual Quality",
        ],
    technicalSpecs: specs,
    packagingOptions: [],
  };
}
