"""Default CMS + product data — mirrors src/data.ts and AdminDataContext DEFAULT_DATA."""

from .default_seed import SECTIONS, PRODUCT_SLUGS


def load_seed_data():
    from pathlib import Path
    import json

    # Full products from JSON if available
    seed_file = Path(__file__).resolve().parent / "seed_data.json"
    products = []
    if seed_file.exists():
        with open(seed_file, encoding="utf-8") as f:
            data = json.load(f)
            products = data.get("products", [])
    if not products:
        # Fallback: import from frontend data.ts at runtime
        products = _load_products_from_ts()
    return {"sections": SECTIONS, "products": products}


def _load_products_from_ts():
    import json
    import re
    from pathlib import Path

    data_ts = Path(__file__).resolve().parents[2] / "src" / "data.ts"
    if not data_ts.exists():
        return []
    text = data_ts.read_text(encoding="utf-8")
    start = text.find("export const PRODUCTS")
    if start < 0:
        return []
    eq = text.find("=", start)
    start = text.find("[", eq)
    depth = 0
    end = start
    for i, ch in enumerate(text[start:], start):
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    raw = text[start:end]
    raw = re.sub(r"^(\s+)(\w+)\s*:", r'\1"\2":', raw, flags=re.MULTILINE)
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return []


def ensure_seeded():
    from .models import Product, SiteSection

    if SiteSection.objects.exists() and Product.objects.exists():
        return

    data = load_seed_data()
    for key, value in data.get("sections", {}).items():
        SiteSection.objects.update_or_create(key=key, defaults={"data": value})
    for product in data.get("products", []):
        slug = product.get("id") or product.get("slug")
        if slug:
            Product.objects.update_or_create(slug=slug, defaults={"data": product})


def ensure_products_seeded():
    """Seed products only if missing (safe to run when sections already exist)."""
    from .models import Product

    if Product.objects.exists():
        return
    for product in load_seed_data().get("products", []):
        slug = product.get("id") or product.get("slug")
        if slug:
            Product.objects.update_or_create(slug=slug, defaults={"data": product})
