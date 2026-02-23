/* ═══════════════════════════════════════════════════════════════
   Creador de Personaje — Mistborn D20 (Sombras sobre Greyhaven)
   ═══════════════════════════════════════════════════════════════ */

// ── Data: 8 Classes ─────────────────────────────────────────────
const CLASSES = [
  {
    id:"bruto", name:"Bruto de Peltre",
    role:"Tanque / frente / protector",
    dv:10, keyAttr:["FUE","CON"], metal:"Peltre", rmBase:3,
    rmAttr:"CON", dcAttr:"CON",
    saves:["FUE","CON"],
    skillOpts:["Atletismo","Intimidacion","Percepcion","Supervivencia"],
    skillCount:2,
    subclasses:["Muro","Rompedor","Perseguidor"],
    abilities:[
      {n:1,name:"Encender Peltre"},
      {n:2,name:"Aguante Brutal"},
      {n:3,name:"Especializacion"},
      {n:4,name:"Mejora de Atributo / Talento"},
      {n:5,name:"Sobrecarga de Peltre"},
      {n:6,name:"Cuerpo de Hierro"},
      {n:7,name:"Interposicion Violenta"},
      {n:8,name:"Mejora de Atributo / Talento"},
      {n:9,name:"Furia de Peltre"},
      {n:10,name:"Imparable"},
    ]
  },
  {
    id:"tirador", name:"Tirador de Acero",
    role:"Daño a distancia / control táctico",
    dv:8, keyAttr:["DES"], metal:"Acero", rmBase:3,
    rmAttr:"DES", dcAttr:"DES",
    saves:["DES","INT"],
    skillOpts:["Acrobacia","Percepcion","Sigilo","Investigacion"],
    skillCount:2,
    subclasses:["Francotirador","Hostigador","Controlador"],
    abilities:[
      {n:1,name:"Tiro Preciso"},
      {n:2,name:"Empuje de Acero"},
      {n:3,name:"Especializacion"},
      {n:4,name:"Mejora de Atributo / Talento"},
      {n:5,name:"Cadencia de Fuego"},
      {n:6,name:"Ojo de Trayectorias"},
      {n:7,name:"Rebote Tactico"},
      {n:8,name:"Mejora de Atributo / Talento"},
      {n:9,name:"Salva de Acero"},
      {n:10,name:"Dominio del Terreno"},
    ]
  },
  {
    id:"atractor", name:"Atractor de Hierro",
    role:"Control del campo / desarme / utilidades",
    dv:8, keyAttr:["INT","DES"], metal:"Hierro", rmBase:4,
    rmAttr:"INT", dcAttr:"INT",
    saves:["INT","DES"],
    skillOpts:["Investigacion","Percepcion","Juego de Manos","Historia"],
    skillCount:2,
    subclasses:["Desarmador","Control","Recuperador"],
    abilities:[
      {n:1,name:"Tiron de Hierro"},
      {n:2,name:"Mano Lejana"},
      {n:3,name:"Especializacion"},
      {n:4,name:"Mejora de Atributo / Talento"},
      {n:5,name:"Tiron Potente"},
      {n:6,name:"Sentido del Metal"},
      {n:7,name:"Tiron Defensivo"},
      {n:8,name:"Mejora de Atributo / Talento"},
      {n:9,name:"Vortice de Hierro"},
      {n:10,name:"Maestro de la Atraccion"},
    ]
  },
  {
    id:"acechador", name:"Acechador de Estaño",
    role:"Scout / rastreador / percepción",
    dv:8, keyAttr:["SAB","DES"], metal:"Estaño", rmBase:3,
    rmAttr:"SAB", dcAttr:"SAB",
    saves:["DES","SAB"],
    skillOpts:["Percepcion","Sigilo","Supervivencia","Investigacion","Acrobacia"],
    skillCount:3,
    subclasses:["Rastreador","Centinela","Infiltrador"],
    abilities:[
      {n:1,name:"Estaño Encendido"},
      {n:2,name:"Cazador de Sombras"},
      {n:3,name:"Especializacion"},
      {n:4,name:"Mejora de Atributo / Talento"},
      {n:5,name:"Reflejos de Estaño"},
      {n:6,name:"Lectura del Entorno"},
      {n:7,name:"Enfoque Sensorial"},
      {n:8,name:"Mejora de Atributo / Talento"},
      {n:9,name:"Prediccion de Emboscada"},
      {n:10,name:"Depredador de Niebla"},
    ]
  },
  {
    id:"embaucador", name:"Embaucador de Zinc/Laton",
    role:"Social / control emocional / infiltración",
    dv:8, keyAttr:["CAR"], metal:"Zinc / Laton", rmBase:4,
    rmAttr:"CAR", dcAttr:"CAR",
    saves:["CAR","SAB"],
    skillOpts:["Engano","Persuasion","Perspicacia","Intimidacion","Interpretacion"],
    skillCount:2,
    subclasses:["Instigador","Pacificador","Mixto"],
    abilities:[
      {n:1,name:"Irritar o Calmar"},
      {n:2,name:"Lectura Emocional"},
      {n:3,name:"Especializacion"},
      {n:4,name:"Mejora de Atributo / Talento"},
      {n:5,name:"Onda Emocional"},
      {n:6,name:"Rumorista Nato"},
      {n:7,name:"Quiebre de Voluntad"},
      {n:8,name:"Mejora de Atributo / Talento"},
      {n:9,name:"Teatro de Masas"},
      {n:10,name:"Maestro del Pulso Social"},
    ]
  },
  {
    id:"apagador", name:"Apagador de Cobre",
    role:"Soporte / ocultación / contra-detección",
    dv:8, keyAttr:["SAB","CAR"], metal:"Cobre", rmBase:4,
    rmAttr:"SAB", dcAttr:"SAB",
    saves:["SAB","CAR"],
    skillOpts:["Percepcion","Sigilo","Perspicacia","Engano"],
    skillCount:2,
    subclasses:["Guardador","Contravigilante","Saboteador"],
    abilities:[
      {n:1,name:"Nube de Cobre"},
      {n:2,name:"Cobertura Mental"},
      {n:3,name:"Especializacion"},
      {n:4,name:"Mejora de Atributo / Talento"},
      {n:5,name:"Cupula de Cobre"},
      {n:6,name:"Ritmo de Silencio"},
      {n:7,name:"Anulacion Parcial"},
      {n:8,name:"Mejora de Atributo / Talento"},
      {n:9,name:"Sombra de Banda"},
      {n:10,name:"Maestro del Velo"},
    ]
  },
  {
    id:"sabueso", name:"Sabueso de Bronce",
    role:"Detector / analista / anti-oculto",
    dv:8, keyAttr:["INT","SAB"], metal:"Bronce", rmBase:4,
    rmAttr:"INT", dcAttr:"INT",
    saves:["INT","SAB"],
    skillOpts:["Investigacion","Percepcion","Perspicacia","Historia"],
    skillCount:2,
    subclasses:["Rastreador","Analista","Contradetective"],
    abilities:[
      {n:1,name:"Escuchar Pulsos"},
      {n:2,name:"Foco de Bronce"},
      {n:3,name:"Especializacion"},
      {n:4,name:"Mejora de Atributo / Talento"},
      {n:5,name:"Lectura Profunda"},
      {n:6,name:"Oido de Laboratorio"},
      {n:7,name:"Interferencia de Bronce"},
      {n:8,name:"Mejora de Atributo / Talento"},
      {n:9,name:"Mapa de Pulsos"},
      {n:10,name:"Perceptor Experto"},
    ]
  },
  {
    id:"especialista", name:"Especialista Mundano",
    role:"Versátil / oficio / calle / heist",
    dv:8, keyAttr:["Variable"], metal:"Ninguno", rmBase:0,
    rmAttr:null, dcAttr:null,
    saves:["DES","SAB"],
    skillOpts:["Acrobacia","Atletismo","Engano","Historia","Intimidacion","Investigacion","Juego de Manos","Medicina","Percepcion","Perspicacia","Persuasion","Sigilo","Supervivencia","Interpretacion"],
    skillCount:4,
    subclasses:["Operativo","Tecnico","Fantasma"],
    abilities:[
      {n:1,name:"Oficio de la Calle"},
      {n:2,name:"Contactos de Greyhaven"},
      {n:3,name:"Especializacion"},
      {n:4,name:"Mejora de Atributo / Talento"},
      {n:5,name:"Recurso Improvisado"},
      {n:6,name:"Yo Conozco a Alguien"},
      {n:7,name:"Instinto de Superviviente"},
      {n:8,name:"Mejora de Atributo / Talento"},
      {n:9,name:"Maestro del Oficio"},
      {n:10,name:"Despertar Opcional"},
    ]
  }
];

