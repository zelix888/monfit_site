// Gestione cambio lingua
function initLanguageSwitcher() {
    const savedLang = localStorage.getItem('userLang');
    const defaultLang = document.documentElement.lang;
    const currentLang = document.documentElement.getAttribute('data-current-lang');
    
    if (savedLang && savedLang !== currentLang) {
      const langPrefix = savedLang === defaultLang ? '' : `/${savedLang}`;
      const newPath = `${langPrefix}${window.location.pathname.replace(/^\/[a-z]{2}\//, '/')}`;
      
      if (newPath !== window.location.pathname) {
        window.location.href = newPath;
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', initLanguageSwitcher);