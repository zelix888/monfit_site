document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');
    
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (cookieConsent === null) {
      cookieBanner.style.display = 'block';
    }
    
    acceptCookies.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.style.display = 'none';
      // loadGoogleAnalytics();
    });
    
    rejectCookies.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'rejected');
      cookieBanner.style.display = 'none';
    });
  });
  
  function loadGoogleAnalytics() {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    }
  }