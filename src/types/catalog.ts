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
  collectionId: string;
  image: string;
  catalogImage: string;
  age: string;
  length: string;
  description: string;
  fullDescription: string;
  exquisiteAroma: string;
  silkPolished: string;
  qualityPromises: string[];
  technicalSpecs: TechnicalSpec[];
  packagingOptions: PackagingOption[];
}

export type CatalogKey = "productCollections" | "packageWeights" | "packagingBagTypes";

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
