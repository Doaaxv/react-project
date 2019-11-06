import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Home'
import About from "./About"
import notFound from "./notFound"
import logo from './logos.png'
export default class App extends Component {

  state = {
    showSearchBar:true,

  }

  toggleSearchBar = (e)=>{
    this.setState({showSearchBar:!this.state.showSearchBar})
  }

  render() {

    
    return (
      <div >
        <Router>
          <Navbar style={{background:"#fd7804"}} fixed="top" className="sticky-top" variant="light">
            <Navbar.Brand href="/"><img src={logo}/></Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/About" onClick={this.toggleSearchBar}>About</Nav.Link>
            </Nav>
          </Navbar>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/About" component={About}/>
            <Route  path="*" component={notFound} />
          </Switch>
        </Router>

      </div>
    )
  }
}
