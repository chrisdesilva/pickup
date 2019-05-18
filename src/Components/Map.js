import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Button, Header, Icon, Modal } from "semantic-ui-react"
import { Link } from 'react-router-dom'
import db from '../fire'
import './Map.css';
import FindACourt from "./FindACourt"

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
    showCourts: false,
    Courts: []
  };

  // get current user location and set map to center on that location
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(success =>
      this.setState({
        center: {
          lat: success.coords.latitude,
          lng: success.coords.longitude
        }
      })
    );
    // pull data from database to have courts ready for display when component is ready
    db.collection('courts').get()
      .then(querySnapshot => {
        const Courts = []
        querySnapshot.forEach(function(doc) {
          Courts.push({
            address: doc.data().address,
            image: doc.data().image,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            mapsURL: doc.data().mapsURL,
            name: doc.data().name,
            zip: doc.data().zip,
            gameDateTime: doc.data().dateTime,
            id: doc.id
          })
        })
        this.setState({ Courts })
      })
      .catch(function(error) {
        console.log(error)
      })

  }

  componentDidUpdate() {
    db.collection('courts').get()
      .then(querySnapshot => {
        const Courts = []
        querySnapshot.forEach(function(doc) {
          Courts.push({
            address: doc.data().address,
            image: doc.data().image,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            mapsURL: doc.data().mapsURL,
            name: doc.data().name,
            zip: doc.data().zip,
            gameDateTime: doc.data().dateTime,
            id: doc.id
          })
        })
        this.setState({ Courts })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  findCourts = () => {
    this.setState({
      showCourts: true
    })
  }

  render() {
    return (
      <div style={{ height: "80vh", width: "100vw" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          center={this.state.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.state.showCourts && this.state.Courts
            .map(court => {
              return <FindACourt key={court.address}
              lat={court.latitude}
              lng={court.longitude}
              name={court.name}
              address={court.address}
              image={court.image}
              url={court.mapsURL}
              gameDateTime={court.gameDateTime}
              id={court.id}
            />
             
            } 
          )}
          <MyLocation lat={this.state.center.lat} lng={this.state.center.lng} />
        </GoogleMapReact>
        <div id="modalContainer">
          <Modal trigger={<Button color="orange" onClick={this.findCourts}>Show Nearby Courts</Button>} closeIcon>
            <Modal.Content>
            <Modal.Description>
                <Header>Nearby Courts</Header>
                <h3>**Location must be enabled to see map. Otherwise, you'll just see floating basketballs in a sea of gray.**</h3>
                <p>To find nearby courts, close this box and move the map around.</p>
                <p>Look for the <Icon inverted name="basketball ball" size="large" color="orange"/> and click/tap to open information</p>
            </Modal.Description>
            </Modal.Content>
          </Modal>
          <Link to="/">
              <Button secondary>Home Page</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Map;
