import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'
import directions from './directions'
import geolocate from './geolocate'
import SideBar from './sidebar'

mapboxgl.accessToken = 'pk.eyJ1IjoicjN3ZWJlcjEiLCJhIjoiY2lyM3lhc3FnMDFrZ2Zwbm04cncwa2JkMiJ9.AeYZqyDiobmuxAVfIKE8gA';

let Map = class Map extends React.Component {
  map;

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: -104.98879,
      lat: 39.75330,
      zoom: 17
    };
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired
  };


  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/r3weber1/cjvcsqbtv6yt01fqxdd96ab5u',
      center: [-104.98879, 39.75330],
      zoom: 12
    
    });
    // add geolocate control
    this.map.addControl(geolocate)
    // add directions api control to map and set origin
    this.map.addControl(directions, 'top-right');
    directions.setOrigin('2193 Arapahoe St, Denver CO 80205');
    // set default start location from current location on click of geo locater
    geolocate.on('geolocate', (e) => {
      const lon = e.coords.longitude;
      const lat = e.coords.latitude;
      const position = [lon, lat];
      directions.setOrigin(position);
    });
    

    

  
    
    // load layer from source
    this.map.on('load', () => {
      this.map.addSource('avoid_areas', {
        type: 'geojson',
        data: this.props.data
      });
      // add layer to map
      this.map.addLayer({
        id: 'avoid_areas',
        type: 'fill',
        source: 'avoid_areas',
        paint: {
          'fill-color': 'red',
          'fill-opacity': 0.5,
          'fill-outline-color': 'black'
          },
      }); 
    }); 
    // on click event in the map get the coordinates and zoom level
    this.map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        // const lat = e.lngLat.lat;
        
        this.setState({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: this.map.getZoom().toFixed(2)
        });
      });
  }

  // setFill() {
  //   const { stops } = this.props.active;
  //   this.map.setPaintProperty('avoid_areas', 'fill-color', {
  //     stops
      
  //   });
      
  // }

  render() {
    const {lng, lat, zoom} = this.state;
    return (
      <div>
        <SideBar />
        <div className="inline-block absolute top align-center mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
          
      </div>
      
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
