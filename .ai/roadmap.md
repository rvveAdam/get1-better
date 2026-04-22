# Roadmap nauki — Get Better 1%
# Powiązany stack: React 18 + TypeScript 5 + Vite 5 → Electron
# Ostatnia aktualizacja: 2026-04-09

---

## Legenda statusów
- `[ ]` Nie rozpoczęty
- `[~]` W toku
- `[x]` Ukończony (Definition of Done spełniony)

---

## ETAP 0: Przygotowanie ✅
**Status:** Ukończony — 2026-04-09

- [x] Stworzenie PRD promptów (`.ai/prd-prompt-1/2/3.md`)
- [x] Analiza i scalenie → `.ai/prd-final.md`
- [x] Stworzenie `CLAUDE.md` i `roadmap.md`

---

## ETAP 1: Fundament projektu
**Status:** `[ ]` Nie rozpoczęty
**Cel:** Działający projekt React+TS+Vite. Developer rozumie strukturę plików i potrafi napisać typowany komponent.

### Must Know Primer (przeczytaj zanim zaczniesz kodować)

| Koncept | Jedno zdanie | Analogia WordPress |
|---------|-------------|-------------------|
| Komponent React | Samowystarczalny kawałek UI z własną logiką | Jak Gutenberg block — ma swój HTML, CSS i JS w jednym miejscu |
| JSX | Składnia jak HTML, ale to tak naprawdę JavaScript | Jak template tag w WP (`<?php the_title(); ?>`) tylko zamiast PHP piszesz JS |
| Props | Dane wejściowe komponentu | Jak atrybuty shortcode (`[button color="red"]` → `color` to props) |
| TypeScript `interface` | Kontrakt opisujący kształt danych | Jak schema pola ACF — definiujesz co pole może przyjąć |
| Vite | Narzędzie które bundluje i uruchamia projekt w trybie dev | Jak WordPress local (LocalWP) — odpala środowisko na localhost |
| `npm` | Menedżer pakietów | Jak repozytorium pluginów WP, tylko instalujesz przez terminal |

### Zadania

- [ ] **Inicjalizacja projektu**
  - Plik(i): `package.json`, `vite.config.ts`, `tsconfig.json`
  - Instrukcja: Uruchom `npm create vite@latest get1better -- --template react-ts`, przejdź przez strukturę katalogów, usuń demo pliki
  - Czego uczy: jak wygląda projekt React+TS od środka, po co każdy plik konfiguracyjny

- [ ] **Typy aplikacji**
  - Plik(i): `src/types/index.ts`
  - Instrukcja: Zdefiniuj wszystkie TypeScript interfaces dla aplikacji (SessionStatus, Message, LearningEntry, FlashCard, UserProfile, SessionState, SessionAction) — wg specyfikacji w `.ai/prd-final.md` sekcja "Kluczowe TypeScript Types"
  - Scaffold hint:
    ```typescript
    // src/types/index.ts

    // TUTAJ: zdefiniuj union type dla stanów sesji
    // HINT: idle | starting | presenting | ... (sprawdź prd-final.md)
    export type SessionStatus = // ???

    // TUTAJ: interface dla wiadomości w chacie
    // HINT: potrzebuje id, roli (user/assistant), treści i timestamp
    export interface Message {
      // ???
    }

    // NIE ZMIENIAJ: ten typ jest gotowy jako przykład
    export interface UserFeedback {
      difficultyPerceived: 'too_easy' | 'just_right' | 'too_hard'
      comment: string
    }

    // TUTAJ: dodaj pozostałe interfaces (LearningEntry, FlashCard, UserProfile, SessionState)
    ```
  - Czego uczy: TypeScript interfaces, union types, nested interfaces

- [ ] **Skeleton komponentów**
  - Plik(i): `src/App.tsx`, `src/components/Widget/Widget.tsx`, `src/components/IdleView/IdleView.tsx`
  - Instrukcja: Stwórz puste komponenty ze zdefiniowanymi props interfaces. Żadnej logiki — tylko `return <div>Placeholder</div>`
  - Scaffold hint:
    ```tsx
    // src/components/Widget/Widget.tsx

    // TUTAJ: zaimportuj potrzebne typy z src/types/index.ts

    // TUTAJ: zdefiniuj interface dla props tego komponentu
    // HINT: na razie Widget nie potrzebuje żadnych props — użyj pustego interface lub pomiń

    // NIE ZMIENIAJ: ta funkcja jest już poprawnie nazwana i wyeksportowana
    export function Widget() {
      // TUTAJ: return z podstawowym JSX — pionowy div z klasą "widget"
      // HINT: <div className="widget"> ... </div>
    }
    ```
  - Czego uczy: struktura komponentu, props interface, import/export w TS

