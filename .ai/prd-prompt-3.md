# META-PROMPT: PRD + Learning Journey Roadmap Generator
# Styl: Scaffolded Learning / Learning Experience Design
# Aplikacja: "Get Better 1%" — desktop widget edukacyjny

---

## INSTRUKCJE DLA LLM (ty, który czytasz ten plik)

Twoim zadaniem jest wygenerowanie kompletnego PRD (Product Requirements Document) dla aplikacji "Get Better 1%", napisanego z perspektywy **Senior Product Managera i Learning Experience Designera**. PRD ma pełnić podwójną rolę: spec produktowy ORAZ mapa edukacyjna dla developera.

Zanim zaczniesz generować, zapamiętaj absolutnie kluczowy kontekst:

### KIM JEST DEVELOPER (czytaj to jak kontrakt z użytkownikiem)

Developer to były WordPress/Elementor/ACF developer. Nie ma nawyku pisania czystego kodu "z palca" — przez lata korzystał z wizualnych edytorów i gotowych pluginów. Ma tendencję do kopiowania kodu z AI bez czytania i rozumienia. Zna podstawowy JavaScript, nie zna TypeScript. React widział powierzchownie, nigdy nie zbudował aplikacji od zera. Dysponuje 4–7 godzinami tygodniowo. Jego celem jest zostać frontend developerem i budować portfolio — ale bardziej niż gotowy produkt, chce NAPRAWDĘ zrozumieć to, co buduje.

Styl pracy, który wspiera jego naukę:
- Maksymalnie 1–3 pliki na jedną sesję roboczą
- Scaffold code z lukami (szkielet + komentarze `// TUTAJ: [instrukcja co wstawić]` zamiast gotowej implementacji)
- Mentor (LLM) czeka na kod od developera zanim przejdzie do kolejnego zadania
- Przy frustracji: naprowadzanie pytaniami sokratejskimi, nie gotowy kod
- Przed każdym etapem: krótki "must know" primer z konceptami React/TS potrzebnymi w tym etapie

---

## CZEGO MA DOSTARCZYĆ WYGENEROWANY PRD

Wygeneruj dokument zawierający WSZYSTKIE poniższe sekcje. Nie pomijaj żadnej. Każda sekcja służy konkretnemu celowi edukacyjnemu lub produktowemu.

---

### SEKCJA 1: PRODUCT OVERVIEW

Napisz zwięzły opis aplikacji "Get Better 1%" obejmujący:
- Propozycja wartości (value proposition) w 2–3 zdaniach
- Problem, który rozwiązuje (dla użytkownika końcowego, nie dla developera)
- Kluczowe założenia UX (cozy dark mode, pionowy widget, desktop-first)
- Stack technologiczny: React + TypeScript + Vite → pakowanie w Electron, integracja z Claude API (Anthropic), auto-zapis do Obsidian przez MCP, generowanie fiszek Anki

---

### SEKCJA 2: REACT + TYPESCRIPT "MUST KNOW" PRIMER (globalny)

Przed wygenerowaniem roadmapu, napisz listę fundamentalnych konceptów, które developer MUSI zrozumieć zanim dotknie kodu. Dla każdego konceptu:
- Nazwa konceptu
- Wyjaśnienie jednym zdaniem (bez żargonu, analogia do WordPress jeśli możliwa)
- Dlaczego to ważne w tej aplikacji
- Gdzie pojawi się po raz pierwszy w roadmapie

Koncepty do omówienia (minimum):
- Czym jest komponent w React (vs. widget/blok w Elementorze)
- JSX — co to jest i dlaczego wygląda jak HTML, a nim nie jest
- Props — dane wejściowe komponentu (analogia: shortcode attributes w WordPress)
- State (useState) — pamięć komponentu, która powoduje re-render
- useEffect — efekty uboczne, lifecycle hooks
- useReducer — zarządzanie złożonym stanem (alternatywa dla useState)
- TypeScript interface i type — kontrakt danych
- Generyki (T) — typy wielokrotnego użytku
- async/await i Promise — wywołania asynchroniczne (API calls)
- Event handling w React (onClick, onChange, onSubmit)
- Lifting state up — przepływ danych przez drzewo komponentów
- Czym jest Electron i jak "opakowuje" aplikację webową

