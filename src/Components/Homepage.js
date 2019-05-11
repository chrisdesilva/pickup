import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid } from 'semantic-ui-react'
import './Homepage.css'

const Homepage = () => {
  
  return (
    <Grid verticalAlign="middle" id="container">
      <Grid.Row>
        <Grid.Column>
          <h1>Pickup</h1>
          <h2>Find a court near you</h2>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Link to="/courts">
          <Button secondary>Find a Court</Button>
        </Link>
      </Grid.Row>
    </Grid>
  )
}

export default Homepage