import i18n from 'i18next';

import fr from './fr';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback) => {
    return Promise.resolve('fr').then(callback);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n.use(languageDetector).init({
  fallbackLng: 'fr',

  resources: {
    fr,
  },

  // have a common namespace used around the full app
  ns: Object.keys(fr),
  defaultNS: 'common',

  debug: true,

  // cache: {
  //   enabled: true
  // },

  interpolation: {
    escapeValue: false, // not needed for react as it does escape per default to prevent xss!
  },
});

export default i18n;