---

### SEKCJA 3: FUNKCJE APLIKACJI Z LEARNING OBJECTIVES

Dla każdej z 10 funkcji (lista poniżej) wygeneruj kartę zawierającą:

**Format karty funkcji:**
```
## Funkcja N: [Nazwa]

### Co budujemy
[1–2 zdania opisu technicznego]

### Prerequisites — wiedza PRZED implementacją
[Lista konceptów React/TS, które developer musi rozumieć zanim zacznie]

### Skills Gained — wiedza PRZEZ implementację
[Lista konkretnych umiejętności, które developer zdobędzie budując tę funkcję]

### Typowe pułapki (anti-patterns)
[2–3 błędów charakterystycznych dla kogoś z background WordPress/copy-paste]

### Scaffold hint
[Przykładowy fragment kodu z lukami — SZKIELET, nie gotowe rozwiązanie]
```

Lista 10 funkcji do opracowania:
1. Scaffold projektu: Vite + React + TypeScript setup
2. Podstawowy UI widget (layout, dark mode, CSS/Tailwind)
3. System stanu sesji (React useState, useReducer)
4. Integracja LLM (Anthropic API calls, streaming, error handling)
5. Parsing i wyświetlanie odpowiedzi LLM (Markdown render)
6. System feedbacku użytkownika
7. Generowanie fiszek Anki (format TSV, eksport)
8. Integracja Obsidian przez MCP (create-note, edit-note)
9. Persystencja historii sesji (localStorage)
10. Pakowanie w Electron

---

### SEKCJA 4: STAGED LEARNING ROADMAP (minimum 5 etapów)

To jest serce dokumentu. Każdy etap to spójny blok nauki — developer kończy etap z konkretną działającą częścią aplikacji ORAZ z nową wiedzą.

**Format każdego etapu:**

```
## Etap N: [Nazwa Etapu]

### Cel etapu
[Co zostanie zbudowane — opis funkcjonalny, co zobaczy/poczuje użytkownik]

### Prerequisites (wiedza wymagana PRZED wejściem w etap)
[Co developer musi wiedzieć/rozumieć. Nie "znajomość React" — konkretne koncepty.]

### Must Know Primer (do przeczytania przed rozpoczęciem)
[Skrócona lista konceptów React/TS specyficznych dla tego etapu z jednozdaniowym wyjaśnieniem każdego]

### Zadania (Scaffold approach)
Każde zadanie w formacie:
- [ ] Zadanie: [nazwa]
  - Plik(i): [max 1–3 pliki]
  - Instrukcja: [co developer ma zrobić — opisowo, NIE kod]
  - Scaffold hint: [1–5 linii kodu z lukami, np. // TUTAJ: użyj useState z typem SessionState]
  - Czego to uczy: [1 zdanie]

### Skills Gained po tym etapie
[Lista konkretnych umiejętności React/TS/ogólnych, które developer posiada po zakończeniu]

### Definition of Done
[Konkretne, mierzalne kryteria — co musi działać, żeby uznać etap za skończony]
[Nie "rozumie komponenty" — "potrafi napisać komponent z props bez zaglądania w gotowiec"]

### Checkpoint Questions (Socratic)
[5–7 pytań, które mentor zadaje PRZED przejściem do następnego etapu]
[Pytania mają sprawdzać rozumienie, nie wiedzę pamięciową]
[Przykład dobrego pytania: "Co by się stało gdybyś usunął useState i użył zwykłej zmiennej JS?"]
[Przykład złego pytania: "Jak się nazywa hook do zarządzania stanem?"]

### Estimated Sessions
[Przy założeniu 4–7h tygodniowo: ile sesji / ile tygodni]

### Następny krok (jeśli Definition of Done spełniony)
[Nazwa następnego etapu]
```

Etapy muszą pokrywać całą aplikację i być ułożone od prostszych do bardziej złożonych. Etap 1 powinien kończyć się działającym "Hello World" ze zrozumieniem struktury projektu. Ostatni etap — działającym Electron app.

