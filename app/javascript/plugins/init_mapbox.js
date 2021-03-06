import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const initMapbox = () => {
  const mapElement = document.getElementById('map');
  const fitMapToMarkers = (map, markers) => {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
    map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  };
  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  // if  Jess to insert here
  if (mapElement.dataset.center) {
      const coordinates = JSON.parse(mapElement.dataset.center);
      const map = new mapboxgl.Map({
        container: 'map',
        center: [coordinates[1], coordinates[0]],
        zoom: 13,
        style: 'mapbox://styles/mapbox/streets-v10',
      });
      const markers = JSON.parse(mapElement.dataset.markers);
      console.log(markers)
      markers.forEach((marker) => {
        // const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
        const element = document.createElement('div');
        element.className = 'marker';
        element.style.backgroundImage = `url('${marker.image_url}')`;
        element.style.backgroundSize = 'contain';
        element.style.width = '22px';
        element.style.height = '40px';
        new mapboxgl.Marker(element)
        .setLngLat([ marker.lng, marker.lat ])
        // .setPopup(popup) // add this
        .addTo(map);
      });
    } else {
      
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '22px';
      element.style.height = '40px';
      new mapboxgl.Marker(element)
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup) // add this
      .addTo(map);
    });
    fitMapToMarkers(map, markers);
   };
  };
};
export { initMapbox };
