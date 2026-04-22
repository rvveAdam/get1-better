# PRD Prompt Final — "Get Better 1%"
# Wersja: 1.0 | Wygenerowane: 2026-04-09
# Autor: Analiza 3 subagentów + synteza Senior PM

---

## ANALIZA SENIOR PM: Mocne i słabe strony każdego promptu

### prd-prompt-1.md — Classic PM / User Story driven

**Mocne strony:**
- Kompletny zestaw klasycznych sekcji PRD: wizja, persony, user stories z acceptance criteria (Given/When/Then), tabele wymagań funkcjonalnych z priorytetami MH/SH/CH, wymagania niefunkcjonalne, success metrics z horyzontami czasowymi
- Persona "Future User" — zdefiniowanie przyszłego użytkownika (nie-developera instalującego .dmg) to wartościowe ćwiczenie myślenia produktowego
- User Stories z acceptance criteria to świetna podstawa do tworzenia GitHub Issues
- Format output jest jasno określony (Markdown, tabele, Given/When/Then)
- PRD jako "source of truth" dla code review — dobra framing

**Słabe strony:**
- Brak szczegółów technicznych (TypeScript types, component tree, API spec)
- Sekcja Roadmap Nauki jest obecna, ale ogólna — brak scaffold methodology
- Nie uwzględnia stylu nauki developera (scaffold, Socratic, checkpoint questions)
- Nie opisuje anti-patterns charakterystycznych dla przejścia WordPress → React
- Success metrics są produktowe, ale brak metryk "czy developer faktycznie rozumie kod"

---

### prd-prompt-2.md — Technical Architecture / Spec First

**Mocne strony:**
- Najbardziej technicznie kompletny z 3 — zawiera: pełne drzewo komponentów z TypeScript interfaces, data flow diagram z ASCII, kompletne typy (Session, Message, LearningEntry, FlashCard, UserProfile + wszystkie union types), pełną specyfikację Anthropic API (endpoint, headers, request/response shape, error handling, AbortController), spec integracji MCP Obsidian z algorytmem zapisu i templatem notatki, spec generowania Anki (format TSV z nagłówkami, algorytm 3-6 fiszek per sesja, funkcje generateFlashCards/flashCardsToTSV/saveAnkiFile), kompletne drzewo plików projektu, 6 ADR (Architecture Decision Records), 5-fazowy roadmap techniczny z DoD
- ADR z sekcją "Dlaczego NIE X" dla każdej odrzuconej opcji — bezcenne przy decyzjach architektonicznych
- Definition of Done (funkcjonalne, techniczne, UX) — developer wie dokładnie co musi działać
- Precyzja: nazwy plików, sygnatury funkcji, kształty typów — developer może pracować bez zadawania pytań architektonicznych

**Słabe strony:**
- Przytłaczający dla developera z podstawowym JS, bez TS/React — może demotywować
- Minimalna warstwa produktowa (brak person, user stories, business context)
- Brak sekcji edukacyjnej (scaffold, primer, checkpoint questions)
- Nie uwzględnia krzywej uczenia przy estymacjach czasowych (zakłada wiedzę, której developer jeszcze nie ma)

---

### prd-prompt-3.md — Learning Journey / Scaffolded Roadmap

**Mocne strony:**
- Wyróżniający się design edukacyjny: "Must Know Primer" per etap z analogiami do WordPress (kluczowe dla tego developera), Checkpoint Questions (Socratic) per etap — sprawdzają rozumienie, nie pamięć, szczegółowy protokół sesji roboczej (check-in → primer → praca → review → brief)
- Anti-patterns Dictionary (8+) specyficznie dla przejścia WordPress → React, np. "mutowanie state bezpośrednio", "używanie `any` jako ucieczka z TS", "brak loading/error states"
- Scaffold Templates Gallery — 5 konkretnych podziurawionych plików z komentarzami `// TUTAJ:`, `// HINT:`, `// NIE ZMIENIAJ:`
- Success Metrics rozróżniają "skopiował i działa" od "naprawdę rozumie" — miękkie + twarde wskaźniki + red flags + remediation
- Absolutne zakazy wbudowane w prompt (np. "nie dawaj gotowych implementacji w scaffold sections") — zabezpieczenie przed degeneracją promptu
- Glosariusz 20+ terminów z analogiami WordPress

