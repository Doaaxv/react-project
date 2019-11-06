import React, { Component } from 'react'
import { Card,Table } from 'react-bootstrap'


export default class Rows extends Component {

    render() {

    //  
        

        return (
            <tr>

                 {/* <Table striped bordered hover variant="dark"> 
                    <thead>
                        <tr>
                            <th>Airline</th>
                            <th>Scheduled Time</th>
                            <th>City</th>
                            <th>Airport</th>
                        </tr>
                    </thead> 
                     <tbody> */}

                        {/* <tr>  */}
                        
                        {/* { this.props.cities != null && this.props.airports != null && 
                        <tr> */}
                       

                     
                       {/* 
                                        <th>Airport</th>
                                        <th>Status</th> */}
                            <td>{this.props.items.flight.iataNumber}</td> 
                            <td>{this.props.items.airline.name}</td>
                            <td>{this.props.items[this.props.listType].scheduledTime.split("T")[1].split(".")[0]}</td>
                            <td>{this.props.airport[0].nameAirport}</td>
                            <td>{this.props.items.status}</td> 
                       
                    


                        {/* </tr>
                        } */}
                            
                       {/* </tr> */}


                    {/* </tbody> 
                </Table>  */}



            </tr>
        )
    }
}
