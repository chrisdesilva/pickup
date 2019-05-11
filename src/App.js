import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Map from './Components/Map'
import Homepage from "./Components/Homepage";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path ="/" component={Homepage} />
          <Route path ="/courts" component={Map} />
        </div>
      </Router>
    );
  }
}

export default App;
