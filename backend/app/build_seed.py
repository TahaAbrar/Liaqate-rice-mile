import json
from pathlib import Path

# Build seed_data.json from frontend default files (read-only parse)
ROOT = Path(__file__).resolve().parents[2]
DATA_TS = ROOT / "src" / "data.ts"
CTX_TS = ROOT / "src" / "context" / "AdminDataContext.tsx"
OUT = Path(__file__).resolve().parent / "seed_data.json"


def extract_products():
    text = DATA_TS.read_text(encoding="utf-8")
    start = text.index("export const PRODUCTS: Product[] = [")
    start = text.index("[", start)
    depth = 0
    for i, ch in enumerate(text[start:], start):
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                arr_text = text[start : i + 1]
                break
    else:
        raise ValueError("Could not parse PRODUCTS array")
    # TS -> JSON-ish
    arr_text = (
        arr_text.replace("export const PRODUCTS: Product[] = ", "")
        .replace("'", '"')
        .replace("Basmati", '"Basmati"')
        .replace("Non-Basmati", '"Non-Basmati"')
        .replace("Sella", '"Sella"')
        .replace("Premium Export", '"Premium Export"')
    )
    # Use regex-free manual: eval as Python after converting
    import re

    arr_text = re.sub(r"(\w+):", r'"\1":', arr_text)
    arr_text = arr_text.replace("True", "true").replace("False", "false")
    return json.loads(arr_text)


def extract_sections():
    text = CTX_TS.read_text(encoding="utf-8")
    start = text.index("const DEFAULT_DATA = {")
    start = text.index("{", start)
    depth = 0
    for i, ch in enumerate(text[start:], start):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                obj_text = text[start : i + 1]
                break
    else:
        raise ValueError("Could not parse DEFAULT_DATA")
    import re

    obj_text = re.sub(r"(\w+):", r'"\1":', obj_text)
    obj_text = obj_text.replace("'", '"')
    data = json.loads(obj_text)
    return data


if __name__ == "__main__":
    payload = {"sections": extract_sections(), "products": extract_products()}
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")
