///Mappa con coordinate JSON

const mapID2 = 'map2'

if (document.getElementById(mapID2) !== null) {
  const map2 = L.map(mapID2).setView([45.0815, 8.3895], 14)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map2);

  // Green Icon
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-icon-start.png',
  shadowUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-shadow.png',
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [3, -34],
  shadowSize: [41, 41]
});

// Blue Icon
var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-icon-wpt.png',
  shadowUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-shadow.png',
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [3, -34],
  shadowSize: [41, 41]
});

// Red Icon
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-icon-end.png',
  shadowUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-shadow.png',
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [3, -34],
  shadowSize: [41, 41]
});
    
  fetch("https://raw.githubusercontent.com/zelix888/monfit_site/main/routes/Cella_Monte/Cella%20Monte%20-%20Cipriano.geojson")
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
      L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          if (feature.properties.type == "from") {
            return L.marker(latlng, {
              icon: greenIcon 
            });
          } else if (feature.properties.type == "to") {
            return L.marker(latlng, {
              icon: redIcon 
            });
          } else if (feature.properties.type == "via") {
            return L.marker(latlng, {
              icon: blueIcon 
            });
          }
          
        }
      }).bindPopup((layer) => {
          return `${layer.feature.properties.name}`}).addTo(map2);
  })
  .catch((error) => {
      console.log(`This is the error: ${error}`)
  })
}