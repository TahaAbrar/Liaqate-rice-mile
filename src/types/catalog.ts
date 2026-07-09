export interface ProductCollection {
  id: string;
  name: string;
}

export interface PackageWeight {
  id: string;
  value: number;
}

export interface PackagingBagType {
  id: string;
  name: string;
}

export interface TechnicalSpec {
  parameter: string;
  standardRequirement: string;
  testingMethod: string;
}

export interface PackagingOption {
  weightId: string;
  bagTypeId: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  tagName: string;
  name: string;
  subtitle: string;
  /** One product can belong to multiple collections (category filters). */
  collectionIds: string[];
  image: string;
  catalogImage: string;
  /** Extra images for product detail gallery (main `image` is always shown first). */
  galleryImages: string[];
  age: string;
  length: string;
  description: string;
  fullDescription: string;
  exquisiteAroma: string;
  silkPolished: string;
  qualityPromises: string[];
  technicalSpecs: TechnicalSpec[];
  packagingOptions: PackagingOption[];
  showOnHome?: boolean;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatWeight(value: number): string {
  return `${value} kg`;
}

export function getProductGalleryImages(product: Pick<CatalogProduct, "image" | "galleryImages">): string[] {
  const all = [product.image, ...(product.galleryImages || [])].map((url) => url.trim()).filter(Boolean);
  return [...new Set(all)];
}

export function getProductPackingWeights(
  product: Pick<CatalogProduct, "packagingOptions">,
  weights: PackageWeight[]
): string[] {
  const seen = new Set<string>();
  const labels: string[] = [];

  for (const option of product.packagingOptions) {
    if (seen.has(option.weightId)) continue;
    seen.add(option.weightId);
    const weight = weights.find((w) => w.id === option.weightId);
    if (weight) labels.push(formatWeight(weight.value));
  }

  return labels;
}
