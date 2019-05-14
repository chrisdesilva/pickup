import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { Link } from 'react-router-dom'
import { Button, Grid } from 'semantic-ui-react'
import About from './About'
import AddCourt from './AddCourt';
import Footer from './Footer'
import './Homepage.css'



const Homepage = () => {

  const [ login, setLogin ] = useState(false)
  
  const responseGoogle = (response) => {
    console.log(response)
    setLogin(true)
  }

  const logout = () => {
    setLogin(false)
  }
  
  return (
    <Grid verticalAlign="middle" id="container">
      <Grid.Row id="banner">
        <Grid.Column>
          <h1>Pick-up</h1>
          <h2>We find the court. You bring the game.</h2>
          <Button.Group vertical>
            <Link to="/courts">
              <Button id="btn-find" color="orange">Find a Court</Button>
            </Link>
            {!login && 
            <GoogleLogin
              clientId="338252289336-47ahsrb9da9ftds94degqkp1946d40ev.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />}
            {login &&
              <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={logout}
              >
              </GoogleLogout>
            }
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      {login && <Grid.Row id="addCourt">
        <AddCourt />
      </Grid.Row>}
      <Grid.Row id="about">
         <About />
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