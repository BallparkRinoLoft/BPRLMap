import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
// import $ from 'jquery'
import { connect } from 'react-redux'
import directions from './directions'
import geolocate from './geolocate'
import SideBar from './sidebar'

import neighborhoods from '../denverNeighborhoods.geojson'


mapboxgl.accessToken = 'pk.eyJ1IjoicjN3ZWJlcjEiLCJhIjoiY2lyM3lhc3FnMDFrZ2Zwbm04cncwa2JkMiJ9.AeYZqyDiobmuxAVfIKE8gA';

let Map = class Map extends React.Component {
  map;

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: -104.98879,
      lat: 39.75330,
      zoom: 12,
      
      
    };
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired
  };


  componentDidMount() {
    // const { lng, lat, zoom } = this.state;
     
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/r3weber1/cjvcsqbtv6yt01fqxdd96ab5u',
      center: [-104.98879, 39.75330],
      zoom: 12
    
    }); 
  
  //  const canvas = L.map(this.map.getCanvasContainer());
  //  console.log(canvas)
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
      // const neighborhoods = '../src/denverNeighborhoods.geojson';
      this.map.addSource('neighborhoods', {
        type: 'geojson',
        data: neighborhoods
      });
    
      this.map.addSource('avoid_areas', {
        type: 'geojson',
        data: this.props.data
      }); 
      // this.map.addSource('markers', {type: 'geojson', data: points});
      
      // add layer to map
      // const pic = new Image(40, 60);
      // pic.src = '../nbhdpic.jpg';
      
    //   this.map.loadImage( '../nbhdpic.jpg', (error, image) => {
    //             // if (error) throw error;
    //             this.map.addImage('pic', image, {width: 40, height:40});
      // this.map.addLayer({
      //   id: 'markers',
      //   type: 'circle',
      //   source: 'markers',
      //   paint:{
      //     'circle-color': 'transparent'
      //   }
       
      // });
      // this.map.setLayoutProperty('markers', "Name");
    // });
      // this.map.addLayer({
      //   id: 'avoid_areas',
      //   type: 'fill',
      //   source: 'avoid_areas',
      //   paint: {
      //     'fill-color': 'red',
      //     'fill-opacity': 0.5,
      //     'fill-outline-color': 'black'
      //     },
      // }); 
      this.map.addLayer({
        id: 'neighborhoods',
        type: 'fill',
        source: 'neighborhoods',
        paint: {
          'fill-color': ['match',
          ['get', 'Name'],
          'Arapahoe Square', '#fbb03b',
          'Highland', '#223b53',
          'River North', '#e55e5e',
          'Five Points', '#3bb2d0',
          'Sunnyside', '#32CD32',
          /* other */ '#ccc'
          ],
          'fill-opacity': 0.2,
          'fill-outline-color': 'black'
          
          },
      }); 
      
    //   $.getJSON(points, geojson => { 
    //   Object.keys(geojson.features).map(item => {
        
    //   // L.marker(geojson.features[item].geometry.coordinates).addTo(canvas)
      
    //   //   console.log(geojson.features[item]);
    //     // create a HTML element for each feature
       
    //     const el = React.createElement('div');
    //     el.class = "bg-blue inline-block mr18 w60 h60 round animation-spin animation--infinite",
    //     el.className = "marker";
    //     el.id = "marker";
    //     el.style.backgroundimage = 'url(https://placekitten.com/g/';
    //     // el.style.width = marker.properties.iconSize[0] + 'px';
    //     // el.style.height = marker.properties.iconSize[1] + 'px';
    //     // make a marker for each feature and add to the map
        
    //       new mapboxgl.Marker(el)
        
        
    //       .setLngLat(geojson.features[item].geometry.coordinates)
    //     // .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    //     //     .setHTML(`<h1>${marker.properties.Location}</h1>`))
    //       .addTo(this.map);
        
      
        
    //   })
      
    //   })
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

    this.map.on('click', 'neighborhoods', (e) => {
      // const coordinates = e.features[0].geometry.coordinates.slice();
      const name = e.features[0].properties.Name;
      
      new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<h1><b>${name}</b></h1>`)
                    .addTo(this.map);  
    } )
 
   
     
   
  }


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
