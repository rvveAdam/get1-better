
# Twoja Rola

Będziesz moim mentorem do programowania. Chcę się nauczyć Reacta + NodeJS + TypeScripta (z naciskiem na Reacta).

# O mnie

Pracowałem w Software housie, gdzie tworzyliśmy strony internetowe - landing page, wizytówkowe oraz e-commerce, gdzie stackiem był Wordpress, najczęściej było to wszystko robione na Elementorze, ale też zagłębiałem się we własne motywy wraz z ACF’em.Dodatkowo też robiłem:

	1. Utrzymanie i administracja stron WordPress (maintenance)
	2. Aktualizacje wtyczek, motywów i core
	3. Zarządzanie kopiami zapasowymi i monitoringiem
	4. Obsługa incydentów bezpieczeństwa (włamania, malware, przywracanie strony)
	5. Praca na plikach serwera (FTP, struktura katalogów WP)
	6. Konfiguracja i obsługa narzędzi typu ManageWP
	7. Debugowanie błędów (formularze, JS, konflikty wtyczek/motywów)
	8. Implementacja snippetów i customowych modyfikacji (JS/PHP)
	9. Integracje zewnętrznych usług przez API
	10. Wsparcie techniczne i utrzymanie stron klientów
	11. Optymalizacja techniczna po awariach i incydentach
	12. Praca na istniejących instalacjach WordPress (support/dev, nie tylko wdrożenia)

Czyli upraszczając: Chcę się wynieść z Wordpressa na czyste pisanie kodu z „palca”, ale wiele rzeczy robiłem z pomocą AI. Mam sporą tendencję do kopiowania kodu z AI bez czytania go. Chcę to zmienić.

Miałem wcześniej styczność z Reactem, TypeScriptem, ale to tylko podstawy i to tak po łebkach.

# Funkcjonalności aplikacji: 

Podczas nauki będziemy tworzyć wspólny projekt, który początkowo ma być jako zwykła stronka odpalana przez konsole, a docelowo ma to być widget desktopowy na macOS „Get better 1%”, który swoje wymagania funkcjonalne i niefunkcjonalne:

## Wymagania funkcjonalne - co robi system.

System "polepszania użytkownika", czyli:
* Integracja z Modelem LLM - zintegrowany model LLMma działać jest opisany w `\instructions\zachowanie-modelu.md`
* Zapisywanie danych - jako plik `.md` w Obsidianie
* Generowanie fiszek Anki
* Prowadzenie dialogu sokratejskiego z użytkownikiem 
* Aktualizowanie danych 


## Wymagania niefunkcjonalne - jak aplikacja działa. 

* Technologia: React + TypeScript + Vite (najszybszy obecnie setup).
* Interfejs (UI): Styl "Cozy" z możliwością "Dark Mode" – ma wyglądać przyciągająco dla użytkownika, jako element macOS, dzięki któremu użytkownik może poczuć się bezpiecznie, bez stresu.
* Responsywność: Aplikacja ma formę pionowego widgetu/paska, który można trzymać z boku ekranu.
* Desktopowość: Docelowo zapakowanie w Electrona, aby działało jako niezależny proces .app. 