// ── Data: Attributes ────────────────────────────────────────────
const ATTR_NAMES = ["FUE","DES","CON","INT","SAB","CAR"];
const ATTR_FULL  = {FUE:"Fuerza",DES:"Destreza",CON:"Constitución",INT:"Inteligencia",SAB:"Sabiduría",CAR:"Carisma"};
const STANDARD_ARRAY = [15,14,13,12,10,8];

// Point-buy cost table (score → cumulative cost from 8)
function pointBuyCost(score){
  if(score<=8) return 0;
  if(score<=13) return score-8;            // 1 pt each from 8→13
  if(score===14) return 7;                 // 5 + 2
  if(score===15) return 9;                 // 5 + 2 + 2
  return 999;
}

// ── Data: Skills ────────────────────────────────────────────────
const ALL_SKILLS = [
  {name:"Acrobacia",      attr:"DES"},
  {name:"Atletismo",      attr:"FUE"},
  {name:"Engano",         attr:"CAR"},
  {name:"Historia",       attr:"INT"},
  {name:"Intimidacion",   attr:"CAR"},
  {name:"Interpretacion", attr:"CAR"},
  {name:"Investigacion",  attr:"INT"},
  {name:"Juego de Manos", attr:"DES"},
  {name:"Medicina",       attr:"SAB"},
  {name:"Percepcion",     attr:"SAB"},
  {name:"Perspicacia",    attr:"SAB"},
  {name:"Persuasion",     attr:"CAR"},
  {name:"Sigilo",         attr:"DES"},
  {name:"Supervivencia",  attr:"SAB"},
];

