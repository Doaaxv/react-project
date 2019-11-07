import React, { Component } from 'react'
import { Modal, Row, Col } from 'react-bootstrap'


export default class Rows extends Component {

    state = { modalIsOpen: false }

    toggleModel() {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }

    render() {
        
        return (


            <tr onClick={this.toggleModel.bind(this)}>
                <Modal show={this.state.modalIsOpen} onHide={this.toggleModel.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Flight Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <p><strong>Flight No: </strong>{this.props.items.flight.iataNumber}</p>
                                <p><strong>Departure Time:</strong>
                                    {this.props.items.departure.scheduledTime.split("T")[1].split(".")[0]}
                                </p>
                            </Col>

                            <Col>
                                <p><strong>Airline: </strong>{this.props.items.airline.name}</p>
                                <p><strong>Arrival time:</strong>
                                    {this.props.items.arrival.scheduledTime.split("T")[1].split(".")[0]}
                                </p>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>


                <td>{this.props.items.flight.iataNumber}</td>
                <td>{this.props.items.airline.name}</td>
                <td>{this.props.items.departure.scheduledTime.split("T")[1].split(".")[0]}</td>
                <td>{this.props.airport[0].nameAirport}</td>
                <td>{this.props.items.status}</td>
            </tr>
        )
    }
}
