import json
import uuid
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Product, SiteSection
from .seed import ensure_seeded, ensure_products_seeded

SECTION_KEYS = [
    "banners",
    "legacySection",
    "globalStandards",
    "globalFootprint",
    "corePhilosophy",
    "millProcess",
    "ceoSection",
    "productPageContent",
    "exportPageContent",
]


def _parse_json_body(request):
    try:
        return json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return None


@require_http_methods(["GET"])
def all_content(request):
    ensure_seeded()
    sections = {s.key: s.data for s in SiteSection.objects.all()}
    return JsonResponse({"sections": sections})


@require_http_methods(["GET"])
def section_detail(request, key):
    if key not in SECTION_KEYS:
        return JsonResponse({"error": "Unknown section"}, status=404)
    try:
        section = SiteSection.objects.get(key=key)
        return JsonResponse(section.data, safe=False)
    except SiteSection.DoesNotExist:
        return JsonResponse({"error": "Section not found"}, status=404)


@csrf_exempt
@require_http_methods(["PUT"])
def section_save(request, key):
    if key not in SECTION_KEYS:
        return JsonResponse({"error": "Unknown section"}, status=404)
    body = _parse_json_body(request)
    if body is None:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)
    section, _ = SiteSection.objects.update_or_create(key=key, defaults={"data": body})
    return JsonResponse({"success": True, "key": section.key, "updated_at": section.updated_at.isoformat()})


@require_http_methods(["GET"])
def product_list(request):
    ensure_seeded()
    ensure_products_seeded()
    products = []
    for p in Product.objects.all():
        item = dict(p.data)
        item["id"] = p.slug
        item["slug"] = p.slug
        products.append(item)
    return JsonResponse(products, safe=False)


@require_http_methods(["GET"])
def product_detail(request, slug):
    ensure_products_seeded()
    try:
        product = Product.objects.get(slug=slug)
    except Product.DoesNotExist:
        return JsonResponse({"error": "Product not found"}, status=404)
    item = dict(product.data)
    item["id"] = product.slug
    item["slug"] = product.slug
    return JsonResponse(item)


@csrf_exempt
@require_http_methods(["PUT"])
def product_save(request, slug):
    body = _parse_json_body(request)
    if body is None:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)
    product, _ = Product.objects.update_or_create(slug=slug, defaults={"data": body})
    return JsonResponse({"success": True, "slug": product.slug})


@csrf_exempt
@require_http_methods(["POST"])
def upload_image(request):
    image = request.FILES.get("image")
    if not image:
        return JsonResponse({"error": "No image file provided"}, status=400)

    upload_dir = Path(settings.MEDIA_ROOT) / "uploads"
    upload_dir.mkdir(parents=True, exist_ok=True)

    ext = Path(image.name).suffix.lower() or ".jpg"
    filename = f"{uuid.uuid4().hex}{ext}"
    dest = upload_dir / filename

    with open(dest, "wb+") as f:
        for chunk in image.chunks():
            f.write(chunk)

    url = f"{settings.MEDIA_URL}uploads/{filename}"
    return JsonResponse({"url": url, "filename": filename})


@require_http_methods(["GET"])
def _fetch_json(url: str, headers: dict | None = None) -> list | dict:
    req = Request(
        url,
        headers=headers or {"User-Agent": "LiaqatRiceMillCMS/1.0 (location search)"},
    )
    with urlopen(req, timeout=12) as response:
        return json.loads(response.read().decode("utf-8"))


def _geocode_result(lat: float | str, lng: float | str, display_name: str) -> JsonResponse:
    return JsonResponse(
        {
            "latitude": str(lat),
            "longitude": str(lng),
            "displayName": display_name,
        }
    )


def _search_variants(query: str) -> list[str]:
    variants = [query]
    lowered = query.lower()
    if "pakistan" not in lowered:
        variants.append(f"{query}, Pakistan")
    return variants


def _photon_label(props: dict) -> str:
    parts: list[str] = []
    name = props.get("name")
    if name:
        parts.append(name)
    for key in ("street", "housenumber", "district", "city", "state", "country"):
        val = props.get(key)
        if val and val not in parts:
            parts.append(val)
    return ", ".join(parts) if parts else query_fallback(props)


def query_fallback(props: dict) -> str:
    return props.get("name") or props.get("city") or props.get("country") or "Selected location"


