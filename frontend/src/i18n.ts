import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
  en: {
    translation: {
      welcome: "Welcome to the Trivia Quiz App",
      login: "Login",
      register: "Register",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue sur l'application Trivia Quiz",
      login: "Connexion",
      register: "S'inscrire",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('selectedLanguage') || 'en', // Utiliser la langue stockée ou par défaut l'anglais
  fallbackLng: 'en', // Langue de secours si une traduction manque
  interpolation: {
    escapeValue: false,
  },
  });

export default i18n;
