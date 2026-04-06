import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources, defaultLanguage } from './locales';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
