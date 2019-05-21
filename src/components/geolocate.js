import mapboxgl from 'mapbox-gl'

export const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    });
export default geolocate;