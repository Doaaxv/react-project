import React, { Component } from 'react'
import {
    Jumbotron, Container,
    Form, Tab, Tabs, Button,
    FormControl, Table,
    Row, Col
} from 'react-bootstrap'
import Rows from './Rows'
import axios from 'axios'
import { Grid, Typography } from "@material-ui/core";
import RangeSlider from "./RangeSlider";
import credentials from "./credentials"

export default class FlightList extends Component {

    state = {
        timeTableDep: null,
        timeTableArr: null,

        airports: null,
        cities: null,

        rangeArrayDep: null,
        rangeObjDep: null,
        depRangeIndices: [],
        departureObjects: null,

        rangeArrayArr: null,
        rangeObjArr: null,
        arrRangeIndices: [],
        arrivedObjects: null,

        from: null,
        to: null
    }

    componentDidMount() {
        this.setState({ cities: this.props.cities })

        var timeTableDepUrl = `http://aviation-edge.com/v2/public/timetable?key=${credentials.API_KEY}&iataCode=${this.props.iataFrom}&type=departure`
        var timeTableArrUrl = `http://aviation-edge.com/v2/public/timetable?key=${credentials.API_KEY}&iataCode=${this.props.iataFrom}&type=arrival`
        var urlAirport = `https://aviation-edge.com/v2/public/airportDatabase?key=${credentials.API_KEY}`

        axios.get(urlAirport)
            .then(res => {
                this.setState({ airports: res.data })
            })
            .catch()

        axios.get(timeTableArrUrl)
            .then(res => {
                this.setState({ timeTableArr: res.data })
                this.rangeSetupArr(res.data)
                this.inputChange2(this.props.iataFrom, this.props.iataTo)
            })

        axios.get(timeTableDepUrl)
            .then(res => {
                this.setState({timeTableDep: res.data})
                this.rangeSetupDep(res.data)
                this.inputChange(this.props.iataFrom, this.props.iataTo)
            })
            .catch()
    }

    rangeUpdate = (rangeIndices,type) => {

        if(type == "to"){
        var rangeObjDep = this.state.departureObjects.filter((item, index) => {
            if (index < 30) {
                let v = item["departure"].scheduledTime
                let date = new Date(v).getHours();

                if (rangeIndices[0] <= date && date <= rangeIndices[1]) {
                    console.log("rangeIndices[0] " + rangeIndices[0])
                    console.log(date + " date")
                    console.log("rangeIndices[1] " + rangeIndices[1])
                    return item
                }
            }
        })
        this.setState({ rangeObjDep })
        }else{
            var rangeObjArr = this.state.arrivedObjects.filter((item, index) => {
                if (index < 30) {
                    let v = item["departure"].scheduledTime
                    let date = new Date(v).getHours();
    
                    if (rangeIndices[0] <= date && date <= rangeIndices[1]) {
                        console.log("rangeIndices[0] " + rangeIndices[0])
                        console.log(date + " date")
                        console.log("rangeIndices[1] " + rangeIndices[1])
                        return item
                    }
                }
            })
            this.setState({rangeObjArr})

        }
    }

    rangeSetupDep = (data) => {
        let timeArr;
        if (data != null) {

            //save all the time info in the timeArr
            timeArr = data.map((item, index) => {
                if (index < 50) {
                    let v = item["departure"].scheduledTime
                    let date = new Date(v).getHours();
                    return date
                }
            })

            //temporarly later I'll delete it!
            timeArr = timeArr.splice(0, 50)

            //this array stores how many occurance for each time is
            var rangeArray = new Array(24)

            //this array stores the percentage for each occurance
            // let percentageArr = new Array(24)

            //in this array I'll initialize the elements values of the array
            for (let i = 0; i < rangeArray.length; i++) {
                rangeArray[i] = 0
                // percentageArr[i] = 0
            }

            //storing the occurance for each time
            timeArr.map(item => {
                rangeArray[parseInt(item)] += 1
            })

            console.log("rangeArray")

            // this.setState({ rangeArray })

            //finding the largest index, from this we find the largest 'time' that occured in the range array
            var largestIndex = 0;
            for (let i = rangeArray.length - 1; i >= 0; i--) {
                if (rangeArray[i] != 0) {
                    largestIndex = i
                    break;
                }
            }

            //finding the smallest index, from this we find the smallest 'time' that occured in the range array
            var smallestIndex = 0
            for (let i = 0; i < rangeArray.length; i++) {
                if (rangeArray[i] != 0) {
                    smallestIndex = i
                    break;
                }
            }

            this.setState({
                rangeArrayDep: timeArr,
                depRangeIndices: [smallestIndex, largestIndex]
            })

        }
    }

