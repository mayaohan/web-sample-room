import { createI18n } from 'vue-i18n';
// import Cookies from 'js-cookie'
import enLocale from './en'
import zhLocale from './zh'


const messages = {
  en: {
    ...enLocale,
  },
  zh: {
    ...zhLocale,
  }
}


const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh',
  messages
});

export default i18n
