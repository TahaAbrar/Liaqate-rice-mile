"""Default CMS + product data — mirrors src/data.ts and AdminDataContext DEFAULT_DATA."""

from .default_seed import SECTIONS, PRODUCT_SLUGS, CATALOG_DEFAULTS

META_KEY = "__meta__"


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


def _meta_defaults():
    from .models import SiteSection

    meta, _ = SiteSection.objects.get_or_create(key=META_KEY, defaults={"data": {}})
    return meta


def ensure_footer_seeded():
    from .models import SiteSection
    from .default_seed import SECTIONS

    if not SiteSection.objects.filter(key="footerContent").exists():
        SiteSection.objects.create(key="footerContent", data=SECTIONS["footerContent"])


def ensure_catalog_seeded():
    """Seed product catalog metadata (collections, weights, bag types) if missing."""
    from .models import SiteSection

    for key, items in CATALOG_DEFAULTS.items():
        if not SiteSection.objects.filter(key=key).exists():
            SiteSection.objects.create(key=key, data=items)


def ensure_seeded():
    """Create missing CMS sections on first run — never overwrite existing admin data."""
    from .models import SiteSection

    ensure_catalog_seeded()
    ensure_footer_seeded()

    data = load_seed_data()
    for key, value in data.get("sections", {}).items():
        if not SiteSection.objects.filter(key=key).exists():
            SiteSection.objects.create(key=key, data=value)


def ensure_products_seeded():
    """Seed default products only once on a fresh install."""
    from .models import Product

    meta = _meta_defaults()

    if Product.objects.exists():
        if not meta.data.get("products_seeded_once"):
            meta.data = {**meta.data, "products_seeded_once": True}
            meta.save(update_fields=["data"])
        return

    if meta.data.get("products_seeded_once"):
        return

    for product in load_seed_data().get("products", []):
        slug = product.get("id") or product.get("slug")
        if slug:
            Product.objects.update_or_create(slug=slug, defaults={"data": product})

    meta.data = {**meta.data, "products_seeded_once": True}
    meta.save(update_fields=["data"])