// ── Data: Equipment ─────────────────────────────────────────────
// Prices in clips (1 boxing = 10 clips)
const EQUIPMENT = [
  // Armas cuerpo a cuerpo
  {id:"daga",     cat:"Armas CC",  name:"Daga de canal",       price:6,   dmg:"1d4 perf.",  note:"Ocultable"},
  {id:"baston",   cat:"Armas CC",  name:"Baston reforzado",    price:30,  dmg:"1d6 cont.",  note:"+1 bloquear"},
  {id:"sable",    cat:"Armas CC",  name:"Sable de contrabando",price:80,  dmg:"1d8 cort.",  note:"Ilegal"},
  // Armas a distancia
  {id:"arco",     cat:"Armas Dist",name:"Arco corto",          price:70,  dmg:"1d6 perf.",  note:"80/320"},
  {id:"ballesta", cat:"Armas Dist",name:"Ballesta ligera",     price:100, dmg:"1d8 perf.",  note:"Recarga"},
  {id:"pistola",  cat:"Armas Dist",name:"Pistola de duelo",    price:250, dmg:"1d10 perf.", note:"Ruido alto"},
  // Munición
  {id:"municion", cat:"Municion",  name:"Municion x10",        price:5,   dmg:"-",          note:"Pistola"},
  {id:"virotes",  cat:"Municion",  name:"Virotes x20",         price:4,   dmg:"-",          note:"Ballesta"},
  // Armadura
  {id:"cuero",    cat:"Armadura",  name:"Chaqueta de cuero",   price:30,  dmg:"+1 CA",      note:"Discreta"},
  {id:"arnes",    cat:"Armadura",  name:"Arnes remachado",     price:80,  dmg:"+2 CA",      note:"Sigilo penal."},
  // Equipo
  {id:"ganzuas",  cat:"Equipo",    name:"Ganzuas",             price:20,  dmg:"-",          note:"Ventaja cerraduras"},
  {id:"kit_med",  cat:"Equipo",    name:"Kit medico basico",   price:40,  dmg:"-",          note:"5 usos"},
  {id:"cuerda",   cat:"Equipo",    name:"Cuerda 15m + garfio", price:20,  dmg:"-",          note:"Escalada"},
  {id:"farol",    cat:"Equipo",    name:"Farol + aceite",      price:14,  dmg:"-",          note:"6h"},
  {id:"racion",   cat:"Equipo",    name:"Manta y racion x1 dia",price:5,  dmg:"-",          note:"Basico"},
  {id:"acido",    cat:"Equipo",    name:"Frasco acido artesanal",price:30, dmg:"1d4 acido",  note:"1 uso"},
  // Viales
  {id:"vial_base",cat:"Viales",    name:"Vial base (8 metales)",price:80, dmg:"-",          note:"1 carga c/u"},
  {id:"vial_puro",cat:"Viales",    name:"Vial puro (1 metal)",  price:30, dmg:"-",          note:"2 cargas"},
];

const STARTING_BUDGET = 300; // 30 boxing = 300 clips

// ── State ───────────────────────────────────────────────────────
const TOTAL_STEPS = 7;
let currentStep = 0;
const state = {
  name: "",
  player: "",
  background: "",
  classId: null,
  level: 1,
  subclass: null,
  attrs: {FUE:10,DES:10,CON:10,INT:10,SAB:10,CAR:10},
  attrMethod: "pointbuy",
  arraySlots: {},        // for standard array: attrName -> arrayValue
  skillProfs: [],
  equipment: {},         // itemId -> qty
};

// ── Utility ─────────────────────────────────────────────────────
function mod(score){ return Math.floor((score-10)/2); }
function modStr(score){
  const m = mod(score);
  return m >= 0 ? `+${m}` : `${m}`;
}
function getClass(){ return CLASSES.find(c=>c.id===state.classId)||null; }
function getBM(lvl){ return lvl<=4?2:lvl<=8?3:4; }
function getRM(cls, lvl, attrs){
  if(!cls || cls.rmBase===0) return 0;
  const attrMod = cls.rmAttr ? mod(attrs[cls.rmAttr]) : 0;
  const scaling = Math.floor((lvl-1)/2);
  return Math.max(cls.rmBase, cls.rmBase + attrMod + scaling);
}
function getHP(cls, lvl, conMod){
  if(!cls) return 0;
  const dvAvg = Math.ceil(cls.dv/2)+1;  // d10→6, d8→5, d6→4
  return cls.dv + conMod + (lvl-1)*(dvAvg + conMod);
}
function getDC(cls, bm, attrs){
  if(!cls || !cls.dcAttr) return "-";
  return 8 + bm + mod(attrs[cls.dcAttr]);
}
function getCA(attrs, equipment){
  let base = 10 + mod(attrs.DES);
  if(equipment["arnes"]) base += 2;
  else if(equipment["cuero"]) base += 1;
  return base;
}
function getAbilitiesUpToLevel(cls, lvl){
  if(!cls) return [];
  return cls.abilities.filter(a=>a.n<=lvl);
}
function formatPrice(clips){
  if(clips>=10){
    const box = Math.floor(clips/10);
    const rem = clips%10;
    return rem ? `${box} box ${rem} clips` : `${box} box`;
  }
  return `${clips} clips`;
}
function totalSpent(){
  let t = 0;
  for(const [id,qty] of Object.entries(state.equipment)){
    const item = EQUIPMENT.find(e=>e.id===id);
    if(item) t += item.price * qty;
  }
  return t;
}
function totalPointsUsed(){
  let t = 0;
  for(const a of ATTR_NAMES) t += pointBuyCost(state.attrs[a]);
  return t;
}

// ── DOM refs ────────────────────────────────────────────────────
const $container  = document.getElementById("step-container");
const $progress   = document.getElementById("progress-fill");
const $indicators = document.getElementById("step-indicators");
const $btnPrev    = document.getElementById("btn-prev");
const $btnNext    = document.getElementById("btn-next");

