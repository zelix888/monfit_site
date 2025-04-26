document.addEventListener('DOMContentLoaded', function() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');

  // Controlla lo stato del consenso
  const hasAccepted = document.cookie.includes('googleMapsConsent=accepted');
  const hasRejected = document.cookie.includes('googleMapsConsent=rejected');

  // Mostra il banner solo se non c'è ancora nessuna scelta
  if (!hasAccepted && !hasRejected) {
    cookieBanner.style.display = 'block';
  } else if (hasAccepted) {
    loadAllGoogleMaps();
  }

  // Gestione click su "Accetta"
  acceptBtn.addEventListener('click', function() {
    document.cookie = "googleMapsConsent=accepted; max-age=2592000; path=/; SameSite=Lax";
    document.cookie = "cookieChoiceMade=true; max-age=2592000; path=/; SameSite=Lax";
    cookieBanner.style.display = 'none';
    loadAllGoogleMaps();
  });

  // Gestione click su "Rifiuta" (MODIFICATO)
  rejectBtn.addEventListener('click', function() {
    document.cookie = "googleMapsConsent=rejected; max-age=2592000; path=/; SameSite=Lax";
    document.cookie = "cookieChoiceMade=true; max-age=2592000; path=/; SameSite=Lax";
    cookieBanner.style.display = 'none';
  });

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-accept-now')) {
        // Sovrascrive il rifiuto precedente
        document.cookie = "googleMapsConsent=accepted; max-age=2592000; path=/; SameSite=Lax";
        document.cookie = "cookieChoiceDismissed=; max-age=0; path=/"; // Rimuove il flag
        
        // Ricarica la pagina per applicare i cambiamenti
        location.reload();
    }
});

  // Carica tutti gli iframe Google Maps
  function loadAllGoogleMaps() {
    document.querySelectorAll('.google-maps-placeholder').forEach(placeholder => {
      // Crea un wrapper per mantenere l'allineamento
      const wrapper = document.createElement('p');
      wrapper.className = 'text-center';
      
      // Crea l'iframe con tutti gli attributi
      const iframe = document.createElement('iframe');
      iframe.src = placeholder.dataset.src;
      iframe.width = placeholder.dataset.width;
      iframe.height = placeholder.dataset.height;
      iframe.style.border = '0';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.className = 'w-75 rounded';
      iframe.allowFullscreen = true;
      
      // Inserisci iframe nel wrapper
      wrapper.appendChild(iframe);
      
      // Sostituisci il placeholder con il wrapper+iframe
      placeholder.replaceWith(wrapper);
    });
  }
});