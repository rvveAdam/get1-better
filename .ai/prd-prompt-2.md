# Meta-prompt: Generuj PRD dla aplikacji "Get Better 1%"

## Instrukcja dla LLM

Jesteś Senior Software Architect specjalizującym się w React, TypeScript i integracji z LLM API. Twoim zadaniem jest wygenerowanie kompletnego, technicznie precyzyjnego Product Requirements Document (PRD) dla aplikacji "Get Better 1%". PRD musi być napisane w stylu **Technical Architecture / Spec First** — priorytet mają drzewo komponentów, przepływ danych, kontrakty typów, specyfikacje API i decyzje architektoniczne.

Nie pisz ogólników. Każda sekcja musi zawierać konkretne, implementowalne dane: nazwy plików, sygnatury funkcji, kształt typów TypeScript, dokładne endpointy, nazwy narzędzi MCP, przykładowe payloady.

---

## Kontekst aplikacji

### Cel produktu
"Get Better 1%" to desktopowy widget (Electron, macOS) wspierający codzienną mikro-sesję nauki trwającą 5–15 minut. Każda sesja dostarcza 1 nową wiedzę i 1 nowe słówko poprzez dialog sokratejski prowadzony przez Claude (Anthropic). Wyniki sesji są automatycznie zapisywane do Obsidian (przez MCP) i generowane jako fiszki Anki (TSV).

### Stack techniczny
- **Frontend:** React 18 + TypeScript 5 + Vite 5
- **Desktop runtime:** Electron (cel długoterminowy, macOS)
- **LLM:** Anthropic Claude API (claude-3-5-sonnet lub nowszy)
- **Integracje:** `mcp-obsidian` (MCP server), Anki TSV export
- **State:** React Context + useReducer (bez Redux, bez zewnętrznego store)
- **Styling:** CSS Modules lub Tailwind (dark mode "Cozy", pionowy widget ~400px szerokości)

### Core loop sesji
```
idle → session_start → llm_presents_knowledge → llm_presents_word →
socratic_dialog (2-3 pytania) → user_feedback → auto_save →
  ├── Obsidian: create/edit note + update index
  └── Anki: generate TSV + update master file
→ session_complete → idle
```

### Tematy nauki (dla systemu zarządzania profilem)
Dozwolone: fizyka, technologia, informatyka (koncepty algorytmiczne, architektura), logika, inżynieria, matematyka stosowana, ekonomia behawioralna.
Wykluczone: biologia, literatura, historia sztuki, nauki humanistyczne.

---

## Wymagane sekcje PRD

### 1. Drzewo komponentów React

Wygeneruj pełną hierarchię komponentów. Dla każdego komponentu podaj:
- Nazwę pliku (np. `src/components/SessionView/SessionView.tsx`)
- Props interface (TypeScript)
- Odpowiedzialność (1–2 zdania)
- Czy jest smart (ma dostęp do contextu/hooka) czy dumb (pure prezentacyjny)

Wymagane komponenty minimalne:
```
App
├── AppProvider (Context + Reducer)
├── Widget (kontener layoutu)
│   ├── Header (status sesji, data)
│   ├── SessionView (główny widok aktywnej sesji)
│   │   ├── KnowledgeCard (prezentacja nowej wiedzy)
│   │   ├── VocabularyCard (prezentacja nowego słówka)
│   │   ├── SocraticDialog (lista pytań i odpowiedzi)
│   │   │   ├── QuestionBubble
│   │   │   └── AnswerInput
│   │   └── FeedbackPanel (ocena sesji przez użytkownika)
│   ├── IdleView (ekran startowy gdy brak aktywnej sesji)
│   └── SavingIndicator (animacja podczas auto-zapisu)
└── ErrorBoundary
```

### 2. Data Flow Diagram

Opisz słownie (lub w ASCII) pełny przepływ danych dla jednej sesji:

```
[User klika "Start sesji"]
  → dispatch(START_SESSION)
  → useSession hook wywołuje sendMessage() z systemprompt
  → fetch() do Anthropic API /v1/messages
  → response.content[0].text parsowany przez parseSessionResponse()
  → wyekstrahowany obiekt LearningEntry trafia do SessionState
  → React re-render: KnowledgeCard + VocabularyCard otrzymują props
  → User odpowiada na pytania sokratejskie
  → każda odpowiedź: dispatch(ADD_USER_ANSWER) + sendMessage()
  → po ostatnim pytaniu: dispatch(SESSION_COMPLETE)
  → triggerAutoSave() wywołuje równolegle:
      ├── saveToObsidian(entry) → MCP tool calls
      └── generateAnkiFile(entry) → zapis TSV do filesystem
  → dispatch(SAVE_SUCCESS) lub dispatch(SAVE_ERROR)
```