// ── Progress & Indicators ───────────────────────────────────────
function updateProgress(){
  const pct = ((currentStep+1)/TOTAL_STEPS)*100;
  $progress.style.width = pct+"%";

  $indicators.innerHTML = "";
  for(let i=0;i<TOTAL_STEPS;i++){
    const dot = document.createElement("div");
    dot.className = "step-dot" + (i===currentStep?" active":"") + (i<currentStep?" done":"");
    dot.title = `Paso ${i+1}`;
    dot.addEventListener("click",()=>{ if(i<currentStep) goToStep(i); });
    $indicators.appendChild(dot);
  }
  $btnPrev.disabled = currentStep===0;
  $btnNext.textContent = currentStep===TOTAL_STEPS-1 ? "⟳ Reiniciar" : "Siguiente →";
}

// ══════════════════════════════════════════════════════════════════
// STEP RENDERERS
// ══════════════════════════════════════════════════════════════════

// ── Step 0: Identity ────────────────────────────────────────────
function renderStep0(){
  $container.innerHTML = `
    <h2 class="step-title">Identidad</h2>
    <p class="step-subtitle">Nombre, jugador y trasfondo del personaje</p>
    <div class="form-row">
      <div class="form-group">
        <label>Nombre del personaje</label>
        <input id="f-name" value="${esc(state.name)}" placeholder="Ej. Kelsier, Vin, Sazed…" />
      </div>
      <div class="form-group">
        <label>Nombre del jugador</label>
        <input id="f-player" value="${esc(state.player)}" />
      </div>
    </div>
    <div class="form-group">
      <label>Trasfondo / Historia breve</label>
      <textarea id="f-bg" placeholder="¿De dónde viene? ¿Qué busca en Greyhaven?">${esc(state.background)}</textarea>
    </div>
  `;
}
function saveStep0(){
  const n = document.getElementById("f-name");
  const p = document.getElementById("f-player");
  const b = document.getElementById("f-bg");
  if(n) state.name = n.value.trim();
  if(p) state.player = p.value.trim();
  if(b) state.background = b.value.trim();
}

// ── Step 1: Class selection ─────────────────────────────────────
function renderStep1(){
  const cards = CLASSES.map(c=>{
    const sel = state.classId===c.id ? " selected":"";
    const keyStr = c.keyAttr.join(" / ");
    return `
      <div class="class-card${sel}" data-id="${c.id}">
        <h4>${c.name}</h4>
        <div class="class-role">${c.role}</div>
        <div class="class-stats">
          <span>d${c.dv}</span>
          <span>${keyStr}</span>
          <span>${c.metal}</span>
        </div>
      </div>`;
  }).join("");

  $container.innerHTML = `
    <h2 class="step-title">Clase</h2>
    <p class="step-subtitle">Elegí tu arquetipo alomántico (o mundano)</p>
    <div class="class-grid">${cards}</div>
    <div id="class-preview" style="margin-top:14px"></div>
  `;
  $container.querySelectorAll(".class-card").forEach(card=>{
    card.addEventListener("click",()=>{
      state.classId = card.dataset.id;
      // reset subclass & skills when changing class
      state.subclass = null;
      state.skillProfs = [];
      renderStep1();
    });
  });
  if(state.classId) renderClassPreview();
}
function renderClassPreview(){
  const cls = getClass();
  if(!cls) return;
  const prev = document.getElementById("class-preview");
  if(!prev) return;
  const abList = cls.abilities.slice(0,3).map(a=>`<li>N${a.n}: ${a.name}</li>`).join("");
  prev.innerHTML = `
    <div class="summary-section">
      <h4>${cls.name}</h4>
      <p style="margin-bottom:6px">${cls.role}</p>
      <p><strong>DV:</strong> d${cls.dv} &nbsp;|&nbsp; <strong>Atributo clave:</strong> ${cls.keyAttr.join("/")} &nbsp;|&nbsp; <strong>Metal:</strong> ${cls.metal}</p>
      <p><strong>RM base:</strong> ${cls.rmBase} + mod ${cls.rmAttr||"—"} &nbsp;|&nbsp; <strong>Salvaciones:</strong> ${cls.saves.join(", ")}</p>
      <p style="margin-top:6px"><strong>Primeras habilidades:</strong></p>
      <ul>${abList}</ul>
      <p style="margin-top:4px;color:var(--text-dim);font-size:0.78rem">Subespecializaciones (N3): ${cls.subclasses.join(" / ")}</p>
    </div>`;
}