**Słabe strony:**
- Focused na edukację, słabszy jako specyfikacja produktowa
- Brak formalnych user stories i acceptance criteria
- Specyfikacja techniczna integracji (API, MCP, Anki) jest mniej precyzyjna niż prd-2
- Brak formalnych success metrics dla produktu (tylko learning metrics)
- Sekcja "Product Overview" jest skrócona — brak pełnej warstwy biznesowej

---

## KLUCZOWE SPOSTRZEŻENIA — Co tworzy idealny prompt PRD dla tego projektu

1. **Podwójna rola PRD:** Ten dokument musi jednocześnie spełniać funkcję spec produktowego (wymagania, user stories, priorytety) ORAZ mapy edukacyjnej (scaffold, primer, anti-patterns). Żaden z 3 promptów nie robi obu dobrze naraz.

2. **Developer profile jest fundamentalny:** Profil (ex-WP dev, copy-paste habit, 4-7h/tydz.) musi być osadzony w prompcie jako "kontrakt" — LLM generujący PRD musi go zapamiętać i stosować w każdej sekcji.

3. **TypeScript types są MVP dokumentacji:** Typy z prd-2 (SessionState, LearningEntry, FlashCard, UserProfile) powinny być w każdym PRD — to jedyne źródło prawdy dla architektury.

4. **Scaffold + checkpoint to nie opcja, to requirement:** Styl nauki developera wymaga, żeby każdy etap roadmapu miał: must-know primer, scaffold tasks, checkpoint questions. Bez tego PRD jest użyteczny jako dokument, ale nie jako mapa nauki.

5. **ADR to secret weapon:** Architecture Decision Records z prd-2 pozwalają developerowi zrozumieć DLACZEGO, nie tylko CO — to bezpośrednio walczy z copy-paste tendency.

6. **Anti-patterns są proaktywną obroną:** Lepiej zdefiniować 8 anty-wzorców zanim developer je popełni, niż naprawiać po fakcie.

---

## FINALNY META-PROMPT PRD

> **Instrukcja użycia:** Wklej poniższy prompt do Claude (lub innego LLM). LLM wygeneruje kompletny PRD dla aplikacji "Get Better 1%" — bez konieczności zadawania dodatkowych pytań. Oczekiwana długość output: 3000–5000 słów.

---

```
# ROLA

Jesteś Senior Product Managerem z 10+ letnim doświadczeniem w produktach developerskich i narzędziach do nauki. Jednocześnie pełnisz rolę Learning Experience Designera i Software Architect. Twoim zadaniem jest wygenerowanie kompletnego Product Requirements Document (PRD) dla aplikacji "Get Better 1%".

PRD pełni PODWÓJNĄ rolę:
1. Specyfikacja produktowa (wymagania, priorytety, architektura)
2. Mapa edukacyjna (roadmap nauki, scaffold, checkpoint questions)

Generuj bez zadawania pytań — wszystkie potrzebne informacje są poniżej.

---

# ABSOLUTNE ZAKAZY (obowiązują przez cały czas generowania)

- NIE dawaj gotowych implementacji w sekcjach scaffold — tylko szkielety z lukami
- NIE zakładaj wiedzy React/TS bez wcześniejszego "must know" primerà
- NIE łącz więcej niż 3 nowych konceptów w jednym zadaniu
- NIE pomijaj Definition of Done — każdy etap musi mieć mierzalne kryteria
- NIE pisz checkpoint questions "czy rozumiesz X?" — każde pytanie musi wymagać wyjaśnienia lub demonstracji
- NIE twórz etapów dłuższych niż 4 tygodnie (przy 4–7h/tydz.)
- NIE używaj żargonu bez wyjaśnienia przy pierwszym wystąpieniu
- NIE pisz ogólników — każda sekcja musi zawierać konkretne, implementowalne dane

---

# PROFIL DEVELOPERA (czytaj to jak kontrakt)

Developer budujący tę aplikację to były WordPress/Elementor/ACF developer. Nie ma nawyku pisania czystego kodu "z palca" — przez lata korzystał z wizualnych edytorów i gotowych pluginów. Tendencja: kopiuje kod z AI bez czytania i rozumienia — chce to zmienić. Zna podstawowy JavaScript, nie zna TypeScript ani React (widział powierzchownie, nigdy nie budował aplikacji od zera). Dysponuje 4–7 godzinami tygodniowo.

Cel zawodowy: praca jako frontend developer + projekty portfolio na GitHub.

Styl nauki który działa:
- Maksymalnie 1–3 pliki na jedną sesję roboczą
- Scaffold code z lukami (komentarze `// TUTAJ: [instrukcja]` zamiast gotowej implementacji)
- Mentor czeka na kod od developera zanim przejdzie dalej
- Przy frustracji: pytania sokratejskie, NIE gotowy kod
- Na początku każdego etapu: "must know" primer z konceptami React/TS + analogiami do WordPress

