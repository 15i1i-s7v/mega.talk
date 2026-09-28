# Next Steps — nach dem Meeting Max × Johann (28.09.2026)

> Quelle: Live-Demo + Strategiegespräch, 49 Min. Audio, transkribiert (whisper large-v3-turbo,
> Sprecher nicht automatisch getrennt, aus Kontext zugeordnet). Datei:
> `mega.talk meetings/audio/Mega.talk 26:09:28 daniel legolas.m4a` (liegt lokal bei Max, nicht
> im Repo). Business-Themen sind unten als GitHub Issues angelegt und **Makebert (Max)**
> zugewiesen. Produkt-/Tech-Themen (Johanns Seite) sind hier nur dokumentiert, keine Issues.

## Wie das Tool aktuell funktioniert (Stand der Demo)

- **Mitarbeiter-Tracker:** Auswahl, welche Mitarbeiter/Gespräche verfolgt werden; Management kann
  per Auge-Icon ausgeblendet werden.
- **Direkte SoftBCom-Synchronisation:** Mitarbeiter und Projekte kommen automatisch aus SoftBCom;
  gelöschte Projekte werden grau markiert statt sofort zu verschwinden, solange noch getrackt.
- **Leitfäden pro Projekt/Kampagne:** Text wird in gewichtete, geordnete Kriterien zerlegt
  (automatisch extrahierbar, danach manuell anpassbar). Das System misst, wie sehr sich der
  Mitarbeiter daran hält.
- **Analyse:** Filter-/Gruppierbar nach Mitarbeiter, Mitarbeitertyp, Projekt, Zeitraum
  (inkl. Presets wie "letzte Woche"); pro Gespräch Redeanteil, Einhaltung, Leitfaden-Fortschritt;
  jedes Gespräch mit Volltranskript einsehbar, **bereits automatisch geschwärzt** (Kundenseite
  nie sichtbar).
- **"Building Blocks":** flexibler View-Builder für eigene Ansichten (Zeitraum × Mitarbeiter ×
  Ergebnis-Typ etc.).
- **Strategische Richtung (Johann, explizit):** Weg von manuell gebauten Dashboard-Views, hin zu
  einem **MCP-Server**, über den der Vertriebsleiter Claude direkt in natürlicher Sprache fragt
  ("vergleiche diese zwei Mitarbeiter über die letzten zwei Jahre") und eine Antwort bekommt,
  statt selbst Views zu bauen. MCP hat aktuell nur Leitfaden + Tracking, noch keine
  Analyse-Tools; MCP-eigene UI existiert, ist aber noch buggy/unfertig.
- **Website/UI bleibt trotzdem nötig** (Konsens beider): Mindset-Shift zu reinem MCP-Interface
  wird noch Jahre dauern, beides muss parallel existieren.
