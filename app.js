const atlasItems = [
  { name: "Greyhaven (Ciudad)", src: "img/Ciudad.png" },
  { name: "Taberna", src: "img/Taberna.png" },
  { name: "Almacén", src: "img/Almacen.png" },
  { name: "Fundición", src: "img/Fundicion.png" },
  { name: "Cloacas", src: "img/Kandra.png" },
  { name: "Laboratorio", src: "img/Laboratorio.png" },
  { name: "Subsuelo", src: "img/1subsuelo.png" }
];

// ── Progresión detallada por clase (datos estáticos) ──────────────────────────
const CLASS_PROGRESSION = [
  {
    name: "Bruto de Peltre",
    role: "Tanque / frontliner / control físico",
    dv: "d10", hpBase: 22, hpPerLevel: 6, keyAttr: "FUE/CON", metal: "Peltre",
    subclasses: ["Rompefilas", "Guardián de la Crew"],
    levels: [
      { n:1,  bm:2, rm:4, hp:22, gains:["Golpe de Peltre (Daño)","Acometida Brutal (Daño + empuje)","Guardia de Hierro (Defensa)","Cuerpo Endurecido (pasivo)"], note:"Arranca con 2 daño + 1 defensa." },
      { n:2,  bm:2, rm:4, hp:28, gains:["Impacto Pesado (+1d4 daño 1 vez por turno)"], note:"Sube daño sin romper balance." },
      { n:3,  bm:2, rm:5, hp:34, gains:["Subclase: Rompefilas o Guardián de la Crew","Habilidad de subclase"], note:"Identidad fuerte del personaje." },
      { n:4,  bm:2, rm:5, hp:40, gains:["+2 atributos o 1 talento"], note:"Primer punto real de personalización." },
      { n:5,  bm:3, rm:6, hp:46, gains:["Ataque Extra"], note:"Gran salto de poder." },
      { n:6,  bm:3, rm:6, hp:52, gains:["Habilidad de subclase (N6)"], note:"Consolida rol: más daño o más protección." },
      { n:7,  bm:3, rm:7, hp:58, gains:["Atrancar Línea (control de zona / reacción mejorada)"], note:"Excelente controlando espacio." },
      { n:8,  bm:3, rm:7, hp:64, gains:["+2 atributos o 1 talento"], note:"Segunda capa de build." },
      { n:9,  bm:4, rm:8, hp:70, gains:["Fulgor de Peltre (técnica icónica)","Habilidad de subclase (N9)"], note:"Power spike fuerte para boss fights." },
      { n:10, bm:4, rm:8, hp:76, gains:["Monstruo de Ceniza (habilidad firma)","Mejora final de subclase"], note:"Nivel dios del Bruto." },
    ]
  },
  {
    name: "Tirador de Acero",
    role: "Daño a distancia / movilidad / control de líneas",
    dv: "d8", hpBase: 19, hpPerLevel: 5, keyAttr: "DES", metal: "Acero",
    subclasses: ["Pistolero de Bruma", "Ancla de Acero"],
    levels: [
      { n:1,  bm:2, rm:4, hp:19, gains:["Disparo Preciso (Daño)","Ráfaga de Monedas (Daño)","Paso de Acero (Movilidad/defensa)","Ojo de Tirador (pasivo)"], note:"Muy táctico desde el arranque." },
      { n:2,  bm:2, rm:4, hp:24, gains:["Apuntar (+2 ataque o +1d4 daño si no se movió)"], note:"Premia posicionamiento." },
      { n:3,  bm:2, rm:5, hp:29, gains:["Subclase: Pistolero de Bruma o Ancla de Acero","Habilidad de subclase"], note:"Daño puro vs control de campo." },
      { n:4,  bm:2, rm:5, hp:34, gains:["+2 atributos o 1 talento"], note:"Ideal para Dominio de Cobertura / Golpe Preciso." },
      { n:5,  bm:3, rm:6, hp:39, gains:["Disparo Doble / Ataque Extra a distancia"], note:"Gran salto de daño." },
      { n:6,  bm:3, rm:6, hp:44, gains:["Habilidad de subclase (N6)"], note:"Cadena de tiros o zona de control según build." },
      { n:7,  bm:3, rm:7, hp:49, gains:["Cobertura Inteligente (+defensa si reposiciona bien)"], note:"Se vuelve más difícil de bajar." },
      { n:8,  bm:3, rm:7, hp:54, gains:["+2 atributos o 1 talento"], note:"Segunda optimización del build." },
      { n:9,  bm:4, rm:8, hp:59, gains:["Lluvia de Acero (técnica icónica de área/línea)","Habilidad de subclase (N9)"], note:"Pasa de tirador a amenaza de campo." },
      { n:10, bm:4, rm:8, hp:64, gains:["Francotirador de Ceniza (habilidad firma)","Mejora final de subclase"], note:"Turno explosivo, ideal para peleas finales." },
    ]
  },
  {
    name: "Infiltrado de Estaño",
    role: "Sigilo / exploración / precisión / scouting",
    dv: "d8", hpBase: 18, hpPerLevel: 5, keyAttr: "DES/SAB", metal: "Estaño",
    subclasses: ["Sombras del Canal", "Sabueso de Niebla"],
    levels: [
      { n:1,  bm:2, rm:4, hp:18, gains:["Estocada Sutil (Daño)","Lanzamiento Rápido (Daño)","Desvanecerse (Defensa/movilidad)","Sentidos Agudizados (pasivo)"], note:"Muy útil dentro y fuera de combate." },
      { n:2,  bm:2, rm:4, hp:23, gains:["Aprovechar Hueco (+daño situacional 1/turno)"], note:"Arranca el daño inteligente." },
      { n:3,  bm:2, rm:5, hp:28, gains:["Subclase: Sombras del Canal o Sabueso de Niebla","Habilidad de subclase"], note:"Infiltración/escape vs rastreo/caza." },
      { n:4,  bm:2, rm:5, hp:33, gains:["+2 atributos o 1 talento"], note:"Gran momento para talentos de movilidad/skill." },
      { n:5,  bm:3, rm:6, hp:38, gains:["Precisión Mejorada (daño extra escala)"], note:"Spike de daño si juega bien posicionamiento." },
      { n:6,  bm:3, rm:6, hp:43, gains:["Habilidad de subclase (N6)"], note:"Sigilo más fuerte o detección/rastreo avanzado." },
      { n:7,  bm:3, rm:7, hp:48, gains:["Evasión de Ceniza (mejor respuesta a áreas)"], note:"Sobrevive mejor a trampas y explosiones." },
      { n:8,  bm:3, rm:7, hp:53, gains:["+2 atributos o 1 talento"], note:"Segunda vuelta de personalización." },
      { n:9,  bm:4, rm:8, hp:58, gains:["Golpe en la Niebla (técnica icónica)","Habilidad de subclase (N9)"], note:"Pico de asesino táctico." },
      { n:10, bm:4, rm:8, hp:63, gains:["Fantasma de Greyhaven (habilidad firma)","Mejora final de subclase"], note:"Movilidad + daño + supervivencia top." },
    ]
  },
  {
    name: "Manipulador (Latón/Zinc)",
    role: "Control emocional / soporte / debuffs / social",
    dv: "d6", hpBase: 16, hpPerLevel: 4, keyAttr: "CAR/INT", metal: "Latón / Zinc",
    subclasses: ["Sosegador de Multitudes", "Instigador de Ruina"],
    levels: [
      { n:1,  bm:2, rm:4, hp:16, gains:["Golpe Oportunista (Daño)","Provocación Calculada (Daño + debuff)","Calmar / Incitar (Control)","Leer la Sala (pasivo)"], note:"Baja vida, pero altísima utilidad." },
      { n:2,  bm:2, rm:4, hp:20, gains:["Voz Medida (técnica emocional a 2 objetivos 1/combate)"], note:"Empieza a controlar grupos." },
      { n:3,  bm:2, rm:5, hp:24, gains:["Subclase: Sosegador de Multitudes o Instigador de Ruina","Habilidad de subclase"], note:"Control defensivo vs control ofensivo." },
      { n:4,  bm:2, rm:5, hp:28, gains:["+2 atributos o 1 talento"], note:"Suele ir a CAR / INT / talentos sociales." },
      { n:5,  bm:3, rm:6, hp:32, gains:["Control en Área (cono/área pequeña)"], note:"Tremendo pico de utilidad." },
      { n:6,  bm:3, rm:6, hp:36, gains:["Habilidad de subclase (N6)"], note:"Aura o caos de grupo según subclase." },
      { n:7,  bm:3, rm:7, hp:40, gains:["Rebote Emocional (reacción defensiva/debuff)"], note:"Mejora supervivencia, que la necesita." },
      { n:8,  bm:3, rm:7, hp:44, gains:["+2 atributos o 1 talento"], note:"Segunda vuelta de build/control." },
      { n:9,  bm:4, rm:8, hp:48, gains:["Tormenta Emocional (técnica icónica)","Habilidad de subclase (N9)"], note:"Puede cambiar combates enteros." },
      { n:10, bm:4, rm:8, hp:52, gains:["Dueño del Pulso (habilidad firma)","Mejora final de subclase"], note:"Maestro del control en combate y escenas sociales." },
    ]
  },
  {
    name: "Buscador/Velador (Bronce/Cobre)",
    role: "Detección / anti-alomancia / soporte táctico / información",
    dv: "d8", hpBase: 18, hpPerLevel: 5, keyAttr: "SAB/INT", metal: "Bronce / Cobre",
    subclasses: ["Sabueso de Bronce", "Velo de Cobre"],
    levels: [
      { n:1,  bm:2, rm:4, hp:18, gains:["Ataque Medido (Daño)","Pulso Disruptivo (Daño + control)","Escucha de Bronce / Niebla de Cobre (Control/defensa)","Analista de Riesgo (pasivo)"], note:"Muy temático Mistborn, ideal para campaña." },
      { n:2,  bm:2, rm:4, hp:23, gains:["Lectura de Patrón (+detección/trampas/rastros)"], note:"Brilla muchísimo fuera de combate." },
      { n:3,  bm:2, rm:5, hp:28, gains:["Subclase: Sabueso de Bronce o Velo de Cobre","Habilidad de subclase"], note:"Rastreador ofensivo vs soporte defensivo." },
      { n:4,  bm:2, rm:5, hp:33, gains:["+2 atributos o 1 talento"], note:"Build de info/soporte/anti-poderes." },
      { n:5,  bm:3, rm:6, hp:38, gains:["Contramedida (reacción para reducir técnica enemiga)"], note:"Nivel clave contra jefes con poderes." },
      { n:6,  bm:3, rm:6, hp:43, gains:["Habilidad de subclase (N6)"], note:"Mejora detección/rastreo o protección de grupo." },
      { n:7,  bm:3, rm:7, hp:48, gains:["Interferencia (reacción avanzada anti-técnica)"], note:"Control táctico muy fuerte." },
      { n:8,  bm:3, rm:7, hp:53, gains:["+2 atributos o 1 talento"], note:"Consolida el rol de especialista." },
      { n:9,  bm:4, rm:8, hp:58, gains:["Mapa Invisible (técnica icónica)","Habilidad de subclase (N9)"], note:"Ventaja táctica enorme para el grupo." },
      { n:10, bm:4, rm:8, hp:63, gains:["Señor de los Pulsos (habilidad firma)","Mejora final de subclase"], note:"Excelente cierre para campaña con metales raros." },
    ]
  },
];