Opisz dokładnie każdy krok: które dane są przekazywane, jakie transformacje zachodzą, gdzie mogą wystąpić błędy.

### 3. TypeScript Interfaces i Types

Zdefiniuj kompletne typy dla całej domeny aplikacji. Minimum:

```typescript
// Typy stanu sesji
type SessionStatus = 'idle' | 'starting' | 'presenting' | 'dialog' | 'feedback' | 'saving' | 'complete' | 'error'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface LearningEntry {
  date: string // ISO 8601 YYYY-MM-DD
  knowledge: {
    title: string
    explanation: string
    example: string
    domain: string // 'physics' | 'cs' | 'math' | 'logic' | 'engineering' | 'economics'
  }
  vocabulary: {
    term: string
    definition: string
    exampleSentence: string
    language: 'en' | 'pl'
  }
  socraticQuestions: SocraticQuestion[]
  userFeedback: UserFeedback | null
}

interface SocraticQuestion {
  id: string
  question: string
  userAnswer: string | null
  llmEvaluation: string | null
}

interface UserFeedback {
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  difficultyPerceived: 'too_easy' | 'just_right' | 'too_hard'
}

interface FlashCard {
  type: 'basic' | 'cloze'
  front: string       // dla Basic: pytanie; dla Cloze: zdanie z {{c1::luką}}
  back: string        // dla Basic: odpowiedź; dla Cloze: puste lub hint
  tags: string[]      // np. ['get1better', 'physics', '2024-01-15']
  deckName: string    // 'Jeden dzień - jedna nowa rzecz'
}

interface UserProfile {
  id: string
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  topicPreferences: string[]
  topicsToAvoid: string[]
  knownConcepts: string[]         // lista poznanych pojęć
  vocabulary: VocabularyEntry[]   // historia słownictwa
  sessionCount: number
  createdAt: Date
  updatedAt: Date
}

interface VocabularyEntry {
  term: string
  definition: string
  dateAdded: string
  sessionId: string
}

interface SessionState {
  status: SessionStatus
  currentSession: LearningEntry | null
  messages: Message[]
  userProfile: UserProfile
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  error: string | null
}

type SessionAction =
  | { type: 'START_SESSION' }
  | { type: 'SET_LEARNING_ENTRY'; payload: LearningEntry }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'ADD_USER_ANSWER'; payload: { questionId: string; answer: string } }
  | { type: 'SET_STATUS'; payload: SessionStatus }
  | { type: 'SAVE_START' }
  | { type: 'SAVE_SUCCESS' }
  | { type: 'SAVE_ERROR'; payload: string }
  | { type: 'SESSION_COMPLETE' }
  | { type: 'RESET' }
```

### 4. Specyfikacja Anthropic API

Podaj pełną specyfikację wywołań API:

**Endpoint:** `POST https://api.anthropic.com/v1/messages`

**Headers:**
```
x-api-key: process.env.VITE_ANTHROPIC_API_KEY
anthropic-version: 2023-06-01
content-type: application/json
```

**Request payload shape:**
```typescript
interface AnthropicRequest {
  model: 'claude-3-5-sonnet-20241022'  // lub nowszy
  max_tokens: 2048
  system: string  // załadowany z instructions/zachowanie-modelu-llm.md
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
}
```

**Response handling:**
- Sukces: `response.content[0].type === 'text'` → `response.content[0].text`
- Błędy: obsługa kodów 401 (invalid key), 429 (rate limit), 500 (server error)
- Timeout: 30 sekund z AbortController
- Streaming: opcjonalne (opisz kiedy i jak używać `stream: true`)

**Funkcja klienta:**
```typescript
// src/lib/anthropic.ts
async function sendMessage(
  messages: Message[],
  systemPrompt: string,
  options?: { stream?: boolean; maxTokens?: number }
): Promise<string>
```

**Parsowanie odpowiedzi LLM:**
Opisz jak parseSessionResponse() wyodrębnia z tekstu LLM ustrukturyzowany obiekt LearningEntry. Czy LLM zwraca JSON w markdown code block? Czy używa XML tagów? Zdefiniuj dokładny format odpowiedzi LLM i algorytm parsowania (regex? JSON.parse? XML parser?).

**System prompt:**
Opisz jak system prompt jest ładowany z pliku `instructions/zachowanie-modelu-llm.md` przy starcie aplikacji. Czy jest wczytywany raz i cachowany? Czy zawiera dynamiczne zmienne (profil użytkownika, lista poznanych pojęć)?

