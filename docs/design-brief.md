# ZweitRaumWohnung Kinetic Homepage — Design Brief

## Ziel
Scrollbasierte Startseite für ZweitRaumWohnung. Kein generischer Shop, sondern eine räumliche, schwarze/weiße Motion-Intro-Sequenz, die anschließend in echte Website-/Shop-Sektionen übergeht.

## Feste Reihenfolge
1. Schwarzer Typografie-Start mit `ZWEIT / RAUM / WOHNUNG`.
2. Scroll zieht in die Schrift hinein: Schrift wirkt wie Raum/Architektur, nicht wie normal skalierter DOM-Text.
3. Mousemove-Effekt: Schrift/Typo-Raum reagiert sichtbar perspektivisch und wackelt/neigt sich stärker.
4. Weiße Luftblasen erscheinen bereits, während Schrift noch sichtbar ist.
5. Luftblasen verdrängen die Schrift und übernehmen den Raum.
6. Danach exakt wirkender `It’s all about design`-Bereich der bestehenden ZweitRaumWohnung-Website: hell/weiß, zweispaltig, Bild links, Text rechts, roter `Shop now` Button.
7. Danach großes Möbel-/Garage-Hero-Bild wie auf der alten Website: Bild im Fokus, kompakter roter `Shop now` Button auf dem Bild, keine große neue Headline.
8. Unten bleibt das Code-Menü aus dem Prototyp.

## Spatial-Typografie: präzise Wirkung
Die Referenzwirkung ist nicht “große Headline zoomt”. Schrift ist ein räumliches Objekt. Scroll wirkt wie eine Kamerafahrt in eine typografische Installation:
- große angeschnittene Buchstabenflächen
- Wörter/Buchstaben auf verschiedenen Z-Ebenen
- einzelne Fragmente ziehen links/rechts/vorne an der Kamera vorbei
- Lesbarkeit darf beim Eintauchen teilweise verloren gehen
- Schrift = Raum, Scroll = Kamera, Buchstaben = Wände/Flächen

## Intro-Anforderungen
- Hintergrund fast schwarz: `#050505`/`#070707`.
- Keine CTA, keine Subline, keine Navigation im ersten Viewport.
- Hauptwörter etwas kleiner als letzter Prototyp: Desktop ca. `16–18vw`, Mobile ca. `22–24vw`.
- Zusätzlich große Buchstabenfragmente: `Z W R A U M O H N G`, stark angeschnitten, auf Z-Ebenen.
- `perspective`, `preserve-3d`, `translateZ`, `rotateX/Y`, `opacity` verwenden.
- Intro kürzer als vorher: ca. `220–240vh`, nicht `300vh`.

## Mousemove
- Desktop deutlich sichtbar.
- Scene-Rotation ungefähr: `rotateX(mouseY * -10deg)`, `rotateY(mouseX * 14deg)`.
- Vordergrund-Layer reagieren stärker, Hintergrund schwächer.
- Weich per lerp, kein zufälliges Zittern.

## Bubbles
- Nur weiß/hell, ohne sichtbaren Rand: `border: none`.
- Keine rote/blau/lila Reflexe, keine harte Outline.
- Weiche weiße Kreise mit radialer Helligkeit und optional sanftem Schatten.
- Größer: Desktop M min. ca. `220px`, L bis `420px`.
- Gleichmäßig verteilt, keine Cluster, ca. 4–6 gleichzeitig sichtbar.
- Beginnen schon bei ca. 55–60% Intro-Scrollphase, während Schrift noch sichtbar ist.
- Verdrängen die Schrift visuell; keine lange leere schwarze Zwischenphase.
- Bubble-Section kürzer: ca. `280–340vh`, nicht `520vh`.

## All-about-design
Muss wie bestehende Website wirken, nicht als schwarzer Festivalblock:
- heller/weißer Abschnitt
- zweispaltig
- echtes Website-/Showroom-Foto links
- rechts: `It’s all about design`
- darunter: `Hier findest du Originale von Vitra, USM Haller, Fritz Hansen und vielen mehr`
- darunter kompakter roter `Shop now` Button im bestehenden Stil
- keine neue Copy, kein Kicktext, kein riesiger schwarzer Typo-Screen

## Hero-Shop-Bild
- Großes echtes Möbel-/Garage-Foto, full width, ca. `80–95vh` Desktop.
- Möbel müssen sichtbar bleiben; nicht stark abdunkeln.
- Keine große neue Headline.
- Nur kompakter roter `Shop now` Button auf dem Bild, etwa untere Mitte/zentriert.

## Nicht tun
- Keine Testimonials, Feature-Cards, Statistiken.
- Kein SaaS-/Cyberpunk-/Gaming-/Glassmorphism-Look.
- Keine roten Flächen außer CTA/Signal.
- Keine roten Bubbles.
- Kein zufälliger Partikelhaufen.
- Keine neue Menü-/Shop-Struktur.
