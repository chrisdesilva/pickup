import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid } from 'semantic-ui-react'
import About from './About'
import Footer from './Footer'
import './Homepage.css'
import AddCourt from './AddCourt';

const Homepage = () => {
  
  return (
    <Grid verticalAlign="middle" id="container">
      <Grid.Row id="banner">
        <Grid.Column>
          <h1>Pick-up</h1>
          <h2>We find the court. You bring the game.</h2>
          <Link to="/courts">
           <Button id="btn-find" color="orange">Find a Court</Button>
          </Link>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row id="about">
        <About />
      </Grid.Row>
      <Grid.Row id="addCourt">
        <AddCourt />
      </Grid.Row>
      <Grid.Row id="footer">
        <Grid.Column>
          <Footer />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Homepage