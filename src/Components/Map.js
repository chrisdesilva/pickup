import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import './Map.css';
import courtList from "../CourtList";
import FindACourt from "./FindACourt";

const MyLocation = () => <Icon circular inverted color="teal" name="map pin" />;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

class Map extends Component {
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
  }

  render() {
    return (
      <div style={{ height: "80vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          center={this.state.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.state.showCourts && courtList.filter( court => Math.abs((court.latitude - this.state.center.lat) <= .4337015) && Math.abs((court.longitude - this.state.center.lng) <= .4337015))
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
        <div id="modalContainer">
          <Modal trigger={<Button color="orange" onClick={this.findCourts}>Show Nearby Courts</Button>}>
            <Modal.Content>
            <Modal.Description>
                <Header>Nearby Courts</Header>
                <p>To find nearby courts, close this modal and move the map around.</p>
                <p>Look for the <Icon inverted name="basketball ball" size="large" color="orange"/> and click/tap to open information</p>
            </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Map;
