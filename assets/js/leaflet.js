///Mappe con coordinate JSON

//Icone per le mappe

 // Green Icon
 const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-icon-start.png',
  shadowUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-shadow.png',
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [3, -34],
  shadowSize: [41, 41]
});

// Blue Icon
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-icon-wpt.png',
  shadowUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-shadow.png',
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [3, -34],
  shadowSize: [41, 41]
});

// Red Icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-icon-end.png',
  shadowUrl: 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-shadow.png',
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [3, -34],
  shadowSize: [41, 41]
});

// Mappa Cella Monte - Percorso Cipriano 

const mapID1 = 'map_cellamonte_cipriano'

if (document.getElementById(mapID1) !== null) {
  const map_cellamonte_cipriano = L.map(mapID1).setView([45.0815, 8.3895], 14)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map_cellamonte_cipriano);
    
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
          return `${layer.feature.properties.name}`}).addTo(map_cellamonte_cipriano);
  })
  .catch((error) => {
      console.log(`This is the error: ${error}`)
  })
}