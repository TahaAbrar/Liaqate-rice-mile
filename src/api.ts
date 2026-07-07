import type { Inquiry, InquiryPayload } from "./types/inquiry";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export type SectionKey =
  | "banners"
  | "legacySection"
  | "globalStandards"
  | "globalFootprint"
  | "corePhilosophy"
  | "millProcess"
  | "ceoSection"
  | "productPageContent"
  | "exportPageContent"
  | "footerContent"
  | "teamSection";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchAllContent() {
  return request<{ sections: Record<string, unknown> }>("/api/content/");
}

export async function saveSection(key: SectionKey, data: unknown) {
  return request<{ success: boolean }>(`/api/content/${key}/save/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export type CatalogKey = "productCollections" | "packageWeights" | "packagingBagTypes";

export async function fetchCatalog(key: CatalogKey) {
  return request<{ items: Record<string, unknown>[] }>(`/api/catalog/${key}/`);
}

export async function saveCatalog(key: CatalogKey, items: unknown[]) {
  return request<{ success: boolean }>(`/api/catalog/${key}/save/`, {
    method: "PUT",
    body: JSON.stringify({ items }),
  });
}

export async function createProduct(slug: string, data: unknown) {
  return request<{ success: boolean; slug: string }>("/api/products/create/", {
    method: "POST",
    body: JSON.stringify({ ...((data as object) || {}), slug, id: slug }),
  });
}

export async function saveProduct(slug: string, data: unknown) {
  return request<{ success: boolean }>(`/api/products/${slug}/save/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(slug: string) {
  return request<{ success: boolean }>(`/api/products/${slug}/delete/`, {
    method: "DELETE",
  });
}

export async function fetchInquiries() {
  return request<Inquiry[]>("/api/inquiries/");
}

export async function submitInquiry(data: InquiryPayload) {
  return request<{ success: boolean; id: number }>("/api/inquiries/create/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function adminLogin(username: string, password: string) {
  return request<{ success: boolean }>("/api/admin/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function deleteInquiry(id: number) {
  return request<{ success: boolean }>(`/api/inquiries/${id}/delete/`, {
    method: "DELETE",
  });
}

export async function fetchProducts() {
  return request<Record<string, unknown>[]>("/api/products/");
}

export async function fetchProductBySlug(slug: string) {
  return request<Record<string, unknown>>(`/api/products/${slug}/`);
}

export async function geocodeAddress(query: string, placeId?: string) {
  const params = new URLSearchParams();
  if (placeId) {
    params.set("place_id", placeId);
  } else {
    params.set("q", query);
  }
  return request<{
    latitude: string;
    longitude: string;
    displayName: string;
  }>(`/api/geocode/?${params.toString()}`);
}

export async function reverseGeocodeCoords(latitude: string, longitude: string) {
  const params = new URLSearchParams({ lat: latitude, lng: longitude });
  return request<{
    latitude: string;
    longitude: string;
    displayName: string;
  }>(`/api/geocode/?${params.toString()}`);
}

export async function suggestAddresses(query: string) {
  if (query.trim().length < 2) {
    return { suggestions: [] as { placeId: string; description: string; latitude?: string; longitude?: string }[] };
  }
  return request<{ suggestions: { placeId: string; description: string; latitude?: string; longitude?: string }[] }>(
    `/api/geocode/suggest/?q=${encodeURIComponent(query)}`
  );
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const API_BASE = import.meta.env.VITE_API_URL ?? "";
  const res = await fetch(`${API_BASE}/api/upload/image/`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = (await res.json()) as { url: string };
  return data.url;
}
