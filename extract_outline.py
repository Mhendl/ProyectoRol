from pathlib import Path
from pypdf import PdfReader

pdf = Path(r"e:\Descargas\Sombras_sobre_Greyhaven_PACK_FINAL_MistbornD20_Tincho.pdf")
reader = PdfReader(str(pdf))

def get_page_num(dest):
    try:
        return reader.get_destination_page_number(dest) + 1
    except Exception:
        return None

items = []
for item in reader.outline:
    if isinstance(item, list):
        continue
    title = getattr(item, "title", None)
    if title:
        items.append((title, get_page_num(item)))

print("TOP_OUTLINE")
for title, page in items:
    print(f"{page}\t{title}")
print("PAGE_COUNT", len(reader.pages))