### 5. Specyfikacja integracji Obsidian (MCP)

**MCP Server:** `mcp-obsidian`
**Dostępne narzędzia:** `create-note`, `edit-note`, `read-note`, `list-notes`

**Funkcja zapisu sesji:**
```typescript
// src/lib/obsidian.ts
async function saveSessionToObsidian(entry: LearningEntry): Promise<void>
```

**Algorytm zapisu:**
1. Sprawdź czy plik `YYYY-MM-DD.md` już istnieje (read-note)
2. Jeśli nie: utwórz nowy plik (create-note) z templatem
3. Jeśli tak: zaktualizuj istniejący (edit-note)
4. Zaktualizuj plik `indeks.md` — dodaj wiersz do tabel Markdown

**Dokładny template notatki dziennej:**
```markdown
---
date: {{date}}
tags: [get1better, {{domain}}, {{language}}]
session_id: {{sessionId}}
---

## Nowa wiedza: {{knowledge.title}}

{{knowledge.explanation}}

**Przykład:** {{knowledge.example}}

## Nowe słówko: {{vocabulary.term}}

**Definicja:** {{vocabulary.definition}}

**Przykład użycia:** {{vocabulary.exampleSentence}}

## Dialog sokratejski

{{#each socraticQuestions}}
**P:** {{question}}
**O:** {{userAnswer}}
{{/each}}

## Podsumowanie sesji

Ocena: {{userFeedback.rating}}/5
Trudność: {{userFeedback.difficultyPerceived}}
```

**Template aktualizacji indeks.md:**
Opisz strukturę tabel Markdown w `indeks.md` (nagłówki kolumn, format wierszy). Opisz jak funkcja dodaje nowy wiersz bez nadpisywania istniejących danych (append do tabeli).

**Obsługa błędów MCP:**
- Co zrobić gdy MCP server jest niedostępny?
- Czy zapisać lokalnie jako fallback?
- Jak informować użytkownika o błędzie zapisu?

### 6. Specyfikacja generowania Anki

**Format pliku:** TSV (Tab Separated Values)
**Kodowanie:** UTF-8
**Nazwa pliku:** `anki/anki-YYYY-MM-DD.tsv`
**Plik zbiorczy:** `anki/anki-wszystkie.tsv`

**Format wiersza TSV:**
```
// Basic card:
{front}\t{back}\t{tags}

// Cloze card:
{text_with_cloze}\t{extra_info}\t{tags}

// Przykład:
Co to jest rekurencja?\tFunkcja wywołująca samą siebie\tget1better cs 2024-01-15
Algorytm {{c1::rekurencyjny}} wywołuje sam siebie\t\tget1better cs 2024-01-15
```

**Nagłówek pliku TSV (wymagany przez Anki):**
```
#separator:tab
#html:false
#deck:Jeden dzień - jedna nowa rzecz
#notetype:Basic
```

**Algorytm generowania fiszek (3–6 fiszek per sesja):**
- Minimum 2 fiszki Basic z wiedzy (pytanie o definicję, pytanie o przykład)
- Minimum 1 fiszka Cloze z wiedzy (zdanie z luką na kluczowe pojęcie)
- Minimum 1 fiszka Basic ze słówka (front: term, back: definition)
- Minimum 1 fiszka Cloze ze słówka (example sentence z luką)
- Opcjonalnie: 1 fiszka z dialogu sokratejskiego (najlepsze pytanie → odpowiedź)

**Funkcja generowania:**
```typescript
// src/lib/anki.ts
function generateFlashCards(entry: LearningEntry): FlashCard[]
function flashCardsToTSV(cards: FlashCard[]): string
async function saveAnkiFile(date: string, tsv: string): Promise<void>
async function appendToMasterFile(tsv: string): Promise<void>
```

**Obsługa tagów:**
- Stałe: `get1better`
- Dynamiczne: domena wiedzy (np. `cs`, `physics`), data (`2024-01-15`)
- Format tagu w TSV: tagi oddzielone spacją w jednej kolumnie

### 7. Struktura plików projektu

Wygeneruj kompletne drzewo katalogów z opisem każdego pliku/folderu:

