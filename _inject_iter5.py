#!/usr/bin/env python3
"""
Iteration 5 — Mistborn Identity Pass
10 changes based on book-accurate lore audit:

1. Embaucador d6→d8 PG (balance fix, compensated with RM 4→3)
2. Mundano Herramienta Firma at L1 (early-game fix)
3. Monedas alomanticas as proper Tirador weapon (iconic Mistborn mechanic)
4. Capa de bruma with real mechanical bonus (iconic item)
5. Daga de obsidiana (kills Inquisitors - lore essential)
6. Atium (universal, any allomancer) as rare consumable
7. Duraluminio (amplifies your own metal burn) as rare consumable
8. Impulso with defined triggers (consistency fix)
9. Reloj de Exposicion (systemic allomantic tension)
10. Choque Alomantico (same-metal combat duels)

NOT included: Despertar Secundario (user confirmed: stay true to books,
you're born with one metal or all of them, period)
"""

import json, copy, sys

PATH = "content/sections.json"

with open(PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

def sec(slug):
    return next(s for s in data["sections"] if s["slug"] == slug)

def page(slug, page_num, match_start=None):
    """Get page by slug+number. If multiple pages share same number,
    use match_start to disambiguate by first line content."""
    pages = [p for p in sec(slug)["pages"] if p["page"] == page_num]
    if len(pages) == 1:
        return pages[0]
    if match_start:
        for p in pages:
            if p["text"].startswith(match_start):
                return p
    raise ValueError(f"Ambiguous page {slug} P{page_num}, found {len(pages)}")

changes = 0

# ═══════════════════════════════════════════════════════════════════════════════
# 1. EMBAUCADOR: d6 → d8 PG  +  RM 4 → 3
# ═══════════════════════════════════════════════════════════════════════════════

# 1a. jugador P0 (Creacion de Personaje) — HP dice line
p = page("jugador", 0, "Creacion de Personaje")
old = "Dados de golpe por clase: Bruto = d10. Todas las demas clases = d8. Embaucador = d6."
new = "Dados de golpe por clase: Bruto = d10. Todas las demas clases (incluido Embaucador) = d8."
assert old in p["text"], f"NOT FOUND in jugador P0: {old[:60]}"
p["text"] = p["text"].replace(old, new)
changes += 1
print("1a. Embaucador d6→d8 in jugador P0 (character creation)")

# 1b. jugador P4 (Resumen clases) — RM column
p4 = page("jugador", 4)
old = "Embaucador de Zinc/Laton\nControl social / emocional / infiltracion\nCAR\n4 + mod CAR"
new = "Embaucador de Zinc/Laton\nControl social / emocional / infiltracion\nCAR\n3 + mod CAR (min 3)"
assert old in p4["text"], f"NOT FOUND in jugador P4: {old[:60]}"
p4["text"] = p4["text"].replace(old, new)
changes += 1
print("1b. Embaucador RM 4→3 in jugador P4 (class summary)")

# 1c. clases P23 (Embaucador class page) — RM in header
p23 = page("clases", 23)
old = "RM inicial: 4 + mod CAR"
new = "RM inicial: 3 + mod CAR (min 3)"
assert old in p23["text"], f"NOT FOUND in clases P23: {old[:60]}"
p23["text"] = p23["text"].replace(old, new)
changes += 1
print("1c. Embaucador RM 4→3 in clases P23")

# ═══════════════════════════════════════════════════════════════════════════════
# 2. MUNDANO: Herramienta Firma at L1
# ═══════════════════════════════════════════════════════════════════════════════

p32 = page("clases", 32)
old_oficio = (
    "Elegis un oficio (cerrajero, contrabandista, estibador, maton, falsificador, "
    "chatarrero, curandero de barrio). Ganas competencia tematica y 1 rasgo util. "
    "Ej.: cerrajero: herramientas + abrir cerraduras mas rapido; contrabandista: "
    "esconder objetos; estibador: carga y empuje."
)
new_oficio = (
    "Elegis un oficio (cerrajero, contrabandista, estibador, maton, falsificador, "
    "chatarrero, curandero de barrio). Ganas competencia tematica y 1 rasgo util. "
    "Ej.: cerrajero: herramientas + abrir cerraduras mas rapido; contrabandista: "
    "esconder objetos; estibador: carga y empuje.\n"
    "Herramienta Firma: al elegir tu oficio, recibis una herramienta de tu especialidad que te da +1d4 "
    "a tiradas directamente relacionadas con tu oficio. Cerrajero: ganzuas maestras (+1d4 a abrir cerraduras). "
    "Contrabandista: compartimentos ocultos (+1d4 a esconder objetos). Estibador: guantes de carga (+1d4 a "
    "proezas de fuerza). Maton: manoplas de cuero (+1d4 a intimidacion fisica). Falsificador: kit de sellos "
    "(+1d4 a crear documentos). Chatarrero: multiherramienta (+1d4 a reparar/improvisar). Curandero: botiquin "
    "de campo (+1d4 a medicina). La herramienta es personal e irreemplazable — si la perdes, necesitas 1 "
    "sesion de downtime y 5 boxings para conseguir otra."
)
assert old_oficio in p32["text"], f"NOT FOUND in clases P32: {old_oficio[:60]}"
p32["text"] = p32["text"].replace(old_oficio, new_oficio)
changes += 1
print("2. Mundano Herramienta Firma added in clases P32")

# ═══════════════════════════════════════════════════════════════════════════════
# 3. MONEDAS ALOMANTICAS — proper Tirador weapon in ranged table
# ═══════════════════════════════════════════════════════════════════════════════

p55 = page("compendio", 55)
# Insert after "Bolsa de monedas x50" entry
old_coins = (
    "Bolsa de monedas x50\n"
    "1d4 contundente\n"
    "1 boxing\n"
    "Ideal para Empuje/Jalon y maniobras."
)
new_coins = (
    "Bolsa de monedas x50\n"
    "1d4 contundente\n"
    "1 boxing\n"
    "Ideal para Empuje/Jalon y maniobras.\n\n"
    "Monedas alomanticas (Tirador)\n"
    "1d6 perforante\n"
    "3 boxings\n"
    "Requiere Empuje de Acero. Alcance 12/36. Al lanzar con Empuje, el Tirador puede gastar 1 RM "
    "adicional para aumentar el dano a 1d8 + DES y empujar al objetivo 1.5m (FUE save DC clase). "
    "Municion ilimitada mientras lleves una bolsa de monedas. Iconico: asi peleaba Kelsier."
)
assert old_coins in p55["text"], f"NOT FOUND in P55: {old_coins[:60]}"
p55["text"] = p55["text"].replace(old_coins, new_coins)
changes += 1
print("3. Monedas alomanticas (Tirador) added in compendio P55")

# ═══════════════════════════════════════════════════════════════════════════════
# 4. CAPA DE BRUMA — real mechanical bonus
# ═══════════════════════════════════════════════════════════════════════════════

p56 = page("compendio", 56)
old_cloak = (
    "Capa brumosa (mistcloak)\n"
    "-\n"
    "15 boxings\n"
    "Ventaja narrativa en bruma/tejados; iconica."
)
new_cloak = (
    "Capa brumosa (mistcloak)\n"
    "+1 CA vs ataques a distancia en niebla/oscuridad\n"
    "15 boxings\n"
    "Ventaja en tiradas de Sigilo nocturno. En niebla o penumbra, las tiras de la capa "
    "distorsionan tu silueta: +1 CA contra ataques a distancia. De dia sin niebla, solo "
    "efecto narrativo. Iconica de los alomantes de Luthadel."
)
assert old_cloak in p56["text"], f"NOT FOUND in P56: {old_cloak[:60]}"
p56["text"] = p56["text"].replace(old_cloak, new_cloak)
changes += 1
print("4. Capa de bruma upgraded in compendio P56")

# ═══════════════════════════════════════════════════════════════════════════════
# 5. DAGA DE OBSIDIANA — kills Inquisitors (lore-essential)
# ═══════════════════════════════════════════════════════════════════════════════

p54 = page("compendio", 54)
# Append after last melee weapon (Cadena con peso)
old_chain = (
    "Cadena con peso\n"
    "1d6 contundente\n"
    "6 boxings\n"
    "Alcance 3m, control situacional (tiron)."
)
new_chain = (
    "Cadena con peso\n"
    "1d6 contundente\n"
    "6 boxings\n"
    "Alcance 3m, control situacional (tiron).\n\n"
    "Daga de obsidiana\n"
    "1d4 perforante\n"
    "50 boxings\n"
    "Finesa. Especial: ignora regeneracion e inmunidades alomanticas. Es la unica forma confirmada de "
    "matar a un Inquisidor de Acero (clavada entre los ojos, donde se unen los clavos). Extremadamente "
    "rara y fragil — se rompe con un critico fallido (1 natural). No es metalica, por lo que no puede "
    "ser empujada ni atraida por alomancia."
)
assert old_chain in p54["text"], f"NOT FOUND in P54: {old_chain[:60]}"
p54["text"] = p54["text"].replace(old_chain, new_chain)
changes += 1
print("5. Daga de obsidiana added in compendio P54")

# ═══════════════════════════════════════════════════════════════════════════════
# 6 & 7. ATIUM + DURALUMINIO — rare consumables in vials page
# ═══════════════════════════════════════════════════════════════════════════════

p59 = page("compendio", 59)
# Append after "Metal raro (plot)" entry, before the recovery section
old_rare = (
    "Metal raro (plot)\n"
    "Especial\n"
    "No se vende\n"
    "Reservado para trama y recompensas."
)
new_rare = (
    "Metal raro (plot)\n"
    "Especial\n"
    "No se vende\n"
    "Reservado para trama y recompensas.\n\n"
    "Atium (dosis — metal de dios)\n"
    "Consumible\n"
    "No tiene precio (invaluable)\n"
    "Cualquier alomante puede quemar Atium — no es exclusivo de Nacidos de la Bruma. "
    "Al consumirlo: durante 1 ronda, ves 0.5 segundos en el futuro. Efecto mecanico: "
    "+5 a CA y tiradas de ataque durante 1 turno completo (tu turno + reacciones hasta "
    "tu proximo turno). Despues se acaba, irrecuperable. Es el metal mas raro y codiciado "
    "del mundo — controlado por el Lord Legislador. Encontrar una dosis es un evento de campana, "
    "no un item de tienda. Los Mistings que solo queman Atium se llaman Videntes.\n\n"
    "Duraluminio (dosis — metal amplificador)\n"
    "Consumible\n"
    "No tiene precio (raro)\n"
    "Cualquier alomante puede quemar Duraluminio, pero solo tiene efecto si estas quemando "
    "OTRO metal simultaneamente. Al consumirlo: gastas de golpe TODAS tus RM restantes y tu "
    "proxima habilidad alomantica en ese mismo turno tiene efecto DUPLICADO (doble dano, doble "
    "alcance, doble duracion, o doble area — el DM elige la mas apropiada). Despues quedas a "
    "0 RM hasta tu proximo descanso — no podes beber viales para recuperarte por 1 hora "
    "(el cuerpo necesita procesar la sobrecarga). Momento de todo-o-nada: el Duraluminio es "
    "la apuesta maxima. Un Misting de Duraluminio (solo quema este metal) es inutil — no tiene "
    "otro metal que amplificar."
)
assert old_rare in p59["text"], f"NOT FOUND in P59: {old_rare[:60]}"
p59["text"] = p59["text"].replace(old_rare, new_rare)
changes += 1
print("6+7. Atium + Duraluminio added in compendio P59")

# ═══════════════════════════════════════════════════════════════════════════════
# 8. IMPULSO — defined automatic triggers
# ═══════════════════════════════════════════════════════════════════════════════

p49 = page("combate", 49)

old_impulso = (
    "Impulso (regla cinematografica)\n"
    "El Impulso representa ritmo, lectura y ventaja tactica. Va de 0 a 3. Se gana por"
    " usar el entorno de forma creativa, coordinar con aliados o describir acciones m"
    "emorables.\n\n"
    "Ganas Impulso cuando tu jugada cambia la escena: usar una cadena como arma, tira"
    "r una mesa para cubrirte, trabar una puerta, cortar una luz, manipular una compu"
    "erta, etc."
)
new_impulso = (
    "Impulso (regla cinematografica)\n"
    "El Impulso representa ritmo, lectura y ventaja tactica. Va de 0 a 3. Se gana por"
    " usar el entorno de forma creativa, coordinar con aliados o describir acciones m"
    "emorables.\n\n"
    "Triggers automaticos (minimo 1-2 Impulso por combate):\n"
    "- Uso del entorno: usas un objeto del escenario como arma, cobertura o trampa "
    "(tirar una mesa, cortar una luz, manipular una compuerta, trabar una puerta).\n"
    "- Coordinacion de crew: dos o mas PJs actuan en combo en la ficcion (uno distrae, "
    "otro flanquea; uno empuja, otro atrapa). Ambos ganan 1 Impulso.\n"
    "- Riesgo narrativo: aceptas un riesgo real por una accion cinematografica (saltar "
    "al vacio, interponerte ante un golpe, provocar al boss). Si la accion tiene consecuencias "
    "reales (no es gratis), ganas 1 Impulso.\n"
    "- Primera sangre: el primer PJ que haga dano significativo en un encuentro gana 1 Impulso.\n"
    "El DM puede dar Impulso adicional por descripciones memorables, pero los triggers de arriba "
    "son automaticos — no dependen de la generosidad del DM."
)
assert old_impulso in p49["text"], f"NOT FOUND in P49: {old_impulso[:60]}"
p49["text"] = p49["text"].replace(old_impulso, new_impulso)
changes += 1
print("8. Impulso triggers defined in combate P49")

# ═══════════════════════════════════════════════════════════════════════════════
# 9 & 10. RELOJ DE EXPOSICION + CHOQUE ALOMANTICO — append to combate P49
# ═══════════════════════════════════════════════════════════════════════════════

# Append two new mechanics after the "Estados y condiciones" table
old_estados_end = (
    "Fatigado\n"
    "Penalidades por sobreuso metalico (ver tabla de fatiga arriba)"
)
new_estados_end = (
    "Fatigado\n"
    "Penalidades por sobreuso metalico (ver tabla de fatiga arriba)\n\n"
    "Reloj de Exposicion Alomantica\n"
    "En el mundo de Mistborn, usar alomancia en publico es una sentencia de muerte. "
    "El Lord Legislador y sus Obligadores cazan alomantes ilegales sin piedad. "
    "El Reloj de Exposicion mide cuanto saben las autoridades sobre la actividad alomantica del grupo.\n\n"
    "Nivel\n"
    "Estado\n"
    "Consecuencia\n"
    "0\n"
    "Invisible\n"
    "Nadie sabe que hay alomantes operando. Normalidad.\n"
    "1\n"
    "Rumores\n"
    "Alguien noto algo raro. Los precios de viales suben un 20%. NPCs mas cautelosos.\n"
    "2\n"
    "Investigacion\n"
    "Un Obligador empieza a hacer preguntas en el barrio. Contactos se ponen nerviosos. "
    "Tiradas sociales en la zona con -1.\n"
    "3\n"
    "Alerta\n"
    "Patrullas de guardia buscan activamente. Cobertura de Cobre es esencial para operar. "
    "Descansos largos en la zona son arriesgados (50% de interrupcion).\n"
    "4\n"
    "Caceria\n"
    "Un Sabueso profesional del Canton de Inquisicion rastrea al grupo. Usar alomancia "
    "sin Nube de Cobre activa es detectado automaticamente en 1d4 rondas.\n"
    "5\n"
    "Inquisidor\n"
    "Un Inquisidor de Acero es despachado. No viene a arrestar — viene a eliminar. "
    "El grupo debe huir de la zona o enfrentar lo inenfrentable.\n\n"
    "Como sube el reloj:\n"
    "- Usar alomancia en publico sin Nube de Cobre: +1\n"
    "- Combate alomantico con testigos civiles: +1\n"
    "- Dejar evidencia metalica en la escena (monedas clavadas en paredes, metal deformado): +1\n"
    "- Un NPC informante reporta al grupo: +1\n\n"
    "Como baja el reloj:\n"
    "- Silencio total (1 sesion sin exposicion publica): -1\n"
    "- Apagador de Cobre cubre la escena con Nube: la accion no sube el reloj\n"
    "- Eliminar testigos (moralmente cuestionable pero efectivo): -1\n"
    "- Sobornar a un Obligador menor: -1 (caro, 20+ boxings)\n"
    "- Cambiar de zona/barrio: -1 (pero el reloj de la zona anterior no baja)\n\n"
    "El Reloj es por zona de la ciudad, no global. Si el grupo opera en 3 barrios diferentes, "
    "hay 3 relojes. Un Apagador de Cobre es la mejor defensa contra la Exposicion — su Nube "
    "previene que el reloj suba durante operaciones.\n\n"
    "Choque Alomantico\n"
    "Cuando dos alomantes que queman metales opuestos (Acero vs Hierro, Zinc vs Laton) o del "
    "mismo metal se enfrentan directamente, se produce un Choque Alomantico — una lucha de "
    "voluntades a traves del metal.\n\n"
    "Mecanica: ambos tiran d20 + su modificador de atributo clave + BM. El que gane por 5 o "
    "mas obtiene Dominio Alomantico: ventaja en su proxima accion contra el oponente. Si la "
    "diferencia es menor a 5, el choque es un empate tenso y ninguno gana ventaja.\n\n"
    "Cuando ocurre un Choque:\n"
    "- Tirador empuja un objeto que un Atractor intenta atraer (o viceversa).\n"
    "- Dos Embaucadores intentan influir en la misma persona.\n"
    "- Un Apagador intenta cubrir a alguien que un Sabueso intenta detectar.\n"
    "- Un Bruto resiste un efecto de control metalico con fuerza bruta.\n\n"
    "El Choque es opcional — solo se activa si narrativamente tiene sentido que dos "
    "poderes alomanticos colisionen. Captura la tension push-pull de los duelos metalicos "
    "de los libros, donde Vin y los Inquisidores luchaban con monedas, empujes y tirones "
    "en el aire."
)
assert old_estados_end in p49["text"], f"NOT FOUND in P49: {old_estados_end[:60]}"
p49["text"] = p49["text"].replace(old_estados_end, new_estados_end)
changes += 1
print("9+10. Reloj de Exposicion + Choque Alomantico added in combate P49")

# ═══════════════════════════════════════════════════════════════════════════════
# SAVE
# ═══════════════════════════════════════════════════════════════════════════════

with open(PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Stats
total = 0
for s in data["sections"]:
    t = sum(len(p["text"]) for p in s["pages"])
    total += t
    print(f"  {s['slug']}: {t:,} chars")
print(f"\nTotal: {total:,} chars")
print(f"\n✓ {changes} change blocks applied successfully")
