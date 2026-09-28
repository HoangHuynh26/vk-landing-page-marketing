import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

function getValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      // 1. URL parameter override (?lang=en or ?lang=vi)
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "en" || urlLang === "vi") {
        try {
          sessionStorage.setItem("vk-language", urlLang);
        } catch (e) {}
        return urlLang;
      }

      // 2. Clear legacy cached "vi" from localStorage to prevent old sessions from sticking to Vietnamese
      try {
        if (localStorage.getItem("vk-language") === "vi") {
          localStorage.removeItem("vk-language");
        }
      } catch (e) {}

      // 3. Check sessionStorage (active session preference)
      try {
        const sessionLang = sessionStorage.getItem("vk-language");
        if (sessionLang === "en" || sessionLang === "vi") {
          return sessionLang;
        }
      } catch (e) {}
    }

    // Default language when entering the website is ALWAYS English
    return "en";
  });

  useEffect(() => {
    document.body.dataset.language = language;
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (nextLanguage) => {
    const next = nextLanguage === "vi" ? "vi" : "en";
    try {
      sessionStorage.setItem("vk-language", next);
      localStorage.setItem("vk-language", next);
    } catch (e) {}
    setLanguageState(next);
  };
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (path) => getValue(translations[language], path) ?? path,
    }),
    [language],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
