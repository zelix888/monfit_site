document.addEventListener('DOMContentLoaded', function() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');
  const resetBtn = document.getElementById('reset-consent'); // Aggiungi questo pulsante nel tuo HTML

  // Funzione perfezionata per impostare cookie persistenti
  function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    
    // Aggiungi Secure se in HTTPS (obbligatorio per SameSite=None)
    if (window.location.protocol === 'https:' && window.location.hostname !== 'localhost') {
      cookie += '; Secure';
    }
    document.cookie = cookie;
  }

  // Funzione ottimizzata per leggere i cookie
  function getCookie(name) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  }

  // Controlla lo stato del consenso
  function checkConsent() {
    const consent = getCookie('cookieConsent');
    const expiry = getCookie('cookieConsentExpiry');

    // Elimina cookie scaduti
    if (expiry && new Date(expiry) < new Date()) {
      document.cookie = "cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "cookieConsentExpiry=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return false;
    }
    return consent;
  }

  // Mostra/nascondi banner in base al consenso
  if (!checkConsent()) {
    cookieBanner.style.display = 'block';
  } else if (getCookie('cookieConsent') === 'accepted') {
    loadTrackingScripts();
  }

  // Gestione eventi
  acceptBtn.addEventListener('click', () => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    setCookie('cookieConsent', 'accepted');
    setCookie('cookieConsentExpiry', expiryDate.toISOString());
    cookieBanner.style.display = 'none';
    loadTrackingScripts();
  });

  rejectBtn.addEventListener('click', () => {
    setCookie('cookieConsent', 'rejected');
    cookieBanner.style.display = 'none';
  });

  // Opzionale: Pulsante reset consenso
  resetBtn?.addEventListener('click', () => {
    document.cookie = "cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cookieConsentExpiry=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    cookieBanner.style.display = 'block';
  });
});

// Caricamento condizionale degli script
function loadTrackingScripts() {
  if (getCookie('cookieConsent') === 'accepted') {
    console.log('Caricamento script tracciamento...');
    // Esempio Google Analytics:
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', 'GA_MEASUREMENT_ID');
  }
}