---

### SEKCJA 5: ANTI-PATTERNS DICTIONARY

Napisz słownik typowych błędów developera przychodzącego z WordPress / AI copy-paste workflow. Dla każdego anti-patternu:

```
### Anti-pattern: [Nazwa]

**Objaw:** [Jak to wygląda w kodzie — konkretny przykład]
**Dlaczego to problem:** [Technicznie co to powoduje]
**WordPress analogia:** [Skąd ten nawyk pochodzi — co developer robił w WP]
**Poprawne podejście:** [Ogólny kierunek, nie gotowy kod]
**Pytanie naprowadzające:** [Jedno pytanie sokratejskie, które pomaga developerowi samemu dojść do rozwiązania]
```

Minimum 8 anti-patternów. Przykłady do uwzględnienia:
- Wrzucanie logiki API bezpośrednio do JSX zamiast custom hooks
- Mutowanie stanu bezpośrednio zamiast przez setState
- Używanie `any` jako "ucieczka" z TypeScript zamiast definiowania typów
- Kopiowanie komponentu zamiast tworzenia reużywalnego z props
- Brak obsługi stanów loading/error w wywołaniach async
- Mieszanie odpowiedzialności (jeden komponent robi 5 różnych rzeczy)
- Hardkodowanie wartości zamiast konfiguracji/stałych
- Ignorowanie ESLint warnings bo "i tak działa"

---

### SEKCJA 6: SCAFFOLD TEMPLATES GALLERY

Dostarcz 5 przykładowych "podziurawionych" zadań pokazujących metodologię scaffold. Każdy template to:
- Plik z lukami w kluczowych miejscach
- Komentarze `// TUTAJ: [instrukcja]` zamiast implementacji
- Komentarze `// HINT: [podpowiedź bez rozwiązania]` dla trudniejszych miejsc
- Komentarze `// NIE ZMIENIAJ: [wyjaśnienie dlaczego]` dla gotowych części

Przykładowe scaffoldy do przygotowania:
1. Komponent `SessionWidget.tsx` — szkielet z JSX, brakuje logiki stanu
2. Hook `useAnthropicStream.ts` — sygnatura funkcji gotowa, brakuje implementacji fetch
3. Reducer `sessionReducer.ts` — typy gotowe, brakuje case handlers
4. Komponent `FeedbackPanel.tsx` — props interface gotowy, brakuje event handlerów
5. Funkcja `exportToAnki.ts` — typy wejścia/wyjścia gotowe, brakuje logiki transformacji

---

### SEKCJA 7: SUCCESS METRICS (jak mierzyć faktyczne zrozumienie)

Napisz zestaw metryk i kryteriów, które pozwalają odróżnić "developer skopiował i działa" od "developer ROZUMIE co działa". Dla każdego etapu zaproponuj:

**Format:**
```
### Etap N — Success Metrics

**Miękkie wskaźniki (obserwowalne przez mentora):**
- [Zachowanie, które widać podczas pracy, np. "potrafi wyjaśnić własnymi słowami dlaczego useEffect ma dependency array"]

**Twarde wskaźniki (sprawdzalne):**
- [Konkretne zadanie, które developer musi wykonać samodzielnie bez podpowiedzi]
- [Np. "napisz od zera komponent z lokalnym stanem i przekaż callback do rodzica — bez zaglądania w notatki"]

**Red flags (sygnały, że nie rozumie):**
- [Zachowania wskazujące na copy-paste bez rozumienia]
- [Np. "nie potrafi wyjaśnić co się stanie gdy usunie dependency z useEffect array"]

**Remediation (co zrobić gdy developer nie spełnia metryk):**
- [Konkretna akcja naprawcza — pytanie, ćwiczenie, analiza błędu]
```

---

### SEKCJA 8: SESJA ROBOCZA — PROTOKÓŁ

Napisz protokół dla typowej sesji roboczej (np. 1,5–2h). Developer i mentor (LLM) powinni przestrzegać tego protokołu:

