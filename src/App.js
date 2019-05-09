import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import courtList from './CourtList'
import FindACourt from './FindACourt';
 
const MyLocation = () => <div>My Location</div>;
 
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
          bootstrapURLKeys={{ key: 'AIzaSyBJxTAYmMdPWBL8jO2dUNGWwz7_fgivWFs' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

        {courtList.map( court => {
          return <FindACourt
            lat={court.latitude}
            lng={court.longitude}
            name={court.name}
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