- **Produkt-To-Dos für Johann (nicht Max' Scope, hier nur dokumentiert):**
  - Analyse-Tools im MCP nachrüsten (Mitarbeiter-Vergleich, "was hat den Kunden überzeugt")
  - MCP-UI-Bug fixen
  - Usage-Tracking einbauen (PostHog, bewusst nicht Microsoft Clarity)
  - Automatisierungsidee prüfen: Claude wacht abends automatisch auf, prüft Tagesdaten über MCP
  - Audio-Wiedergabe auch im Claude/MCP-Flow ermöglichen (aktuell nur in der klassischen UI)

## Kundenstatus (bestehender Pilot)

- Ca. 500–600 Gespräche im System.
- Erste Woche lief gut, dann Mitarbeiter-Widerstand: Belegschaft dachte, personenbezogene Daten
  wären sichtbar (sind aber komplett geschwärzt) — Kunde stellt deswegen aktuell eher neue
  Mitarbeiter ein, statt die alten zu überzeugen. Kündigung nicht zu erwarten.
- Bisher kein Self-Service: Johann verschickt manuell einen wöchentlichen Report statt den Kunden
  eigene Presets bauen zu lassen.

## Business-Entscheidungen aus dem Gespräch — ⚠️ zur Bestätigung an Max

- **Johann hat vorgeschlagen, gemeinsam eine UG zu gründen, sobald genug Umsatz da ist — mit Max
  bei 51%, ausdrücklich verhandelbar.** Timing daran gekoppelt, wann die Kleinunternehmer-Grenze
  (~20.000 €/Jahr) erreicht wird; bis dahin läuft es über Johanns bestehende kleine
  Rechnungsstruktur (GbR/Kleinunternehmer). Für die nächsten 3–4 Kunden bleibt das erstmal so.
- **Ziel:** mindestens 10.000 € Umsatz bis Ende 2026.
- **Sechs SoftBCom-nahe Leads identifiziert** (Likelihood Mittel–Hoch), Pricing-Annahme im
  Gespräch: durchschnittlich ~500 €/Kunde/Monat (Ausgangspunkt war der bestehende Pilotkunde mit
  ca. 800 €/Monat Wertbeitrag) → bei allen 6 rechnerisch ~36.000 € ACV/Jahr, realistisch werden
  laut Johann eher 3 von 6 tatsächlich abschließen.
- **Reihenfolge fürs SoftBCom-Ansprechen:** erst 2–3 weitere Kunden gewinnen, DANACH SoftBCom
  direkt kontaktieren — nicht um zu verkaufen, sondern um eine Umsatzpartnerschaft/Intro-Deal zu
  ihren anderen Kunden zu bekommen. Vorher bewusst nicht mit SoftBCom in Kontakt treten.
  Anschließend erst über andere Telefonanlagen-Anbieter nachdenken.
- **Aufgeschobene Idee (Johann, aggressiver):** bei einem Event neben SoftBComs Stand auftreten
  und live demonstrieren (SoftBCom sitzt in Berlin, direkt am Hauptbahnhof). Max wollte das
  bewusst zurückstellen, bis 1–2 weitere Kunden gepitcht sind.
- **⚠️ Unklarer Lead:** ein Kontakt, im Gespräch nur "Johann" genannt (Verwechslungsgefahr mit
  Co-Founder Johann!), beschrieben als AI-native, "wie Sales Elevator, nur größer". Zugehöriger
  Firmenname im Transkript nur als "Dialog Mainz" verständlich (Whisper-Fehler, vermutlich
  Dialogminds gemeint) — passt aber inhaltlich nicht zu den bekannten Dialogminds-Kontakten
  (Daniel Rexhausen, Henning Tiede). Eine fertige, aber unversendete E-Mail an diesen Kontakt
  existiert bereits. **Muss von Max identifiziert und bestätigt werden, bevor sie rausgeht.**
- **Wettbewerbs-Einschätzung zu SoftBCom** (Johanns Meinung, nicht verifiziert): alter Stack
  (Oracle-Linux-Server), langsame Security-Fixes, "AI-Driven"-Positionierung wirkt aufgesetzt,
  Führung vermutlich um einen "Vladimir" (deckt sich mit Vladimir K./V. Dudchenko, GF laut
  öffentlichem Lead-Datensatz). Einschätzung: SoftBCom wird das Produkt nicht schnell selbst
  nachbauen können.

## Plan: Wie wir alle SoftBCom-Leads signen

1. **Jetzt, fünf konkrete Sends (#9–#13):** VIAFON, KiKxxl, DialogUnion, Azur Dialog anschreiben,
   Jörn Schmidt/Kuck & Schmidt frisch nachfassen. Rexhausen/Dialogminds (Intro-Bitte) und
   Gerbracht/Tolksdorf (Follow-up) laufen bereits, keine neue Aktion nötig.
2. **Sofort (#2):** den unklaren "Johann"-Lead identifizieren (Name, Firma, LinkedIn) und die
   fertige Entwurfs-Mail erst nach Bestätigung verschicken.
3. **Laufend (#3):** SoftBComs LinkedIn-/Social-Follower systematisch durchgehen, um weitere
   Kandidaten zu den bestehenden sechs zu finden.
4. **Jetzt schon vorbereiten, aber Versand gesperrt (#4):** SoftBCom-Umsatzpartnerschafts-Pitch
   entwerfen — Versand erst nach 2 bestätigten Abschlüssen aus #9–#13.
5. **Bewusst zurückgestellt, nicht vergessen (#7):** der Event-Auftritt neben SoftBComs Stand —
   erst nach mindestens 1–2 weiteren Kundenpitches erneut bewerten.
6. **Parallel, Business-Housekeeping (#5, #6, #8):** Rechnungsstruktur für neue Kunden festlegen,
   Kleinunternehmer-Grenze (~20k €/Jahr) im Blick behalten als Auslöser für die UG-Gründung, das
   51%-Angebot von Johann mit Max besprechen/entscheiden, und ein wöchentliches Pipeline-Review
   gegen das 10k-€/6-Leads-Ziel einrichten.

## Offene Business-Issues (GitHub, zugewiesen an Makebert)

> Bewusst input-basiert formuliert: jede Issue ist eine Aktivität, die Max an einem konkreten Tag
> tatsächlich ausführen kann, nicht ein Ergebnis, das von anderen abhängt. #1 ("Kunden
> abschließen") wurde deshalb durch #9–#13 ersetzt.

- ~~[#1 — 2-3 weitere Kunden ASAP abschließen](https://github.com/15i1i-s7v/mega.talk/issues/1)~~ — geschlossen, ersetzt durch #9–#13
- [#2 — Unklaren "Johann"-Lead identifizieren, dann Entwurfsmail senden](https://github.com/15i1i-s7v/mega.talk/issues/2)
- [#3 — SoftBCom LinkedIn/Social-Follower nach weiteren Leads durchsuchen](https://github.com/15i1i-s7v/mega.talk/issues/3)
- [#4 — SoftBCom-Umsatzpartnerschafts-Pitch entwerfen (Versand erst nach 2 Abschlüssen)](https://github.com/15i1i-s7v/mega.talk/issues/4)
- [#5 — Gemeinsame UG-Gründung mit Johann verhandeln (51%-Vorschlag)](https://github.com/15i1i-s7v/mega.talk/issues/5)
- [#6 — Rechnungsstruktur für neue Kunden festlegen](https://github.com/15i1i-s7v/mega.talk/issues/6)
- [#7 — Entscheidung: Event-Auftritt neben SoftBComs Stand (geparkt)](https://github.com/15i1i-s7v/mega.talk/issues/7)
- [#8 — Wöchentliches Pipeline-Review gegen das 10k-€/6-Leads-Ziel einrichten](https://github.com/15i1i-s7v/mega.talk/issues/8)
- [#9 — Outreach an VIAFON senden](https://github.com/15i1i-s7v/mega.talk/issues/9)
- [#10 — Outreach an KiKxxl senden](https://github.com/15i1i-s7v/mega.talk/issues/10)
- [#11 — Outreach an DialogUnion senden](https://github.com/15i1i-s7v/mega.talk/issues/11)
- [#12 — Outreach an Azur Dialog senden](https://github.com/15i1i-s7v/mega.talk/issues/12)
- [#13 — Frische Follow-up-Nachricht an Jörn Schmidt senden](https://github.com/15i1i-s7v/mega.talk/issues/13)