- [ ] **Dark theme CSS**
  - Plik(i): `src/styles/theme.css`, `src/styles/globals.css`
  - Instrukcja: Zdefiniuj CSS custom properties (zmienne) dla dark mode "Cozy" — kolory tła, tekstu, akcentów. Podepnij do `main.tsx`
  - Czego uczy: CSS variables, jak style działają w Vite

### Definition of Done
- [ ] `npm run dev` startuje bez błędów, widget wyświetla placeholder
- [ ] `npx tsc --noEmit` — zero błędów TypeScript
- [ ] Developer potrafi bez zaglądania w notatki napisać od zera prosty komponent z jednym propsem
- [ ] Developer potrafi wyjaśnić różnicę między `interface` a `type` w TS

### Checkpoint Questions (zadaj PRZED przejściem do Etapu 2)
1. Napisz od zera komponent `<Button label="Kliknij" onClick={...} />` z poprawnym TypeScript interface dla props.
2. Co by się stało gdybyś usunął `export` przed `interface Message`?
3. W `SessionStatus` masz union type. Dlaczego to lepsze niż zwykły `string`?
4. Czym różni się plik `.ts` od `.tsx`?
5. Skąd Vite wie co uruchomić gdy wpisujesz `npm run dev`?

### Szacowany czas
2–3 tygodnie przy 4–7h/tydz.

---

## ETAP 2: Integracja LLM — Anthropic API
**Status:** `[x]` Ukończony — 2026-04-13
**Cel:** Kliknięcie "Start sesji" → Claude zwraca wiedzę i słówko → dane wyświetlają się w komponentach UI.

### Must Know Primer

| Koncept | Jedno zdanie | Analogia WordPress |
|---------|-------------|-------------------|
| `useState` | Pamięć komponentu — zmiana wartości powoduje re-render | Jak `update_option()` w WP, ale w przeglądarce — zmiana odświeża widok |
| `useEffect` | Kod który odpala się po renderze lub gdy zmieni się zależność | Jak hook `init` lub `wp_loaded` — odpalasz coś gdy strona jest gotowa |
| `async/await` | Sposób na czekanie na odpowiedź z serwera bez blokowania UI | Jak `wp_remote_get()` ale nie blokujesz całej strony |
| `fetch` | Wbudowana funkcja JS do wysyłania requestów HTTP | Jak `wp_remote_post()` — wysyłasz dane, czekasz na odpowiedź |
| Custom hook | Funkcja zaczynająca się od `use` która enkapsuluje logikę | Jak plugin który dodaje jedną konkretną funkcjonalność — bierzesz go i używasz |
| `.env.local` | Plik z sekretami (API keys) który NIE trafia na GitHub | Jak `wp-config.php` — klucze trzymasz poza kodem |

### Zadania

- [ ] **Klient Anthropic API**
  - Plik(i): `src/lib/anthropic.ts`
  - Instrukcja: Napisz funkcję `sendMessage()` która wysyła tablicę wiadomości do Anthropic API i zwraca odpowiedź jako string. Obsłuż błędy (401, 429, timeout).
  - Scaffold hint:
    ```typescript
    // src/lib/anthropic.ts

    // TUTAJ: zaimportuj typy Message z types/index.ts

    const API_URL = 'https://api.anthropic.com/v1/messages'

    // TUTAJ: zdefiniuj interface dla request body (model, max_tokens, system, messages)

    export async function sendMessage(
      messages: Message[],
      systemPrompt: string
    ): Promise<string> {
      // TUTAJ: stwórz obiekt requestBody zgodny z Anthropic API
      // HINT: sprawdź prd-final.md sekcja "Specyfikacja Anthropic API"

      // TUTAJ: wywołaj fetch() z odpowiednimi headers
      // HINT: potrzebujesz x-api-key, anthropic-version, content-type

      // TUTAJ: obsłuż response — sprawdź czy ok, sparsuj JSON, zwróć tekst
      // TUTAJ: obsłuż błędy (try/catch) — rzuć czytelny Error message
    }
    ```
  - Czego uczy: async/await, fetch API, obsługa błędów, TypeScript w funkcjach async

- [ ] **Parser odpowiedzi LLM**
  - Plik(i): `src/lib/parseResponse.ts`
  - Instrukcja: Napisz funkcję która bierze surowy tekst z Claude i wyodrębnia `LearningEntry` (wiedza + słówko). Format odpowiedzi LLM — do ustalenia (JSON w code block vs XML tags — patrz ADR w prd-final.md)
  - Czego uczy: parsowanie tekstu, TypeScript return types, defensive programming

