/* ══════════════════════════════════════════════════════
   Internationalization module — ES / EN
   ══════════════════════════════════════════════════════ */

const STORAGE_KEY = "mistborn-lang";

/** @type {'es'|'en'} */
let currentLang = "es";

/* ─── UI Translation dictionaries ────────────────── */

const UI = {
  es: {
    // ── Home page ──
    siteTitle:       "Sombras sobre Fellise · Archivo",
    kicker:          "Mistborn D20 · Archivo interactivo",
    heroQuote:       '"La ceniza cae. La niebla oculta. El metal arde."',
    lead:            "Compendio digital del sistema y la campaña.",
    panelCompendio:  "Compendio",
    panelCompSub:    "Sistema, clases, combate, equipo, progresión y campaña",
    panelMap:        "Cartografía",
    panelMapSub:     "Mapa de Fellise",
    panelAtlas:      "Atlas",
    panelAtlasSub:   "Locaciones clave para tus sesiones",
    footer:          "Fellise · Edición web",
    viewMap:         "Ver mapa completo",
    mapAlt:          "Mapa de Fellise",
    scrollLabel:     "Desplazar abajo",

    // ── Section pages ──
    sectionKicker:   "Mistborn D20 · Sección",
    backIndex:       "← Índice",
    loading:         "Cargando...",
    tocLabel:        "Contenido",
    backTop:         "Volver arriba",
    tocToggleLabel:  "Tabla de contenidos",

    // ── Cards ──
    sectionPrefix:   "Sección",
    tagPlayer:       "Jugador",
    tagDM:           "Solo DM",
    tagTool:         "Util",
    toolLabel:       "Herramienta",

    // ── Section descriptions ──
    descJugador:     "Reglas base, estructura del turno, dados, reservas metálicas y referencia de combate.",
    descClases:      "Los 8 arquetipos con habilidades, progresión nivel a nivel y subclases.",
    descCompendio:   "Armas, armaduras, herramientas, consumibles, viales y objetos de mundo.",
    descCombate:     "Sistema de combate completo, Choque Alomántico, ejemplos tácticos.",
    descProgresion:  "Tablas de progresión 1-10 para las 8 clases con talentos y mejoras.",
    descCampana:     "Guión completo del DM: actos, NPCs, puzzles, diálogos y escalado.",

    // ── Section titles (for document.title) ──
    titleSuffix:     "Sombras sobre Fellise",

    // ── Tools ──
    toolSheet:       "Hoja de Personaje",
    toolSheetDesc:   "Hoja rellenable e imprimible. Stats, RM, metales, equipo y habilidades.",
    toolCreator:     "Creador de Personaje",
    toolCreatorDesc: "Wizard paso a paso: clase, atributos, nivel, habilidades y equipo.",

    // ── Password gate ──
    pwTitle:         "Acceso restringido",
    pwHint:          "Esta sección es solo para el Dungeon Master.",
    pwPlaceholder:   "Contraseña",
    pwButton:        "Entrar",
    pwError:         "Contraseña incorrecta.",

    // ── Section audience fallback ──
    audienceDM:      "Contenido exclusivo para el Dungeon Master",
    audiencePlayer:  "Contenido para jugadores",

    // ── Badge ──
    badgeDM:         "DM",
    badgePlayer:     "Jugador",

    // ── Atlas ──
    atlasCity:       "Fellise (Ciudad)",
    atlasTavern:     "Taberna",
    atlasWarehouse:  "Almacén",
    atlasSmelter:    "Fundición",
    atlasSewers:     "Cloacas",
    atlasLab:        "Laboratorio",
    atlasUnderground:"Subsuelo",
  },

  en: {
    // ── Home page ──
    siteTitle:       "Shadows over Fellise · Archive",
    kicker:          "Mistborn D20 · Interactive Archive",
    heroQuote:       '"Ash falls. Mist hides. Metal burns."',
    lead:            "Digital compendium of the system and the campaign.",
    panelCompendio:  "Compendium",
    panelCompSub:    "System, classes, combat, gear, progression & campaign",
    panelMap:        "Cartography",
    panelMapSub:     "Map of Fellise",
    panelAtlas:      "Atlas",
    panelAtlasSub:   "Key locations for your sessions",
    footer:          "Fellise · Web Edition",
    viewMap:         "View full map",
    mapAlt:          "Map of Fellise",
    scrollLabel:     "Scroll down",

    // ── Section pages ──
    sectionKicker:   "Mistborn D20 · Section",
    backIndex:       "← Index",
    loading:         "Loading...",
    tocLabel:        "Contents",
    backTop:         "Back to top",
    tocToggleLabel:  "Table of contents",

    // ── Cards ──
    sectionPrefix:   "Section",
    tagPlayer:       "Player",
    tagDM:           "DM Only",
    tagTool:         "Utility",
    toolLabel:       "Tool",

    // ── Section descriptions ──
    descJugador:     "Core rules, turn structure, dice, metallic reserves & combat reference.",
    descClases:      "All 8 archetypes with abilities, level-by-level progression & subclasses.",
    descCompendio:   "Weapons, armor, tools, consumables, vials & world items.",
    descCombate:     "Full combat system, Allomantic Clash, tactical examples.",
    descProgresion:  "Progression tables 1-10 for all 8 classes with talents & upgrades.",
    descCampana:     "Complete DM script: acts, NPCs, puzzles, dialogues & scaling.",

    // ── Section titles (for document.title) ──
    titleSuffix:     "Shadows over Fellise",

    // ── Tools ──
    toolSheet:       "Character Sheet",
    toolSheetDesc:   "Fillable & printable sheet. Stats, MR, metals, gear & abilities.",
    toolCreator:     "Character Creator",
    toolCreatorDesc: "Step-by-step wizard: class, attributes, level, abilities & gear.",

    // ── Password gate ──
    pwTitle:         "Restricted Access",
    pwHint:          "This section is for the Dungeon Master only.",
    pwPlaceholder:   "Password",
    pwButton:        "Enter",
    pwError:         "Incorrect password.",

    // ── Section audience fallback ──
    audienceDM:      "Exclusive content for the Dungeon Master",
    audiencePlayer:  "Content for players",

    // ── Badge ──
    badgeDM:         "DM",
    badgePlayer:     "Player",

    // ── Atlas ──
    atlasCity:       "Fellise (City)",
    atlasTavern:     "Tavern",
    atlasWarehouse:  "Warehouse",
    atlasSmelter:    "Smelter",
    atlasSewers:     "Sewers",
    atlasLab:        "Laboratory",
    atlasUnderground:"Underground",
  },
};

