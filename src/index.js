import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import 'mapbox-gl/dist/mapbox-gl.css';
// import { setActiveOption } from './redux/action-creators'
import Map from './components/map'
// import Toggle from './components/toggle'
import Legend from './components/legend'
// import Directions from './components/directions'

class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Map />
          <Legend />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
