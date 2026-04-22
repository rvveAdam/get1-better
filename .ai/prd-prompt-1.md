# Meta-Prompt: Generowanie PRD dla aplikacji "Get Better 1%"

## Twoja rola

Jesteś Senior Product Managerem z 10+ letnim doświadczeniem w produktach SaaS i narzędziach deweloperskich. Specjalizujesz się w metodologii User Story Mapping i tworzeniu PRD w stylu Classic PM. Twoje dokumenty są precyzyjne, kompletne i bezpośrednio użyteczne dla developera solo, który buduje produkt samodzielnie.

Twoim zadaniem jest wygenerowanie kompletnego **Product Requirements Document (PRD)** dla aplikacji opisanej poniżej — bez zadawania dodatkowych pytań. Wszystkie potrzebne informacje są osadzone w tym prompcie.

## Instrukcje dotyczące formatu

- Pisz w **Markdown** z czytelnymi nagłówkami poziomów H1–H3
- Używaj tabel do wymagań funkcjonalnych, niefunkcjonalnych i metryk
- Każda User Story musi mieć co najmniej 2 Acceptance Criteria w formacie Given/When/Then
- Priorytety wymagań oznaczaj jako: **MH** (Must Have), **SH** (Should Have), **CH** (Could Have)
- Roadmap nauki pisz jako kolejne Etapy z nazwą, zakresem wiedzy i powiązaniem z funkcją aplikacji
- Cały dokument pisz po polsku
- Długość: minimum 1200 słów, bez sztucznego wypełniania

---

## Kontekst aplikacji: "Get Better 1%"

### Idea produktu

"Get Better 1%" to codzienna mikro-aplikacja nauki dla developerów i osób pracujących umysłowo. Cel: 5–15 minut dziennie na poszerzenie wiedzy ogólnej i słownictwa, bez rozpraszaczy i gamifikacji. Filozofia: małe kroki, konsekwencja, głębokie zrozumienie zamiast pasywnego konsumowania.

### Stack techniczny

- **Frontend:** React + TypeScript + Vite
- **Docelowa platforma:** Electron (macOS desktop widget)
- **LLM:** Claude (Anthropic) — prowadzi sesję wg precyzyjnej specyfikacji
- **Integracje lokalne:** Obsidian (MCP server `mcp-obsidian`), Anki (generowanie plików TSV)

### Core loop aplikacji (jeden cykl sesji)

1. LLM prezentuje **1 nową wiedzę ogólną** z dziedzin: fizyka, technologia, logika, ekonomia, filozofia
2. LLM prezentuje **1 nowe słówko** — elokwencja lub terminologia techniczna
3. **Dialog sokratejski** — LLM zadaje 2–3 pytania sprawdzające zrozumienie
4. **Feedback użytkownika** — 4 opcje: za łatwa / ok / za trudna / nie mój temat
5. **Auto-zapis:**
   - Obsidian: notatka dnia w folderze `Jeden dzień - jedna nowa rzecz/`, aktualizacja indeksu
   - Anki: plik TSV z 3–6 fiszkami (typy: Basic + Cloze)

### Zachowanie LLM (specyfikacja zachowania modelu)

Zachowanie modelu jest precyzyjnie zdefiniowane w pliku `instructions/zachowanie-modelu-llm.md`. LLM prowadzi sesję jako ciepły, Sokratejski mentor — nie ocenia, zadaje pytania otwarte, dostosowuje poziom trudności do feedbacku, nigdy nie skraca sesji poniżej minimalnego standardu jakości.

### UI / UX

- Styl: **"Cozy Dark"** — ciepłe ciemne tło, spokojne kolory akcentów, minimalistyczny layout
- Forma: **pionowy widget/pasek** trzymany z boku ekranu macOS (Electron window bez ramki)
- Brak logowania, brak kont użytkownika, brak synchronizacji w chmurze
- Typografia czytelna, animacje subtelne (fade-in treści)

### Integracje — szczegóły

**Obsidian:**
- Komunikacja przez MCP server `mcp-obsidian`
- Zapis do folderu: `Jeden dzień - jedna nowa rzecz/`
- Notatka dnia zawiera: datę, tytuł wiedzy, tytuł słówka, podsumowanie dialogu sokratejskiego, feedback użytkownika
- Aktualizacja pliku indeksu po każdej sesji

**Anki:**
- Generowanie pliku `.tsv` gotowego do importu
- Min 3, max 6 fiszek per sesja
- Typy kart: Basic (pytanie–odpowiedź) i Cloze (uzupełnianie luki)
- Nazewnictwo pliku: `anki-YYYY-MM-DD.tsv`

### Out of Scope (świadoma rezygnacja)

Poniższe funkcje są celowo wykluczone z zakresu produktu:

- Gamifikacja (punkty XP, odznaki, streaki widoczne dla użytkownika)
- Integracje z zewnętrznymi narzędziami (GitHub, Notion, Google Calendar)
- Wersja mobilna ani PWA
- Autoryzacja, konta użytkownika, synchronizacja wielodevice
- System powiadomień push / reminderów systemowych (może być dodany później)

### MVP (pierwsze wydanie)

Pełny flow jednej sesji: **LLM chat → Obsidian auto-save → Anki flashcards**. Wszystko w jednym oknie Electron, bez konfiguracji po stronie użytkownika.

---

## Profil developera (ważny dla roadmapu nauki)

