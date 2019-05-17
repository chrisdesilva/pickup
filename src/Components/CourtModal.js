import React from 'react'
import { Header, Icon, Image, Modal } from 'semantic-ui-react'
import './Map.css'

const API_KEY = `${process.env.REACT_APP_DARK_SKY_API_KEY}`

const style = {
  weather: {
    marginTop: '1rem'
  },
  a: {
    color: 'black'
  }
}

class CourtModal extends React.Component {

  state = {
    showWeather: false,
    temp: '',
    conditions: ''
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
       </Modal>
    </div>
    )
  }
}

export default CourtModal