import json, re

with open(r"e:\Descargas\Proyecto Mistborn\content\sections.json", encoding="utf-8") as f:
    data = json.load(f)

CLASS_NAMES = [
    "Bruto de Peltre", "Tirador de Acero", "Atractor de Hierro",
    "Acechador de Estano", "Embaucador de Zinc/Laton",
    "Apagador de Cobre", "Sabueso de Bronce",
    "Especialista Mundano (Skaa de oficio)"
]

def is_all_caps(s):
    letters = re.sub(r'[^a-zA-ZáéíóúñÁÉÍÓÚÑüÜ]', '', s)
    return len(letters) >= 3 and letters == letters.upper()

def is_title_like(t):
    return (
        len(t) >= 8 and len(t) <= 65
        and not t.endswith(".")
        and not t.endswith(",")
        and not t.endswith(";")
        and not t.startswith("-")
        and not t.startswith("·")
        and re.match(r'^[A-ZÁÉÍÓÚÑ¿¡0-9"«]', t)
    )

def is_class_name(line):
    return line.strip() in CLASS_NAMES

for section in data["sections"]:
    slug = section["slug"]
    print(f"\n{'='*80}")
    print(f"SECTION: {slug} ({section['title']})")
    print(f"{'='*80}")
    
    all_caps_lines = []
    title_like_lines = []
    class_name_lines = []
    
    for pi, page in enumerate(section["pages"]):
        text = page["text"]
        lines = text.split("\n")
        for li, line in enumerate(lines):
            t = line.strip()
            if not t:
                continue
            
            if is_class_name(t):
                class_name_lines.append((pi, li, t))
            
            if is_all_caps(t):
                all_caps_lines.append((pi, li, t))
            elif is_title_like(t):
                title_like_lines.append((pi, li, t))
    
    # TOC entries
    print(f"\n--- TOC ENTRIES: ALL_CAPS lines (.sec-heading) [{len(all_caps_lines)}] ---")
    for pi, li, t in all_caps_lines:
        print(f"  Page {pi} Line {li}: {t}")
    
    print(f"\n--- TOC ENTRIES: Class names (.class-name) [{len(class_name_lines)}] ---")
    for pi, li, t in class_name_lines:
        print(f"  Page {pi} Line {li}: {t}")
    
    print(f"\n--- NOT IN TOC: Title-like lines (.sec-subheading) [{len(title_like_lines)}] ---")
    for pi, li, t in title_like_lines:
        print(f"  Page {pi} Line {li}: {t}")
    
    total_toc = len(all_caps_lines) + len(class_name_lines)
    print(f"\n>>> SUMMARY: {total_toc} TOC entries, {len(title_like_lines)} title-like (not in TOC)")
    if total_toc == 0:
        print(">>> WARNING: 0 TOC entries for this section!")
