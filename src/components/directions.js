import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import mapboxgl from 'mapbox-gl'


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

    //export directions variable 
    export const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        // steps: false,
        geometries: 'polyline',
        interactive: false,
        flyto: false,
        profile: 'mapbox/walking',
        zoom: 8,
        controls: {instructions:true, profileSwitcher:false}
      });
     
    

     export default directions;