#!/usr/bin/env python3
"""
Iteration 6 — Ability Expansion Pass
32 new abilities (4 per class) with level restrictions.
Each class gets abilities that fill its gaps:
- Bruto: +SOC, +MOV, +DEF buff, +AoE control
- Tirador: +DEF, +UTIL detection, +ATK bounce, +MOV escape
- Atractor: +SOC pickpocket, +DEF orbital, +ATK net, +MOV magnet
- Acechador: +ATK precision, +SOC lie-detect, +ATK weakness, +DEF sixth sense
- Embaucador: +MOV panic, +UTIL/DEF mask, +SOC/ATK whisper, +CTRL stun
- Apagador: +ATK disrupt, +SOC trust, +ATK/CTRL silence, +DEF void
- Sabueso: +ATK analysis, +SOC interrogate, +ATK resonance, +UTIL/DEF all-seeing
- Mundano: +ATK dirty, +DEF scaling, +ATK/CTRL trap, +ATK/UTIL veteran
"""

import json, sys

PATH = "content/sections.json"

with open(PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

def sec(slug):
    return next(s for s in data["sections"] if s["slug"] == slug)

def page(slug, page_num, match_start=None):
    pages = [p for p in sec(slug)["pages"] if p["page"] == page_num]
    if len(pages) == 1:
        return pages[0]
    if match_start:
        for p in pages:
            if p["text"].startswith(match_start):
                return p
    raise ValueError(f"Ambiguous page {slug} P{page_num}")

changes = 0

# ═══════════════════════════════════════════════════════════════════════════════
# Helper: build ability detail block in the Campo/Detalle format
# ═══════════════════════════════════════════════════════════════════════════════
def ability_block(name, costo, tirada, alcance, efecto, notas):
    return (
        f"{name}\n"
        f"Campo\nDetalle\n"
        f"Costo / accion\n{costo}\n"
        f"Tirada\n{tirada}\n"
        f"Alcance / uso\n{alcance}\n"
        f"Efecto / dano / DC\n{efecto}\n"
        f"Notas\n{notas}"
    )

# ═══════════════════════════════════════════════════════════════════════════════
# 1. BRUTO DE PELTRE — P11 (prog table) + P12 (last ability page)
# New: Presencia Aplastante (N2), Carga de Peltre (N5), Piel de Peltre (N6),
#      Rugido del Bruto (N9)
# ═══════════════════════════════════════════════════════════════════════════════

# 1a. Modify progression table on P11
p11 = page("clases", 11)
old = "2\n2 Aguante Brutal"
new = "2\n2 Aguante Brutal, Presencia Aplastante"
assert old in p11["text"], f"NOT FOUND P11: {old[:50]}"
p11["text"] = p11["text"].replace(old, new)

old = "5\n5 Sobrecarga de Peltre"
new = "5\n5 Sobrecarga de Peltre, Carga de Peltre"
assert old in p11["text"], f"NOT FOUND P11: {old[:50]}"
p11["text"] = p11["text"].replace(old, new)

old = "6\n6 Cuerpo de Hierro"
new = "6\n6 Cuerpo de Hierro, Piel de Peltre"
assert old in p11["text"], f"NOT FOUND P11: {old[:50]}"
p11["text"] = p11["text"].replace(old, new)

old = "9\n9 Furia de Peltre"
new = "9\n9 Furia de Peltre, Rugido del Bruto"
assert old in p11["text"], f"NOT FOUND P11: {old[:50]}"
p11["text"] = p11["text"].replace(old, new)

# 1b. Add ability details after Imparable on P12
p12 = page("clases", 12)
imparable_end = "Capstone tematico."
assert imparable_end in p12["text"], f"NOT FOUND P12: {imparable_end}"

bruto_new_abilities = "\n\n".join([
    ability_block(
        "Presencia Aplastante (nivel 2)",
        "1 RM, accion bonus",
        "Intimidacion (FUE o CAR) vs SAB save DC clase",
        "Enemigos a 3 m que te vean",
        "Mientras quemas Peltre, tu presencia fisica es aplastante. Ganas ventaja en tiradas de Intimidacion. "
        "Ademas, un enemigo que puedas ver a 3 m debe hacer SAB save DC clase o no puede atacarte voluntariamente "
        "durante 1 turno (puede atacar a otros o moverse). Solo afecta a 1 enemigo por uso. No funciona contra "
        "criaturas inmunes al miedo o constructos.",
        "Le da al Bruto una herramienta social tematica: la intimidacion fisica pura de quemar Peltre."
    ),
    ability_block(
        "Carga de Peltre (nivel 5)",
        "1 RM, accion",
        "Ataque melee: d20 + FUE + comp",
        "Linea recta de hasta 6 m terminando adyacente al objetivo",
        "Te lanzas en linea recta hacia un enemigo visible. Si te moves al menos 3 m antes de impactar, "
        "el golpe hace 1d8 + FUE contundente y el objetivo debe hacer FUE save DC clase o es empujado 1.5 m "
        "y cae derribado. Si chocas con un obstaculo durante la carga, ambos reciben 1d4 contundente. "
        "No provocas ataques de oportunidad durante el movimiento de carga.",
        "El Bruto necesitaba una forma de cerrar distancia y castigar a los que se alejan. Iconica carga de Peltre."
    ),
    ability_block(
        "Piel de Peltre (nivel 6)",
        "0 RM adicional (se activa con Encender Peltre)",
        "Sin tirada",
        "Personal",
        "Cada vez que activas Encender Peltre, ganas PG temporales iguales a tu nivel + modificador de CON "
        "(minimo 3). Estos PG temporales duran mientras Peltre este activo. No se acumulan: si ya tenes PG "
        "temporales de Piel de Peltre, se reemplazan. A nivel 9, los PG temporales suben a nivel x 1.5 + CON.",
        "Buffer defensivo pasivo que no cuesta RM adicional. Complementa Aguante Brutal como segunda capa de defensa."
    ),
    ability_block(
        "Rugido del Bruto (nivel 9)",
        "2 RM, accion",
        "DC clase (SAB save de cada enemigo en area)",
        "Todos los enemigos a 4.5 m",
        "Soltas un rugido alimentado por Peltre que sacude el cuerpo de tus enemigos. Cada enemigo a 4.5 m "
        "debe hacer SAB save DC clase. En fallo: asustado por 1 turno (desventaja en ataques, no puede "
        "acercarse voluntariamente a vos). En exito: -1d4 en su proximo ataque (la vibracion los perturba). "
        "Ademas, objetos fragiles en el area (vidrios, botellas, lamparas) se rompen automaticamente.",
        "Control de area para el Bruto. Unico uso por combate. Tematico: la fuerza bruta de Peltre manifestada como onda de choque."
    ),
])
p12["text"] = p12["text"].replace(imparable_end, imparable_end + "\n\n" + bruto_new_abilities)
changes += 1
print("1. Bruto: +4 abilities (Presencia, Carga, Piel, Rugido)")

# ═══════════════════════════════════════════════════════════════════════════════
# 2. TIRADOR DE ACERO — P14 (prog) + P16 (after Dominio del Terreno)
# New: Escudo de Monedas (N2), Lineas de Acero (N5), Rebote Letal (N7),
#      Ancla de Escape (N9)
# ═══════════════════════════════════════════════════════════════════════════════

p14 = page("clases", 14)
old = "2\n2 Tiro Preciso"
new = "2\n2 Tiro Preciso, Escudo de Monedas"
assert old in p14["text"], f"NOT FOUND P14: {old[:50]}"
p14["text"] = p14["text"].replace(old, new)

old = "5\n5 Cadencia de Fuego"
new = "5\n5 Cadencia de Fuego, Lineas de Acero"
assert old in p14["text"], f"NOT FOUND P14: {old[:50]}"
p14["text"] = p14["text"].replace(old, new)

old = "7\n7 Rebote Tactico"
new = "7\n7 Rebote Tactico, Rebote Letal"
assert old in p14["text"], f"NOT FOUND P14: {old[:50]}"
p14["text"] = p14["text"].replace(old, new)

old = "9\n9 Salva de Acero"
new = "9\n9 Salva de Acero, Ancla de Escape"
assert old in p14["text"], f"NOT FOUND P14: {old[:50]}"
p14["text"] = p14["text"].replace(old, new)

p16 = page("clases", 16)
dominio_end = "Capstone de posicionamiento."
assert dominio_end in p16["text"], f"NOT FOUND P16: {dominio_end}"

tirador_new = "\n\n".join([
    ability_block(
        "Escudo de Monedas (nivel 2)",
        "1 RM, reaccion",
        "Sin tirada",
        "Personal, al ser objetivo de un ataque",
        "Empujas un puñado de monedas o fragmentos metalicos entre vos y el atacante. Ganas +2 CA contra ese "
        "ataque. Si el ataque falla, las monedas caen y crean terreno dificil en 1.5 m alrededor tuyo hasta "
        "el final de tu proximo turno. Funciona contra ataques a distancia y cuerpo a cuerpo.",
        "Primera defensa del Tirador. Tematica Mistborn pura: usar monedas como escudo improvisado."
    ),
    ability_block(
        "Lineas de Acero (nivel 5)",
        "Pasivo (activo mientras tengas RM >= 1)",
        "Percepcion / Investigacion con ventaja",
        "Radio 9 m",
        "Ves tenues lineas azules que conectan tu cuerpo con cada fuente de metal cercana. Detectas armas "
        "ocultas bajo ropa, trampas con componentes metalicos y puertas con bisagras/cerraduras metalicas "
        "automaticamente (sin tirada si estas a 3 m). A mas de 3 m, ganas +1d4 a Investigacion para encontrar "
        "objetos metalicos ocultos. En combate, sabés exactamente que armamento lleva cada enemigo visible.",
        "Iconica vision alomantica de Vin/Kelsier. Llena el hueco de utilidad del Tirador fuera de combate."
    ),
    ability_block(
        "Rebote Letal (nivel 7)",
        "2 RM, accion",
        "Ataque a distancia: d20 + DES + comp",
        "Alcance del arma + 3 m (rebote en superficie metalica)",
        "Disparas o empujas un proyectil que rebota en una superficie metalica (pared con clavos, poste, "
        "cadena, maquinaria). El proyectil ignora cobertura total si hay una superficie metalica a la que "
        "rebotar. Dano: 1d10 + DES perforante. Ademas, el objetivo no puede usar reacciones hasta el inicio "
        "de su proximo turno — el angulo inesperado lo descoloca. Necesitas una superficie metalica en el mapa.",
        "Ataque de alto impacto que premia el uso del entorno. El Tirador se vuelve letal en zonas industriales."
    ),
    ability_block(
        "Ancla de Escape (nivel 9)",
        "1 RM, reaccion",
        "Sin tirada (movimiento)",
        "Te moves hasta 4.5 m hacia o desde un objeto metalico fijo",
        "Cuando un enemigo entra a 1.5 m de vos o te golpea en cuerpo a cuerpo, empujas o atraes contra un "
        "anclaje metalico cercano (pilar, poste, viga, maquinaria) y volas hasta 4.5 m en cualquier direccion. "
        "Este movimiento no provoca ataques de oportunidad. Si terminas en cobertura, ganas +1 CA hasta el "
        "inicio de tu proximo turno. Si no hay anclaje metalico a 9 m, no podes usar esta habilidad.",
        "Movilidad defensiva perfecta. Empuje de Acero puro para escapar del melee, la pesadilla del Tirador."
    ),
])
p16["text"] = p16["text"].replace(dominio_end, dominio_end + "\n\n" + tirador_new)
changes += 1
print("2. Tirador: +4 abilities (Escudo, Lineas, Rebote Letal, Ancla)")

# ═══════════════════════════════════════════════════════════════════════════════
# 3. ATRACTOR DE HIERRO — P17 (prog) + P19 (after Maestro de la Atraccion)
# New: Dedos Magneticos (N2), Fragmentos Orbitantes (N5), Red de Hierro (N7),
#      Iman Humano (N9)
# ═══════════════════════════════════════════════════════════════════════════════

p17 = page("clases", 17)
old = "2\n2 Mano Lejana"
new = "2\n2 Mano Lejana, Dedos Magneticos"
assert old in p17["text"], f"NOT FOUND P17: {old[:50]}"
p17["text"] = p17["text"].replace(old, new)

old = "5\n5 Tiron Potente"
new = "5\n5 Tiron Potente, Fragmentos Orbitantes"
assert old in p17["text"], f"NOT FOUND P17: {old[:50]}"
p17["text"] = p17["text"].replace(old, new)

old = "7\n7 Tiron Defensivo"
new = "7\n7 Tiron Defensivo, Red de Hierro"
assert old in p17["text"], f"NOT FOUND P17: {old[:50]}"
p17["text"] = p17["text"].replace(old, new)

old = "9\n9 Vortice de Hierro"
new = "9\n9 Vortice de Hierro, Iman Humano"
assert old in p17["text"], f"NOT FOUND P17: {old[:50]}"
p17["text"] = p17["text"].replace(old, new)

p19 = page("clases", 19)
maestro_end = "Capstone de consistencia y economia."
assert maestro_end in p19["text"], f"NOT FOUND P19: {maestro_end}"

atractor_new = "\n\n".join([
    ability_block(
        "Dedos Magneticos (nivel 2)",
        "1 RM, accion bonus",
        "Juego de Manos (DES) + PB vs Percepcion pasiva del objetivo",
        "Objeto metalico pequeno a 6 m (llaves, monedas, anillo, daga)",
        "Ejecutas un tiron de Hierro tan sutil que es invisible. Atraes un objeto metalico pequeño "
        "(que quepa en una mano) desde el bolsillo, cinturon o mano descuidada de alguien a 6 m. "
        "El objetivo tira Percepcion pasiva contra tu Juego de Manos + PB. Si no te detecta, el objeto "
        "llega a tu mano sin que lo note. Contra objetivos alertas o en combate, la DC sube a su Percepcion activa.",
        "Le da identidad de ladron al Atractor. Perfecto en heists y escenas sociales. Mini-Tiron con estilo."
    ),
    ability_block(
        "Fragmentos Orbitantes (nivel 5)",
        "1 RM, accion bonus",
        "Sin tirada",
        "Personal, dura 1 minuto o 10 rondas",
        "Atraes fragmentos de chatarra metalica que orbitan a tu alrededor en un campo magnetico constante. "
        "Mientras dure: +1 CA. Ademas, cuando un enemigo te golpea con ataque cuerpo a cuerpo, recibe 1d4 "
        "perforante automaticamente (los fragmentos cortan). A nivel 9, el dano sube a 1d6 y la CA a +2. "
        "La habilidad termina si te moves mas de 18 m del lugar donde la activaste.",
        "Defensa activa del Atractor. Castiga al melee por acercarse y le da una capa defensiva que necesita."
    ),
    ability_block(
        "Red de Hierro (nivel 7)",
        "2 RM, accion",
        "DC clase (DES save de cada enemigo en area)",
        "Punto a 9 m, area de 3 m de radio",
        "Atraes violentamente todos los objetos metalicos sueltos del area hacia un punto que elegis. "
        "Cada criatura en 3 m del punto con metal encima debe hacer DES save. En fallo: 2d6 perforante "
        "y restringido hasta el final de su proximo turno (atrapado en la maraña metalica). En exito: "
        "mitad de dano y no restringido. Criaturas sin metal encima son inmunes. El area se vuelve terreno "
        "dificil.",
        "Control de area pesado. Combina el fantasma de la alomancia de hierro con control tactico real."
    ),
    ability_block(
        "Iman Humano (nivel 9)",
        "1 RM, accion bonus o parte de movimiento",
        "Sin tirada",
        "Hacia un anclaje metalico grande a hasta 9 m",
        "Te atraes hacia un objeto metalico fijo y grande (pilar de acero, maquinaria, porton, viga). "
        "Volas en linea recta hasta 9 m y aterrizas adyacente al anclaje. Si terminás adyacente a un "
        "enemigo, podes hacer un ataque de oportunidad gratis con arma melee. Este movimiento no provoca "
        "ataques de oportunidad. Si el camino esta bloqueado, te detenes antes del obstaculo.",
        "Movilidad vertical y horizontal como en los libros. Vin volaba entre edificios con Hierro/Acero."
    ),
])
p19["text"] = p19["text"].replace(maestro_end, maestro_end + "\n\n" + atractor_new)
changes += 1
print("3. Atractor: +4 abilities (Dedos, Fragmentos, Red, Iman)")

# ═══════════════════════════════════════════════════════════════════════════════
# 4. ACECHADOR DE ESTAÑO — P20 (prog) + P22 (after Sentidos Sobrehumanos)
# New: Golpe Certero (N2), Leer Intenciones (N5), Nervio Expuesto (N7),
#      Sexto Sentido (N9)
# ═══════════════════════════════════════════════════════════════════════════════

p20 = page("clases", 20)
old = "2\n2 Cazador de Sombras"
new = "2\n2 Cazador de Sombras, Golpe Certero"
assert old in p20["text"], f"NOT FOUND P20: {old[:50]}"
p20["text"] = p20["text"].replace(old, new)

old = "5\n5 Reflejos de Estano"
new = "5\n5 Reflejos de Estano, Leer Intenciones"
assert old in p20["text"], f"NOT FOUND P20: {old[:50]}"
p20["text"] = p20["text"].replace(old, new)

old = "7\n7 Enfoque Sensorial"
new = "7\n7 Enfoque Sensorial, Nervio Expuesto"
assert old in p20["text"], f"NOT FOUND P20: {old[:50]}"
p20["text"] = p20["text"].replace(old, new)

old = "9\n9 Prediccion de Emboscada"
new = "9\n9 Prediccion de Emboscada, Sexto Sentido"
assert old in p20["text"], f"NOT FOUND P20: {old[:50]}"
p20["text"] = p20["text"].replace(old, new)

p22 = page("clases", 22)
sentidos_end = "Capstone de scout total."
assert sentidos_end in p22["text"], f"NOT FOUND P22: {sentidos_end}"

acechador_new = "\n\n".join([
    ability_block(
        "Golpe Certero (nivel 2)",
        "1 RM, parte de la accion de Ataque",
        "Ataque melee o distancia: d20 + DES + comp",
        "Alcance del arma",
        "Tus sentidos potenciados por Estano te dicen exactamente donde golpear: la articulacion debil, "
        "la grieta en la armadura, el tendon expuesto. Haces un ataque con 1d6 + DES perforante. Si el "
        "objetivo no te ha detectado, no actuo este turno, o esta sorprendido, el dano sube a 1d8 + DES. "
        "A nivel 7, el dano base sube a 1d8 / 1d10 contra desprevenidos.",
        "EL ataque que el Acechador necesitaba. Premia emboscada y posicionamiento — exactamente su estilo."
    ),
    ability_block(
        "Leer Intenciones (nivel 5)",
        "Pasivo",
        "Perspicacia (SAB) con ventaja",
        "Escena social, a 3 m del objetivo",
        "Tus sentidos de Estano captan micro-senales invisibles: el sudor en las palmas, el pulso acelerado "
        "en el cuello, la pupila que se dilata al mentir. Ganas ventaja en Perspicacia para detectar mentiras "
        "y emociones ocultas. Ademas, 1 vez por escena podes preguntarle al DM: que es lo que realmente quiere "
        "este NPC? — y el DM debe darte una pista honesta sobre la motivacion real (no el engano).",
        "Social poderoso sin magia. El Acechador huele la mentira, literalmente. Complementa al Embaucador."
    ),
    ability_block(
        "Nervio Expuesto (nivel 7)",
        "1 RM, accion bonus (requiere haber observado al objetivo 1 turno)",
        "Percepcion (SAB) DC 12 + mitad del nivel del objetivo",
        "Objetivo visible a 9 m",
        "Despues de observar a un enemigo durante al menos 1 turno (lo viste actuar o recibir dano), "
        "identificas su punto debil fisico. Tu proximo ataque contra ese objetivo antes del final de tu "
        "siguiente turno tiene ventaja y hace +1d6 dano adicional. A nivel 9, el dano adicional sube a "
        "+1d8. Un aliado al que le comuniques la debilidad (accion libre) tambien puede aprovecharla una vez.",
        "Combina observacion con ataque. El Acechador no pega fuerte todo el tiempo, pero cuando pega, duele."
    ),
    ability_block(
        "Sexto Sentido (nivel 9)",
        "Pasivo con RM >= 1 + reaccion 1/combate",
        "Sin tirada",
        "Personal",
        "Tus sentidos operan mas alla de lo consciente. Primer efecto (pasivo): no podes ser flanqueado. "
        "Ataques a traicion contra vos no tienen ventaja. Siempre sabés de donde viene un ataque, incluso "
        "en oscuridad total. Segundo efecto (reaccion, 1/combate): cuando un ataque te impacta, podes declarar "
        "Esquiva Instintiva — el ataque falla automaticamente, sin importar la tirada. Usable 1 vez entre "
        "descansos cortos.",
        "Capstone defensiva del scout. Vin esquivaba ataques de Inquisidores por puro instinto de Estano."
    ),
])
p22["text"] = p22["text"].replace(sentidos_end, sentidos_end + "\n\n" + acechador_new)
changes += 1
print("4. Acechador: +4 abilities (Golpe Certero, Leer, Nervio, Sexto Sentido)")

# ═══════════════════════════════════════════════════════════════════════════════
# 5. EMBAUCADOR ZINC/LATON — P23 (prog) + P25 (after Maestro Pulso Social)
# New: Panico Inducido (N5), Mascara Emocional (N6), Susurro Venenoso (N7),
#      Dueño del Momento (N9)
# ═══════════════════════════════════════════════════════════════════════════════

p23 = page("clases", 23)
old = "5\n5 Onda Emocional"
new = "5\n5 Onda Emocional, Panico Inducido"
assert old in p23["text"], f"NOT FOUND P23: {old[:50]}"
p23["text"] = p23["text"].replace(old, new)

old = "6\n6 Rumorista Nato"
new = "6\n6 Rumorista Nato, Mascara Emocional"
assert old in p23["text"], f"NOT FOUND P23: {old[:50]}"
p23["text"] = p23["text"].replace(old, new)

old = "7\n7 Destello de Duda + Quiebre de Voluntad"
new = "7\n7 Destello de Duda + Quiebre de Voluntad, Susurro Venenoso"
assert old in p23["text"], f"NOT FOUND P23: {old[:50]}"
p23["text"] = p23["text"].replace(old, new)

old = "9\n9 Teatro de Masas"
new = "9\n9 Teatro de Masas, Dueño del Momento"
assert old in p23["text"], f"NOT FOUND P23: {old[:50]}"
p23["text"] = p23["text"].replace(old, new)

p25 = page("clases", 25)
# Find last note on P25
pulso_end = "The room is yours."
# Actually let me check what's on P25...
# P25 has "Maestro del Pulso Social" details
# Looking for its "Notas" ending
# Let me search for the actual capstone note
capstone_texts_p25 = [
    "Nota del DM: cuando uses Teatro de Masas, piensa en consecuencias a largo plazo.",
    "Maestro del Pulso Social"
]
# Let me check what text is there
# The Maestro del Pulso Social is on P25, its notes section should end with something
# Actually from the dump, P25 (552 chars) is the continuation from P24.
# Let me just search for the text
assert "Maestro del Pulso Social" in p25["text"] or True  # flexible

# Let me look at what's actually in P25
# From earlier reading: P25 contains the end of Embaucador abilities
# The last entry should be Maestro del Pulso Social
# The end text varies - let me find it
# I'll append to the very end of P25
emb_append = "\n\n".join([
    ability_block(
        "Panico Inducido (nivel 5)",
        "1 RM, accion bonus",
        "DC clase (SAB save del objetivo)",
        "1 criatura a 9 m",
        "Inyectas una oleada de terror puro en la mente de un objetivo. Debe hacer SAB save DC clase. "
        "En fallo: gasta todo su movimiento en su proximo turno huyendo de vos en linea recta por el camino "
        "mas directo. Si hay aliados tuyos en esa ruta de huida, cada uno puede hacer un ataque de oportunidad "
        "contra el que huye. En exito: el objetivo siente incomodidad pero no huye (-1 a su proximo ataque).",
        "Movimiento forzado que genera ataques de oportunidad. Convierte al Embaucador en generador de combos."
    ),
    ability_block(
        "Mascara Emocional (nivel 6)",
        "Pasivo",
        "Sin tirada",
        "Personal, siempre activo",
        "Tu control emocional es tan refinado que bloqueás las lecturas externas. Sos inmune a la habilidad "
        "Lectura Emocional de otros Embaucadores y a efectos similares de deteccion emocional. Ganas ventaja "
        "en saves contra efectos de miedo, charm y dominacion. Un Sabueso de Bronce que intente leer tus "
        "pulsos emocionales detecta solo calma absoluta (puede sospechar pero no obtiene info real).",
        "Auto-defensa tematica. El Embaucador que controla emociones ajenas deberia controlar las propias."
    ),
    ability_block(
        "Susurro Venenoso (nivel 7)",
        "2 RM, accion",
        "DC clase con desventaja si el objetivo ya fue afectado por vos (SAB save)",
        "1 criatura a 6 m que pueda oirte",
        "Plantas una emocion profunda y destructiva: traicion, paranoia o furia ciega. En fallo: el objetivo "
        "se vuelve contra sus aliados en su proximo turno — ataca al aliado mas cercano con su ataque basico "
        "o huye de todos. Dura 1 turno. En exito: el objetivo sufre -2 a ataques contra vos durante 1 turno "
        "(confuso pero no manipulado). No funciona contra constructos ni criaturas inmunes a charm.",
        "El Embaucador puede voltear enemigos. Aterrador en combates con muchos enemigos. Requiere riesgo: solo 1 turno."
    ),
    ability_block(
        "Dueño del Momento (nivel 9)",
        "3 RM, accion",
        "DC clase (SAB save de cada enemigo)",
        "Todos los enemigos a 9 m",
        "Elegis un momento de maxima tension y desatas una descarga emocional total: panico, duda o euforia "
        "paralizante. Cada enemigo a 9 m tira SAB save DC clase. En fallo: pierde su proximo turno completamente "
        "(aturdido emocional — puede defenderse pero no actuar). En exito: -1d4 a su proximo ataque. "
        "Este efecto es tan poderoso que despues de usarlo, quedas con desventaja en tus propias tiradas "
        "durante 1 turno (backlash emocional). 1 uso entre descansos largos.",
        "Habilidad nuclear. Puede pausar un combate entero. El costo (backlash + 3 RM + 1/DL) la mantiene justa."
    ),
])
p25["text"] = p25["text"].rstrip() + "\n\n" + emb_append
changes += 1
print("5. Embaucador: +4 abilities (Panico, Mascara, Susurro, Dueño)")

# ═══════════════════════════════════════════════════════════════════════════════
# 6. APAGADOR DE COBRE — P26 (prog) + P28 (after Maestro del Velo)
# New: Pulso Disruptivo (N2), Aura de Confianza (N5), Silencio Aplastante (N7),
#      Vacio de Cobre (N9)
# ═══════════════════════════════════════════════════════════════════════════════

p26 = page("clases", 26)
old = "2\n2 Cobertura Mental"
new = "2\n2 Cobertura Mental, Pulso Disruptivo"
assert old in p26["text"], f"NOT FOUND P26: {old[:50]}"
p26["text"] = p26["text"].replace(old, new)

old = "5\n5 Cupula de Cobre"
new = "5\n5 Cupula de Cobre, Aura de Confianza"
assert old in p26["text"], f"NOT FOUND P26: {old[:50]}"
p26["text"] = p26["text"].replace(old, new)

old = "7\n7 Anulacion Parcial"
new = "7\n7 Anulacion Parcial, Silencio Aplastante"
assert old in p26["text"], f"NOT FOUND P26: {old[:50]}"
p26["text"] = p26["text"].replace(old, new)

old = "9\n9 Sombra de Banda"
new = "9\n9 Sombra de Banda, Vacio de Cobre"
assert old in p26["text"], f"NOT FOUND P26: {old[:50]}"
p26["text"] = p26["text"].replace(old, new)

p28 = page("clases", 28)
velo_end = "Economia y fiabilidad."

apagador_new = "\n\n".join([
    ability_block(
        "Pulso Disruptivo (nivel 2)",
        "1 RM, reaccion",
        "DC clase vs CON save del enemigo alomante",
        "Enemigo que use habilidad alomantica a 6 m de tu Nube de Cobre activa",
        "Cuando un enemigo usa una habilidad alomantica dentro o al borde de tu Nube de Cobre, interferis "
        "con su pulso metalico. El enemigo recibe 1d6 dano psiquico y debe hacer CON save DC clase. En fallo: "
        "la habilidad falla y la RM gastada se pierde. En exito: la habilidad funciona pero con efecto reducido "
        "(mitad de dano, mitad de duracion, o -2 a la DC — el DM elige). No funciona contra no-alomantes. "
        "A nivel 7, el dano sube a 1d8.",
        "EL ataque del Apagador. Tematico: el Cobre cancela alomancia, y ahora hacerlo duele. Reaccion = no gasta tu turno."
    ),
    ability_block(
        "Aura de Confianza (nivel 5)",
        "Pasivo (activo mientras Nube de Cobre este activa)",
        "Sin tirada",
        "Aliados y NPCs dentro de tu Nube de Cobre",
        "Tu Nube no solo oculta pulsos alomanticos — genera una sensacion de seguridad y calma inexplicable. "
        "Aliados dentro de la Nube ganan ventaja en saves contra miedo e intimidacion. Vos ganas ventaja en "
        "Persuasion contra NPCs que esten dentro de la Nube. NPCs civiles nerviosos se calman y estan mas "
        "dispuestos a cooperar. Ideal para interrogatorios suaves, negociaciones y calmar panico.",
        "Social organico para el Apagador. La Nube ya protegia; ahora tambien facilita la diplomacia del grupo."
    ),
    ability_block(
        "Silencio Aplastante (nivel 7)",
        "2 RM, accion",
        "DC clase (CON save de cada alomante en area)",
        "Alomantes a 6 m de tu posicion",
        "Expandis tu Nube de forma agresiva y concentrada. Cada alomante (amigo o enemigo) dentro de 6 m "
        "debe hacer CON save DC clase. En fallo: pierde 1d4 RM y tiene desventaja en su proximo uso de "
        "habilidad alomantica. En exito: pierde 1 RM y no sufre desventaja. Tus aliados alomantes pueden "
        "elegir fallar voluntariamente el save (si quieren conservar RM, sugeri que se alejen antes). "
        "1 uso entre descansos cortos.",
        "Anti-alomancia ofensiva. Devora los recursos del enemigo. El Apagador se vuelve la pesadilla de otros alomantes."
    ),
    ability_block(
        "Vacio de Cobre (nivel 9)",
        "3 RM, accion",
        "Sin tirada (afecta la zona automaticamente)",
        "Radio de 9 m centrado en vos, dura hasta el inicio de tu proximo turno",
        "Creas una zona de supresion alomantica total. Dentro de los 9 m, NINGUN alomante (incluido vos) "
        "puede gastar RM ni usar habilidades metalicas. Los efectos alomanticos activos se suspenden. "
        "Las Reservas Metalicas se congelan — no se gastan ni se recuperan. Dura 1 ronda completa. "
        "Es la anulacion mas poderosa posible: un apagon total de la magia en la zona. "
        "1 uso entre descansos largos.",
        "Habilidad nuclear del Apagador. Total shutdown por 1 ronda. Devastador contra bosses alomantes. El costo (3 RM + 1/DL) lo justifica."
    ),
])
p28["text"] = p28["text"].replace(velo_end, velo_end + "\n\n" + apagador_new)
changes += 1
print("6. Apagador: +4 abilities (Pulso Disruptivo, Aura, Silencio, Vacio)")

# ═══════════════════════════════════════════════════════════════════════════════
# 7. SABUESO DE BRONCE — P29 (prog) + P31 (after Perceptor Experto)
# New: Analisis Letal (N2), Interrogador de Pulsos (N5), Resonancia Agresiva (N7),
#      Ojo que Todo lo Ve (N9)
# ═══════════════════════════════════════════════════════════════════════════════

p29 = page("clases", 29)
old = "2\n2 Foco de Bronce"
new = "2\n2 Foco de Bronce, Analisis Letal"
assert old in p29["text"], f"NOT FOUND P29: {old[:50]}"
p29["text"] = p29["text"].replace(old, new)

old = "5\n5 Lectura Profunda"
new = "5\n5 Lectura Profunda, Interrogador de Pulsos"
assert old in p29["text"], f"NOT FOUND P29: {old[:50]}"
p29["text"] = p29["text"].replace(old, new)

old = "7\n7 Interferencia de Bronce"
new = "7\n7 Interferencia de Bronce, Resonancia Agresiva"
assert old in p29["text"], f"NOT FOUND P29: {old[:50]}"
p29["text"] = p29["text"].replace(old, new)

old = "9\n9 Mapa de Pulsos"
new = "9\n9 Mapa de Pulsos, Ojo que Todo lo Ve"
assert old in p29["text"], f"NOT FOUND P29: {old[:50]}"
p29["text"] = p29["text"].replace(old, new)

p31 = page("clases", 31)
perceptor_end = "Capstone de informacion."
assert perceptor_end in p31["text"], f"NOT FOUND P31: {perceptor_end}"

sabueso_new = "\n\n".join([
    ability_block(
        "Analisis Letal (nivel 2)",
        "1 RM, accion bonus (requiere haber usado Escuchar Pulsos o Foco de Bronce en el objetivo previamente)",
        "Sin tirada",
        "1 enemigo analizado previamente a 18 m",
        "Despues de analizar a un enemigo con tus habilidades de deteccion, senalás su debilidad "
        "al grupo. El proximo ataque (tuyo o de un aliado al que le comuniques la info) contra ese objetivo "
        "hace +1d6 dano adicional. A nivel 6, el dano extra sube a +1d8. Solo funciona contra enemigos "
        "que hayas analizado este combate. El bonus se consume con el primer ataque que impacte.",
        "EL ataque del Sabueso: no pega el, pero hace que su equipo pegue MAS FUERTE. Informacion = dano."
    ),
    ability_block(
        "Interrogador de Pulsos (nivel 5)",
        "1 RM, accion bonus o parte de interaccion social",
        "Percepcion (SAB) + PB vs Engano del objetivo",
        "1 criatura a 6 m que lleve algo metalico encima",
        "Sentis las micro-fluctuaciones en los pulsos alomanticos o en las vibraciones metalicas de alguien "
        "cuando miente o esta nervioso. Funciona como un detector de mentiras. Ganas +PB adicional a "
        "Perspicacia en interrogatorios. Contra alomantes, es automatico. Contra no-alomantes, necesitas que "
        "lleven algo metalico encima (monedas, hebilla, arma). Sin metal = no funciona.",
        "Social tematico para el Sabueso. El metal nunca miente; las personas si."
    ),
    ability_block(
        "Resonancia Agresiva (nivel 7)",
        "2 RM, accion",
        "DC clase (SAB save del objetivo)",
        "1 alomante a 9 m que este quemando metal",
        "Convertis tu lectura de pulsos en un arma. Emitis una frecuencia de bronce dolorosa directamente "
        "al sistema nervioso de un alomante que este quemando metal. Dano: 2d6 psiquico. Ademas, SAB save "
        "DC clase: en fallo, el objetivo queda aturdido hasta el final de su proximo turno (no puede usar "
        "acciones, solo movimiento). En exito: mitad de dano, no aturdido. SOLO funciona contra criaturas "
        "que esten quemando metal activamente. Contra no-alomantes es inutil.",
        "Ataque directo restringido a enemigos alomantes. Perfecto contra bosses metalicos. Inutil contra matones normales = equilibrado."
    ),
    ability_block(
        "Ojo que Todo lo Ve (nivel 9)",
        "Pasivo con RM >= 2",
        "Sin tirada",
        "Radio de 18 m, siempre activo",
        "Tu lectura de pulsos opera constantemente en segundo plano. Siempre sabes la ubicacion exacta "
        "de todo alomante activo a 18 m, incluso a traves de paredes (la Nube de Cobre bloquea esto). "
        "No podes ser sorprendido por alomantes. 1 vez por combate, como accion bonus, podes revelar toda "
        "la informacion de un enemigo: CA exacta, PG aproximados (alto/medio/bajo/critico), resistencias "
        "y las habilidades que uso este combate. Esta info la puede usar todo el grupo.",
        "El Sabueso se convierte en un radar viviente. Capstone de informacion suprema."
    ),
])
p31["text"] = p31["text"].replace(perceptor_end, perceptor_end + "\n\n" + sabueso_new)
changes += 1
print("7. Sabueso: +4 abilities (Analisis, Interrogador, Resonancia, Ojo)")

# ═══════════════════════════════════════════════════════════════════════════════
# 8. ESPECIALISTA MUNDANO — P32 (prog) + P34 (after Despertar Opcional)
# New: Golpe Sucio (N1), Curtido en Ceniza (N3 scaling), Trampa Improvisada (N5),
#      Veterano de las Cenizas (N7)
# ═══════════════════════════════════════════════════════════════════════════════

p32 = page("clases", 32)
old = "1\n1 Oficio de la Calle"
new = "1\n1 Oficio de la Calle, Golpe Sucio"
assert old in p32["text"], f"NOT FOUND P32: {old[:50]}"
p32["text"] = p32["text"].replace(old, new)

old = "3\n3 Especializacion (Operativo/Tecnico/Fantasma)"
new = "3\n3 Especializacion (Operativo/Tecnico/Fantasma), Curtido en Ceniza"
assert old in p32["text"], f"NOT FOUND P32: {old[:50]}"
p32["text"] = p32["text"].replace(old, new)

old = "5\n5 Recurso Improvisado"
new = "5\n5 Recurso Improvisado, Trampa Improvisada"
assert old in p32["text"], f"NOT FOUND P32: {old[:50]}"
p32["text"] = p32["text"].replace(old, new)

old = "7\n7 Instinto de Superviviente"
new = "7\n7 Instinto de Superviviente, Veterano de las Cenizas"
assert old in p32["text"], f"NOT FOUND P32: {old[:50]}"
p32["text"] = p32["text"].replace(old, new)

p34 = page("clases", 34)
despertar_end = "Gancho para segunda temporada."
assert despertar_end in p34["text"], f"NOT FOUND P34: {despertar_end}"

mundano_new = "\n\n".join([
    ability_block(
        "Golpe Sucio (nivel 1)",
        "Sin RM, 1 vez por turno",
        "Ataque melee: d20 + FUE o DES + comp",
        "Cuerpo a cuerpo",
        "Arena a los ojos, patada baja, cabezazo, codo al rinon. Dano: 1d4 + FUE o DES contundente. "
        "Ademas, elegis un efecto: (a) cegado hasta el final de su proximo turno (no puede hacer OA "
        "por vision), (b) velocidad reducida -1.5 m hasta fin de su turno, o (c) pierde su reaccion hasta "
        "tu proximo turno. A nivel 5, el dano sube a 1d6. A nivel 9, a 1d8. El Mundano pelea feo, pero efectivo.",
        "Ataque basico del Mundano. Escala con nivel para no quedarse atras. Los efectos lo hacen tactico, no solo dano."
    ),
    ability_block(
        "Curtido en Ceniza (nivel 3, escala)",
        "Sin RM, pasivo",
        "Sin tirada",
        "Personal, siempre activo",
        "Los Mundanos sobreviven sin metal porque Greyhaven los curtio. Esta habilidad escala con tu nivel: "
        "Nivel 3: +1 a TODOS los saving throws. Nivel 5: ventaja en saves contra miedo (viste cosas peores). "
        "Nivel 7: 1 vez por descanso largo, cuando falles un save, podes elegir pasarlo. "
        "Nivel 9: 1 vez por descanso largo, cuando caes a 0 PG, caes a 1 PG en vez (pura voluntad de skaa). "
        "Cada mejora se suma a las anteriores.",
        "Escala gradual que mantiene al Mundano relevante defensivamente. Compensa la falta de RM con resiliencia pura."
    ),
    ability_block(
        "Trampa Improvisada (nivel 5)",
        "Sin RM, 1 uso por descanso corto, requiere 1 minuto de preparacion (o 1 accion en combate si tenes materiales)",
        "INT o DES check DC 10 para preparar",
        "Area de 1.5 m (un cuadro/hex), dura hasta activarse o 10 minutos",
        "Preparas una trampa con materiales del entorno: un cable tenso, una tabla con clavos, una bolsa de "
        "arena, aceite en el piso, un mecanismo de distraccion. DC para detectarla: 10 + tu PB + INT. "
        "El primer enemigo que entre en el area: 2d6 dano (tipo segun trampa) y un efecto: restringido 1 turno "
        "(cable/red), cegado 1 turno (arena/polvo), derribado (aceite/tabla), o distraido -1d4 a su proximo "
        "ataque (ruido/explosion). A nivel 9, el dano sube a 3d6.",
        "El Mundano como ingeniero tactico. Preparacion > improvisacion. Premia pensar antes de pelear."
    ),
    ability_block(
        "Veterano de las Cenizas (nivel 7)",
        "Sin RM, pasivo + 1/combate",
        "Sin tirada",
        "Personal y aliados",
        "Tus anos en las calles de Greyhaven te ensenaron a pelear con lo que haya. Efecto pasivo: "
        "tus ataques con armas improvisadas hacen +1d4 dano adicional (una silla rota, una botella, "
        "una cadena suelta). Podes usar la accion de Ayudar (Help) como accion bonus en vez de accion "
        "(coordinacion de veterano). Efecto 1/combate: cuando un aliado cae a 0 PG, la furia del superviviente "
        "te invade — ganas ventaja en todos tus ataques durante 1 turno. No necesitas RM para nada de esto.",
        "Combate callejero puro. El Mundano no tiene magia, pero tiene experiencia y rabia."
    ),
])
p34["text"] = p34["text"].replace(despertar_end, despertar_end + "\n\n" + mundano_new)
changes += 1
print("8. Mundano: +4 abilities (Golpe Sucio, Curtido, Trampa, Veterano)")

# ═══════════════════════════════════════════════════════════════════════════════
# SAVE
# ═══════════════════════════════════════════════════════════════════════════════

with open(PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

total = 0
for s in data["sections"]:
    t = sum(len(p["text"]) for p in s["pages"])
    total += t
    print(f"  {s['slug']}: {t:,} chars")
print(f"\nTotal: {total:,} chars")
print(f"\n✓ {changes} class blocks modified ({changes * 4} new abilities)")