    rangeSetupArr = (data) => {
        let timeArr;
        if (data != null) {

            //save all the time info in the timeArr
            timeArr = data.map((item, index) => {
                if (index < 50) {
                    let v = item["departure"].scheduledTime
                    let date = new Date(v).getHours();
                    return date
                }
            })

            //temporarly later I'll delete it!
            timeArr = timeArr.splice(0, 50)

            //this array stores how many occurance for each time is
            var rangeArray = new Array(24)


            //in this array I'll initialize the elements values of the array
            for (let i = 0; i < rangeArray.length; i++) {
                rangeArray[i] = 0
                // percentageArr[i] = 0
            }

            //storing the occurance for each time
            timeArr.map(item => {
                rangeArray[parseInt(item)] += 1
            })


            //finding the largest index, from this we find the largest 'time' that occured in the range array
            var largestIndex = 0;
            for (let i = rangeArray.length - 1; i >= 0; i--) {
                if (rangeArray[i] != 0) {
                    largestIndex = i
                    break;
                }
            }

            //finding the smallest index, from this we find the smallest 'time' that occured in the range array
            var smallestIndex = 0
            for (let i = 0; i < rangeArray.length; i++) {
                if (rangeArray[i] != 0) {
                    smallestIndex = i
                    break;
                }
            }


            this.setState({
                rangeArrayArr: timeArr,
                arrRangeIndices: [smallestIndex, largestIndex]
            })
        }
    }

    inputChange2 = (iataFrom, iataTo) => {
        var citiesFlights = this.state.timeTableArr.filter((item, index) => {
            if (index < 50) {
                if (item["departure"].iataCode == iataTo) {
                    return item
                }
            }
        })

        var filteredWithArrivals = citiesFlights.filter((item, index) => {
            if (index < 50) {
                if (item["arrival"].iataCode == iataFrom)
                    return item
            }
        })

        this.setState({ arrivedObjects: filteredWithArrivals })
    }

    inputChange = (iataFrom, iataTo) => {
        var citiesFlights = this.state.timeTableDep.filter((item, index) => {
            if (index < 50) {
                if (item["departure"].iataCode == iataFrom) {
                    return item
                }
            }
        })

        var filteredWithArrivals = citiesFlights.filter((item, index) => {
            if (index < 50) {
                if (item["arrival"].iataCode == iataTo)
                    return item
            }
        })

        this.setState({ departureObjects: filteredWithArrivals })

    }

