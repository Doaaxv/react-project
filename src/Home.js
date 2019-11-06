import React, { Component } from 'react'
import {Jumbotron, Container } from 'react-bootstrap'
import airplaneImg from './airplane.jpg'

export default class Home extends Component {
    render() {
        return (
            <div>
               

        <Jumbotron className="jumbotronStyle">
          <Container>
            {/* <img fluied src={airplaneImg} fluid /> */}
            
          </Container>
        </Jumbotron>
            </div>
        )
    }
}
