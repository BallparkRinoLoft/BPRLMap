import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'
// import MapboxDirections from '@mapbox/mapbox-gl-directions'
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

let Map = class Map extends React.Component {
  map;

  static propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    this.setFill();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-104.98879, 39.75330],
      zoom: 1
    
    });
    // var MapboxDirections = require('@mapbox/mapbox-gl-directions');
    // const directions = new MapboxDirections({
    //   accessToken: mapboxgl.accessToken,
    //   // steps: false,
    //   geometries: 'polyline',
    //   profile: 'mapbox/walking'
    //   // controls: {instructions:false}
    // });
    // this.map.addControl(directions, 'top-left');
    // directions.setOrigin('2193 Arapahoe St, Denver CO 80205');
  
    
    
    this.map.on('load', () => {
      this.map.addSource('avoid_areas', {
        type: 'geojson',
        data: this.props.data
      });

      this.map.addLayer({
        id: 'avoid_areas',
        type: 'fill',
        source: 'avoid_areas',
        paint: {
          'fill-color': 'red',
          'fill-opacity': 0.5,
          'fill-outline-color': 'black'
          },
      }); // ID metches `mapbox/streets-v9`

      // this.setFill();
    });
  }

  // setFill() {
  //   const { stops } = this.props.active;
  //   this.map.setPaintProperty('avoid_areas', 'fill-color', {
  //     stops
      
  //   });
      
  // }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    active: state.active
  };
}

Map = connect(mapStateToProps)(Map);

export default Map;