```
get1better/
├── .ai/                          # Pliki konfiguracyjne projektu (PRD, prompty)
│   ├── prd.md
│   └── prd-prompt-2.md
├── instructions/
│   └── zachowanie-modelu-llm.md  # System prompt dla Claude
├── src/
│   ├── main.tsx                  # Entry point React
│   ├── App.tsx                   # Root komponent, AppProvider
│   ├── vite-env.d.ts
│   ├── components/               # Komponenty UI
│   │   ├── Widget/
│   │   ├── Header/
│   │   ├── SessionView/
│   │   │   ├── KnowledgeCard/
│   │   │   ├── VocabularyCard/
│   │   │   ├── SocraticDialog/
│   │   │   └── FeedbackPanel/
│   │   ├── IdleView/
│   │   └── SavingIndicator/
│   ├── context/
│   │   ├── SessionContext.tsx    # Context definition + Provider
│   │   └── sessionReducer.ts     # Reducer + initial state
│   ├── hooks/
│   │   ├── useSession.ts         # Hook do zarządzania sesją
│   │   ├── useAnthropicChat.ts   # Hook do komunikacji z API
│   │   └── useAutoSave.ts        # Hook do auto-zapisu po sesji
│   ├── lib/
│   │   ├── anthropic.ts          # Klient Anthropic API
│   │   ├── obsidian.ts           # Integracja MCP Obsidian
│   │   ├── anki.ts               # Generator fiszek Anki
│   │   └── parseResponse.ts      # Parser odpowiedzi LLM → LearningEntry
│   ├── types/
│   │   └── index.ts              # Wszystkie TypeScript interfaces i types
│   ├── utils/
│   │   ├── dateUtils.ts          # Formatowanie dat
│   │   └── templateUtils.ts      # Wypełnianie templatem Obsidian
│   └── styles/
│       ├── globals.css
│       └── theme.css             # Dark mode "Cozy" CSS variables
├── anki/                         # Eksportowane pliki TSV (gitignored)
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.local                    # VITE_ANTHROPIC_API_KEY (gitignored)
```

Dla każdego pliku `src/` podaj 1–2 zdania opisu. Zaznacz które pliki są kluczowe dla MVP.

### 8. Decyzje architektoniczne (Architecture Decision Records)

Dla każdej decyzji podaj: kontekst, opcje rozważane, wybrana opcja, uzasadnienie, kompromisy.

Wymagane ADR:

1. **State management: Context + useReducer vs Redux Toolkit vs Zustand**
   Dlaczego nie Redux (overhead dla małej aplikacji, krzywa uczenia), dlaczego nie Zustand (dodatkowa zależność), dlaczego Context (wystarczający dla single-view, developer uczy się Reacta).

2. **Bundler: Vite vs Create React App vs Parcel**
   Dlaczego Vite (szybkość HMR, natywne ESM, kompatybilność z Electron).

3. **Komunikacja z MCP: bezpośrednie wywołania vs wrapper library**
   Opisz jak `mcp-obsidian` jest wywoływany z aplikacji. Czy przez stdio? Przez HTTP? Czy jest SDK JS?

4. **Format zapisu Anki: TSV vs JSON vs AnkiConnect API**
   Dlaczego TSV (prostota, brak zależności od działającego Anki, łatwy import ręczny).

5. **Parsowanie odpowiedzi LLM: JSON w markdown vs structured outputs vs XML tags**
   Porównaj niezawodność każdego podejścia. Rekomenduj jedno z uzasadnieniem.

6. **Electron: kiedy dodać i jak zorganizować main/renderer process**
   Opisz minimalną zmianę struktury projektu potrzebną do dodania Electrona.

### 9. Roadmap techniczny — fazy implementacji

Podziel implementację na 5 faz. Dla każdej fazy podaj:
- Cel fazy (1 zdanie)
- Lista zadań (konkretne pliki do stworzenia, funkcje do zaimplementowania)
- Techniczne zależności (co musi istnieć przed tą fazą)
- Szacowany czas (w godzinach, uwzględniając profil developera: podstawowy JS, brak TS/React, 4–7h/tydzień)
- Definition of Done (konkretne, weryfikowalne kryteria)

**Faza 1: Fundament projektu (tydzień 1–2)**
Cel: działający projekt React+TS+Vite z podstawową strukturą plików i typami.
Zadania: inicjalizacja projektu, konfiguracja TypeScript strict mode, stworzenie wszystkich typów w `src/types/index.ts`, skeleton komponentów, Context + Reducer z initial state, dark theme CSS variables.
DoD: `npm run dev` działa, brak błędów TypeScript, wszystkie typy zdefiniowane, widget wyświetla się z placeholderami.

