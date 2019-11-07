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
                    <h2 className="aboutStyle">The flight timetable website shows you the flights of the coming 24 hours, 
                        from and to a city of your choice, you can filter the time of the flights by using the slider.
                         </h2>
                    </Col>
                    
                </Row>
                </Container> 
            </div>
        )
    }
}
