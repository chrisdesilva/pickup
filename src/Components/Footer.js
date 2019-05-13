import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'

const style = {
  row: {
    padding: '0'
  }
}

const Footer = () => {
  return (
    <Grid id="footer">
      <Grid.Row style={style.row}>
       <p>Contribute at <a href="https://github.com/chrisdesilva/pickup" target="_blank" rel="noopener noreferrer"><Icon name="github" size="large" color="orange" id="icon"/></a></p>
      </Grid.Row>
      <Grid.Row style={style.row}>
        <Icon name="copyright outline"/> <a href="https://desilvadev.com" target="_blank" rel="noopener noreferrer">Chris DeSilva</a>
      </Grid.Row>
    </Grid>
  )
}

export default Footer