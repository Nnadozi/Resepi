import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es } from './translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      const storedLanguage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (storedLanguage) {
        callback(storedLanguage);
      } else {
        const locales = Localization.getLocales();
        const deviceLanguage = locales?.[0]?.languageCode || 'en';
        const supportedLanguages = ['en', 'es'];
        const finalLang = supportedLanguages.includes(deviceLanguage)
          ? deviceLanguage
          : 'en';
        callback(finalLang);
      }
    } catch (error) {
      console.log('Error detecting language:', error);
      callback('en');
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.log('Error caching language:', error);
    }
  },
};

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin as any)
  .init({
    resources,
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
