# Mapa de Rol Interactivo (Mistborn)

Aplicación web estática para dirigir partidas: cada escena tiene hotspots clickeables que te llevan a otros mapas y cambia el sonido ambiental según el lugar.

## Qué hace

- Carga escenas desde `a.json`.
- Dibuja mapa de la escena y zonas clickeables (`hotspots`).
- Navega entre `ciudad`, `taberna`, `forja` (o las que agregues).
- Reproduce audio ambiental por escena.
- Incluye botón de mute + control de volumen.

## Estructura

- `index.html`: UI principal.
- `styles.css`: estilos del mapa y hotspots.
- `app.js`: lógica de navegación y audio.
- `a.json`: configuración de escenas.

## Ejecutar en local

Como usa `fetch` para leer `a.json`, necesitás servidor local (no abrir con doble click).

### Opción 1 (Python)

```bash
python -m http.server 5500
```

Abrí: `http://localhost:5500`

### Opción 2 (VS Code Live Server)

Abrí `index.html` y elegí **Open with Live Server**.

## Publicarlo en GitHub (repo nuevo)

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "feat: mapa de rol con hotspots y audio ambiental"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git
git push -u origin main
```

Si usás GitHub CLI:

```bash
gh repo create NOMBRE_REPO --public --source . --remote origin --push
```

## Personalización rápida

En `a.json`, cada hotspot usa coordenadas porcentuales:

- `x`, `y`: posición superior izquierda
- `w`, `h`: ancho y alto
- `go`: id de escena destino

Podés cambiar imágenes (`bg`) y audios (`ambience`) por tus archivos reales.