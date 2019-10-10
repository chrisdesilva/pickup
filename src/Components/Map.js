import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Button, Grid, Icon, Modal } from "semantic-ui-react"
import { DateTimeInput } from 'semantic-ui-calendar-react'
import { Link } from 'react-router-dom'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import db from '../fire'
import './Map.css';
import FindACourt from "./FindACourt"

const MyLocation = () => <Icon circular inverted color="teal" name="map pin" />;
const API_KEY = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
const moment = extendMoment(Moment);

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
    Courts: [],
    startDate: null,
    endDate: null
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

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
    debugger
  }

  handleFilterCourts = e => {
    e.preventDefault()
    console.log("filter")

    // db.collection('courts').get()
    //   .then(querySnapshot => {
    //     const Courts = []
    //     querySnapshot.forEach(function(doc) {
    //       if (doc.data().dateTime)
    //       Courts.push({
    //         address: doc.data().address,
    //         image: doc.data().image,
    //         latitude: doc.data().latitude,
    //         longitude: doc.data().longitude,
    //         mapsURL: doc.data().mapsURL,
    //         name: doc.data().name,
    //         zip: doc.data().zip,
    //         gameDateTime: doc.data().dateTime,
    //         id: doc.id
    //       })
    //     })
    //
    //     this.setState({ Courts })
    //   })
    //   .catch(function(error) {
    //     console.log(error)
    //   })
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
                <p>Find courts with games between these dates and times:</p>
                  <DateTimeInput
                    clearable
                    clearIcon={<Icon name="remove" color="red" />}
                    name="startDate"
                    value={this.state.startDate}
                    dateTimeFormat={'MMMM Do YYYY, h:mm a'}
                    popupPosition={'bottom center'}
                    placeholder="From"
                    iconPosition="left"
                    onChange={this.handleChange}
                  />
                  <DateTimeInput
                    clearable
                    clearIcon={<Icon name="remove" color="red" />}
                    name="endDate"
                    value={this.state.endDate}
                    dateTimeFormat={'MMMM Do YYYY, h:mm a'}
                    popupPosition={'bottom center'}
                    placeholder="To"
                    iconPosition="left"
                    onChange={this.handleChange}
                  />
                  {this.state.startDate && this.state.endDate && <Modal trigger={<Button secondary type="submit" onClick={this.handleFilterCourts}>Filter Courts</Button>} basic size="small">
                    <Modal.Description><p style={{textAlign: 'center'}}>Courts filtered</p></Modal.Description>
                  </Modal>}
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
