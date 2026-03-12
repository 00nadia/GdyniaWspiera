# Gdynia Wspiera

Platforma łącząca osoby potrzebujące wsparcia z bezpłatnymi, zweryfikowanymi usługami pomocy społecznej, psychologicznej i prawnej w Gdyni. Aplikacja działa w trzech językach: polskim, ukraińskim i angielskim.

## Funkcjonalności

### Szukam pomocy
Przeglądanie i filtrowanie ofert wsparcia według typu (psycholog, prawnik, pracownik socjalny, grupa wsparcia), dzielnicy i słów kluczowych. Każda oferta zawiera dane kontaktowe, godziny otwarcia i lokalizację na mapie.

### Chcę pomagać
Katalog możliwości wolontariatu i staży w organizacjach pomocowych, z filtrowaniem po kategorii i dzielnicy.

### Przekaż dary
Lista punktów, w których można oddać żywność, odzież i inne rzeczy potrzebującym.

### Dodatkowe funkcje
- Szybkie wyszukiwanie ze strony głównej po rodzaju wsparcia i dzielnicy
- Chatbot pomagający w nawigacji po platformie
- Tryb wysokiego kontrastu i powiększania czcionki (dostępność WCAG)
- Responsywny design (desktop, tablet, telefon)
- Formularz zgłaszania problemów

## Technologie

- **SvelteKit 2** / **Svelte 5** (tryb runes) — framework frontendowy
- **TypeScript** — typowanie
- **Vite 7** — bundler i dev server
- **svelte-i18n** — internacjonalizacja (pl, uk, en)
- **Leaflet** — mapy interaktywne
- **CSS custom properties** — stylowanie i motywy dostępności

## Struktura projektu

```
frontend/
├── src/
│   ├── routes/                 # Strony aplikacji
│   │   ├── +layout.svelte      # Nawigacja, header, footer, chatbot
│   │   ├── +page.svelte        # Strona glowna
│   │   ├── offers/             # Lista ofert wsparcia + strona szczegolowa
│   │   ├── help-others/        # Wolontariat + strona szczegolowa
│   │   ├── give/               # Przekazywanie darow + strona szczegolowa
│   │   ├── about/              # O platformie
│   │   ├── contact/            # Kontakt z mapa Leaflet
│   │   ├── how-to-use/         # Instrukcja uzytkowania
│   │   └── submit-problem/     # Formularz zglaszania problemow
│   └── lib/
│       ├── components/         # Komponenty (OfferCard, GiveCard, Chatbot, ...)
│       ├── data/               # Dane JSON (offers, volunteering, give)
│       ├── i18n/               # Pliki tlumaczen (pl.json, uk.json, en.json)
│       ├── stores/             # Store dostepnosci
│       ├── types/              # Typy TypeScript
│       └── utils/              # Funkcje filtrowania
├── static/                     # Pliki statyczne
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## Uruchomienie

### Wymagania
- Node.js (v18+)
- npm

### Instalacja i uruchomienie

```bash
cd frontend
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

### Budowanie wersji produkcyjnej

```bash
npm run build
npm run preview
```

### Sprawdzanie typów

```bash
npm run check
```

## Dane

Dane o ofertach, wolontariacie i punktach darów przechowywane są w plikach JSON w katalogu `src/lib/data/`. Każdy wpis zawiera tłumaczenia we wszystkich trzech językach.

- `offers.json` — 15 ofert wsparcia
- `volunteering.json` — 10 ofert wolontariatu
- `give.json` — 3 punkty przyjmowania darów

Aby dodać nowy wpis, wystarczy dopisać obiekt do odpowiedniego pliku JSON zgodnie z istniejącym schematem.

## Wdrożenie

Aplikacja jest w pełni statyczna (brak backendu) i może zostać wdrożona na dowolnym hostingu obsługującym SvelteKit, np.:
- **Vercel** — `npm i -g vercel && vercel`
- **Netlify** — podłączenie repozytorium z komendą build `cd frontend && npm run build`
- **Hosting statyczny** — po zbudowaniu pliki z katalogu `build/` można serwować dowolnym serwerem HTTP

## Autorzy

- Monika Depka Pradzinska
- Nadia Tyburska
- Mateusz Boniecki
- Mikolaj Gozdzielewski



