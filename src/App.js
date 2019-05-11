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
    console.log(Math.abs(courtList[1].latitude - this.state.center.lat))
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
          {this.state.showCourts && courtList.map(court => {
            return (Math.abs(court.latitude - this.state.center.lat <= .4337015) && Math.abs(court.longitude - this.state.center.lng <= .4337015) &&
              <FindACourt
                lat={court.latitude}
                lng={court.longitude}
                name={court.name}
                address={court.address}
                image={court.image}
              /> 
            )
          })}
          <MyLocation lat={this.state.lat} lng={this.state.lng} />
        </GoogleMapReact>
        <button onClick={this.findCourts}>Find Courts</button>
      </div>
    );
  }
}

export default App;