/* ─── Section title translations ─────────────────── */

const SECTION_TITLES = {
  es: {
    jugador:    "Guía del Jugador",
    clases:     "Clases Mistborn",
    compendio:  "Compendio de Ítems",
    combate:    "Anexo de Combate",
    progresion: "Progresión 1-10",
    campana:    "Campaña DM — Sombras sobre Fellise",
  },
  en: {
    jugador:    "Player's Guide",
    clases:     "Mistborn Classes",
    compendio:  "Item Compendium",
    combate:    "Combat Appendix",
    progresion: "Progression 1-10",
    campana:    "DM Campaign — Shadows over Fellise",
  },
};

/* ─── Public API ─────────────────────────────────── */

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (lang !== "es" && lang !== "en") return;
  currentLang = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* private */ }
  document.documentElement.lang = lang;
}

export function initLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") { currentLang = stored; }
  } catch (_) { /* private */ }
  document.documentElement.lang = currentLang;
  return currentLang;
}

/** Get a UI string */
export function t(key) {
  return (UI[currentLang] && UI[currentLang][key]) || UI.es[key] || key;
}

/** Get a section title */
export function sectionTitle(slug) {
  const titles = SECTION_TITLES[currentLang] || SECTION_TITLES.es;
  return titles[slug] || slug;
}

/** Path to sections JSON for current language */
export function sectionsPath() {
  return currentLang === "en" ? "/content/sections_en.json" : "/content/sections.json";
}
