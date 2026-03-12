import json
with open("content/sections.json", "r", encoding="utf-8") as f:
    data = json.load(f)
clases = next(s for s in data["sections"] if s["slug"] == "clases")
for p in clases["pages"]:
    pg = p["page"]
    txt = p["text"]
    print(f"\n{'='*60}")
    print(f"PAGE {pg} ({len(txt)} chars)")
    print(f"{'='*60}")
    print(txt)
