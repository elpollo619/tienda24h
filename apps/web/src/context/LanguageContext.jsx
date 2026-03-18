import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '@/translations/translations.js';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('bc-market-language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setCurrentLanguage(lang);
      localStorage.setItem('bc-market-language', lang);
    }
  };

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English if key is missing in current language
        let fallbackValue = translations['en'];
        for (const fallbackK of keys) {
          if (fallbackValue && fallbackValue[fallbackK] !== undefined) {
            fallbackValue = fallbackValue[fallbackK];
          } else {
            return key; // Return key if not found in fallback either
          }
        }
        value = fallbackValue;
        break;
      }
    }

    if (typeof value === 'string' && Object.keys(params).length > 0) {
      let interpolatedValue = value;
      for (const [paramKey, paramValue] of Object.entries(params)) {
        interpolatedValue = interpolatedValue.replace(new RegExp(`{${paramKey}}`, 'g'), paramValue);
      }
      return interpolatedValue;
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};