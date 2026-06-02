# Robots en acció: Projecte ATMOS

Webapp local en català per a l'episodi **Protocol Ombra**. La versió principal és una web estàtica dins de `webapp/`: HTML, CSS i JavaScript, sense React ni instal·lació obligatòria.

## Obrir la webapp

Obre aquest fitxer al navegador:

[webapp/index.html](<C:/Users/34757034d/Documents/Escape Room Projecte ATMOS/webapp/index.html>)

També pots publicar o copiar sencera la carpeta `webapp/`.

## Estructura principal

- [webapp/index.html](<C:/Users/34757034d/Documents/Escape Room Projecte ATMOS/webapp/index.html>): entrada de la webapp.
- [webapp/styles.css](<C:/Users/34757034d/Documents/Escape Room Projecte ATMOS/webapp/styles.css>): estil visual, responsive i atmosfera HUD.
- [webapp/main.js](<C:/Users/34757034d/Documents/Escape Room Projecte ATMOS/webapp/main.js>): navegació, reptes, pistes i `localStorage`.
- `webapp/Imatges/`: imatges locals que utilitza la webapp.

## Imatges

La webapp usa rutes relatives dins de `webapp/Imatges`, així que funciona com a web local i també en un servidor estàtic.

S'han detectat i integrat:

- escenaris: Terra, nau, panell de control i golfes del Club Atmos.
- personatges: Max, Lluna, Robot, Link, Bio, Nitro i EKO.
- sospitosos climàtics: Fum, Sequera, Superfícies fosques, Pèrdua de vegetació, Aigua / inundació i Error de dades.

## Personalitzar

- Canvia textos, reptes i rutes d'imatge a [webapp/main.js](<C:/Users/34757034d/Documents/Escape Room Projecte ATMOS/webapp/main.js>).
- Canvia colors, composició i responsive a [webapp/styles.css](<C:/Users/34757034d/Documents/Escape Room Projecte ATMOS/webapp/styles.css>).

## Publicar

Puja la carpeta `webapp/` sencera a qualsevol allotjament estàtic. No cal build.