    render() {

        return (
            <div >




                {/* <Jumbotron fluid>
                    <Container>
                        <Form className='formo'>

                            <Form.Row>
                                <Form inline>
                                    <Form.Group as={Col} controlId="formGridState">
                                     
                                        <p>From </p>
                                        <FormControl onChange={this.inputChange}

                                            type="text" placeholder="From" />
                                        <p>To </p>
                                        <FormControl type="text" placeholder="To" />
                                    </Form.Group>
                                </Form>

                                <Button type="submit" className="btn" style={{ background: ' #7443EA', margin: '30px', border: '1px solid black' }}>
                                    Submit </Button>

                            </Form.Row>
                        </Form>
                        {this.state.rangeArray != null &&
                            this.state.currObj != null &&
                            <Grid 
                                style={{ width: "30%", height: "30%", margin: "auto" }}
                                justify="center"
                            >
                                <Grid item xs={12} lg={8} style={{ textAlign: "center" }}>
                                    <RangeSlider data={this.state.rangeArray}
                                        start={this.state.smallestIndex}
                                        end={this.state.biggestIndex}
                                        rangeUpdate={this.rangeUpdate}
                                    />
                                </Grid>
                            </Grid>}
                    </Container>
                </Jumbotron> */}


                {this.state.rangeArrayDep != null &&
                    this.state.departureObjects != null &&
                    this.state.depRangeIndices.length > 0 &&
                    <div>
                        <Grid
                            style={{ background: "yellow", width: "30%", height: "30%", margin: "auto" }}
                            justify="center">
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <Typography variant="subtitle2">{"From " + this.props.iataFrom + " to " + this.props.iataTo}</Typography>
                            </Grid>
                            <Grid item xs={12} lg={8} style={{ textAlign: "center" }}>
                                <RangeSlider data={this.state.rangeArrayDep}
                                    start={this.state.depRangeIndices[0]}
                                    end={this.state.depRangeIndices[1]}
                                    rangeUpdate={this.rangeUpdate}
                                    type="to"
                                />
                            </Grid>
                        </Grid>
                    </div>
                }

                {this.state.rangeArrayArr != null &&
                    this.state.arrivedObjects != null &&
                    this.state.arrRangeIndices.length > 0 &&
                    <div>
                        <Grid
                            style={{ background: "yellow", width: "30%", height: "30%", margin: "auto" }}
                            justify="center">
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <Typography variant="subtitle2">{"From " + this.props.iataFrom + " to " + this.props.iataTo}</Typography>
                            </Grid>
                            <Grid item xs={12} lg={8} style={{ textAlign: "center" }}>
                                <RangeSlider 
                                    data={this.state.rangeArrayArr}
                                    start={this.state.arrRangeIndices[0]}
                                    end={this.state.arrRangeIndices[1]}
                                    rangeUpdate={this.rangeUpdate}
                                    type="from"
                                />
                            </Grid>
                        </Grid>
                    </div>
                }


                <div className="divOftable">
                    <Row>
                        <Col>
                            <h2>{"From " + this.props.iataFrom + " to " + this.props.iataTo}</h2>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Flight No.</th>
                                        <th>Airline</th>
                                        <th>Time</th>
                                        <th>Airport</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.timeTableDep != null &&
                                        this.state.rangeObjDep == null &&
                                        this.props.cities != null &&
                                        this.state.airports != null &&
                                        this.state.departureObjects != null &&
                                        this.state.departureObjects.map((item, index) => {
                                            if (index < 50) {
                                                return <Rows id={index}
                                                    listType="arrival"
                                                    city={
                                                        this.props.cities.filter(itemCity => {
                                                            var iata = item["arrival"].iataCode
                                                            if (itemCity.codeIataCity === iata) {
                                                                return itemCity.codeIataCity === iata
                                                            }

                                                        })
                                                    }
                                                    airport={
                                                        this.state.airports.filter(itemAirport => {
                                                            var iata = item["arrival"].iataCode
                                                            return itemAirport.codeIataAirport == iata
                                                        }
                                                        )}
                                                    items={item} />
                                            }
                                        })}

                                    {this.state.timeTableDep != null &&
                                        this.state.rangeObjDep != null &&
                                        this.props.cities != null &&
                                        this.state.airports != null &&
                                        this.state.departureObjects != null &&
                                        this.state.rangeObjDep.map((item, index) => {
                                            if (index < 50) {
                                                return <Rows id={index}
                                                    listType="arrival"
                                                    city={
                                                        this.props.cities.filter(itemCity => {
                                                            var iata = item["arrival"].iataCode
                                                            if (itemCity.codeIataCity === iata) {
                                                                return itemCity.codeIataCity === iata
                                                            }

                                                        })
                                                    }
                                                    airport={
                                                        this.state.airports.filter(itemAirport => {
                                                            var iata = item["arrival"].iataCode
                                                            return itemAirport.codeIataAirport == iata
                                                        }
                                                        )}
                                                    items={item} />
                                            }
                                        })}
                                </tbody>
                            </Table>

                        </Col>

                        <Col>
                            <h2>{"From " + this.props.iataTo + " to " + this.props.iataFrom}</h2>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Flight No.</th>
                                        <th>Airline</th>
                                        <th>Time</th>
                                        <th>Airport</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.timeTableArr != null &&
                                        this.props.cities != null &&
                                        this.state.airports != null &&
                                        this.state.arrivedObjects != null &&
                                        this.state.arrivedObjects.map((item, index) => {
                                            if (index < 50) {
                                                return <Rows id={index}
                                                    listType="arrival"
                                                    city={
                                                        this.props.cities.filter(itemCity => {
                                                            var iata = item["arrival"].iataCode
                                                            if (itemCity.codeIataCity === iata) {
                                                                return itemCity.codeIataCity === iata
                                                            }
                                                        })
                                                    }
                                                    airport={
                                                        this.state.airports.filter(itemAirport => {
                                                            var iata = item["arrival"].iataCode
                                                            return itemAirport.codeIataAirport == iata
                                                        }
                                                        )}
                                                    items={item} />
                                            }
                                        })}
                                </tbody>
                            </Table>
                        </Col>



                    </Row>
                </div>








            </div>
        )
    }
}
