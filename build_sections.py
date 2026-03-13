import json
from pathlib import Path
from pypdf import PdfReader

PDF_JUGADOR = Path(r"e:\Descargas\MistbornD20_Guia_Juego_y_Jugador_Tincho.pdf")
PDF_CAMPANA = Path(r"e:\Descargas\Sombras_sobre_Fellise_CAMPANA_DM_Mapas_Tincho.pdf")

reader_j = PdfReader(str(PDF_JUGADOR))   # 56 páginas — contenido jugador
reader_c = PdfReader(str(PDF_CAMPANA))   # 38 páginas — campaña DM

# Cada sección indica qué reader usar ("j" o "c") y el rango de páginas (1-based)
sections = [
    {
        "slug": "jugador",
        "title": "Guía del Jugador",
        "description": "Reglas del sistema, arquetipos Mistborn y cómo jugar.",
        "start": 3, "end": 4,
        "audience": "publico",
        "reader": "j",
    },
    {
        "slug": "clases",
        "title": "Clases Mistborn",
        "description": "Los 8 arquetipos disponibles con habilidades, tiradas y alcance.",
        "start": 11, "end": 36,
        "audience": "publico",
        "reader": "j",
    },
    {
        "slug": "progresion",
        "title": "Progresión 1–10",
        "description": "Desarrollo nivel a nivel de cada arquetipo, talentos y mejoras.",
        "start": 37, "end": 45,
        "audience": "publico",
        "reader": "j",
    },
    {
        "slug": "combate",
        "title": "Anexo de Combate",
        "description": "Sistema de pelea, estructura de turno, reservas metálicas y ejemplos.",
        "start": 46, "end": 52,
        "audience": "publico",
        "reader": "j",
    },
    {
        "slug": "compendio",
        "title": "Compendio y Equipo",
        "description": "Objetos, armas, viales, precios y hoja de personaje de referencia.",
        "start": 53, "end": 55,
        "audience": "publico",
        "reader": "j",
    },
    {
        "slug": "campana",
        "title": "Campaña DM — Sombras sobre Fellise",
        "description": "Guión completo del DM: actos, NPCs, puzzles, diálogos y escalado.",
        "start": 19, "end": 29,
        "audience": "campania",
        "reader": "c",
    },
]

readers = {"j": reader_j, "c": reader_c}

for section in sections:
    reader = readers[section.pop("reader")]
    pages = []
    for page_num in range(section["start"], section["end"] + 1):
        text = (reader.pages[page_num - 1].extract_text() or "").strip()
        pages.append({"page": page_num, "text": text})
    section["pages"] = pages

out_dir = Path("content")
out_dir.mkdir(parents=True, exist_ok=True)
(out_dir / "sections.json").write_text(
    json.dumps({"sections": sections}, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
print(f"Generated {out_dir / 'sections.json'} — {len(sections)} secciones")
