//Mappa Cella Monte - Percorso Cipriano

const mapID2 = 'map2'

if (document.getElementById(mapID2) !== null) {
  const map2 = L.map(mapID2).setView([45.0815, 8.3895], 14)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map2);

   
  fetch("https://raw.githubusercontent.com/zelix888/monfit_site/main/routes/Cella_Monte/Cella%20Monte%20-%20Percoso%20Cipriano%20(2.9km).geojson")
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        L.geoJson(data).addTo(map2);

        var layerGroup = L.geoJson(data, {
            onEachFeature: function(feature){
        
                        // create a marker style
                        var logoMarkerStyle = L.Icon.extend({
                            options: {
                            iconSize: feature.properties.iconSize,
                            iconAnchor: feature.properties.iconAnchor,
                            popupAnchor: feature.properties.popupAnchor
                        }
                        });
    
                        var logoMarker = new logoMarkerStyle({iconUrl: feature.properties.iconUrl})
        
                        // read the coordinates from your marker
                        var lat = feature.geometry.coordinates[1];
                        var lon = feature.geometry.coordinates[0];
        
                        // create a new marker using the icon style
                        L.marker([lat,lon],{icon: logoMarker}).addTo(map2);  
                    }
                });

    })
    .catch((error) => {
        console.log(`This is the error: ${error}`)
    })
}


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

