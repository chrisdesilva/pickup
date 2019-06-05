import React from 'react'
import { Container, Grid, Header, Image } from 'semantic-ui-react'
import basketball from '../Images/solo-man.jpg'

const style = {
  textAlign: 'left',
  margin: '2rem 0',
  header: {
    margin: '2rem 0',
    fontSize: '2.5rem'
  },
  p: {
    fontSize: '1.25rem',
    padding: '0 3rem '
  },
  container: {
    padding: '2rem 0'
  }
}

const About = () => {
  
  return (
    <Container style={style.container}>
    <Header style={style.header} as='h2' id="h2" inverted textAlign='center'>About</Header>
      <Grid stackable>
        <Grid.Row verticalAlign="middle" centered style={style} columns={2}>
          <Grid.Column>
          <p style={style.p}>Shoot For Teams is designed to take the hassle out of finding nearby basketball courts for pickup games. With user-generated information about courts, you get a much more detailed experience than traditional search sites. Users can find basketball courts, schedule games, and even check weather conditions to ensure the court will be dry for gametime. We make it easy to find the court so you can get out and play.</p>
          </Grid.Column>
          <Grid.Column>
            <Image rounded src={basketball} alt="Man preparing to shoot a basketball" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default About