// ── Step 2: Attributes ──────────────────────────────────────────
function renderStep2(){
  const cls = getClass();
  const keyAttrs = cls ? cls.keyAttr : [];

  // Method tabs
  const tabs = `
    <div class="method-tabs">
      <button class="method-tab${state.attrMethod==='pointbuy'?' active':''}" data-m="pointbuy">Compra de puntos (27)</button>
      <button class="method-tab${state.attrMethod==='array'?' active':''}" data-m="array">Array estándar</button>
    </div>`;

  // Points remaining / Array status
  let statusHtml = "";
  if(state.attrMethod==="pointbuy"){
    const used = totalPointsUsed();
    const rem = 27-used;
    statusHtml = `<div class="points-remaining${rem<0?' over':''}">Puntos restantes: ${rem} / 27</div>`;
  } else {
    const assigned = Object.values(state.arraySlots).filter(v=>v>0);
    const remaining = STANDARD_ARRAY.filter(v=>!assigned.includes(v));
    statusHtml = `<div class="points-remaining">Array: ${remaining.length?'Faltan '+remaining.join(', '):'✓ Completo'}</div>`;
  }

  // Attribute cards
  const attrCards = ATTR_NAMES.map(a=>{
    const isKey = keyAttrs.includes(a) || (keyAttrs.includes("Variable"));
    const val = state.attrs[a];
    const m = modStr(val);
    if(state.attrMethod==="pointbuy"){
      return `
        <div class="attr-card${isKey?' key-attr':''}">
          <div class="attr-label">${a}</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:4px">
            <button class="attr-btn" data-attr="${a}" data-dir="-1" style="width:22px;height:22px;border:1px solid var(--border-dim);background:var(--bg-input);color:var(--text);border-radius:3px;cursor:pointer;font-size:0.9rem;line-height:1">−</button>
            <input class="attr-input" data-attr="${a}" value="${val}" readonly style="width:34px;text-align:center;background:var(--bg-input);border:1px solid var(--border-dim);border-radius:4px;padding:4px;font-size:1.1rem;font-weight:700;color:var(--text);font-family:'EB Garamond',serif" />
            <button class="attr-btn" data-attr="${a}" data-dir="1" style="width:22px;height:22px;border:1px solid var(--border-dim);background:var(--bg-input);color:var(--text);border-radius:3px;cursor:pointer;font-size:0.9rem;line-height:1">+</button>
          </div>
          <div class="attr-mod">${m}</div>
          <div class="attr-hint">${ATTR_FULL[a]}</div>
        </div>`;
    } else {
      // Standard array — dropdown
      const assigned = state.arraySlots[a] || 0;
      const usedValues = Object.entries(state.arraySlots).filter(([k,v])=>k!==a&&v>0).map(([,v])=>v);
      const available = STANDARD_ARRAY.filter(v=>!usedValues.includes(v));
      const opts = [`<option value="0"${assigned===0?' selected':''}>—</option>`];
      for(const v of STANDARD_ARRAY){
        const used = usedValues.includes(v);
        const isCurrent = assigned===v;
        if(isCurrent || !used){
          opts.push(`<option value="${v}"${isCurrent?' selected':''}>${v}</option>`);
        }
      }
      return `
        <div class="attr-card${isKey?' key-attr':''}">
          <div class="attr-label">${a}</div>
          <select class="array-select" data-attr="${a}" style="width:50px;text-align:center;background:var(--bg-input);border:1px solid var(--border-dim);border-radius:4px;padding:4px;font-size:1rem;font-weight:700;color:var(--text);font-family:'EB Garamond',serif;cursor:pointer">${opts.join("")}</select>
          <div class="attr-mod">${modStr(assigned||10)}</div>
          <div class="attr-hint">${ATTR_FULL[a]}</div>
        </div>`;
    }
  }).join("");

  $container.innerHTML = `
    <h2 class="step-title">Atributos</h2>
    <p class="step-subtitle">Asigná los 6 atributos de tu personaje</p>
    ${tabs}
    ${statusHtml}
    <div class="attr-grid">${attrCards}</div>
    <p style="text-align:center;font-size:0.72rem;color:var(--text-dim);margin-top:6px">
      Los atributos con borde dorado son los clave de tu clase.
    </p>
  `;

  // Event: method tabs
  $container.querySelectorAll(".method-tab").forEach(btn=>{
    btn.addEventListener("click",()=>{
      state.attrMethod = btn.dataset.m;
      if(state.attrMethod==="array"){
        // Reset to unassigned
        state.arraySlots = {};
        ATTR_NAMES.forEach(a=>state.attrs[a]=10);
      } else {
        ATTR_NAMES.forEach(a=>state.attrs[a]=10);
      }
      renderStep2();
    });
  });

  if(state.attrMethod==="pointbuy"){
    $container.querySelectorAll(".attr-btn").forEach(btn=>{
      btn.addEventListener("click",()=>{
        const attr = btn.dataset.attr;
        const dir = parseInt(btn.dataset.dir);
        const cur = state.attrs[attr];
        const next = cur + dir;
        if(next<8||next>15) return;
        // Check points
        const oldCost = pointBuyCost(cur);
        const newCost = pointBuyCost(next);
        const totalNow = totalPointsUsed();
        if(totalNow - oldCost + newCost > 27 && dir>0) return;
        state.attrs[attr] = next;
        renderStep2();
      });
    });
  } else {
    $container.querySelectorAll(".array-select").forEach(sel=>{
      sel.addEventListener("change",()=>{
        const attr = sel.dataset.attr;
        const val = parseInt(sel.value);
        if(val===0){
          delete state.arraySlots[attr];
          state.attrs[attr] = 10;
        } else {
          state.arraySlots[attr] = val;
          state.attrs[attr] = val;
        }
        renderStep2();
      });
    });
  }
}

