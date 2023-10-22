//Mappa normale di esempio 

const mapID = 'map'

if (document.getElementById(mapID) !== null) {
  const map = L.map(mapID).setView([51.505, -0.09], 13)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
}

//Mappa con coordinate JSON

const mapID2 = 'map2'

if (document.getElementById(mapID2) !== null) {
  const map2 = L.map(mapID2).setView([45.0077, 8.2573], 13)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map2);
  
  fetch("https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/cities-geojson.geojson")
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