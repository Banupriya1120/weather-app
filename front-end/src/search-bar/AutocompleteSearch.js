import Autocomplete from "react-google-autocomplete";
import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

export default function AutocompleteSearch() {
    const [weatherData, setWeatherData] = useState([]);
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };
    function getWeatherDetails(location) {
        // console.log(location,'location', location.formatted_address);
        let cityName = "";
        let matches = location.address_components.filter(address_component =>
            ["locality", "colloquial_area"].some(word => ~address_component.types.indexOf(word)))

        if (!matches || !matches.length) {
            alert("Please enter valid city");
        } else {
            cityName = matches[0].short_name; // Prints : Minsk
            axios.post('http://127.0.0.1:8000/api/weather-details', { "city": cityName }, {
                headers: headers
            })
                .then(response => {
                    setWeatherData(response.data);

                })
                .catch(error => {
                    console.error(error);

                });
        }

    }
    return (
        <div >
            <h3>Weather App</h3>
            <Autocomplete
                className="mb-3"
                aria-describedby="basic-addon2"
                apiKey={'APIKEY'}
                style={{ width: "50%" }}
                placeholder="Enter city name"
                onPlaceSelected={(place) => {
                    getWeatherDetails(place);
                }}
                options={{
                    types: ["(cities)"],
                    componentRestrictions: { country: "in" },
                }}
          />


        <div className="weather_section">
            <p><b>Location:</b> {weatherData.city}</p>
            <p><b>Temp:</b> {weatherData.temp} {weatherData.temp ? "°C" : null}</p>
            <p><b>Description:</b> {weatherData.description}</p>
            <p><b>Humidity:</b> {weatherData.humidity} {weatherData.humidity ? "%" : null }</p>
            </div>
            <small><span style={{color: "red"}}>Note:</span> search locations restricted to indian cities due to cost of places API</small>
        </div>
    );

}