import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { landingContent, type Locale, type LandingContent } from "@/content/landing";

const STORAGE_KEY = "visil191-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: LandingContent;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "ta";
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "ta";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "ta" ? "ta" : "en";
  };

  useEffect(() => {
    document.documentElement.lang = locale === "ta" ? "ta" : "en";
  }, [locale]);

  const content = landingContent[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