// ── Step 3: Level + Subclass ────────────────────────────────────
function renderStep3(){
  const cls = getClass();
  const lvl = state.level;
  const bm = getBM(lvl);
  const hp = getHP(cls, lvl, mod(state.attrs.CON));
  const rm = getRM(cls, lvl, state.attrs);
  const dc = getDC(cls, bm, state.attrs);
  const abilities = getAbilitiesUpToLevel(cls, lvl);

  const abilityList = abilities.map(a=>{
    const isSpec = a.name==="Especializacion";
    const label = isSpec ? `Especialización (N${a.n})` : a.name;
    return `<li>${label}</li>`;
  }).join("");

  // Subclass selection (if level >= 3)
  let subclassHtml = "";
  if(lvl>=3 && cls){
    subclassHtml = `
      <div style="margin-top:14px">
        <h4 style="font-family:'Cinzel',serif;font-size:0.8rem;color:var(--gold);margin-bottom:8px">Subespecialización (Nivel 3)</h4>
        <div class="subclass-grid">
          ${cls.subclasses.map(s=>{
            const sel = state.subclass===s?" selected":"";
            return `<div class="subclass-card${sel}" data-sub="${s}"><h4>${s}</h4></div>`;
          }).join("")}
        </div>
      </div>`;
  }

  $container.innerHTML = `
    <h2 class="step-title">Nivel</h2>
    <p class="step-subtitle">Elegí el nivel inicial y revisá tus stats calculados</p>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <label style="font-family:'Cinzel',serif;font-size:0.8rem;color:var(--gold)">Nivel</label>
      <input type="range" id="level-slider" min="1" max="10" value="${lvl}"
        style="flex:1;accent-color:var(--gold)" />
      <span id="level-val" style="font-size:1.4rem;font-weight:700;color:var(--gold-bright);min-width:30px;text-align:center">${lvl}</span>
    </div>
    <div class="summary-stats-strip">
      <div class="summary-stat"><div class="ss-val">${hp}</div><div class="ss-label">HP</div></div>
      <div class="summary-stat"><div class="ss-val">${bm}</div><div class="ss-label">Bonif. Maestría</div></div>
      <div class="summary-stat"><div class="ss-val">${rm}</div><div class="ss-label">RM Max</div></div>
      <div class="summary-stat"><div class="ss-val">${dc}</div><div class="ss-label">DC Clase</div></div>
    </div>
    <div class="summary-section">
      <h4>Habilidades desbloqueadas</h4>
      <ul>${abilityList || '<li style="color:var(--text-dim)">Seleccioná una clase primero</li>'}</ul>
    </div>
    ${subclassHtml}
  `;

  // Slider event
  const slider = document.getElementById("level-slider");
  if(slider){
    slider.addEventListener("input",()=>{
      state.level = parseInt(slider.value);
      if(state.level<3) state.subclass = null;
      renderStep3();
    });
  }
  // Subclass events
  $container.querySelectorAll(".subclass-card").forEach(card=>{
    card.addEventListener("click",()=>{
      state.subclass = card.dataset.sub;
      renderStep3();
    });
  });
}

// ── Step 4: Skills ──────────────────────────────────────────────
function renderStep4(){
  const cls = getClass();
  const maxSkills = cls ? cls.skillCount : 2;
  const allowed = cls ? cls.skillOpts : [];
  const isEspecialista = cls && cls.id==="especialista";

  const skillItems = ALL_SKILLS.map(s=>{
    const available = isEspecialista || allowed.includes(s.name);
    const checked = state.skillProfs.includes(s.name);
    const disabled = !available || (!checked && state.skillProfs.length>=maxSkills);
    return `
      <label class="skill-item" style="${!available?'opacity:0.35':''}">
        <input type="checkbox" data-skill="${s.name}"
          ${checked?'checked':''}
          ${disabled && !checked?'disabled':''}
          ${!available?'disabled':''} />
        <span>${s.name}</span>
        <span class="skill-attr">(${s.attr})</span>
      </label>`;
  }).join("");

  const count = state.skillProfs.length;
  $container.innerHTML = `
    <h2 class="step-title">Habilidades</h2>
    <p class="step-subtitle">Elegí ${maxSkills} competencias de habilidad${isEspecialista?" (cualquiera)":""}</p>
    <div class="skills-count${count>maxSkills?' over':''}">Seleccionadas: ${count} / ${maxSkills}</div>
    <div class="skill-grid">${skillItems}</div>
  `;

  $container.querySelectorAll('input[type="checkbox"]').forEach(cb=>{
    cb.addEventListener("change",()=>{
      const skill = cb.dataset.skill;
      if(cb.checked){
        if(state.skillProfs.length<maxSkills) state.skillProfs.push(skill);
        else cb.checked = false;
      } else {
        state.skillProfs = state.skillProfs.filter(s=>s!==skill);
      }
      renderStep4();
    });
  });
}

// ── Step 5: Equipment ───────────────────────────────────────────
function renderStep5(){
  const spent = totalSpent();
  const remaining = STARTING_BUDGET - spent;
  // Group by category
  const cats = [...new Set(EQUIPMENT.map(e=>e.cat))];

  let shopHtml = "";
  for(const cat of cats){
    const items = EQUIPMENT.filter(e=>e.cat===cat);
    const rows = items.map(item=>{
      const qty = state.equipment[item.id]||0;
      return `
        <div class="shop-item">
          <span class="item-name">${item.name} <span style="color:var(--text-dim);font-size:0.7rem">${item.dmg!=='-'?item.dmg:''} ${item.note}</span></span>
          <span class="item-price">${formatPrice(item.price)}</span>
          <input type="number" min="0" max="99" value="${qty}" data-item="${item.id}" />
        </div>`;
    }).join("");
    shopHtml += `<div class="shop-section"><h4>${cat}</h4><div class="shop-grid">${rows}</div></div>`;
  }

  $container.innerHTML = `
    <h2 class="step-title">Equipo</h2>
    <p class="step-subtitle">Gastá tu presupuesto inicial (30 boxing = 300 clips)</p>
    <div class="shop-budget${remaining<0?' over':''}">
      Restante: ${formatPrice(remaining)} de ${formatPrice(STARTING_BUDGET)}
    </div>
    ${shopHtml}
  `;

  $container.querySelectorAll('input[type="number"]').forEach(inp=>{
    inp.addEventListener("change",()=>{
      const id = inp.dataset.item;
      const v = Math.max(0, parseInt(inp.value)||0);
      if(v===0) delete state.equipment[id];
      else state.equipment[id] = v;
      // Update budget display without full re-render
      const s = totalSpent();
      const r = STARTING_BUDGET - s;
      const budgetEl = $container.querySelector(".shop-budget");
      if(budgetEl){
        budgetEl.textContent = `Restante: ${formatPrice(r)} de ${formatPrice(STARTING_BUDGET)}`;
        budgetEl.className = "shop-budget"+(r<0?" over":"");
      }
    });
  });
}

