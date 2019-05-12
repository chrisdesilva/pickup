import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './fire'
import './App.css'
import Map from './Components/Map'
import Homepage from "./Components/Homepage"

class App extends Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path ="/" component={Homepage} />
            <Route path ="/courts" component={Map} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
 