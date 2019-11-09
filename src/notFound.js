import React, { Component } from 'react'
import {
    Container
  } from 'react-bootstrap'
export default class notFound extends Component {
    render() {
        return (
            <div>
                <Container className="notFoundStyle">

                <h1>Error 404</h1>
                <h2>Page not found</h2>
                </Container>
             
            </div>
        )
    }
}
