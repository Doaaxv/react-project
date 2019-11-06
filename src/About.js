import React, { Component } from 'react'
import {
    Row, Col,Container
  } from 'react-bootstrap'
export default class Clocks extends Component {
    render() {
        return (
            <div>
                <Container justify="center" >
                <Row>
                    <Col >
                    <p>The flight timetable website shows you the flights from and to a city of you choice,
                        you can filter the time of the flights.
                         </p>
                    </Col>
                    
                </Row>
                </Container> 
            </div>
        )
    }
}