Developer budujący aplikację to osoba z następującym profilem — uwzględnij go w sekcji Roadmap Nauki:

- **Przeszłość:** Ex-WordPress developer (Elementor, ACF, własne motywy i wtyczki PHP)
- **Nawyk do zmiany:** Tendencja do copy-paste kodu z AI bez czytania i rozumienia — świadomie chce to zmienić
- **Aktualny poziom:** Podstawowa znajomość JavaScript, brak doświadczenia z TypeScript i React
- **Dostępny czas:** 4–7 godzin tygodniowo na naukę
- **Cel zawodowy:** Praca jako frontend developer + projekty portfolio na GitHub
- **Styl nauki:** Najlepiej uczy się przez scaffold z lukami do wypełnienia (nie przez czytanie teorii), preferuje pracę na max 1–3 plikach naraz, podejście sokratejskie (pytania zamiast gotowych odpowiedzi)

---

## Sekcje do wygenerowania

Wygeneruj PRD zawierający wszystkie poniższe sekcje. Nie pomijaj żadnej.

### 1. Wizja produktu i Problem Statement

- Jaki problem rozwiązuje aplikacja?
- Dla kogo jest przeznaczona?
- Jaka jest wizja produktu w jednym zdaniu (elevator pitch)?
- Jaką zmianę w życiu użytkownika ma wywołać?

### 2. Persony

Opisz co najmniej dwie persony:

**Persona 1: Developer-Learner (primary)**
— osoba budująca i używająca aplikacji jednocześnie, profil opisany powyżej

**Persona 2: Future User (secondary)**
— developer lub pracownik umysłowy, który chce codziennej, pasywnej formy nauki bez aplikacji subskrypcyjnych. Nie zna kodu — instaluje gotowy .dmg.

Dla każdej persony podaj: imię robocze, zawód, cele, frustracje, kontekst użycia, cytowany motyw (quote).

### 3. User Stories z Acceptance Criteria

Napisz User Stories dla następujących obszarów funkcjonalnych:

- Rozpoczęcie sesji nauki
- Prezentacja wiedzy ogólnej przez LLM
- Prezentacja nowego słówka przez LLM
- Dialog sokratejski (pytania sprawdzające)
- Udzielenie feedbacku przez użytkownika
- Automatyczny zapis notatki w Obsidianie
- Generowanie i eksport fiszek Anki
- Dostosowanie poziomu trudności przez LLM na podstawie feedbacku

Każda User Story w formacie:
`As a [persona], I want [action], so that [value].`
z minimum 2 Acceptance Criteria w formacie Given/When/Then.

### 4. Wymagania funkcjonalne z priorytetami

Tabela z kolumnami: ID | Wymaganie | Opis | Priorytet (MH/SH/CH) | Powiązana User Story

Uwzględnij wymagania z obszarów:
- Core flow sesji
- Integracja z LLM (Claude)
- Integracja z Obsidian (MCP)
- Integracja z Anki (TSV export)
- UI / UX (widget, dark mode, layout)
- Obsługa błędów (brak połączenia z LLM, błąd zapisu do Obsidian)

### 5. Wymagania niefunkcjonalne

Tabela z kolumnami: Kategoria | Wymaganie | Szczegóły

Uwzględnij:
- Stack techniczny (React, TypeScript, Vite, Electron)
- Wydajność (czas uruchomienia widgetu, latencja LLM)
- Bezpieczeństwo (lokalny storage, brak transmisji danych osobowych)
- UI/UX (dostępność, responsywność widgetu, ciemny motyw)
- Maintainability (struktura kodu, komentarze, brak zewnętrznych zależności runtime)

### 6. Roadmap nauki dla developera

Podziel naukę na **5–7 etapów**, gdzie każdy etap:
- Ma jasny tytuł i zakres tematyczny
- Jest powiązany z konkretną funkcją lub modułem aplikacji
- Zawiera listę umiejętności do opanowania (3–6 punktów)
- Zawiera szacowany czas realizacji (przy 4–7h/tydzień)
- Zawiera sugerowaną metodę nauki zgodną z profilem developera (scaffold, luki, Socratic)

Etapy powinny prowadzić od "zera React/TS" do "działające MVP z integracjami".

### 7. Definicja MVP

- Lista funkcji wchodzących w skład MVP (only what's truly minimum)
- Kryteria gotowości MVP (Definition of Done)
- Co jest celowo odłożone na post-MVP

### 8. Success Metrics

Tabela z kolumnami: Metryka | Cel | Metoda pomiaru | Horyzont czasowy

Uwzględnij metryki dla:
- Ukończenie pierwszej sesji przez użytkownika
- Retencja (użytkowanie przez 7/30 dni z rzędu)
- Jakość fiszek Anki (subiektywna ocena developera)
- Satysfakcja z dialogu sokratejskiego
- Czas uruchomienia aplikacji

### 9. Out of Scope

Sformalizuj listę funkcji wykluczonych z zakresu z uzasadnieniem (dlaczego każda jest wykluczona).

---

## Gotowość dokumentu

Wygenerowany PRD powinien być gotowy do użycia jako:
1. Dokument planowania dla developera solo
2. Podstawa do tworzenia tasków w GitHub Issues
3. Punkt odniesienia przy code review i decyzjach architektonicznych

Zacznij od tytułu dokumentu `# PRD: Get Better 1%` i daty generowania. Pisz konkretnie, unikaj ogólników. Każda sekcja powinna być samodzielnie użyteczna.