1. **Check-in (5 min):** Developer opisuje gdzie skończyła się poprzednia sesja. Mentor zadaje 1–2 pytania checkpoint z poprzedniego etapu.
2. **Primer (10 min):** Mentor wyjaśnia 1–2 nowe koncepty potrzebne w tej sesji. Developer zadaje pytania.
3. **Praca (60–90 min):** Developer pracuje na scaffold. Mentor odpowiada na pytania pytaniami (Socratic). Kod od developera przychodzi jako wklejony tekst — mentor komentuje, nie przepisuje.
4. **Review (10 min):** Developer wyjaśnia własnymi słowami co napisał i dlaczego. Mentor identyfikuje luki.
5. **Next session brief (5 min):** Mentor opisuje co będzie w kolejnej sesji. Developer zapisuje 1 pytanie, które chce zbadać.

---

### SEKCJA 9: GLOSARIUSZ TERMINÓW

Stwórz glosariusz minimum 20 terminów technicznych używanych w tym PRD, z wyjaśnieniami zrozumiałymi dla kogoś z background WordPress. Format:

```
| Termin | Wyjaśnienie | Analogia WordPress |
|--------|-------------|-------------------|
| ...    | ...         | ...               |
```

---

## INSTRUKCJE FORMATOWANIA WYJŚCIOWEGO

- Cały dokument w Markdown
- Każda sekcja zaczyna się od `---` i nagłówka H2
- Kod w blokach ` ```typescript ` lub ` ```tsx `
- Scaffold hints używają komentarzy `// TUTAJ:`, `// HINT:`, `// NIE ZMIENIAJ:`
- Checkpoint questions numerowane, każde zaczyna się od pytajnika
- Długość dokumentu: minimum 3000 słów, bez ograniczenia górnego
- Język dokumentu: polski, nazwy techniczne (hook, state, props, component) po angielsku

---

## ABSOLUTNE ZAKAZY (czego NIE wolno robić w wygenerowanym PRD)

- Nie dawaj gotowych implementacji w scaffold sections — tylko szkielety z lukami
- Nie zakładaj wiedzy React/TS bez wcześniejszego listed prerequisite
- Nie łącz więcej niż 3 nowych konceptów w jednym zadaniu
- Nie pomijaj Definition of Done — każdy etap musi mieć mierzalne kryteria
- Nie pisz checkpoint questions w stylu "czy rozumiesz X?" — pytania muszą wymagać wyjaśnienia lub demonstracji
- Nie twórz etapów dłuższych niż 4 tygodnie przy 4-7h/tydzień — dziel na mniejsze
- Nie używaj żargonu bez wyjaśnienia przy pierwszym wystąpieniu

---

## KONTEKST TECHNICZNY (szczegóły do uwzględnienia w roadmapie)

Aplikacja "Get Better 1%" to desktop widget działający na macOS. Stack:

- **Frontend:** React 18 + TypeScript + Vite
- **Desktop shell:** Electron (opakowuje Vite app)
- **Styling:** Tailwind CSS (dark mode, pionowy layout ~300–400px szerokości)
- **LLM:** Anthropic Claude API (streaming responses, system prompt do personalizacji sesji)
- **Notatki:** Obsidian przez MCP (Model Context Protocol) — create-note, append-to-note
- **Fiszki:** Anki format TSV (eksport pliku do manualnego importu lub przez AnkiConnect)
- **Persystencja:** localStorage (historia sesji, ustawienia) — nie ma backendu

Aplikacja ma 3 tryby pracy:
1. **Sesja aktywna** — LLM prowadzi dialog (wiedza dnia + słówko + pytania sokratejskie)
2. **Review** — przegląd historii sesji
3. **Ustawienia** — konfiguracja API key, preferencje sesji, ścieżka Obsidian

UI widget jest zawsze widoczny (floating window), nie blokuje pracy.

---

Teraz wygeneruj kompletny PRD zgodnie z powyższymi instrukcjami. Zacznij od krótkiego potwierdzenia że rozumiesz profil developera i podejście edukacyjne, następnie przejdź bezpośrednio do dokumentu.
