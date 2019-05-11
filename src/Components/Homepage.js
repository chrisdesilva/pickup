import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const Homepage = () => {
  
  return (
    <div>
      <h1>Pickup</h1>
      <h2>Find a court near you.</h2>
      <Link to="/courts"><Button>Find a Court</Button></Link>
    </div>
  )
}

export default Homepage