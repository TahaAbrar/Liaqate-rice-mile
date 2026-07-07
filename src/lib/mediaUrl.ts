/** Resolve CMS image paths for img src (relative /media URLs work via Vite/preview proxy). */
export function resolveMediaUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("data:") || url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const apiBase = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
  if (url.startsWith("/") && apiBase) {
    return `${apiBase}${url}`;
  }
  return url;
}
