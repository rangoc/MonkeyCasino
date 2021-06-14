import React, { useState, useEffect, createContext } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const appLang = 'language';
const storedLangValue = localStorage.getItem(appLang);
const defaultLanguage = 'en';
const MultiLanguageSupportContext = createContext({
  language: storedLangValue || defaultLanguage,
  setLanguage: (lang) => console.log(lang),
  t: (key, ...args) => '',
});

const MultiLanguageSupportProvider = ({ children }) => {
  const [language, setLanguage] = useState(storedLangValue || defaultLanguage);
  const { t } = useTranslation();
  useEffect(() => {
    setLanguage(language);
    i18next.changeLanguage(language);
    localStorage.setItem(appLang, language);
  }, [language]);
  return (
    <MultiLanguageSupportContext.Provider
      value={{ language, setLanguage, t: (key, ...args) => t(key, ...args) }}
    >
      {children}
    </MultiLanguageSupportContext.Provider>
  );
};

export { MultiLanguageSupportProvider, MultiLanguageSupportContext };
