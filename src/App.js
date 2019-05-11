import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";
import courtList from "./CourtList";
import FindACourt from "./FindACourt";

const MyLocation = () => <Icon circular inverted color="teal" name="map pin" />;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

class App extends Component {
  static defaultProps = {
    center: {
      lat: 30.2672,
      lng: -97.7431
    },
    zoom: 11
  };

  state = {
    center: {
      lat: "",
      lng: ""
    },
    showCourts: false
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(success =>
      this.setState({
        center: {
          lat: success.coords.latitude,
          lng: success.coords.longitude
        }
      })
    );
  }

  findCourts = () => {
    this.setState({
      showCourts: true
    })
    console.log(courtList[2].name)
    console.log(Math.abs(courtList[2].latitude - this.state.center.lat))
    console.log(Math.abs(courtList[2].longitude - this.state.center.lng))
  }

  render() {
    return (
      <div style={{ height: "90vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          center={this.state.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
        >
          {courtList.filter( court => Math.abs((court.latitude - this.state.center.lat) <= .4337015) && Math.abs((court.longitude - this.state.center.lng) <= .4337015))
            .map(court => {
              return <FindACourt
              lat={court.latitude}
              lng={court.longitude}
              name={court.name}
              address={court.address}
              image={court.image}
              url={court.mapsURL}
            />
             
            } 
          )}
          <MyLocation lat={this.state.center.lat} lng={this.state.center.lng} />
        </GoogleMapReact>
        <button onClick={this.findCourts}>Find Courts</button>
      </div>
    );
  }
}

export default App;
