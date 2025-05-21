// Crear el mapa centrado en Tenerife
const map = L.map('map').setView([28.3, -16.6], 10); // Tenerife

// Cargar el mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Cargar el archivo GeoJSON
fetch('data/map.geojson')
  .then(response => response.json())
  .then(data => {
    // Añadir datos al mapa
    L.geoJSON(data, {
      style: function (feature) {
        return { color: '#049146', weight: 2 };
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          fillColor: "#48cae4",
          color: "#48cae4",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        let popupContent = "<b>Propiedades:</b><br>";
        for (let key in props) {
          popupContent += `<strong>${key}</strong>: ${props[key]}<br>`;
        }
        layer.bindPopup(popupContent);
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error('Error cargando GeoJSON:', error);
  });
 
  document.querySelectorAll('.step').forEach(step => {
    step.addEventListener('click', () => {
      const contentDiv = step.querySelector('.extra-content');
  
      // Si ya está visible, ocúltalo
      if (contentDiv.style.display === 'block') {
        contentDiv.style.display = 'none';
        contentDiv.innerHTML = '';
        return;
      }
  
      // Cierra todos los demás contenidos
      document.querySelectorAll('.extra-content').forEach(div => {
        div.style.display = 'none';
        div.innerHTML = '';
      });
  
      // Carga el contenido
      const text = step.getAttribute('data-text');
      const imgSrc = step.getAttribute('data-img');
  
      contentDiv.innerHTML = `
        <img src="${imgSrc}" alt="imagen relacionada">
        <p>${text}</p>
      `;
      contentDiv.style.display = 'block';
    });
  });
  