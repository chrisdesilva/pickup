import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import courtList from './CourtList'
import FindACourt from './FindACourt';
 
const MyLocation = () => <div>My Location</div>;
const API_KEY = `${process.env.REACT_APP_API_KEY}`
 
class App extends Component {
  static defaultProps = {
    center: {
      lat: 30.2672,
      lng: -97.7431
    },
    zoom: 11
  };

  state ={
    lat: '',
    lng: ''
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
        success => this.setState({ lat: success.coords.latitude, lng: success.coords.longitude })
    );
}



 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '90%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

        {courtList.map( court => {
          return <FindACourt
            lat={court.latitude}
            lng={court.longitude}
            name={court.name}
            address={court.address}
            image={court.image}
          />
        })}
          <MyLocation
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default App;