- [ ] **Hook `useAnthropicChat`**
  - Plik(i): `src/hooks/useAnthropicChat.ts`
  - Instrukcja: Custom hook zarządzający stanem chatu — historia wiadomości, loading, error, funkcja `sendUserMessage()`
  - Czego uczy: custom hooks, useState, zarządzanie stanem async operacji

- [ ] **Wyświetlanie wyników**
  - Plik(i): `src/components/SessionView/KnowledgeCard.tsx`, `VocabularyCard.tsx`
  - Instrukcja: Komponenty przyjmujące dane z `LearningEntry` przez props i wyświetlające je
  - Czego uczy: props passing, conditional rendering

### Definition of Done
- [ ] Kliknięcie przycisku "Start" w UI → Claude odpowiada → KnowledgeCard i VocabularyCard wyświetlają dane
- [ ] Błąd API (np. nieprawidłowy klucz) wyświetla czytelny komunikat w UI
- [ ] Developer potrafi wyjaśnić co robi `async/await` i dlaczego bez niego UI by się "zawiesiło"

### Checkpoint Questions
1. Co się stanie jeśli usuniesz `await` przed `fetch()`? Co zwróci funkcja?
2. Dlaczego API key trzymamy w `.env.local` a nie hardkodujemy w `anthropic.ts`?
3. Napisz mi custom hook `useCounter()` który przechowuje liczbę i ma funkcję `increment()`. (Ćwiczenie — nie związane z apką, sprawdza rozumienie hooks)
4. Co to jest "race condition" w kontekście async wywołań?

### Szacowany czas
2–3 tygodnie przy 4–7h/tydz.

---

## ETAP 3: Dialog sokratejski + Feedback
**Status:** `[ ]` Nie rozpoczęty (wymaga ukończenia Etapu 2)
**Cel:** Kompletny flow sesji — wiedza → słówko → 2–3 pytania → ocena → SessionState zawiera pełny LearningEntry.

### Must Know Primer

| Koncept | Jedno zdanie | Analogia WordPress |
|---------|-------------|-------------------|
| `useReducer` | Zarządzanie złożonym stanem przez akcje | Jak Redux w starym WP — dispatchwujesz akcję, reducer zmienia state |
| Context API | Globalny state dostępny bez przekazywania przez props | Jak globalna zmienna WP (`$GLOBALS`) — dostępna wszędzie, ale używaj ostrożnie |
| Controlled input | Input którego wartość jest kontrolowana przez React state | Jak pole formularza WP gdzie PHP decyduje co jest w środku |
| Multi-turn conversation | Historia wiadomości wysyłana z każdym requestem do LLM | Jak thread w helpdesku — każda odpowiedź ma kontekst poprzednich |

### Zadania

- [ ] **Context + Reducer** — `src/context/SessionContext.tsx` + `src/context/sessionReducer.ts`
- [ ] **Komponent SocraticDialog** — `src/components/SessionView/SocraticDialog/`
- [ ] **AnswerInput z controlled state** — `src/components/SessionView/SocraticDialog/AnswerInput.tsx`
- [ ] **FeedbackPanel** — `src/components/SessionView/FeedbackPanel/FeedbackPanel.tsx`

### Definition of Done
- [ ] Pełny flow: Start → wiedza → słówko → 2-3 pytania (z odpowiedziami) → feedback → `SessionState.status === 'complete'`
- [ ] `SessionState` po sesji zawiera wypełniony `LearningEntry` z odpowiedziami użytkownika

### Szacowany czas
2–3 tygodnie przy 4–7h/tydz.

---

## ETAP 4: Auto-zapis — Obsidian + Anki
**Status:** `[ ]` Nie rozpoczęty (wymaga ukończenia Etapu 3)
**Cel:** Po zakończeniu sesji → notatka `.md` w Obsidianie + plik TSV z fiszkami. Użytkownik widzi `SavingIndicator`.

### Must Know Primer

| Koncept | Jedno zdanie | Analogia WordPress |
|---------|-------------|-------------------|
| MCP (Model Context Protocol) | Protokół który pozwala LLM wywoływać narzędzia zewnętrzne | Jak REST API w WP — narzędzie wystawia endpointy, LLM je wywołuje |
| TSV format | Tab-separated values — plik tekstowy z danymi oddzielonymi tabulatorem | Jak CSV eksport z WP, tylko tabulatory zamiast przecinków |
| `Promise.all()` | Uruchamia kilka async operacji równolegle i czeka na wszystkie | Jak `wp_remote_get()` odpalone 2 razy jednocześnie — szybciej niż jedno po drugim |

### Zadania

