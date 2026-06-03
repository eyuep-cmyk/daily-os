# 🌅 Daily OS

Persönliche, installierbare **PWA** für Tagesroutine, Training (Calisthenics-Wiedereinstieg), Ernährung, Mindset & Energie. Mobile-first, läuft **offline** auf dem Handy. Keine Build-Tools, keine externen Dependencies — reines HTML/CSS/Vanilla-JS.

## 📱 Aufs Handy holen (Installation)

1. Diese Seite im **Handy-Browser** öffnen (URL nach Deploy, s. u.).
2. **iPhone (Safari):** Teilen-Symbol → **„Zum Home-Bildschirm"**.
   **Android (Chrome):** Menü ⋮ → **„App installieren" / „Zum Startbildschirm hinzufügen"**.
3. App vom Homescreen starten → läuft im Vollbild mit eigenem Icon.
4. **Offline:** funktioniert auch im Flugmodus (Service-Worker-Cache).

Alle Daten (Routine, Training, Gewicht, Wins …) liegen ausschließlich **lokal im Browser** (`localStorage`) auf deinem Gerät — nichts wird hochgeladen.

## 🚀 Deploy / Update (GitHub Pages)

Die App wird über **GitHub Pages** gehostet. Nach jeder Änderung:

```bash
git add -A
git commit -m "..."
git push
```

GitHub Pages aktualisiert automatisch. Die `index.html` wird **network-first** ausgeliefert → das Handy sieht nach dem Push die neue Version (statische Assets bleiben cache-first). Bei größeren Änderungen den `CACHE`-String in `service-worker.js` hochzählen (`daily-os-v1` → `v2`).

## 🗂️ Struktur

| Datei | Zweck |
|-------|-------|
| `index.html` | **Die App** — gesamte Logik in einer Datei. |
| `manifest.json` | PWA-Manifest (Name, Icons, Standalone). |
| `service-worker.js` | Offline-Cache (HTML network-first, Assets cache-first). |
| `icons/` | App-Icons (192 / 512 / Apple-Touch). |

Inhalte (Routine, Mahlzeiten, Einkauf, Workouts, Mindset) stehen als Daten-Objekte oben im `<script>` von `index.html` — zum Anpassen nur diese Objekte editieren.

## 🖥️ Lokal bearbeiten

VS Code → Ordner öffnen → Extension **Live Server** → Rechtsklick `index.html` → *Open with Live Server*.

---
*Disclaimer: allgemeine Fitness- & Ernährungs-Infos, keine medizinische Beratung.*
