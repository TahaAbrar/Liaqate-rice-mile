const ALLOWED_TAGS = new Set(["B", "STRONG", "I", "EM", "U", "P", "BR", "UL", "OL", "LI", "DIV", "SPAN"]);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function looksLikeHtml(text: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(text);
}

export function stripHtml(html: string): string {
  if (!html) return "";
  if (typeof document === "undefined") {
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").replace(/\s+/g, " ").trim();
}

export function plainTextToHtml(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";

  if (!trimmed.includes("\n") && trimmed.length > 280) {
    const sentences = trimmed.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [trimmed];
    const groups: string[] = [];
    let current = "";

    for (const sentence of sentences) {
      const part = sentence.trim();
      if (!part) continue;
      if (current.length + part.length > 320 && current) {
        groups.push(current.trim());
        current = part;
      } else {
        current = current ? `${current} ${part}` : part;
      }
    }

    if (current) groups.push(current.trim());
    if (groups.length > 1) {
      return groups.map((block) => `<p>${escapeHtml(block)}</p>`).join("");
    }
  }

  const blocks = trimmed.split(/\n\s*\n/);
  return blocks
    .map((block) => {
      const lines = block.split("\n").map((line) => escapeHtml(line.trim())).filter(Boolean);
      if (lines.length === 0) return "";
      return `<p>${lines.join("<br>")}</p>`;
    })
    .filter(Boolean)
    .join("");
}

export function sanitizeRichText(html: string): string {
  if (!html) return "";
  if (typeof document === "undefined") return html;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return escapeHtml(node.textContent || "");
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    const el = node as HTMLElement;
    const tag = el.tagName.toUpperCase();

    if (!ALLOWED_TAGS.has(tag)) {
      return Array.from(el.childNodes).map(walk).join("");
    }

    if (tag === "BR") return "<br>";

    const attrs =
      tag === "P" || tag === "DIV" || tag === "SPAN" || tag === "UL" || tag === "OL" || tag === "LI"
        ? ""
        : "";
    const children = Array.from(el.childNodes).map(walk).join("");
    return `<${tag.toLowerCase()}${attrs}>${children}</${tag.toLowerCase()}>`;
  };

  const body = doc.body;
  const cleaned = Array.from(body.childNodes).map(walk).join("");
  return cleaned || plainTextToHtml(stripHtml(html));
}

export function formatDescriptionForDisplay(text: string): string {
  if (!text?.trim()) return "";
  if (looksLikeHtml(text)) return sanitizeRichText(text);
  return plainTextToHtml(text);
}

export function richTextIsEmpty(value: string): boolean {
  return !stripHtml(value);
}
