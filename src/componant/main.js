import axios from 'axios';
import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Map from './map.js';

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state={
            error: false,
            searchFor: '',
            cityName: '',
            lat: '',
            lon: '',
            forecast: [],
            movies: []
        };
        this.locationApiKey = process.env.REACR_APP_LOCATION_KEY;
        this.locationUrl = "https://us1.locationiq.com/v1/search.php?format=json";
        this.server = process.env.REACT_APP_SERVER_REMOTE
        this.forecastArr = [];
    }
    
    handleInputCity = (event) => {
        this.setState({searchFor: event.target.value});
        console.log('handleInputCity this.setState searchFor',this.state.searchFor);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({cityName: this.state.searchFor});
        this.handleSearchCity(this.state.searchFor);
    }
 
    handleSearchCity = (searchFor) => {
        const API = `${this.locationUrl}&key=${this.locationApiKey}&q=${searchFor}`;
        axios.get(API)

        .then(response => {
            this.setState({cityName:searchFor, lat:response.data[0].lat, lon:response.data[0].lon });
            this.getWeather(response.data[0].lat,response.data[0].lon);
            this.getMovies(searchFor);
        })

        .catch(err => {
            console.log(err);
            this.setState({error:`Sorry, I don't recognize that one! (${err.code}: ${err.message})`});
        })
    }


    

    render() {
        return (
        <div className="Main">
            <Alert show={this.state.error} onClose={() => this.setState({error:false})} dismissible>{this.state.error}</Alert>
            <Row>
                <Col id="mainInfo">
                    <div id="searchForm">
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Control type="text" onChange={this.handleInputCity} placeholder="Search for a city" />
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit">Explore!</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Card id="results">
                        <Card.Body>
                            <Card.Title>{this.state.cityName}</Card.Title>
                            <Card.Subtitle>Latitude: {Math.round(this.state.lat)}, <br />Longitude: {Math.round(this.state.lon)}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Map lat={this.state.lat} lon={this.state.lon}/>
                </Col>
            </Row>
            
        </div>
        );
    }
  }
  
  export default Main;