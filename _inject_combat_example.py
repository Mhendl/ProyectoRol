"""Inject a complete combat example into the combate section of sections.json."""
import json, pathlib

FILE = pathlib.Path(r"e:\Descargas\Proyecto Mistborn\content\sections.json")
data = json.loads(FILE.read_text(encoding="utf-8"))

combate = next(s for s in data["sections"] if s["slug"] == "combate")

COMBAT_EXAMPLE = r"""Ejemplo de combate completo — Todos los sistemas en accion

Este ejemplo recorre un encuentro real paso a paso para mostrar como interactuan las Reservas Metalicas (RM), la sobrecarga, la fatiga, el Impulso, el Reloj de Exposicion y el Choque Alomantico. La escena es ficticia pero representativa de lo que puede pasar en tu mesa.

Escena: La emboscada del deposito
La crew (nivel 3) esta formada por Kaelen (Bruto de Peltre), Vex (Tiradora de Acero) y Dael (Embaucador de Zinc). Entran a un deposito del Canton para robar un cargamento de atium. Adentro: 4 guardias menores (CA 12, PG 20 cada uno) y Serran, un Atractor de Hierro moderado (CA 14, PG 35, 4 RM).

Los tres PJs estan en nivel 3, asi que cada uno tiene 3 RM maximos.

Estado del Reloj de Exposicion: 1 (Rumores). Ya usaron alomancia en la taberna la sesion pasada.

Iniciativa
Todos tiran d20 + DES:
- Vex: 18 (DES +3)
- Serran: 15 (DES +2)
- Kaelen: 12 (FUE +3, DES 0)
- Dael: 11 (CAR +3, DES -1)
- Guardias: 9 (bloque)

Orden: Vex → Serran → Kaelen → Dael → Guardias.

RONDA 1

Turno de Vex (Tiradora de Acero — 3/3 RM)
- Accion Menor: Encender Acero (gratis, no cuesta RM — solo activa las lineas de metal)
- Movimiento: Sube a una pasarela elevada para tener linea de vision.
- Accion: Tiro Preciso contra Guardia 1. Tira d20 + DES (+3) + comp (+2) = d20+5 vs CA 12. Saca 14. Impacta. Dano: 1d6+1d4+3 = 10 dano. El guardia queda herido.
- Impulso: Vex gano 1 Impulso por usar el entorno (subir a la pasarela para mejor angulo). Pasa de 0 a 1 Impulso.
- RM gastada esta ronda: 0. Sin chequeo de sobrecarga.

Turno de Serran (Atractor enemigo — 4/4 RM)
- Accion Menor: Encender Hierro.
- Accion: Tiron de Hierro contra el arma de Vex. Tira d20+INT(+2)+BM(+2)=d20+4 vs DC 14. Saca 16. Exito: el arma de Vex vuela 3 metros hacia el.
- El DM marca +1 al Reloj de Exposicion por alomancia con testigos. El Reloj sube de 1 a 2 (Investigacion).
- RM gastada: 1. Sin sobrecarga.

Turno de Kaelen (Bruto de Peltre — 3/3 RM)
- Accion Menor: Encender Peltre (cuesta 1 RM. Baja a 2/3 RM).
- Movimiento: Corre hacia Guardia 2.
- Accion: Golpe de Peltre contra Guardia 2. Tira d20+FUE(+3)+comp(+2)=d20+5 vs CA 12. Saca 17. Impacta. Dano: 1d8+3 = 9. El empuje lo tira contra la pared. El guardia queda a 11 PG.
- RM gastada esta ronda: 1. Sin sobrecarga.
- Impulso: Kaelen gano 1 Impulso por Primera Sangre (primer golpe metalico del combate). Pasa a 1 Impulso.

Turno de Dael (Embaucador de Zinc — 3/3 RM)
- Accion Menor: Encender Zinc (gratis).
- Accion: Irritar sobre los Guardias 3 y 4. Tira d20+CAR(+3)+BM(+2)=d20+5 vs salvacion SAB de los guardias (DC 13). Guardia 3 saca 8 (falla): queda Irritado, desventaja en su proximo ataque. Guardia 4 saca 14: resiste.
- RM gastada: 1. Sin sobrecarga.
- Dael marca +1 en el Reloj por uso de alomancia en publico sin Nube. Reloj: 2 (ya estaba en 2, se mantiene porque el DM decidio que es el mismo evento).

Turno de los Guardias
- Guardia 1 (herido, 10 PG): Ataca a Kaelen. d20+3 vs CA 14. Saca 11. Falla.
- Guardia 2 (11 PG): Ataca a Kaelen. d20+3 vs CA 14. Saca 16. Impacta. 1d6+2 = 6 dano a Kaelen.
- Guardia 3 (Irritado): Ataca a Dael con desventaja. Saca 7 y 12, usa el menor: 7+3=10 vs CA 11. Falla.
- Guardia 4: Corre a dar la alarma.

Fin de ronda 1. Estado:
- Vex: 3/3 RM, 1 Impulso, sin arma (Serran la tiene)
- Kaelen: 2/3 RM, 1 Impulso, HP: 22/28
- Dael: 2/3 RM, 0 Impulso
- Reloj de Exposicion: 2 (Investigacion)
- Serran: 3/4 RM
- 1 guardia herido, 1 irritado, 1 corriendo a la alarma

RONDA 2

Turno de Vex (3/3 RM, 1 Impulso)
Vex necesita recuperar su arma o improvisar. Decide:
- Accion Menor: Saca las monedas alomanticas de su bolsa (herramienta de Tirador).
- Accion: Empuje de Acero sobre las monedas hacia Guardia 4 (el que corre a la alarma). d20+DES(+3)+BM(+2)=d20+5 vs DC 13. Saca 15. Exito: las monedas impactan al guardia, 1d6+3 = 7 dano y lo frenan 1 ronda.
- Gasta 1 Impulso para ganar +1d4 a la tirada de dano: +3 mas. Total 10 dano. El guardia queda a 10 PG y no llega a la alarma.
- RM gastada: 1. Sin sobrecarga.
- Reloj: +1 → sube a 3 (Alerta). ¡Monedas volando es muy visible!

Turno de Serran (3/4 RM)
Serran quiere usar el arma robada de Vex contra Kaelen. Pero Vex ya no tiene linea de metal hacia el arma porque Serran la esta sosteniendo.
- Accion: Tiron Potente — intenta atraer las cadenas del techo sobre Kaelen. d20+INT(+2)+BM(+2)=d20+4 vs DC 16. Saca 12. Falla. Las cadenas se sacuden pero no caen.
- RM gastada: 2. Serran gasto 2 RM en esta ronda → chequeo de Sobrecarga. d20+CON(+1) vs DC 12+2=14. Saca 10. Falla. Serran gana Fatiga 1 (-1 a tiradas fisicas y metalicas).

Turno de Kaelen (2/3 RM, 1 Impulso)
Kaelen ve a Serran debilitado por la fatiga. Decide ir fuerte.
- Movimiento: Se acerca a Serran.
- Accion: Furia de Peltre contra Serran. d20+FUE(+3)+comp(+2)=d20+5 vs CA 14. Saca 19. Impacta. Dano: 2d6+3 = 11. Empuje y posible derribo: Serran tira salvacion FUE DC 13. Saca 9 (-1 por fatiga = 8). Cae Derribado.
- RM gastada esta ronda: 2 (1 Peltre sigue activo + 2 Furia). ¡Kaelen gasto 2 RM! Chequeo de sobrecarga: d20+CON(+3) vs DC 12+2=14. Saca 16. Exito. Se salva de la fatiga... por ahora.
- Impulso: Gano 1 Impulso por Coordinacion de Crew (Vex distrajo a los guardias, el golpeo al lider). Pasa a 2 Impulso.

CHOQUE ALOMANTICO
Serran, en el suelo, intenta un Tiron de Hierro desesperado contra la armadura de Kaelen. Kaelen resiste con las lineas de Peltre.
El DM declara un Choque Alomantico:
- Serran: d20 + INT(+2) + BM(+2) = d20+4, pero -1 por Fatiga 1 = d20+3. Saca 14.
- Kaelen: d20 + CON(+3) + BM(+2) = d20+5. Saca 20.
- Diferencia: 20 vs 14 = 6 puntos. Kaelen gana por 5+: obtiene Dominio Alomantico — ventaja en su proxima accion contra Serran.

Turno de Dael (2/3 RM)
- Accion: Lectura Emocional sobre Serran (caido, fatigado). d20+CAR(+3)+BM(+2)=d20+5 vs DC 12. Saca 17. Exito: Dael detecta PANICO. Le dice a Kaelen: "Esta quebrado, no va a pelear mas".
- RM gastada: 1. Sin sobrecarga.
- Impulso: Dael gano 1 Impulso por Coordinacion de Crew (informacion tactica para Kaelen).

Turno de los Guardias
- Guardia 1 (10 PG): Intenta huir. Kaelen usa su Reaccion: Ataque de Oportunidad con ventaja (Dominio Alomantico). d20+5 con ventaja, saca 18 y 12, usa 18. Impacta. 1d8+3 = 8 dano. Guardia 1 cae a 2 PG y se rinde.
- Guardia 2: Ve a su jefe en el suelo. Tira moral (d20 vs DC 12, falla). Suelta el arma.
- Guardia 3: Todavia Irritado. Ataca a Dael. d20+3 vs CA 11. Saca 14. Impacta. 1d6+2 = 5 dano.
- Guardia 4 (10 PG, frenado): No puede actuar esta ronda.

Fin de ronda 2. Estado:
- Vex: 2/3 RM, 0 Impulso
- Kaelen: 0/3 RM, 2 Impulso, HP: 22/28
- Dael: 1/3 RM, 1 Impulso, HP: 20/25
- Serran: Derribado, Fatiga 1, 24/35 PG, 1/4 RM
- Reloj de Exposicion: 3 (Alerta) — la situacion se pone tensa. Si siguen peleando en publico, un Obligador va a venir.
- 2 guardias rendidos, 1 irritado, 1 frenado

RONDA 3 — RESOLUCION

Turno de Vex
- Apunta al Guardia 4 (el de la alarma). Accion: Tiro Preciso. d20+5 vs CA 12. Saca 13. 1d6+1d4+3 = 8 dano. El guardia cae a 2 PG. Levanta las manos.

Turno de Kaelen (0/3 RM, 2 Impulso)
Kaelen se quedo sin RM. No puede usar habilidades metalicas. Pero tiene 2 Impulso.
- Gasta 2 Impulso: Movimiento extra. Se posiciona sobre Serran.
- Accion: Intimidacion (d20+FUE+comp = d20+5 vs DC de Serran, debilitado). Le pone el pie encima y dice: "Se termino."
- El DM pide a Serran una salvacion de SAB vs DC 13. Serran saca 7 (-1 fatiga = 6). Falla. Serran se rinde.

El combate termina sin matar a nadie. El DM ofrece una eleccion: ¿dejan testigos (Reloj se mantiene en 3) o silencian la escena (Reloj baja a 2 pero hay consecuencia moral)?

Resumen mecanico del encuentro

Reservas Metalicas: Los tres PJs empezaron con 3 RM y los gastaron en 2.5 rondas. Kaelen termino en 0, Vex en 2, Dael en 1. Nadie fue completamente inutil al final — las acciones basicas (ataque con arma, intimidacion) no cuestan RM.

Sobrecarga: Se activo dos veces (Serran ronda 2, Kaelen ronda 2). Serran fallo y gano Fatiga 1, lo que le costo -1 en todas sus tiradas — incluyendo el Choque Alomantico que perdio. Kaelen paso el chequeo y se salvo.

Fatiga: Solo Serran acumulo fatiga. Sus -1 a tiradas afectaron su salvacion de derribo y el Choque. Si hubiera fallado otra vez, habria subido a Fatiga 2 (velocidad reducida, -1 a Reacciones). La fatiga es un espiral: el que se sobrecarga queda en desventaja creciente.

Impulso: Se genero 5 veces en el encuentro: entorno (Vex subio a pasarela), primera sangre (Kaelen), coordinacion x2 (Kaelen-Vex, Dael-Kaelen), riesgo narrativo (monedas volando). Se gasto 3 veces: +1d4 dano, movimiento extra, intimidacion final. El Impulso premio las acciones creativas y cooperativas.

Choque Alomantico: Se resolvio en un tiro opuesto (d20+atributo+BM). La fatiga de Serran fue decisiva: -1 le costo el duelo por 6 puntos. El ganador obtuvo Dominio Alomantico (ventaja en la siguiente accion), que Kaelen uso para el ataque de oportunidad.

Reloj de Exposicion: Subio de 1 (Rumores) a 3 (Alerta) en 3 rondas. Cada uso de alomancia visible lo empujo. Si la crew no toma medidas (silencio, sobornar, cambiar de zona), la proxima sesion empezara con un Obligador haciendo preguntas. El Reloj es presion social que acumula entre sesiones.

Leccion clave: El combate no se resolvio solo con dano. La informacion (Lectura Emocional), el control (Irritar, Empuje de monedas), la posicion (pasarela), la fatiga enemiga y la intimidacion final fueron igual de decisivos que los golpes. Eso es exactamente lo que busca el sistema Mistborn D20: peleas cinematograficas donde pensar importa tanto como pegar."""

# Insert as a new page after page 52 (examples) and before page 0 (DM guide)
# Find the index: page 52 is the last numbered page before the two P0 pages
insert_idx = None
for idx, p in enumerate(combate["pages"]):
    if p["page"] == 52:
        insert_idx = idx + 1
        break

if insert_idx is None:
    raise RuntimeError("Could not find page 52 in combate section")

combate["pages"].insert(insert_idx, {"page": 0, "text": COMBAT_EXAMPLE})
print(f"Inserted combat example at index {insert_idx}")

FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print("sections.json updated successfully")
print(f"Combat example length: {len(COMBAT_EXAMPLE)} chars")