def _photon_results(query: str, limit: int = 8) -> list[dict]:
    params = urlencode({"q": query, "limit": str(limit)})
    url = f"https://photon.komoot.io/api/?{params}"
    try:
        data = _fetch_json(url)
    except Exception:
        return []

    results = []
    for feature in data.get("features", []):
        coords = feature.get("geometry", {}).get("coordinates", [])
        if len(coords) < 2:
            continue
        lng, lat = coords[0], coords[1]
        props = feature.get("properties", {})
        osm_type = props.get("osm_type", "N")
        osm_id = props.get("osm_id", "")
        place_id = f"photon:{osm_type}:{osm_id}" if osm_id else f"photon:{lat},{lng}"
        results.append(
            {
                "placeId": place_id,
                "description": _photon_label(props),
                "latitude": str(lat),
                "longitude": str(lng),
            }
        )
    return results


def _nominatim_results(query: str, limit: int = 8, countrycodes: str | None = None) -> list[dict]:
    params: dict[str, str] = {
        "q": query,
        "format": "json",
        "limit": str(limit),
        "addressdetails": "0",
    }
    if countrycodes:
        params["countrycodes"] = countrycodes

    url = f"https://nominatim.openstreetmap.org/search?{urlencode(params)}"
    try:
        data = _fetch_json(url)
    except Exception:
        return []

    if not isinstance(data, list):
        return []

    return [
        {
            "placeId": str(item.get("place_id", "")),
            "description": item.get("display_name", query),
            "latitude": item.get("lat", ""),
            "longitude": item.get("lon", ""),
        }
        for item in data
        if item.get("lat") and item.get("lon")
    ]


def _dedupe_results(results: list[dict], max_count: int) -> list[dict]:
    seen: set[tuple[float, float]] = set()
    unique: list[dict] = []
    for item in results:
        try:
            key = (round(float(item["latitude"]), 4), round(float(item["longitude"]), 4))
        except (TypeError, ValueError):
            continue
        if key in seen:
            continue
        seen.add(key)
        unique.append(item)
        if len(unique) >= max_count:
            break
    return unique


def _reverse_geocode(lat: str, lng: str) -> str:
    params = urlencode({"lat": lat, "lon": lng, "format": "json"})
    url = f"https://nominatim.openstreetmap.org/reverse?{params}"
    try:
        data = _fetch_json(url)
        if isinstance(data, dict):
            return data.get("display_name") or "Selected location"
    except Exception:
        pass
    return "Selected location"


def _search_locations(query: str, limit: int = 8) -> list[dict]:
    combined: list[dict] = []
    for variant in _search_variants(query):
        combined.extend(_photon_results(variant, limit=limit))
        combined.extend(_nominatim_results(variant, limit=limit))
        combined.extend(_nominatim_results(variant, limit=limit, countrycodes="pk"))
        deduped = _dedupe_results(combined, limit)
        if deduped:
            return deduped
    return _dedupe_results(combined, limit)


@require_http_methods(["GET"])
def geocode_suggest(request):
    query = request.GET.get("q", "").strip()
    if len(query) < 2:
        return JsonResponse({"suggestions": []})

    suggestions = _search_locations(query, limit=8)
    return JsonResponse({"suggestions": suggestions})


@require_http_methods(["GET"])
def geocode_address(request):
    place_id = request.GET.get("place_id", "").strip()
    query = request.GET.get("q", "").strip()
    lat_param = request.GET.get("lat", "").strip()
    lng_param = request.GET.get("lng", "").strip()

    if lat_param and lng_param:
        display_name = query or _reverse_geocode(lat_param, lng_param)
        return _geocode_result(lat_param, lng_param, display_name)

    if place_id.startswith("photon:") and "," in place_id:
        coords = place_id.replace("photon:", "").split(",")
        if len(coords) == 2:
            return _geocode_result(coords[0], coords[1], query or "Selected location")

    if place_id and place_id.isdigit():
        params = urlencode({"place_ids": place_id, "format": "json"})
        url = f"https://nominatim.openstreetmap.org/lookup?{params}"
        try:
            results = _fetch_json(url)
        except Exception:
            return JsonResponse({"error": "Map search service unavailable"}, status=502)

        if results:
            place = results[0]
            return _geocode_result(
                place.get("lat", ""),
                place.get("lon", ""),
                place.get("display_name", query),
            )

    if not query:
        return JsonResponse({"error": "Address query is required"}, status=400)

    matches = _search_locations(query, limit=1)
    if matches:
        match = matches[0]
        return _geocode_result(match["latitude"], match["longitude"], match["description"])

    return JsonResponse(
        {"error": "Location not found. Thora alag naam try karein ya neeche suggestions se select karein."},
        status=404,
    )
