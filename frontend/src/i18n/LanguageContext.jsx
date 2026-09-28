import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

function getValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(
    () => localStorage.getItem("vk-language") || "vi",
  );

  useEffect(() => {
    document.body.dataset.language = language;
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (nextLanguage) => {
    const next = nextLanguage === "en" ? "en" : "vi";
    localStorage.setItem("vk-language", next);
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
