import React from 'react'
import { Button, Form, Header, Icon, Image, Modal } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react'
import db from '../fire'
import './Map.css'

const API_KEY = `${process.env.REACT_APP_DARK_SKY_API_KEY}`

const style = {
  weather: {
    marginTop: '1rem'
  },
  a: {
    color: 'black'
  },
  p: {
    textAlign: 'left'
  }
}

class CourtModal extends React.Component {

  state = {
    showWeather: false,
    temp: '',
    conditions: '',
    dateTime: [],
    error: null
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleScheduleGame = e => {
    e.preventDefault();
    db.collection('courts').doc(this.props.id).update({
      dateTime: this.state.dateTime.toDate()
    })
    .then(function(docRef) {
      this.setState({error: null})
      console.log("ID: ", docRef.id)
    })
    .catch(function(error) {
      console.error("Error: ", error)
    })

    this.setState({
      dateTime: ''
    })
  }

  
  getWeather = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/${this.props.lat},${this.props.lng}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            showWeather: true,
            temp: Math.floor(result.currently.temperature),
            conditions: result.currently.summary
          })
        },
        (error) => {
          this.setState({ showWeather: false })
        }
      )
  }

  render() {
    return (
      <div>
      <Modal trigger={<Icon onClick={this.getWeather} inverted name="basketball ball" size="large" color="orange"/>}>
        <Modal.Content image>
        <Image wrapped size='medium' src={this.props.image} />
        <Modal.Description>
            <Header>{this.props.name}</Header>
            <p>{this.props.address}</p>
            {this.props.url && <a id="mapsLink" href={this.props.url} target="_blank" rel="noopener noreferrer">Open in Maps</a>}
            {this.state.showWeather && <p style={style.weather}>Current weather, <a style={style.a} href="https://darksky.net/poweredby" target="_blank" rel="noreferrer noopener">powered by Dark Sky</a>: {this.state.conditions}, {this.state.temp}°F</p>}
        </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        <p style={style.p}>Schedule a game</p>
          <Form onSubmit={this.handleScheduleGame}>
            <DateTimeInput
              clearable
              clearIcon={<Icon name="remove" color="red" />}
              dateTimeFormat={'MMMM Do YYYY, h:mm a'}
              popupPosition={'bottom center'}
              name="dateTime"
              placeholder="Select a date and time"
              value={this.state.dateTime}
              iconPosition="left"
              onChange={this.handleChange}
            />
            <Button secondary type="submit">Schedule Game</Button>
            {this.state.error && <p>{this.state.error}</p>}
            <p>Next game: {this.props.gameDateTime ? this.props.gameDateTime : "None scheduled"}</p>
          </Form>
        </Modal.Actions>
       </Modal>
    </div>
    )
  }
}

export default CourtModal