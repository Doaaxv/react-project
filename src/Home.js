import React, { Component } from 'react'
import FlightList from './FlightList'
import {
  Container,
  Form, FormControl, 
  Row, Col
} from 'react-bootstrap'
import axios from 'axios'
import credentials from "./credentials"

export default class Home extends Component {

  state = {
    cities: null,
    from: null,
    to: null,
    send: false,
    iataTo: null,
    iataFrom: null,
    showSearchBar: true,

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
  toggleSearchBar = (e) => {
    this.setState({ showSearchBar: !this.state.showSearchBar })
  }

  render() {
    console.log("window thingyyy " + window.location.href)
    var currentPath = window.location.href
    var indexOfpath = currentPath.lastIndexOf("/")
    var endOfpath = currentPath.slice(indexOfpath, currentPath.length - 1)
    console.log("kk " + endOfpath)

    return (
      <Container fluid >

        {this.state.showSearchBar == true &&
          endOfpath.length == 0 &&
          <Row className="justify-content-center" >
            <Form>
            {/* <Form.Row>
            <Form inline>
            <Form.Group as={Col}>
              <Form.Label className="formTitle" >Check flights time table</Form.Label>
              </Form.Group>
              </Form>
              </Form.Row> */}

              <Form.Row>
                <Form inline>
                  <Form.Group as={Col}>
                    <Form.Label className="h3Styles">From  </Form.Label>
                    <FormControl onChange={this.inputChange1}
                      type="text" placeholder="From" />
                    <Form.Label className="h3Styles">To  </Form.Label>
                    <FormControl onChange={this.inputChange2} type="text" placeholder="To" />
                  <a 
                  onClick={this.handleSearch}
                  className="button js-button"
                  role="button"
                  > Search</a>

                    {/* <a 
                    // type="submit" 
                    className="button-3d"
                      onClick={this.handleSearch}
                      // style={{ background: ' #e67e22', margin: '30px', border: '1px solid black' }}
                      >
                      Submit </a> */}
                  </Form.Group>
                </Form>
              </Form.Row>
            </Form>
          </Row>
        }

        {this.state.send == true &&
          <Row className="justify-content-center">
            <FlightList
              cityFrom={this.state.from}
              cityTo={this.state.to}
              iataFrom={this.state.iataFrom}
              iataTo={this.state.iataTo}
              cities={this.state.cities}
            />
          </Row>
        }
      </Container>
    )
  }
}
