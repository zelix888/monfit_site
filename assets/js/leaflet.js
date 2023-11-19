//Mappa normale di esempio 


const mapID = 'map'

if (document.getElementById(mapID) !== null) {
  const map = L.map(mapID).setView([51.505, -0.09], 13)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  var gpx = 'https://raw.githubusercontent.com/zelix888/monfit_site/main/routes/Cella_Monte/Camogli.gpx'; // URL to your GPX file or the GPX itself
  new L.GPX(gpx, {
  async: true,
  marker_options: {
    wptIconUrls: {
      'Waypoint': 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-icon-wpt.png',
      'Letter A, Blue':'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-icon-start.png',
      'Letter B, Blue': 'https://raw.githubusercontent.com/zelix888/monfit_site/main/Images/Icons/pin-icon-end.png',
    },
    startIconUrl: false,
    endIconUrl: false,
    shadowUrl: false 
  }
  
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);
  
}


//Mappa con coordinate JSON

const mapID2 = 'map2'

if (document.getElementById(mapID2) !== null) {
  const map2 = L.map(mapID2).setView([45.0815, 8.3895], 14)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map2);

  const start = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // changed marker icon position
  popupAnchor: [1, -34], // changed popup position
});

const finish = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // changed marker icon position
    popupAnchor: [1, -34], // changed popup position
  });

L.marker([45.07474205271855, 8.39181661605835], {
    icon: start,
  }).addTo(map2)

  L.marker([45.08447772710751, 8.389872014522554], {
    icon: finish,
  }).addTo(map2)
    
  fetch("https://raw.githubusercontent.com/zelix888/monfit_site/main/routes/Cella_Monte/Cella.geojson")
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        L.geoJson(data).addTo(map2);
    })
    .catch((error) => {
        console.log(`This is the error: ${error}`)
    })
}