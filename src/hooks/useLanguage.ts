import { useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: ReactNode;
    ar: ReactNode;
  };
}

const translations: Translations = {
  works: {
    en: 'WORKS',
    ar: 'أعمال'
  },
  about: {
    en: 'ABOUT',
    ar: 'حول'
  },
  contact: {
    en: 'CONTACT',
    ar: 'اتصل'
  },
  downloadCv: {
    en: 'DOWNLOAD CV',
    ar: 'تحميل السيرة الذاتية'
  },
  developer: {
    en: 'DEVELOPER',
    ar: 'مطور'
  }
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    setIsRTL(currentLanguage === 'ar');
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): ReactNode => {
    return translations[key]?.[currentLanguage] || key;
  };

  return {
    t,
    changeLanguage,
    currentLanguage,
    isRTL
  };
};