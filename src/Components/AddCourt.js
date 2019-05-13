import React from 'react'
import { Container, Form, Grid, Header, Image } from 'semantic-ui-react'
import db from '../fire'
import courtPhoto from '../Images/beach-court.jpg'

const style = {
  header: {
    margin: '2rem 0',
    fontSize: '2.5rem',
    color: 'black'
  },
  p: {
    fontSize: '1.25rem',
    padding: '0 3rem',
    color: 'black'
  },
  button: {
    display: 'flex',
    justifyContent: 'center'
  }
}

class AddCourt extends React.Component {

  state = {
      name: '',
      address: '',
      zip: '',
      image: '',
      latitude: 0,
      longitude: 0,
      mapsURL: ''
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  // make reference to courts collection on Firebase, add state object to database
  addCourt = e => {
    e.preventDefault()
    db.collection('courts').add({
      name: this.state.name,
      address: this.state.address,
      zip: this.state.zip,
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

    this.setState({
      name: '',
      address: '',
      zip: '',
      image: '',
      latitude: 0,
      longitude: 0,
      mapsURL: ''
    })
  }

  render() {
    return (
      <Container>
      <Header style={style.header} as='h2' id="h2" inverted textAlign='center'>Add A Court</Header>
      <Grid stackable>
        <Grid.Row verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <p style={style.p}>Know about a great court nearby? Enter the information in the form to the right then click submit!</p>
            <Image alt="Aerial view of a basketball court" rounded src={courtPhoto} />
            </Grid.Column>
          <Grid.Column>
            <Form onSubmit={this.addCourt}>
              <Form.Group>
                <Form.Input 
                  placeholder='Name of court' 
                  name='name' 
                  value={this.state.name} 
                  onChange={this.handleChange} 
                  width={16}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  placeholder='Street address (number and name)'
                  name='address'
                  value={this.state.address}
                  onChange={this.handleChange}
                  width={16}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  placeholder='Zip Code'
                  name='zip'
                  value={this.state.zip}
                  onChange={this.handleChange}
                  width={16}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  placeholder='Copy and paste Google Maps URL'
                  name='mapsURL'
                  value={this.state.mapsURL}
                  onChange={this.handleChange}
                  width={16}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  placeholder='Copy and paste image URL'
                  name='image'
                  value={this.state.image}
                  onChange={this.handleChange}
                  width={16}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label='Enter latitude of court'
                  name='latitude'
                  type='number'
                  value={this.state.latitude}
                  onChange={this.handleChange}
                  width={8}
                />
                <Form.Input
                  label='Enter longitude of court'
                  name='longitude'
                  type='number'
                  value={this.state.longitude}
                  onChange={this.handleChange}
                  width={8}
                />
              </Form.Group>
              <div style={style.button} >
                <Form.Button content='Submit' secondary />
              </div>
            </Form> 
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container> 
    )
  }
}

export default AddCourt