import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Button, Grid, Icon } from "semantic-ui-react"
import { Link } from 'react-router-dom'
import db from '../fire'
import './Map.css';
import FindACourt from "./FindACourt"
import 'firebase/firestore';

const MyLocation = () => <Icon circular inverted color="teal" name="map pin" />;
const API_KEY = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;

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
      lat: null,
      lng: null
    },
    showCourts: false,
    loggedIn: null,
    Courts: []
  };

  // get current user location and set map to center on that location
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(success =>
      this.setState({
        center: {
          lat: Number(success.coords.latitude),
          lng: Number(success.coords.longitude)
        },
        showCourts: true
      })
    );

    // pull data from database to have courts ready for display when component is ready
    db.collection('courts').get()
      .then(querySnapshot => {
        const Courts = []
        querySnapshot.forEach(function(doc) {
          Courts.push({
            address: doc.data().address,
            avgRating: doc.data().avgRating,
            ratings: doc.data().ratings,
            image: doc.data().image,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            mapsURL: doc.data().mapsURL,
            name: doc.data().name,
            indoor: doc.data().indoor,
            zip: doc.data().zip,
            gameDateTime: doc.data().dateTime,
            id: doc.id
          })
        })
        console.log(Courts);
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
            avgRating: doc.data().avgRating,
            ratings: doc.data().ratings,
            image: doc.data().image,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            mapsURL: doc.data().mapsURL,
            name: doc.data().name,
            indoor: doc.data().indoor,
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

  render() {
    return (
      <div style={{ height: "70vh", width: "100vw" }}>
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
              indoor={court.indoor}
              address={court.address}
              avgRating={court.avgRating}
              numRatings={court.ratings == null ? 0 : court.ratings.length}
              image={court.image}
              url={court.mapsURL}
              gameDateTime={court.gameDateTime}
              id={court.id}
            />
             
            } 
          )}
          <MyLocation lat={this.state.center.lat} lng={this.state.center.lng} />
        </GoogleMapReact>
        <Grid id="mapInfo">
            <Grid.Row >
              <Grid.Column>
              <h3>**Location must be enabled to see map. Otherwise, you'll just see floating basketballs in a sea of gray.**</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p>Look for an orange <Icon inverted name="basketball ball" size="large" color="orange"/> icon to find scheduled games</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p>Look for a black <Icon inverted name="basketball ball" size="large" color="black"/> icon to find a court without a scheduled game</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Link to="/">
                  <Button secondary animated>
                    <Button.Content visible>Home Page</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Map;