// ── Step 6: Summary ─────────────────────────────────────────────
function renderStep6(){
  const cls = getClass();
  const lvl = state.level;
  const bm  = getBM(lvl);
  const conMod = mod(state.attrs.CON);
  const hp  = getHP(cls, lvl, conMod);
  const rm  = getRM(cls, lvl, state.attrs);
  const dc  = getDC(cls, bm, state.attrs);
  const ca  = getCA(state.attrs, state.equipment);
  const speed = "9 m";
  const init = mod(state.attrs.DES) + (cls&&cls.id==="acechador"?2:0);
  const abilities = getAbilitiesUpToLevel(cls, lvl);

  // Attr boxes
  const attrBoxes = ATTR_NAMES.map(a=>`
    <div class="summary-attr-box">
      <div class="sa-name">${a}</div>
      <div class="sa-score">${state.attrs[a]}</div>
      <div class="sa-mod">${modStr(state.attrs[a])}</div>
    </div>`).join("");

  // Skills list
  const skillList = state.skillProfs.length
    ? state.skillProfs.map(s=>{
        const sk = ALL_SKILLS.find(x=>x.name===s);
        const bonus = mod(state.attrs[sk.attr]) + bm;
        return `<li>${s} (${sk.attr}) ${bonus>=0?'+':''}${bonus}</li>`;
      }).join("")
    : '<li style="color:var(--text-dim)">Ninguna seleccionada</li>';

  // Abilities list
  const abList = abilities.map(a=>{
    if(a.name==="Especializacion" && state.subclass)
      return `<li>Especialización: ${state.subclass}</li>`;
    return `<li>${a.name}</li>`;
  }).join("");

  // Equipment list
  const eqList = Object.entries(state.equipment)
    .filter(([,q])=>q>0)
    .map(([id,q])=>{
      const item = EQUIPMENT.find(e=>e.id===id);
      return `<li>${item.name}${q>1?' ×'+q:''}</li>`;
    }).join("") || '<li style="color:var(--text-dim)">Sin equipo</li>';

  // Saves
  const saveList = cls ? cls.saves.map(s=>{
    const bonus = mod(state.attrs[s]) + bm;
    return `${s} ${bonus>=0?'+':''}${bonus}`;
  }).join(", ") : "—";

  $container.innerHTML = `
    <div class="summary-sheet">
      <div class="summary-header">
        <h2>${state.name || "Sin nombre"}</h2>
        <p>${cls?cls.name:"Sin clase"} · Nivel ${lvl}${state.subclass?' · '+state.subclass:''}</p>
        <p style="font-size:0.78rem;color:var(--text-dim)">Jugador: ${state.player||"—"} · Metal: ${cls?cls.metal:"—"}</p>
      </div>

      <div class="summary-grid">
        <div class="summary-attrs">${attrBoxes}</div>
        <div>
          <div class="summary-stats-strip" style="margin-bottom:10px">
            <div class="summary-stat"><div class="ss-val">${hp}</div><div class="ss-label">HP</div></div>
            <div class="summary-stat"><div class="ss-val">${ca}</div><div class="ss-label">CA</div></div>
            <div class="summary-stat"><div class="ss-val">${init>=0?'+':''}${init}</div><div class="ss-label">Iniciativa</div></div>
            <div class="summary-stat"><div class="ss-val">${speed}</div><div class="ss-label">Velocidad</div></div>
          </div>
          <div class="summary-stats-strip">
            <div class="summary-stat"><div class="ss-val">${bm}</div><div class="ss-label">Maestría</div></div>
            <div class="summary-stat"><div class="ss-val">${rm}</div><div class="ss-label">RM Máx</div></div>
            <div class="summary-stat"><div class="ss-val">${dc}</div><div class="ss-label">DC Clase</div></div>
            <div class="summary-stat"><div class="ss-val">d${cls?cls.dv:'?'}</div><div class="ss-label">DV</div></div>
          </div>

          <div class="summary-section" style="margin-top:10px">
            <h4>Salvaciones competentes</h4>
            <p>${saveList}</p>
          </div>

          <div class="summary-section">
            <h4>Habilidades con competencia</h4>
            <ul>${skillList}</ul>
          </div>
        </div>
      </div>

      <div class="summary-section">
        <h4>Rasgos de clase (N1–${lvl})</h4>
        <ul>${abList}</ul>
      </div>

      <div class="summary-section">
        <h4>Equipo</h4>
        <ul>${eqList}</ul>
        <p style="font-size:0.75rem;color:var(--text-dim);margin-top:4px">Gastado: ${formatPrice(totalSpent())} / ${formatPrice(STARTING_BUDGET)}</p>
      </div>

      ${state.background ? `
      <div class="summary-section">
        <h4>Trasfondo</h4>
        <p>${esc(state.background)}</p>
      </div>` : ""}

      <div class="summary-actions no-print">
        <button class="btn btn-primary" onclick="fillSheet()">📝 Exportar Hoja PDF</button>
        <button class="btn btn-secondary" onclick="exportJSON()">📥 Exportar JSON</button>
        <button class="btn btn-secondary" onclick="printSummary()">🖨 Imprimir Resumen</button>
      </div>
    </div>
  `;
}

// ── Render dispatcher ───────────────────────────────────────────
const RENDERERS = [renderStep0, renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6];
function render(){
  updateProgress();
  RENDERERS[currentStep]();
}

