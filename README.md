# Schachspiel

Ein vollständiges Schachspiel implementiert in Vanilla JavaScript mit objektorientierter Programmierung und MVC-Architektur.

## Über das Projekt

Dieses Projekt ist Teil meiner Bewerbungsunterlagen und demonstriert meine Fähigkeiten in:
- **JavaScript** (ES6+, OOP, Module)
- **MVC-Architektur** (Model-View-Controller)
- **DOM-Manipulation**
- **Git/GitHub** Versionskontrolle

## Installation & Start
```bash
# Repository klonen
git clone https://github.com/DEIN-USERNAME/DEIN-REPO-NAME.git

# Projekt öffnen
cd DEIN-REPO-NAME

# Mit Live Server starten (empfohlen)
# - VS Code: Live Server Extension installieren
# - Rechtsklick auf index.html → "Open with Live Server"

# Alternativ: Python HTTP Server
python -m http.server 8000
# Dann öffnen: http://localhost:8000
```

## Aktuell implementierte Features

- [x] 8×8 Schachbrett mit korrekter Darstellung
- [x] Alle Schachfiguren in Startposition
- [x] Figuren auswählen und bewegen
- [x] Spielerwechsel (Weiß/Schwarz)
- [x] Gegnerische Figuren schlagen
- [x] Visuelle Hervorhebung ausgewählter Figuren
- [ ] Zugregeln für alle Figuren (in Arbeit)
- [ ] Schach-Erkennung
- [ ] Schachmatt & Patt
- [ ] Spezialzüge (Rochade, En Passant, Bauernumwandlung)

## Projektstruktur
```
chess-game/
├── src/
│   ├── models/          # Spiellogik (Board, Game, Figuren)
│   ├── views/           # UI-Rendering (BoardView, GameView)
│   ├── controllers/     # Koordination (GameController)
│   └── main.js          # Entry Point
├── assets/
│   └── styles/          # CSS
└── index.html
```

## Technologien

- Vanilla JavaScript (ES6+ Modules)
- HTML5 & CSS3
- Git & GitHub

## Status

**In Entwicklung** - Sprint 4 von 9

## Autor

Erstellt als Bewerbungsprojekt

---

*Hinweis: Dieses Projekt befindet sich aktiv in Entwicklung. Weitere Features folgen.*