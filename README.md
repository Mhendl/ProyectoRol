# Sombras sobre Greyhaven - Web por apartados

Sitio web estático multipágina con rutas por sección (ej: `/combate/`) y contenido completo extraído del PDF.

## Rutas principales

- `/` → índice general
- `/portada/` → Portada e índice
- `/dm-pro/` → Tomo DM Pro
- `/jugador/` → Guía del Jugador Mistborn D20
- `/progresion/` → Progresión 1-10
- `/combate/` → Anexo de Combate Mistborn D20
- `/compendio/` → Compendio, hoja y mapas

## Estructura

- `index.html`: hub de navegación por rutas
- `styles.css`: estilo visual tipo libro Mistborn
- `app.js`: carga y render de secciones completas
- `content/sections.json`: texto íntegro extraído del PDF por rangos
- `img/`: atlas visual

## Ejecutar en local

### Opción 1 (Python)

```bash
python -m http.server 5500
```

Abrí: `http://localhost:5500`

### Opción 2 (VS Code Live Server)

Abrí `index.html` y elegí **Open with Live Server**.