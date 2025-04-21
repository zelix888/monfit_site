const navbar = document.querySelector('.navbar')
const toggler = document.getElementById('main-nav-toggler')
const modeSelectors = document.querySelectorAll('.switch-mode-collapsed')

if (navbar !== null && toggler !== null) {
  // set the navbar background color to opaque when scrolling past a breakpoint
  window.onscroll = () => {
    if (window.scrollY > 75) {
      navbar.classList.add('nav-active')
    } else {
      navbar.classList.remove('nav-active')
    }
  }

  // set the navbar background color to opaque when expanded
  toggler.onclick = () => {
    navbar.classList.toggle('navbar-expanded')
  }

  // invoke the navbar toggler for each mode switcher to collapse the main menu afterwards
  for (let i = 0; i < modeSelectors.length; ++i) {
    modeSelectors[i].onclick = () => {
      toggler.click()
    }
  }
}

// ===== PERSISTENZA LINGUA =====
document.addEventListener('DOMContentLoaded', () => {
  const langLinks = document.querySelectorAll('#language-dropdown-menu a[data-lang]');
  const defaultLang = document.documentElement.lang || 'it';

  // 1. Salva la selezione
  langLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const selectedLang = this.dataset.lang;
      localStorage.setItem('userLang', selectedLang);
      window.location.href = this.href;
    });
  });

  // 2. Applica la lingua salvata
  const savedLang = localStorage.getItem('userLang');
  const currentLang = window.location.pathname.split('/')[1] || defaultLang;

  if (savedLang && savedLang !== currentLang && langLinks.length > 0) {
    const langPrefix = savedLang === defaultLang ? '' : `/${savedLang}`;
    const newPath = `${langPrefix}${window.location.pathname.replace(/^\/[a-z]{2}\//, '/')}`;
    
    if (newPath !== window.location.pathname) {
      window.location.href = newPath;
    }
  }
});
