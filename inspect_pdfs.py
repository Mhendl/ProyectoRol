from pypdf import PdfReader
from pathlib import Path

pdfs = {
    "JUGADOR": r"e:\Descargas\MistbornD20_Guia_Juego_y_Jugador_Tincho.pdf",
    "CAMPANA": r"e:\Descargas\Sombras_sobre_Greyhaven_CAMPANA_DM_Mapas_Tincho.pdf",
}

for label, path in pdfs.items():
    reader = PdfReader(path)
    print(f"\n{'='*60}")
    print(f"  {label} — {len(reader.pages)} páginas")
    print(f"{'='*60}")
    for i, page in enumerate(reader.pages, 1):
        text = (page.extract_text() or "").strip()
        # Show page number and first 120 chars
        preview = text.replace("\n", " / ")[:120]
        print(f"  p{i:02d}: {preview}")