---

# KONTEKST APLIKACJI: "Get Better 1%"

## Idea
Codzienna mikro-aplikacja nauki (5–15 min/dzień). Filozofia: małe kroki, konsekwencja, głębokie zrozumienie zamiast pasywnej konsumpcji. Każda sesja = 1 nowa wiedza ogólna + 1 nowe słówko + dialog sokratejski.

## Stack techniczny
- Frontend: React 18 + TypeScript 5 + Vite 5
- Desktop runtime: Electron (docelowo macOS widget)
- LLM: Anthropic Claude API
- Integracje: mcp-obsidian (MCP server), Anki TSV export
- State: React Context + useReducer (bez Redux)
- Styling: Tailwind CSS (dark mode "Cozy", pionowy widget ~300–400px)

## Core loop jednej sesji
idle → session_start → LLM prezentuje wiedzę → LLM prezentuje słówko →
dialog sokratejski (2–3 pytania) → feedback użytkownika →
auto-zapis do Obsidian + generowanie fiszek Anki → session_complete → idle

## Tematy sesji (dla LLM)
Dozwolone: fizyka, technologia, informatyka (koncepty), logika, inżynieria, matematyka stosowana, ekonomia behawioralna
Wykluczone: biologia, literatura, historia sztuki, nauki humanistyczne

## Integracja LLM
- Model: claude-3-5-sonnet lub nowszy
- System prompt: załadowany z pliku instructions/zachowanie-modelu-llm.md
- Pamięć między sesjami: profil użytkownika (poziom trudności, poznane pojęcia, słowniczek)

## Integracja Obsidian
- MCP server: mcp-obsidian (narzędzia: create-note, edit-note, read-note)
- Folder: Jeden dzień - jedna nowa rzecz/
- Automatyczny zapis notatki dnia + aktualizacja indeks.md po każdej sesji

## Integracja Anki
- Format: TSV (Tab Separated Values)
- Typy: Basic (pytanie/odpowiedź/tag) + Cloze (zdanie z {{c1::luką}}/tag)
- Ilość: 3–6 fiszek per sesja
- Talia: "Jeden dzień - jedna nowa rzecz"

## UI / UX
- Styl: "Cozy Dark" — ciepłe ciemne tło, spokojne akcenty
- Forma: pionowy widget trzymany z boku ekranu macOS
- Brak logowania, kont, synchronizacji w chmurze

## MVP (pierwsze wydanie)
Pełny flow sesji: LLM chat → Obsidian auto-save → Anki flashcards

## Out of Scope (świadoma rezygnacja)
- Gamifikacja (XP, odznaki, streaki)
- Integracje zewnętrzne (GitHub, Notion, Calendar)
- Wersja mobilna / PWA
- Autoryzacja / konta użytkownika / multi-device sync

---

# SEKCJE DO WYGENEROWANIA

Wygeneruj PRD zawierający WSZYSTKIE poniższe sekcje w podanej kolejności.

---

## SEKCJA 1: Executive Summary

3–5 zdań: problem, rozwiązanie, dla kogo, stack, co wyróżnia.

---

## SEKCJA 2: Persony

### Persona 1: Developer-Learner (primary)
Osoba budująca aplikację i używająca jej jednocześnie. Profil opisany powyżej.
Format: imię robocze, zawód, cele, frustracje, kontekst użycia, cytat.

### Persona 2: Future User (secondary)
Developer lub pracownik umysłowy, który chce codziennej nauki bez subskrypcji. Nie zna kodu — instaluje gotowy .dmg.
Format: imię robocze, zawód, cele, frustracje, kontekst użycia, cytat.

---

## SEKCJA 3: User Stories z Acceptance Criteria

Dla każdego obszaru napisz User Story + minimum 2 AC w formacie Given/When/Then.
Format: `As a [persona], I want [action], so that [value].`

Obszary:
1. Rozpoczęcie sesji nauki
2. Prezentacja wiedzy przez LLM
3. Prezentacja słówka przez LLM
4. Dialog sokratejski (2–3 pytania)
5. Feedback użytkownika po sesji
6. Automatyczny zapis do Obsidian
7. Generowanie fiszek Anki
8. Dostosowanie poziomu trudności przez LLM na podstawie feedbacku

