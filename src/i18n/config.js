import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

let languages = require("../i18n/languages.json");
let resources = {};
let langArr = Object.keys(languages);
let ns = ['mainPage', "countries"]

langArr.forEach((code) => {
  let tempResource = {}
  ns.forEach((ns) => {
    tempResource[ns] = require(`./locales/${code}/${ns}.json`)
  })
  resources[code] = tempResource
})

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
  supportedLngs: langArr,
  fallbackLng: 'en',
  resources: resources,
  detection: {
    order: ['cookie', 'htmlTag', 'localStorage', 'querystring', 'path', 'subdomain'],
    caches: ['cookie']
  },
  ns: ns,
  defaultNS: 'mainPage',

  react: { useSuspense: false}
});

i18n.languages = langArr;
export default i18n;