// ── Navigation ──────────────────────────────────────────────────
function validate(){
  switch(currentStep){
    case 0: return true; // identity optional
    case 1: return !!state.classId;
    case 2:
      if(state.attrMethod==="pointbuy") return totalPointsUsed()<=27;
      // array: all 6 must be assigned
      return ATTR_NAMES.every(a=>state.arraySlots[a]>0);
    case 3:
      if(state.level>=3 && !state.subclass) return false;
      return true;
    case 4: {
      const cls = getClass();
      return state.skillProfs.length === (cls?cls.skillCount:2);
    }
    case 5: return totalSpent() <= STARTING_BUDGET;
    default: return true;
  }
}

function nextStep(){
  // Save current step data
  if(currentStep===0) saveStep0();

  if(currentStep===TOTAL_STEPS-1){
    // Reset
    if(confirm("¿Reiniciar el creador de personaje?")){
      Object.assign(state,{name:"",player:"",background:"",classId:null,level:1,subclass:null,
        attrs:{FUE:10,DES:10,CON:10,INT:10,SAB:10,CAR:10},attrMethod:"pointbuy",
        arraySlots:{},skillProfs:[],equipment:{}});
      currentStep = 0;
      render();
    }
    return;
  }

  if(!validate()){
    showToast(getValidationMsg());
    return;
  }
  currentStep++;
  render();
  window.scrollTo({top:0,behavior:'smooth'});
}

function prevStep(){
  if(currentStep===0) return;
  if(currentStep===0) saveStep0();
  currentStep--;
  render();
  window.scrollTo({top:0,behavior:'smooth'});
}

function goToStep(n){
  if(currentStep===0) saveStep0();
  currentStep = n;
  render();
}

function getValidationMsg(){
  switch(currentStep){
    case 1: return "Seleccioná una clase para continuar.";
    case 2: return state.attrMethod==="pointbuy"
      ? "Te pasaste de los 27 puntos."
      : "Asigná todos los valores del array.";
    case 3: return "Elegí una subespecialización (nivel ≥ 3).";
    case 4: return "Seleccioná la cantidad correcta de habilidades.";
    case 5: return "Te pasaste del presupuesto.";
    default: return "";
  }
}

// ── Toast ───────────────────────────────────────────────────────
function showToast(msg){
  let t = document.getElementById("toast");
  if(!t){
    t = document.createElement("div");
    t.id = "toast";
    t.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--red);color:#fff;padding:10px 24px;border-radius:6px;font-family:'Cinzel',serif;font-size:0.82rem;z-index:999;opacity:0;transition:opacity 0.3s;pointer-events:none";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  setTimeout(()=>{ t.style.opacity = "0"; }, 2500);
}

// ── Export / Print ──────────────────────────────────────────────
function printSummary(){
  window.print();
}

function exportJSON(){
  const cls = getClass();
  const lvl = state.level;
  const bm = getBM(lvl);
  const data = {
    name: state.name, player: state.player, background: state.background,
    class: cls?cls.name:null, level:lvl, subclass:state.subclass,
    metal: cls?cls.metal:null,
    attrs: {...state.attrs},
    hp: getHP(cls, lvl, mod(state.attrs.CON)),
    ca: getCA(state.attrs, state.equipment),
    bm, rm: getRM(cls, lvl, state.attrs), dc: getDC(cls, bm, state.attrs),
    saves: cls?cls.saves:[],
    skills: state.skillProfs,
    abilities: getAbilitiesUpToLevel(cls, lvl).map(a=>a.name),
    equipment: Object.entries(state.equipment).filter(([,q])=>q>0).map(([id,q])=>{
      const item = EQUIPMENT.find(e=>e.id===id);
      return {name:item.name, qty:q};
    })
  };
  const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${(state.name||"personaje").replace(/\s+/g,"_")}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function fillSheet(){
  const cls = getClass();
  const lvl = state.level;
  const bm  = getBM(lvl);
  const conMod = mod(state.attrs.CON);
  const charData = {
    name: state.name,
    player: state.player,
    background: state.background,
    className: cls ? cls.name : "",
    level: lvl,
    subclass: state.subclass || "",
    metal: cls ? cls.metal : "",
    attrs: { ...state.attrs },
    hp: getHP(cls, lvl, conMod),
    ca: getCA(state.attrs, state.equipment),
    init: mod(state.attrs.DES) + (cls && cls.id === "acechador" ? 2 : 0),
    bm,
    rm: getRM(cls, lvl, state.attrs),
    dc: getDC(cls, bm, state.attrs),
    dv: cls ? lvl + "d" + cls.dv : "",
    saves: cls ? cls.saves : [],
    skills: state.skillProfs,
    abilities: getAbilitiesUpToLevel(cls, lvl).map(a => {
      if (a.name === "Especializacion" && state.subclass) return "Especialización: " + state.subclass;
      return a.name;
    }),
    equipment: Object.entries(state.equipment).filter(([,q]) => q > 0).map(([id, q]) => {
      const item = EQUIPMENT.find(e => e.id === id);
      return { name: item.name, qty: q, dmg: item.dmg, note: item.note, cat: item.cat };
    }),
    budgetRemaining: STARTING_BUDGET - totalSpent(),
    rmFormula: cls ? (cls.rmBase + " + mod " + (cls.rmAttr || "—")) : "—"
  };
  localStorage.setItem("mistborn_character", JSON.stringify(charData));
  window.open("/hoja/?autofill=1", "_blank");
}

// ── Helpers ─────────────────────────────────────────────────────
function esc(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

// ── Init ────────────────────────────────────────────────────────
render();