---

## SEKCJA 4: Wymagania funkcjonalne

Tabela: ID | Wymaganie | Opis | Priorytet (MH/SH/CH) | Powiązana User Story

Obszary: core flow sesji, integracja LLM, integracja Obsidian MCP, integracja Anki TSV, UI/UX widget, obsługa błędów (brak LLM, błąd MCP, parse error).

---

## SEKCJA 5: Wymagania niefunkcjonalne

Tabela: Kategoria | Wymaganie | Szczegóły

Kategorie: stack techniczny, wydajność (czas startu widgetu, latencja LLM), bezpieczeństwo (lokalny storage, brak transmisji PII), UI/UX (dark mode, widget layout), maintainability (TypeScript strict, zero `any`, czytelne moduły).

---

## SEKCJA 6: Kluczowe TypeScript Types

Zdefiniuj kompletne typy dla domeny aplikacji. Podaj kod TypeScript.

Wymagane:
- SessionStatus (union type stanów)
- Message (rola, treść, timestamp)
- LearningEntry (wiedza + słówko + pytania sokratejskie + feedback)
- SocraticQuestion (pytanie + odpowiedź + ewaluacja LLM)
- UserFeedback (ocena, trudność postrzegana)
- FlashCard (typ Basic/Cloze, front, back, tags)
- UserProfile (preferencje, historia, poziom)
- SessionState (pełny stan aplikacji)
- SessionAction (union type akcji reducera)

---

## SEKCJA 7: Architecture Decision Records

Dla każdej decyzji: kontekst → opcje rozważane → wybrana opcja → uzasadnienie → "Dlaczego NIE X" → kompromisy.

Wymagane ADR:
1. State management: Context + useReducer vs Redux Toolkit vs Zustand
2. Bundler: Vite vs Create React App
3. Komunikacja z MCP: jak mcp-obsidian jest wywoływany (stdio/HTTP/SDK?)
4. Format Anki: TSV vs AnkiConnect API
5. Parsowanie odpowiedzi LLM: JSON w markdown vs XML tags vs structured outputs
6. Electron: kiedy dodać i jak podzielić main/renderer process

---

## SEKCJA 8: Struktura plików projektu

Kompletne drzewo katalogów z 1–2 zdaniami opisu dla każdego pliku src/.
Oznacz które pliki są kluczowe dla MVP.

---

## SEKCJA 9: React + TypeScript "Must Know" Primer (globalny)

Lista fundamentalnych konceptów PRZED napisaniem jakiegokolwiek kodu. Dla każdego:
- Nazwa konceptu
- Wyjaśnienie jednym zdaniem (bez żargonu)
- Analogia do WordPress (jeśli możliwa)
- Gdzie pojawi się w roadmapie po raz pierwszy

Minimum: komponenty, JSX, props, state (useState), useEffect, useReducer, TypeScript interface/type, generyki, async/await, event handling, lifting state up, Electron.

---

## SEKCJA 10: Staged Learning Roadmap (minimum 5 etapów)

To serce dokumentu. Każdy etap kończy się działającym fragmentem aplikacji ORAZ nową wiedzą developera.

Format każdego etapu:
```
## Etap N: [Nazwa]

### Cel etapu
[Co zostanie zbudowane — co developer zobaczy/uruchomi po skończeniu]

### Prerequisites
[Konkretne koncepty React/TS wymagane przed wejściem w etap]

### Must Know Primer
[2–4 koncepty specyficzne dla tego etapu z jednozdaniowym wyjaśnieniem + analogia WP]

### Zadania (Scaffold approach)
- [ ] Zadanie: [nazwa]
  - Plik(i): [max 1–3 pliki]
  - Instrukcja: [co zrobić — opisowo, NIE gotowy kod]
  - Scaffold hint: [szkielet z // TUTAJ: i // HINT: zamiast implementacji]
  - Czego uczy: [1 zdanie]

### Skills Gained
[Konkretne umiejętności React/TS po zakończeniu etapu]

### Definition of Done
[Mierzalne kryteria — co DZIAŁA, nie "rozumie X"]

### Checkpoint Questions (Socratic — zadaj przed przejściem dalej)
[5–7 pytań wymagających wyjaśnienia lub demonstracji, nie odpowiedzi "tak/nie"]
[Przykład dobrego pytania: "Co by się stało gdybyś usunął useState i użył zwykłej zmiennej?"]

### Estimated Sessions
[Przy 4–7h/tydz. — ile sesji / ile tygodni realnie]
```

