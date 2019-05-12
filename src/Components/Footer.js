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
       Contribute at<a href="https://github.com/chrisdesilva/pickup" target="_blank" rel="noopener noreferrer"><Icon name="github" size="large" color="black" id="icon"/></a>
      </Grid.Row>
      <Grid.Row style={style.row}>
        <Icon name="copyright outline" color="black"/> Chris DeSilva
      </Grid.Row>
    </Grid>
  )
}

export default Footer