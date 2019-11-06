import React, { Component } from 'react'
import FlightList from './FlightList'
import { Navbar, Nav } from 'react-bootstrap'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Jumbotron, Container,
  Form, Tab, Tabs, Button,
  FormControl, Table,
  Row, Col
} from 'react-bootstrap'
import Home from './Home'
import axios from 'axios'
import { Grid, Typography } from "@material-ui/core";
import RangeSlider from "./RangeSlider";
import credentials from "./credentials"

export default class App extends Component {

  state = {
    airports: null,
    cities: null,
    from: null,
    to: null,
    send: false,
    iataTo: null,
    iataFrom: null
  }

  componentDidMount() {
    // var urlCity = `https://aviation-edge.com/v2/public/cityDatabase?key=923903-590cb2`
    var urlCity = `https://aviation-edge.com/v2/public/cityDatabase?key=${credentials.API_KEY}`

    axios.get(urlCity)
      .then(res => {
        this.setState({ cities: res.data })
      })
      .catch()

  }

  inputChange1 = (e) => {
    var cityIata = this.state.cities.filter(item => {
      if (e.target.value.toUpperCase() == item.nameCity.toUpperCase()) {
        this.setState({
          from: e.target.value.toUpperCase(),
          iataFrom: item.codeIataCity
        })
        return item.codeIataCity
      }
    })
  }

  inputChange2 = (e) => {
    var cityIata = this.state.cities.filter(item => {
      if (e.target.value.toUpperCase() == item.nameCity.toUpperCase()) {
        this.setState({
          to: e.target.value.toUpperCase(),
          iataTo: item.codeIataCity
        })
        return item.codeIataCity
      }
    })
  }

  handleSearch = () => {
    this.setState({ send: true })
  }

  render() {

    return (
      <div>
        <Router>
          <Navbar bg="light" variant="light">
            <Navbar.Brand to="/home">Logo</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/departure">Departure</Nav.Link>
              <Nav.Link href="/arrival">Arrival</Nav.Link>
            </Nav>
          </Navbar>

          <Jumbotron fluid>
            <Container>
              <Form className='formo'>

                <Form.Row>
                  <Form inline>
                    <Form.Group as={Col} controlId="formGridState">
                      {/* onChange */}
                      <p>From </p>
                      <FormControl onChange={this.inputChange1}

                        type="text" placeholder="From" />
                      <p>To </p>
                      <FormControl onChange={this.inputChange2} type="text" placeholder="To" />
                    </Form.Group>
                  </Form>

                  {/* <Form.Group as={Col} controlId="formGridState"> */}
                  <a type="submit" className="btn"
                    onClick={this.handleSearch}
                    style={{ background: ' #7443EA', margin: '30px', border: '1px solid black' }}>
                    Submit </a>

                </Form.Row>
              </Form>
              {/* {this.state.rangeArray != null &&
                            this.state.currObj != null &&
                            <Grid
                                // className="styleThisDiv"
                                // container 
                                style={{ width: "30%", height: "30%", margin: "auto" }}
                                justify="center"

                            //  style={{ marginTop: "33px" }}
                            >

                                <Grid item xs={12} lg={8} style={{ textAlign: "center" }}>
                                    <RangeSlider data={this.state.rangeArray}
                                        start={this.state.smallestIndex}
                                        end={this.state.biggestIndex}
                                        rangeUpdate={this.rangeUpdate}
                                    />
                                </Grid>
                            </Grid>} */}
            </Container>
          </Jumbotron>

          {this.state.send == true &&
          
          <FlightList
            cityFrom={this.state.from}
            cityTo={this.state.to}
            iataFrom ={this.state.iataFrom}
            iataTo={this.state.iataTo}
            cities = {this.state.cities}
            // airport = {this.state.airports}
          />}


          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/departure"
              component={() => <FlightList listType="departure" />}
            />
            <Route path="/arrival"
              component={() => <FlightList listType="arrival" />}
            />
          </Switch>
        </Router>

      </div>
    )
  }
}
