// Composant de sélection de langue
import i18n from './i18n.js'

class LanguageSelector {
  constructor () {
    this.isOpen = false
    this.selector = null
    this.menu = null
    this.init()
  }

  init () {
    // Vérifier si le sélecteur existe déjà
    if (document.querySelector('.language-selector')) {
      console.log('Sélecteur de langue déjà existant, suppression...')
      document.querySelector('.language-selector').remove()
    }
    this.createSelector()
    this.attachEvents()
  }

  createSelector () {
    // Créer le conteneur principal
    const container = document.createElement('div')
    container.className = 'language-selector'
    container.style.cssText = `
      position: fixed;
      top: 9px;
      right: 50px;
      z-index: 1000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    `

    // Créer le bouton principal
    this.selector = document.createElement('button')
    this.selector.className = 'language-selector-button'

    // Créer le menu déroulant
    this.menu = document.createElement('div')
    this.menu.className = 'language-selector-menu'

    container.appendChild(this.selector)
    container.appendChild(this.menu)
    document.body.appendChild(container)

    this.updateSelector()
    this.createMenuItems()
  }

  createMenuItems () {
    const languages = i18n.getAvailableLanguages()
    
    languages.forEach(lang => {
      const item = document.createElement('button')
      item.className = 'language-selector-item'
      item.style.cssText = `
        width: 100%;
        background: transparent;
        border: none;
        padding: 10px 12px;
        text-align: left;
        cursor: pointer;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #1e293b;
        transition: all 0.15s ease;
        margin-bottom: 2px;
      `

      item.innerHTML = `
        <span style="font-size: 18px;">${lang.flag}</span>
        <span>${lang.name}</span>
        ${lang.code === i18n.getCurrentLanguage() ? '<span style="margin-left: auto; color: #3b82f6;">✓</span>' : ''}
      `

      // Effet hover
      item.addEventListener('mouseenter', () => {
        item.style.background = '#f1f5f9'
        item.style.color = '#3b82f6'
      })

      item.addEventListener('mouseleave', () => {
        if (lang.code !== i18n.getCurrentLanguage()) {
          item.style.background = 'transparent'
          item.style.color = '#1e293b'
        }
      })

      // Action de clic
      item.addEventListener('click', () => {
        this.selectLanguage(lang.code)
      })

      this.menu.appendChild(item)
    })
  }

  updateSelector () {
    const currentLang = i18n.languages[i18n.getCurrentLanguage()]
    if (currentLang) {
      this.selector.innerHTML = `
        <span style="font-size: 18px;">${currentLang.flag}</span>
        <span>${currentLang.code.toUpperCase()}</span>
        <span style="font-size: 12px; transition: transform 0.2s ease;">${this.isOpen ? '▲' : '▼'}</span>
      `
      
      // Gérer l'état actif
      if (this.isOpen) {
        this.selector.classList.add('active')
      } else {
        this.selector.classList.remove('active')
      }
    }
  }

  selectLanguage (languageCode) {
    i18n.setLanguage(languageCode)
    this.closeMenu()
    this.updateSelector()
    this.updateMenuItems()
  }

  updateMenuItems () {
    const items = this.menu.querySelectorAll('.language-selector-item')
    items.forEach((item, index) => {
      const languages = i18n.getAvailableLanguages()
      const lang = languages[index]
      const isCurrent = lang.code === i18n.getCurrentLanguage()
      
      item.innerHTML = `
        <span style="font-size: 18px;">${lang.flag}</span>
        <span>${lang.name}</span>
        ${isCurrent ? '<span style="margin-left: auto; color: #3b82f6;">✓</span>' : ''}
      `
      
      if (isCurrent) {
        item.style.background = '#eff6ff'
        item.style.color = '#3b82f6'
      } else {
        item.style.background = 'transparent'
        item.style.color = '#1e293b'
      }
    })
  }

  toggleMenu () {
    this.isOpen = !this.isOpen
    
    if (this.isOpen) {
      this.menu.style.opacity = '1'
      this.menu.style.visibility = 'visible'
      this.menu.style.transform = 'translateY(0)'
    } else {
      this.menu.style.opacity = '0'
      this.menu.style.visibility = 'hidden'
      this.menu.style.transform = 'translateY(-10px)'
    }
    
    this.updateSelector()
  }

  closeMenu () {
    this.isOpen = false
    this.menu.style.opacity = '0'
    this.menu.style.visibility = 'hidden'
    this.menu.style.transform = 'translateY(-10px)'
    this.updateSelector()
  }

  attachEvents () {
    // Clic sur le bouton principal
    this.selector.addEventListener('click', (e) => {
      e.stopPropagation()
      this.toggleMenu()
    })

    // Fermer le menu en cliquant ailleurs
    document.addEventListener('click', (e) => {
      if (!this.selector.contains(e.target) && !this.menu.contains(e.target)) {
        this.closeMenu()
      }
    })

    // Fermer le menu avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu()
      }
    })

    // Écouter les changements de langue pour mettre à jour l'interface
    document.addEventListener('languageChanged', () => {
      this.updateSelector()
      this.updateMenuItems()
    })
  }

  // Méthode pour détruire le sélecteur
  destroy () {
    if (this.selector && this.selector.parentNode) {
      this.selector.parentNode.remove()
    }
  }
}

export default LanguageSelector