const routeBySlug = {
  jugador:    "/jugador/",
  clases:     "/clases/",
  progresion: "/progresion/",
  combate:    "/combate/",
  compendio:  "/compendio/",
  campana:    "/campana/",
};

function normalizeLineBreaks(text) {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

// Replace old currency names (boxing / box / clips) with coronas
function normalizeCurrency(text) {
  return text
    .replace(/\b(\d+(?:[.,]\d+)?)\s*boxings?\b/gi, "$1 coronas")
    .replace(/\b(\d+(?:[.,]\d+)?)\s*box\b/gi, "$1 coronas")
    .replace(/\b(\d+(?:[.,]\d+)?)\s*clips?\b/gi, "$1 coronas")
    .replace(/\bboxings?\b/gi, "coronas")
    .replace(/\bbox\b/gi, "coronas")
    .replace(/\bclips?\b/gi, "coronas");
}

// Strip the leading page number injected by the PDF extractor
function stripPageNumber(text, pageNum) {
  const lines = normalizeLineBreaks(text).split("\n");
  if (lines.length > 0 && lines[0].trim() === String(pageNum)) {
    lines.shift();
  }
  return lines;
}

// Patterns that are page-level headers or PDF-navigation noise — skip them
const SKIP_PATTERNS = [
  /^Sombras sobre Greyhaven\s*[-–]\s*Manual Total/i,
  /^SOMBRAS SOBRE GREYHAVEN\s*[-–]/i,
  /^MANUAL DEL JUGADOR\s*[-–]/i,
  /^SOMBRAS SOBRE GREYHAVEN\s*-\s*ANEXO/i,
  /^P[áa]g(ina)?\.?\s*\d+$/i,
  /^Pagina\s+\d+$/i,
  /^ABRIR$/i,                              // Botones del índice interactivo del PDF
  /^IR AL [ÍI]NDICE/i,                    // "IR AL ÍNDICE INTERACTIVO"
  /^Click en /i,                           // "Click en cada bloque / fila"
  /^También podés usar los marcadores/i,   // Nota de navegación del PDF
  /^Usá los botones de índice/i,
  /^[ÍI]NDICE INTERACTIVO$/i,
  /^[ÍI]NDICE DETALLADO\s/i,
  /^PARTE\s+[IVXLCDM]+\s*[-–]/i,          // "PARTE III - Guia del Jugador..." PDF chapter markers
];

function isSkippedLine(line) {
  return SKIP_PATTERNS.some((re) => re.test(line.trim()));
}

// ALL-CAPS (meaningful letters) → top-level heading
function isAllCaps(str) {
  const letters = str.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑüÜ]/g, "");
  return letters.length >= 3 && letters === letters.toUpperCase();
}

