// Module de gestion de l'internationalisation
import { translations, languages, defaultLanguage } from './translations.js'

class I18n {
  constructor () {
    this.currentLanguage = this.getStoredLanguage() || defaultLanguage
    this.translations = translations
    this.languages = languages
  }

  // Récupérer la langue stockée dans le localStorage
  getStoredLanguage () {
    try {
      return localStorage.getItem('cardGenerator_language') || defaultLanguage
    } catch (e) {
      return defaultLanguage
    }
  }

  // Sauvegarder la langue dans le localStorage
  setStoredLanguage (language) {
    try {
      localStorage.setItem('cardGenerator_language', language)
    } catch (e) {
      console.warn('Impossible de sauvegarder la langue:', e)
    }
  }

  // Changer de langue
  setLanguage (languageCode) {
    if (this.languages[languageCode]) {
      this.currentLanguage = languageCode
      this.setStoredLanguage(languageCode)
      this.updateUI()
      this.dispatchLanguageChangeEvent()
    } else {
      console.warn(`Langue non supportée: ${languageCode}`)
    }
  }

  // Obtenir une traduction
  t (key, params = {}) {
    const translation = (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) || 
                       (this.translations[defaultLanguage] && this.translations[defaultLanguage][key]) || 
                       key

    // Remplacer les paramètres dans la traduction
    return this.interpolate(translation, params)
  }

  // Interpoler les paramètres dans une chaîne
  interpolate (str, params) {
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match
    })
  }

  // Obtenir la langue actuelle
  getCurrentLanguage () {
    return this.currentLanguage
  }

  // Obtenir toutes les langues disponibles
  getAvailableLanguages () {
    return Object.values(this.languages)
  }

  // Mettre à jour l'interface utilisateur
  updateUI () {
    // Mettre à jour tous les éléments avec l'attribut data-i18n
    const elements = document.querySelectorAll('[data-i18n]')
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n')
      const translation = this.t(key)
      
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.placeholder = translation
      } else if (element.tagName === 'INPUT' && element.type === 'number') {
        // Pour les inputs number, on ne change que le placeholder
        if (element.placeholder) {
          element.placeholder = translation
        }
      } else if (element.tagName === 'TEXTAREA') {
        element.placeholder = translation
      } else {
        element.textContent = translation
      }
    })

    // Mettre à jour les attributs title et aria-label
    const elementsWithTitle = document.querySelectorAll('[data-i18n-title]')
    elementsWithTitle.forEach(element => {
      const key = element.getAttribute('data-i18n-title')
      const translation = this.t(key)
      element.title = translation
      element.setAttribute('aria-label', translation)
    })

    // Mettre à jour les attributs data-tooltip
    const elementsWithTooltip = document.querySelectorAll('[data-i18n-tooltip]')
    elementsWithTooltip.forEach(element => {
      const key = element.getAttribute('data-i18n-tooltip')
      const translation = this.t(key)
      element.setAttribute('data-tooltip', translation)
    })
  }

  // Dispatcher un événement de changement de langue
  dispatchLanguageChangeEvent () {
    const event = new CustomEvent('languageChanged', {
      detail: {
        language: this.currentLanguage,
        languageInfo: this.languages[this.currentLanguage]
      }
    })
    document.dispatchEvent(event)
  }

  // Initialiser l'i18n
  init () {
    this.updateUI()
    console.log(`i18n initialisé avec la langue: ${this.currentLanguage}`)
  }
}

// Créer une instance globale
const i18n = new I18n()

export default i18n