---

## SEKCJA 11: Anti-Patterns Dictionary

Minimum 8 anty-wzorców dla developera przychodzącego z WordPress / AI copy-paste.

Format każdego:
```
### Anti-pattern: [Nazwa]
Objaw: [jak wygląda w kodzie]
Dlaczego problem: [co technicznie powoduje]
WordPress analogia: [skąd ten nawyk pochodzi]
Poprawne podejście: [ogólny kierunek, NIE gotowy kod]
Pytanie naprowadzające: [1 pytanie sokratejskie]
```

Uwzględnij: logika API w JSX, mutowanie state bezpośrednio, `any` jako ucieczka z TS, kopiowanie komponentów zamiast reużywania, brak loading/error states, mieszanie odpowiedzialności, hardkodowanie wartości, ignorowanie ESLint.

---

## SEKCJA 12: Scaffold Templates Gallery

5 przykładowych podziurawionych plików. Każdy to realny plik projektu z:
- `// TUTAJ: [instrukcja co wstawić]`
- `// HINT: [podpowiedź bez rozwiązania]`
- `// NIE ZMIENIAJ: [wyjaśnienie]`
- Gotowy import i interface (skeleton) — brak implementacji

Pliki:
1. src/components/SessionWidget/SessionWidget.tsx
2. src/hooks/useAnthropicChat.ts
3. src/context/sessionReducer.ts
4. src/components/FeedbackPanel/FeedbackPanel.tsx
5. src/lib/anki.ts — funkcja exportToAnki

---

## SEKCJA 13: Success Metrics

Dwie warstwy metryk:

### Metryki produktowe
Tabela: Metryka | Cel | Metoda pomiaru | Horyzont

Uwzględnij: ukończenie pierwszej sesji, retencja 7/30 dni, jakość fiszek Anki, czas uruchomienia widgetu.

### Metryki edukacyjne (per etap)
Format:
```
### Etap N — Learning Quality
Miękkie wskaźniki: [obserwowalne zachowania]
Twarde wskaźniki: [sprawdzalne zadania samodzielne]
Red flags: [sygnały copy-paste bez rozumienia]
Remediation: [co zrobić gdy developer nie spełnia metryk]
```

---

## SEKCJA 14: Protokół sesji roboczej

Standardowy protokół sesji (1,5–2h) dla developera i mentora (LLM):
1. Check-in (5 min): poprzednia sesja + 1–2 pytania checkpoint
2. Primer (10 min): 1–2 nowe koncepty + pytania
3. Praca (60–90 min): scaffold + Socratic feedback + kod developer → mentor komentuje
4. Review (10 min): developer wyjaśnia własnymi słowami
5. Next session brief (5 min): co dalej + 1 pytanie do zbadania

---

## SEKCJA 15: Out of Scope z uzasadnieniem

Lista funkcji wykluczonych z zakresu z uzasadnieniem (dlaczego każda jest wykluczona, co ułatwia rezygnacja, kiedy można dodać post-MVP).

---

## SEKCJA 16: Definition of Done — projekt jako całość

Kryteria ukończenia całego projektu:
- Funkcjonalne (flow sesji end-to-end, integracje, profile)
- Techniczne (zero TS errors, zero `any`, error handling, czytelny kod)
- UX (czas odpowiedzi, SavingIndicator, obsługa błędów)
- Edukacyjne (developer potrafi wyjaśnić każdy moduł bez zaglądania w notatki)

---

# INSTRUKCJE FORMATOWANIA OUTPUT

- Cały dokument w Markdown
- H1 dla tytułu, H2 dla sekcji, H3 dla podsekcji
- Kod TypeScript w blokach ```typescript lub ```tsx
- Scaffold hints używają: // TUTAJ:, // HINT:, // NIE ZMIENIAJ:
- Checkpoint questions numerowane, zaczynają się od pytajnika
- Tabele dla wymagań, metryk, glosariusza
- Każda sekcja samodzielnie użyteczna
- Język: polski; nazwy techniczne (hook, state, props, component, reducer) po angielsku
- Długość: minimum 3000 słów

---

Zacznij od potwierdzenia że rozumiesz profil developera, następnie przejdź bezpośrednio do generowania PRD sekcja po sekcji.
```

---

*Analiza i synteza: Claude Sonnet 4.6 | 2026-04-09*
*Na podstawie: prd-prompt-1.md (Classic PM), prd-prompt-2.md (Technical Arch), prd-prompt-3.md (Learning Journey)*