**Faza 2: Integracja Anthropic API (tydzień 3–4)**
Cel: działający chat z Claude, parsowanie odpowiedzi do LearningEntry.
Zadania: `src/lib/anthropic.ts`, `src/lib/parseResponse.ts`, `src/hooks/useAnthropicChat.ts`, ładowanie system promptu, obsługa błędów API, wyświetlanie KnowledgeCard + VocabularyCard z danymi z API.
DoD: po kliknięciu "Start sesji" Claude zwraca wiedzę i słówko, dane poprawnie parsują się do LearningEntry, wyświetlają się w UI.

**Faza 3: Dialog sokratejski + feedback (tydzień 5–6)**
Cel: kompletny flow sesji od wiedzy przez dialog do feedbacku.
Zadania: `SocraticDialog` komponent, `AnswerInput`, logika multi-turn conversation (historia wiadomości), `FeedbackPanel`, finalizacja SessionState po sesji.
DoD: użytkownik może odpowiedzieć na 2–3 pytania Claude, ocenić sesję, SessionState zawiera kompletny LearningEntry z answers i feedback.

**Faza 4: Auto-zapis (Obsidian + Anki) (tydzień 7–9)**
Cel: automatyczny zapis po zakończeniu sesji do Obsidian i generowanie TSV Anki.
Zadania: konfiguracja `mcp-obsidian`, `src/lib/obsidian.ts`, `src/lib/anki.ts`, `src/hooks/useAutoSave.ts`, `SavingIndicator`, obsługa błędów zapisu, aktualizacja `indeks.md`.
DoD: po zakończeniu sesji plik `YYYY-MM-DD.md` pojawia się w Obsidian, plik TSV z fiszkami zapisuje się w `anki/`.

**Faza 5: Polish + Electron (tydzień 10–14)**
Cel: produkcyjny desktop widget działający jako aplikacja Electron.
Zadania: konfiguracja Electron + `electron-vite` lub `vite-plugin-electron`, main process (`electron/main.ts`), preload script, IPC dla operacji filesystem, packaging, UserProfile persistence (localStorage lub JSON file), finalne UI polish.
DoD: aplikacja pakuje się jako `.dmg` na macOS, działa offline (poza wywołaniami API), profil użytkownika persystuje między sesjami.

### 10. Definition of Done — projekt jako całość

Zdefiniuj kryteria ukończenia całego projektu:

**Funkcjonalne:**
- Sesja nauki 5–15 min działa end-to-end bez błędów
- Claude prezentuje wiedzę i słówko zgodne z profilem użytkownika
- Dialog sokratejski zawiera 2–3 pytania
- Auto-zapis do Obsidian działa niezawodnie (fallback na błąd MCP)
- Fiszki Anki generują się w formacie importowalnym bezpośrednio do Anki
- UserProfile aktualizuje się po każdej sesji (nowe pojęcia, słownictwo)

**Techniczne:**
- Zero błędów TypeScript (`tsc --noEmit` przechodzi)
- Brak any types (strict mode)
- Obsługa wszystkich stanów błędu (API timeout, MCP niedostępny, parse error)
- Czytelny kod — senior developer może zrozumieć każdy moduł bez dokumentacji

**UX:**
- Czas odpowiedzi Claude < 5s (lub streaming z live typing effect)
- SavingIndicator wyświetla się podczas zapisu
- Błędy wyświetlają się użytkownikowi z czytelnym komunikatem
- Aplikacja działa stabilnie jako Electron widget (brak memory leaks)

---

## Dodatkowe instrukcje dla LLM generującego PRD

1. Każda sekcja musi zawierać konkretny kod TypeScript lub pseudokod — unikaj abstrakcyjnych opisów.
2. Przy opisie integracji MCP zdefiniuj dokładne wywołania narzędzi z przykładowymi parametrami.
3. Przy opisie parsowania odpowiedzi LLM podaj przykładowy raw output z API i pokazuj krok po kroku jak jest parsowany.
4. Sekcja "Decyzje architektoniczne" musi zawierać zdanie "Dlaczego NIE X" dla każdej odrzuconej opcji.
5. Roadmap musi być realistyczny dla developera uczącego się TS/React — uwzględnij czas na naukę składni, nie tylko implementację.
6. Jeśli coś jest Out of Scope (backend, baza danych, auth, gamifikacja, PWA, mobile) — napisz to jawnie z krótkim uzasadnieniem.
7. PRD ma służyć jako jedyne źródło prawdy dla implementacji — developer nie powinien musieć zadawać pytań architektonicznych w trakcie kodowania.

Wygeneruj PRD zgodnie z powyższymi sekcjami. Zacznij od krótkiego Executive Summary (3–5 zdań), następnie przejdź przez wszystkie 10 sekcji w podanej kolejności.
