import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import db from '../fire'

class AddCourt extends React.Component {

  state = {
      name: '',
      address: '',
      image: '',
      latitude: 0,
      longitude: 0,
      mapsURL: ''
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  addCourt = e => {
    e.preventDefault()
    db.collection('courts').add({
      name: this.state.name,
      address: this.state.address,
      image: this.state.image,
      latitude: Number(this.state.latitude),
      longitude: Number(this.state.longitude),
      mapsURL: this.state.mapsURL
    })
    .then(function(docRef) {
      console.log("ID: ", docRef.id)
    })
    .catch(function(error) {
      console.error("Error: ", error)
    })
  }

  render() {
    return (
      <Form onSubmit={this.addCourt}>
      <Form.Group>
        <Form.Input 
          placeholder='Name of court' 
          name='name' 
          value={this.state.name} 
          onChange={this.handleChange} 
        />
        <Form.Input
          placeholder='Address of court'
          name='address'
          value={this.state.address}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder='Copy and paste image URL'
          name='image'
          value={this.state.image}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder='Latitude of court'
          name='latitude'
          type='number'
          value={this.state.latitude}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder='Longitude of court'
          name='longitude'
          type='number'
          value={this.state.longitude}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder='Copy and paste Google Maps URL'
          name='mapsURL'
          value={this.state.mapsURL}
          onChange={this.handleChange}
        />
        <Form.Button content='Submit' />
      </Form.Group>
    </Form>  
    )
  }
}

export default AddCourt