// Short standalone line without sentence-ending punctuation → sub-heading
function isTitleLike(line) {
  const t = line.trim();
  return (
    t.length >= 8 &&
    t.length <= 65 &&
    !t.endsWith(".") &&
    !t.endsWith(",") &&
    !t.endsWith(";") &&
    !t.startsWith("-") &&
    !t.startsWith("·") &&
    /^[A-ZÁÉÍÓÚÑ¿¡0-9"«]/.test(t)
  );
}

// ── Classes section ────────────────────────────────────────────
const CLASS_NAMES = [
  "Bruto de Peltre",
  "Tirador de Acero",
  "Atractor de Hierro",
  "Acechador de Estano",
  "Embaucador de Zinc/Laton",
  "Apagador de Cobre",
  "Sabueso de Bronce",
  "Especialista Mundano (Skaa de oficio)",
];

const TABLE_NOISE = new Set([
  "Campo", "Detalle", "Tirada", "Permanente",
  "Alcance / uso", "Efecto / dano / DC", "Costo / accion",
  "Notas", "Sin tirada", "Sin tirada al entrar en escena social",
  "Pasivo", "Pasivo con RM >=1", "Segun opcion", "Segun subestilo",
  "Decision de campana",
]);

function isTableNoise(line) {
  return TABLE_NOISE.has(line.trim());
}

function isClassNameLine(line) {
  const t = line.trim();
  return CLASS_NAMES.some((n) => t === n);
}

function buildClassesContent(section, container) {
  const allLines = [];
  section.pages.forEach((pageData) => {
    const lines = stripPageNumber(pageData.text, pageData.page);
    lines.forEach((l) => allLines.push(l.trim()));
    allLines.push("");
  });

  let card = null;
  let statsRow = null;
  let bodyBuf = [];
  let attrBuf = null; // accumulate wrapped attribute lines

  function flushBody() {
    if (!bodyBuf.length) return;
    const text = bodyBuf.join(" ").replace(/\s+/g, " ").trim();
    if (text) {
      const p = document.createElement("p");
      p.className = "sec-text";
      p.textContent = text;
      (card || container).appendChild(p);
    }
    bodyBuf = [];
  }

  function flushAttr() {
    if (!attrBuf) return;
    const full = attrBuf.replace(/\s+/g, " ").trim();
    // split on " | " separators
    full.split(/\s*\|\s*/).forEach((part) => {
      const colon = part.indexOf(":");
      if (colon < 1) return;
      const lbl = part.slice(0, colon).trim();
      const val = part.slice(colon + 1).trim();
      if (lbl && val && card) {
        if (!statsRow) {
          statsRow = document.createElement("div");
          statsRow.className = "class-stats-row";
          card.appendChild(statsRow);
        }
        const pill = document.createElement("span");
        pill.className = "class-stat-pill";
        pill.innerHTML = `<strong>${lbl}</strong><span>${val}</span>`;
        statsRow.appendChild(pill);
      }
    });
    attrBuf = null;
  }

  function appendSimpleStat(label, value) {
    if (!card) return;
    if (!statsRow) {
      statsRow = document.createElement("div");
      statsRow.className = "class-stats-row";
      card.appendChild(statsRow);
    }
    const pill = document.createElement("span");
    pill.className = "class-stat-pill";
    pill.innerHTML = `<strong>${label}</strong><span>${value}</span>`;
    statsRow.appendChild(pill);
  }

  function startCard(name) {
    flushBody();
    flushAttr();
    card = document.createElement("div");
    card.className = "class-card";
    statsRow = null;
    const h = document.createElement("h2");
    h.className = "class-name";
    h.id = "class-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    h.textContent = name;
    card.appendChild(h);
    container.appendChild(card);
  }

  let prevLineWasAttr = false;
  let i = 0;
  const total = allLines.length;

  while (i < total) {
    // Detect tables (Campo/Detalle ability tables, Nivel/Rasgo progression tables, etc.)
    const tableResult = tryParseTable(allLines, i, total);
    if (tableResult) {
      flushBody();
      flushAttr();
      (card || container).appendChild(tableResult.el);
      i = tableResult.nextIdx;
      prevLineWasAttr = false;
      continue;
    }

    const line = allLines[i]; i++;
    if (!line) {
      flushBody();
      if (!prevLineWasAttr) flushAttr();
      prevLineWasAttr = false;
      continue;
    }
    if (isSkippedLine(line)) continue;

    // Class heading
    if (isClassNameLine(line)) {
      flushAttr();
      startCard(line);
      prevLineWasAttr = false;
      continue;
    }

    // "Rol: ...", "Fortalezas: ...", "Debilidades: ..."
    const simpleMatch = line.match(/^(Rol|Fortalezas|Debilidades)\s*:\s*(.+)$/i);
    if (simpleMatch) {
      flushBody();
      flushAttr();
      appendSimpleStat(simpleMatch[1], simpleMatch[2]);
      prevLineWasAttr = false;
      continue;
    }

    // "Atributo clave: ..." — may wrap to next line
    const attrMatch = line.match(/^(Atributo clave)\s*:\s*(.+)$/i);
    if (attrMatch) {
      flushBody();
      flushAttr();
      attrBuf = attrMatch[1] + ": " + attrMatch[2];
      prevLineWasAttr = true;
      continue;
    }

    // Continuation of a wrapped attribute line (e.g., "de clase usa: CON")
    if (prevLineWasAttr && attrBuf && /^[a-z]|^de /i.test(line)) {
      attrBuf += " " + line;
      continue;
    }

    // Flush pending attr before non-continuation lines
    if (prevLineWasAttr) {
      flushAttr();
      prevLineWasAttr = false;
    }

    // Ability descriptions: "Word(s): detailed content..."
    const abilityMatch = line.match(/^([A-ZÁÉÍÓÚÑ][^:]{1,35}):\s*(.{12,})$/);
    if (abilityMatch && card) {
      flushBody();
      const p = document.createElement("p");
      p.className = "class-ability";
      p.innerHTML = `<strong>${abilityMatch[1]}:</strong> ${abilityMatch[2]}`;
      card.appendChild(p);
      continue;
    }

    // Sub-section titles within a class card (e.g. ability names, "Progresion 1-10",
    // "Habilidades explicadas...", "Consejos de balance...").
    // tryParseTable already ran above, so table header lines are consumed there.
    if (isTitleLike(line)) {
      flushBody();
      flushAttr();
      // Ability names appear just before a Campo/Detalle table — give them a special style
      const nextI = allLines.slice(i + 1).findIndex(l => l.trim());
      const nextLine = nextI >= 0 ? allLines[i + 1 + nextI].trim() : "";
      const isAbilityName = nextLine === "Campo";
      const h = document.createElement(isAbilityName ? "h4" : "h3");
      h.className = isAbilityName ? "ability-name" : "sec-subheading";
      h.textContent = line;
      (card || container).appendChild(h);
      continue;
    }

    bodyBuf.push(line);
  }

  flushBody();
  flushAttr();
}

// ── Known PDF table schemas ────────────────────────────────────────────────────
// Each entry: headers[] (exact matches, line-by-line), cols (number of columns),
// and optional rowStart (RegExp that the first cell of every data row must match).
// Order matters: put more specific schemas before ambiguous ones sharing a header.
const TABLE_SCHEMAS = [
  // ── Jugador ──────────────────────────────────────────────────────────────────
  { headers: ["Accion", "Que implica", "Tirada sugerida"], cols: 3 },
  { headers: ["Clase", "Rol", "Atributo clave", "RM inicial", "Brilla en..."], cols: 5,
    rowStart: /^(Bruto de Peltre|Tirador de Acero|Atractor de Hierro|Acechador de Estano|Embaucador de Zinc|Apagador de Cobre|Sabueso de Bronce|Especialista Mundano)/ },

  // ── Clases (also used via buildClassesContent) ────────────────────────────────
  // Progression table per class: Nivel / Rasgo (rows 1-10)
  { headers: ["Nivel", "Rasgo"], cols: 2, rowStart: /^\d+$/ },
  // Ability detail table per class — each campo is its own row
  { headers: ["Campo", "Detalle"], cols: 2,
    rowStart: /^(Costo \/|Tirada$|Alcance \/ uso|Efecto \/ dano|Notas$)/ },

  // ── Progresión ───────────────────────────────────────────────────────────────
  // rowStart = exact first-cell pattern so the greedy last-cell doesn't overrun
  { headers: ["Recurso", "Uso"], cols: 2, rowStart: /^(RM|Impulso|Fatiga)$/ },
  { headers: ["Nivel", "Ganancia general"], cols: 2, rowStart: /^\d+$/ },
  {
    headers: ["Arquetipo", "Rol", "Atributo", "HP", "Enfoques N3", "Hitos de nivel"],
    cols: 6,
    // Guard: every data row must start with one of the 8 known archetype names
    rowStart: /^(Bruto de Peltre|Tirador de Acero|Atractor de Hierro|Acechador de Estano|Embaucador|Apagador de Cobre|Sabueso de Bronce|Especialista Mundano)/,
  },
  { headers: ["Talento", "Efecto"], cols: 2 },
  { headers: ["Situacion", "Tirada", "Contra"], cols: 3 },
  { headers: ["DC", "Dificultad", "Ejemplo"], cols: 3 },
  { headers: ["Tu turno (checklist)", "Recordatorio"], cols: 2 },

  // ── Combate ──────────────────────────────────────────────────────────────────
  { headers: ["Se mantiene (D&D)", "Se agrega / adapta (Mistborn D20)"], cols: 2,
    rowStart: /^(d20|CA,|Da.o|DC y|Accion \/)/ },
  { headers: ["Elemento", "Que permite", "Ejemplos"], cols: 3,
    rowStart: /^(Accion|Movimiento|Reaccion)/ },
  { headers: ["Dificultad", "DC", "Ejemplo"], cols: 3,
    rowStart: /^(Facil|Media|Dificil|Muy dificil|Heroica)/ },
  { headers: ["Nivel", "RM sugerida", "Comentario"], cols: 3, rowStart: /^\d+(-\d+)?$/ },
  { headers: ["Nivel de Fatiga", "Efecto"], cols: 2, rowStart: /^Fatiga \d+$/ },
  { headers: ["Costo", "Efecto"], cols: 2,
    rowStart: /^\d+ Impulso$/ },
  { headers: ["Elemento", "Regla rapida"], cols: 2,
    rowStart: /^(Media cobertura|Cobertura completa|Terreno dificil|Altura|Zona peligrosa)/ },
  { headers: ["Estado", "Efecto corto"], cols: 2,
    rowStart: /^(Derribado|Asustado|Aturdido leve|Sangrado|Fatigado)/ },
  { headers: ["Habilidad", "Que tira", "Exito", "Dano / Efecto", "RM"], cols: 5,
    rowStart: /^(Golpe|Aguante|Furia|Tiro Preciso|Empuje|Salva|Tiron|Esta.o|Reflejos|Prediccion|Irritar|Lectura|Onda|Nube|Cobertura Mental|Cupula|Escuchar|Mapa de Pulsos|Oficio|Recurso Improvisado|Instinto)/ },
  { headers: ["Situacion", "Que se tira"], cols: 2,
    rowStart: /^(Atacar|Poder metal|Poder utilitario|Da.o|Evitar fatiga)/ },

  // ── Compendio ─────────────────────────────────────────────────────────────────
  { headers: ["Objeto", "Tipo", "Precio", "Daño", "Notas"], cols: 5,
    rowStart: /^(Daga|Baston|Sable|Arco|Ballesta|Pistola|Municion|Virotes)/ },
  { headers: ["Objeto", "Categoria", "Precio", "Efecto", "Notas"], cols: 5,
    rowStart: /^(Chaqueta|Arnes|Ganzuas|Kit|Cuerda|Farol|Manta|Frasco)/ },
  { headers: ["Objeto", "Precio", "Uso", "Notas"], cols: 4,
    rowStart: /^(Vial|Aleaci[oó]n|Fragmento)/i },
  { headers: ["Servicio", "Precio", "Notas"], cols: 3,
    rowStart: /^(Habitacion|Comida|Informante|Soborno|Pasaje|Curandero|Falsificaci[oó]n|Alquiler)/i },

  // ── Campaña ───────────────────────────────────────────────────────────────────
  { headers: ["Reloj", "Se llena cuando...", "Efecto al completarse"], cols: 3 },
  { headers: ["Firma de Silen", "Como se muestra", "Para que sirve"], cols: 3 },
  { headers: ["Enemigo", "Defensa / PG", "Ataques", "Rasgo"], cols: 4 },
  { headers: ["Situacion", "Ajuste facil", "Ajuste normal", "Ajuste dificil"], cols: 4 },
  { headers: ["Rango", "DC", "Uso tipico"], cols: 3 },
  { headers: ["Nivel de amenaza", "Dano de referencia por golpe", "Comentario"], cols: 3 },
];

// Build a DOM table from headers + rows arrays
function buildTableEl(headers, rows) {
  const table = document.createElement("table");
  table.className = "pdf-table";
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headers.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  rows.forEach((cells) => {
    const tr = document.createElement("tr");
    cells.forEach((c) => {
      const td = document.createElement("td");
      td.textContent = c;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

// Returns true if `line` is a continuation of the previous cell (not a new cell)
function isCellContinuation(line) {
  if (!line) return false;
  // Parenthetical continuation: "(continuacion)" always wraps
  if (line.startsWith("(")) return true;
  // Starts with lowercase letter
  if (/^[a-záéíóúñü]/.test(line)) {
    // Dice notation: "d20 + FUE...", "d8", "d10", etc. are their OWN cells
    if (/^d\d+/.test(line)) return false;
    // Plain RM cost like "3 RM" or standalone number
    if (/^\d+\s*(RM)?$/.test(line)) return false;
    return true;
  }
  return false;
}

// Try to detect and consume a table starting at lines[idx].
// Returns { el, nextIdx } or null.
function tryParseTable(lines, idx, totalLines) {
  for (const schema of TABLE_SCHEMAS) {
    const hLen = schema.headers.length;

    // Advance past blank lines at idx
    let start = idx;
    while (start < totalLines && !lines[start].trim()) start++;

    // All headers must match consecutively
    let match = true;
    for (let h = 0; h < hLen; h++) {
      if ((lines[start + h] || "").trim() !== schema.headers[h]) { match = false; break; }
    }
    if (!match) continue;

    const N = schema.cols;
    const rows = [];
    let pos = start + hLen;

    while (pos < totalLines) {
      // Skip blank separator lines between rows
      while (pos < totalLines && !lines[pos].trim()) pos++;
      if (pos >= totalLines) break;

      const firstLine = lines[pos].trim();

      // Stop on structural section headings
      if (isAllCaps(firstLine) || isSkippedLine(firstLine)) break;

      // Stop if this schema requires rows to start with a specific pattern
      if (schema.rowStart && !schema.rowStart.test(firstLine)) break;

      // Stop if the next hLen lines are an exact repeat of the schema headers
      // (i.e. the same table header is restarting — new occurrence)
      let isRepeatHeader = true;
      for (let h = 0; h < hLen; h++) {
        if ((lines[pos + h] || "").trim() !== schema.headers[h]) { isRepeatHeader = false; break; }
      }
      if (isRepeatHeader) break;

      // Look-ahead: if within the N lines we're about to consume, a repeat of the
      // schema headers starts at offset h, this "row" is really a section title
      // that precedes the next occurrence of the table (e.g. "Talentos metalicos"
      // appearing before a second "Talento / Efecto" header block).
      let hasNestedHeaders = false;
      for (let h = 1; h < N && !hasNestedHeaders; h++) {
        let sub = true;
        const checkLen = Math.min(hLen, N - h);
        for (let m = 0; m < checkLen; m++) {
          if ((lines[pos + h + m] || "").trim() !== schema.headers[m]) { sub = false; break; }
        }
        if (sub && checkLen >= 1) hasNestedHeaders = true;
      }
      if (hasNestedHeaders) break;

      // Stop if firstLine is a section-separator title (e.g. "Equipo, herramientas y consumibles")
      // immediately followed by headers of a NEW table (different schema).
      if (isTitleLike(firstLine)) {
        let lookPos = pos + 1;
        while (lookPos < totalLines && !lines[lookPos].trim()) lookPos++;
        let nextIsNewTable = false;
        for (const s of TABLE_SCHEMAS) {
          let sm = true;
          for (let m = 0; m < s.headers.length; m++) {
            if ((lines[lookPos + m] || "").trim() !== s.headers[m]) { sm = false; break; }
          }
          if (sm) { nextIsNewTable = true; break; }
        }
        if (nextIsNewTable) break;
      }

      // Collect exactly N cells for this row.
      // Blank lines are NOT skipped mid-row: a blank means the row ended.
      const cells = [];
      let cPos = pos;
      let collectionOk = true;
      for (let c = 0; c < N; c++) {
        // Some PDF tables have a stray blank between cells in the same row
        if (schema.allowBlankBetweenCells && c > 0) {
          while (cPos < totalLines && !lines[cPos].trim()) cPos++;
        }
        if (cPos >= totalLines || !lines[cPos].trim()) { collectionOk = false; break; }

        let cell = lines[cPos].trim();
        cPos++;

        // Attempt to wrap genuine continuation lines into this cell
        if (c === N - 1) {
          // Last cell in the row: accumulate greedily until a clear row-stop signal.
          while (cPos < totalLines) {
            const next = lines[cPos].trim();
            if (!next) break;                                          // blank = row boundary
            if (isAllCaps(next) || isSkippedLine(next)) break;        // section heading
            if (schema.rowStart && schema.rowStart.test(next)) break;  // next row starting
            // Stop at numbered section headings: "2. Progresion...", "3. Arquetipos..."
            if (/^\d+[\.)\s]/.test(next) && isTitleLike(next)) break;
            // Stop if this line is the opening header of any known table
            let beginsTable = false;
            for (const s of TABLE_SCHEMAS) {
              if (next === s.headers[0]) { beginsTable = true; break; }
            }
            if (beginsTable) break;
            // Stop at repeat headers of this schema
            let isHdr = true;
            for (let h = 0; h < hLen; h++) {
              if ((lines[cPos + h] || "").trim() !== schema.headers[h]) { isHdr = false; break; }
            }
            if (isHdr) break;
            // Stop at standalone title-like lines (ability names, subheadings)
            if (isTitleLike(next) && next.length <= 65) break;
            // Stop at prose paragraphs (complete sentence ending with period/colon)
            if (next.endsWith(".") && next.length > 50) break;
            if (next.endsWith(":") && next.length > 40) break;
            cell += " " + next;
            cPos++;
          }
        } else {
          // Non-last cells: stop at boundaries (uppercase capital = new cell).
          while (cPos < totalLines) {
            const next = lines[cPos].trim();
            if (!next) break;
            if (isAllCaps(next) || isSkippedLine(next)) break;
            // If rowStart defined, a matching line opens the next row — stop
            if (schema.rowStart && schema.rowStart.test(next) && c === N - 1) break;
            if (isCellContinuation(next)) {
              cell += " " + next;
              cPos++;
            } else if (next.endsWith(",")) {
              cell += " " + next;
              cPos++;
            } else if (cell.endsWith(",")) {
              cell += " " + next;
              cPos++;
            } else if (/^[A-ZÁÉÍÓÚÑ]/.test(next) && next.length < 80) {
              break;
            } else {
              break;
            }
          }
        }
        cells.push(cell);
      }

      if (!collectionOk || cells.length < N) break;
      rows.push(cells);
      pos = cPos;
    }

    if (rows.length === 0) continue;
    return { el: buildTableEl(schema.headers, rows), nextIdx: pos };
  }
  return null;
}

// Build semantic DOM nodes from a section's pages into `container`
function buildSectionContent(section, container) {
  // Gather all lines from every page, stripping the page-number preamble
  const allLines = [];
  section.pages.forEach((pageData) => {
    const lines = stripPageNumber(pageData.text, pageData.page);
    lines.forEach((line) => allLines.push(line));
    allLines.push(""); // blank line boundary between pages
  });

  let pendingBody = [];

  function flushBody() {
    if (pendingBody.length === 0) return;
    const text = pendingBody.join(" ").replace(/\s+/g, " ").trim();
    if (text) {
      const p = document.createElement("p");
      p.className = "sec-text";
      p.textContent = text;
      container.appendChild(p);
    }
    pendingBody = [];
  }

  const total = allLines.length;
  let i = 0;
  while (i < total) {
    // Try table detection first
    const tableResult = tryParseTable(allLines, i, total);
    if (tableResult) {
      flushBody();
      container.appendChild(tableResult.el);
      i = tableResult.nextIdx;
      continue;
    }

    const rawLine = allLines[i];
    i++;
    const line = rawLine.trim();
    if (!line) {
      flushBody();
      continue;
    }
    if (isSkippedLine(line)) continue;

    // Bullet list items ("- text") → render as <ul><li> group
    if (line.startsWith("- ")) {
      flushBody();
      const ul = document.createElement("ul");
      ul.className = "sec-list";
      const firstLi = document.createElement("li");
      firstLi.textContent = line.slice(2);
      ul.appendChild(firstLi);
      while (i < total) {
        const peek = allLines[i].trim();
        if (!peek.startsWith("- ")) break;
        i++;
        const li = document.createElement("li");
        li.textContent = peek.slice(2);
        ul.appendChild(li);
      }
      container.appendChild(ul);
      continue;
    }

    if (isAllCaps(line)) {
      flushBody();
      const h = document.createElement("h2");
      h.className = "sec-heading";
      h.textContent = line;
      container.appendChild(h);
      continue;
    }
    if (isTitleLike(line)) {
      flushBody();
      const h = document.createElement("h3");
      h.className = "sec-subheading";
      h.textContent = line;
      container.appendChild(h);
      continue;
    }
    pendingBody.push(line);
  }

  flushBody();
}

// Build the per-class progression cards and append them to container
function buildClassProgressionCards(container) {
  // Reglas base header
  const baseH = document.createElement("h2");
  baseH.className = "sec-heading";
  baseH.textContent = "PROGRESIÓN DETALLADA POR CLASE";
  container.appendChild(baseH);

  // Global rules summary table
  const rulesH = document.createElement("h3");
  rulesH.className = "sec-subheading";
  rulesH.textContent = "Reglas base (aplican a todas las clases)";
  container.appendChild(rulesH);

  const rulesWrap = document.createElement("div");
  rulesWrap.className = "prog-rules-grid";
  rulesWrap.innerHTML = `
    <div class="prog-rule-block">
      <h4>Bono de Maestría (BM)</h4>
      <p>Niveles 1–4: <strong>+2</strong></p>
      <p>Niveles 5–8: <strong>+3</strong></p>
      <p>Niveles 9–10: <strong>+4</strong></p>
    </div>
    <div class="prog-rule-block">
      <h4>Reservas Metálicas (RM)</h4>
      <p>Niveles 1–2: <strong>4</strong></p>
      <p>Niveles 3–4: <strong>5</strong></p>
      <p>Niveles 5–6: <strong>6</strong></p>
      <p>Niveles 7–8: <strong>7</strong></p>
      <p>Niveles 9–10: <strong>8</strong></p>
    </div>
    <div class="prog-rule-block">
      <h4>Mejora de atributo / talento</h4>
      <p>Nivel <strong>4</strong></p>
      <p>Nivel <strong>8</strong></p>
    </div>
  `;
  container.appendChild(rulesWrap);

  // One card per class
  CLASS_PROGRESSION.forEach((cls) => {
    const card = document.createElement("div");
    card.className = "class-card prog-class-card";

    // Header
    const nameEl = document.createElement("h2");
    nameEl.className = "class-name";
    nameEl.textContent = cls.name;
    card.appendChild(nameEl);

    const statsRow = document.createElement("div");
    statsRow.className = "class-stats-row";
    statsRow.innerHTML = `
      <span><strong>Rol:</strong> ${cls.role}</span>
      <span><strong>DV:</strong> ${cls.dv}</span>
      <span><strong>Atributo:</strong> ${cls.keyAttr}</span>
      <span><strong>Metal:</strong> ${cls.metal}</span>
      <span><strong>HP base:</strong> ${cls.hpBase} (+${cls.hpPerLevel}/nivel)</span>
    `;
    card.appendChild(statsRow);

    const subclassEl = document.createElement("p");
    subclassEl.className = "sec-text";
    subclassEl.innerHTML = `<strong>Subclases (N3):</strong> ${cls.subclasses.join(" &nbsp;·&nbsp; ")}`;
    card.appendChild(subclassEl);

    // Progression table
    const table = document.createElement("table");
    table.className = "pdf-table prog-table";
    table.innerHTML = `
      <thead><tr>
        <th>Nivel</th><th>HP</th><th>BM</th><th>RM</th><th>Gana</th><th>Nota</th>
      </tr></thead>
    `;
    const tbody = document.createElement("tbody");
    cls.levels.forEach((lvl) => {
      const tr = document.createElement("tr");
      // Highlight subclass row (N3), improvement rows (N4, N8) and capstone (N10)
      if (lvl.n === 3) tr.className = "prog-row-subclass";
      else if (lvl.n === 4 || lvl.n === 8) tr.className = "prog-row-improve";
      else if (lvl.n === 10) tr.className = "prog-row-capstone";
      tr.innerHTML = `
        <td class="prog-lvl">${lvl.n}</td>
        <td>${lvl.hp}</td>
        <td>+${lvl.bm}</td>
        <td>${lvl.rm}</td>
        <td class="prog-gains">${lvl.gains.map(g => `<span>${g}</span>`).join("")}</td>
        <td class="prog-note">${lvl.note}</td>
      `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    card.appendChild(table);
    container.appendChild(card);
  });

  // Comparison summary
  const cmpH = document.createElement("h3");
  cmpH.className = "sec-subheading";
  cmpH.textContent = "Resumen comparativo a N10";
  container.appendChild(cmpH);

  const cmpTable = document.createElement("table");
  cmpTable.className = "pdf-table";
  cmpTable.innerHTML = `
    <thead><tr><th>Clase</th><th>HP N10</th><th>DV</th><th>Metal</th><th>Fortaleza principal</th></tr></thead>
    <tbody>
      ${ CLASS_PROGRESSION.map(c => `<tr>
        <td>${c.name}</td>
        <td>${c.levels[9].hp}</td>
        <td>${c.dv}</td>
        <td>${c.metal}</td>
        <td>${c.role.split(" / ")[0]}</td>
      </tr>`).join("") }
    </tbody>
  `;
  container.appendChild(cmpTable);
}

async function loadSections() {
  // Derive base URL from where app.js is loaded — works on localhost, GitHub Pages, Netlify, etc.
  const scriptSrc = document.querySelector('script[src*="app.js"]')?.src || "";
  const base = scriptSrc ? scriptSrc.replace(/\/app\.js.*$/, "") : "";
  const response = await fetch(base + "/content/sections.json");
  if (!response.ok) {
    throw new Error("No se pudo cargar el contenido de secciones");
  }
  return response.json();
}

function renderAtlas() {
  const target = document.getElementById("atlas-grid");
  if (!target) {
    return;
  }

  target.innerHTML = "";
  atlasItems.forEach((item) => {
    const card = document.createElement("figure");
    card.className = "atlas-item";
    card.innerHTML = `
      <img src="${item.src}" alt="Mapa ${item.name}" loading="lazy" />
      <span>${item.name}</span>
    `;
    target.appendChild(card);
  });
}

const SECTION_DESCRIPTIONS = {
  jugador:    "Cómo jugar, estructura del turno, dados, reservas metálicas y referencia de combate.",
  clases:     "Los 5 arquetipos disponibles con habilidades, progresión nivel a nivel y subclases.",
  compendio:  "Objetos, armas, viales, precios y servicios urbanos de Greyhaven.",
  campana:    "Guión completo del DM: actos, NPCs, puzzles, diálogos y escalado.",
};

// Sections shown in the home nav (in order). campana omitted intentionally.
const HOME_SLUGS = ["jugador", "clases", "compendio"];

function renderHomeRoutes(sections) {
  const target = document.getElementById("routes-grid");
  if (!target) return;

  target.innerHTML = "";
  const visible = HOME_SLUGS
    .map(slug => sections.find(s => s.slug === slug))
    .filter(Boolean);

  visible.forEach((section, i) => {
    const isCampaign = section.audience === "campania";
    const isLocked   = isCampaign;
    const link = routeBySlug[section.slug] || `/${section.slug}/`;
    const desc = SECTION_DESCRIPTIONS[section.slug] || "";
    const num  = String(i + 1).padStart(2, "0");

    const card = document.createElement(isLocked ? "div" : "a");
    card.className = "card route-card" + (isLocked ? " route-card--locked" : "");
    if (!isLocked) card.href = link;
    card.innerHTML = `
      <p class="card-num">${num}</p>
      ${ isLocked ? '<span class="lock-icon">🔒</span>' : "" }
      <h3>${section.title}</h3>
      <p class="card-desc">${desc}</p>
      <span class="tag tag-danger">${isCampaign ? "Solo DM" : "Jugador"}</span>
    `;
    if (isLocked) {
      card.addEventListener("click", () => { window.location.href = link; });
    }
    target.appendChild(card);
  });

  // Character sheet card
  const sheetCard = document.createElement("a");
  sheetCard.className = "card route-card";
  sheetCard.href = "/hoja/";
  sheetCard.innerHTML = `
    <p class="card-num">📝</p>
    <h3>Hoja de Personaje</h3>
    <p class="card-desc">Hoja rellenable e imprimible. Stats, RM, metales, equipo y habilidades.</p>
    <span class="tag tag-danger">Jugador</span>
  `;
  target.appendChild(sheetCard);

  // Character creator card
  const creadorCard = document.createElement("a");
  creadorCard.className = "card route-card";
  creadorCard.href = "/creador/";
  creadorCard.innerHTML = `
    <p class="card-num">⚔️</p>
    <h3>Creador de Personaje</h3>
    <p class="card-desc">Wizard paso a paso: clase, atributos, nivel, habilidades y equipo.</p>
    <span class="tag tag-danger">Jugador</span>
  `;
  target.appendChild(creadorCard);
}

function renderSectionPage(section) {
  const titleNode    = document.getElementById("section-title");
  const subtitleNode = document.getElementById("section-subtitle");
  const contentNode  = document.getElementById("section-content");
  const topbarTitle  = document.getElementById("topbar-title");
  const topbarBadge  = document.getElementById("topbar-badge");

  if (!titleNode || !subtitleNode || !contentNode) return;

  const isCampaign = section.audience === "campania";
  document.title = `${section.title} · Sombras sobre Greyhaven`;
  titleNode.textContent = section.title;
  subtitleNode.textContent = isCampaign
    ? "Contenido exclusivo para el Dungeon Master"
    : "Contenido para jugadores";

  if (topbarTitle) topbarTitle.textContent = section.title;
  if (topbarBadge) {
    topbarBadge.textContent = isCampaign ? "DM" : "Jugador";
    if (isCampaign) topbarBadge.classList.add("danger");
  }

  contentNode.innerHTML = "";
  if (section.slug === "clases") {
    buildClassesContent(section, contentNode);
    buildClassProgressionCards(contentNode);
  } else {
    buildSectionContent(section, contentNode);
  }
  // jugador page: also append the combate section below
  if (section.slug === "jugador") {
    const combateSection = window._sections && window._sections.find(s => s.slug === "combate");
    if (combateSection) {
      const divider = document.createElement("h2");
      divider.className = "sec-heading";
      divider.textContent = "ANEXO DE COMBATE";
      contentNode.appendChild(divider);
      buildSectionContent(combateSection, contentNode);
    }
  }
  // progresion standalone page still works
  if (section.slug === "progresion") {
    buildClassProgressionCards(contentNode);
  }
}

function buildTOC(contentNode) {
  const tocNav = document.getElementById("toc-nav");
  if (!tocNav) return;
  const headings = Array.from(contentNode.querySelectorAll(".sec-heading, .class-name"));
  if (headings.length === 0) return;

  const links = headings.map((heading, i) => {
    heading.id = `sec-${i}`;
    const a = document.createElement("a");
    a.href = `#sec-${i}`;
    a.className = "toc-link";
    a.textContent = heading.textContent.replace(/^[•\s]+/, "").trim();
    a.dataset.target = `sec-${i}`;
    tocNav.appendChild(a);
    return { heading, link: a };
  });

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(({ link }) =>
            link.classList.toggle("active", link.dataset.target === id)
          );
        }
      });
    },
    { rootMargin: "-5% 0px -80% 0px" }
  );
  headings.forEach((h) => obs.observe(h));
}

function initBackToTop() {
  const btn = document.getElementById("back-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

async function start() {
  const { sections } = await loadSections();
  window._sections = sections;   // expose for cross-section rendering
  if (document.getElementById("atlas-grid")) renderAtlas();

  const slug = document.body.dataset.section;
  if (!slug) {
    renderHomeRoutes(sections);
    return;
  }

  const section = sections.find((item) => item.slug === slug);
  if (!section) throw new Error(`No existe la sección '${slug}'`);

  renderSectionPage(section);
  buildTOC(document.getElementById("section-content"));
  initBackToTop();
}

start().catch((error) => {
  const errorHost = document.getElementById("section-content") || document.getElementById("routes-grid");
  if (errorHost) {
    errorHost.innerHTML = `<p class="error-box">${error.message}</p>`;
  }
});