- [ ] **Konfiguracja mcp-obsidian** — ustawienie MCP servera
- [ ] **`src/lib/obsidian.ts`** — funkcja `saveSessionToObsidian(entry: LearningEntry)`
- [ ] **`src/lib/anki.ts`** — funkcje `generateFlashCards()`, `flashCardsToTSV()`, `saveAnkiFile()`
- [ ] **`src/hooks/useAutoSave.ts`** — hook uruchamiający zapis po `session_complete`
- [ ] **`SavingIndicator`** — komponent animacji podczas zapisu

### Definition of Done
- [ ] Po zakończeniu sesji: plik `YYYY-MM-DD.md` pojawia się w Obsidianie
- [ ] Plik `anki/anki-YYYY-MM-DD.tsv` zapisuje się lokalnie z minimum 3 fiszkami
- [ ] Błąd MCP (Obsidian niedostępny) — UI wyświetla komunikat, sesja NIE ginie
- [ ] Developer potrafi wyjaśnić dlaczego używamy `Promise.all()` a nie dwóch `await` po sobie

### Szacowany czas
3–4 tygodnie przy 4–7h/tydz.

---

## ETAP 5: Polish + Electron
**Status:** `[ ]` Nie rozpoczęty (wymaga ukończenia Etapu 4)
**Cel:** Aplikacja pakuje się jako `.dmg` na macOS i działa jako natywny widget.

### Must Know Primer

| Koncept | Jedno zdanie |
|---------|-------------|
| Electron main process | Node.js process który zarządza oknem aplikacji — jak backend |
| Electron renderer process | Twoja React aplikacja działająca w oknie — jak frontend |
| IPC (Inter-Process Communication) | Komunikacja między main a renderer — renderer pyta, main odpowiada |
| `electron-builder` | Narzędzie pakujące Electron app do `.dmg` / `.exe` |

### Zadania

- [ ] Instalacja i konfiguracja Electron + `vite-plugin-electron`
- [ ] `electron/main.ts` — main process (okno bez ramki, always-on-top, pozycja z boku ekranu)
- [ ] `electron/preload.ts` — preload script (bezpieczne IPC)
- [ ] Migracja operacji filesystem z przeglądarki do main process przez IPC
- [ ] `UserProfile` persistence — zapis do pliku JSON przez main process
- [ ] Finalne UI polish — animacje, fonty, spacing
- [ ] Pakowanie: `electron-builder` → `.dmg`

### Definition of Done
- [ ] `npm run build` + Electron → gotowy `.dmg`
- [ ] Aplikacja otwiera się jako floating widget z boku ekranu macOS
- [ ] `UserProfile` persystuje między restartami
- [ ] Pełna sesja działa end-to-end bez błędów TypeScript

### Szacowany czas
3–4 tygodnie przy 4–7h/tydz.

---

## ANTI-PATTERNS — Uważaj na to (typowe dla przejścia WP → React)

| Anti-pattern | Objaw | Pytanie naprowadzające |
|---|---|---|
| Logika API w JSX | `fetch()` bezpośrednio w `return` komponentu | "Gdzie powinno żyć wywołanie API — w widoku czy w logice?" |
| Mutowanie state | `state.items.push(...)` zamiast `setState([...state.items, ...])` | "Co się stanie z poprzednim stanem jeśli go bezpośrednio zmodyfikujesz?" |
| `any` jako ucieczka z TS | `const data: any = response` | "Jaki konkretnie kształt ma `data`? Napisz interface." |
| Kopiowanie komponentów | Dwa pliki `Button.tsx` i `ButtonRed.tsx` | "Co by musiał przyjmować `Button` żeby obsłużyć oba przypadki?" |
| Brak loading/error state | `if (data)` bez `if (loading)` i `if (error)` | "Co widzi użytkownik podczas czekania na odpowiedź API?" |
| Jeden komponent robi wszystko | `App.tsx` ma 300 linii | "Jaką jedną odpowiedzialność ma ten komponent?" |
| Hardkodowane wartości | `model: 'claude-3-5-sonnet-20241022'` w 3 miejscach | "Gdzie trzymasz wartości które mogą się zmienić?" |
| Ignorowanie ESLint | `// eslint-disable-next-line` bez rozumienia dlaczego | "Co ESLint próbuje Ci powiedzieć tym ostrzeżeniem?" |

---

## SZACOWANY ŁĄCZNY CZAS

| Etap | Tygodnie (4–7h/tydz.) |
|------|----------------------|
| Etap 1: Fundament | 2–3 |
| Etap 2: LLM Integration | 2–3 |
| Etap 3: Dialog + Feedback | 2–3 |
| Etap 4: Obsidian + Anki | 3–4 |
| Etap 5: Electron + Polish | 3–4 |
| **Łącznie** | **~12–17 tygodni** |

*Zakłada naukę od zera. Etapy mogą się częściowo nakładać po opanowaniu podstaw.*
