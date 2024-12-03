import { default as Loader } from 'react-loader-spinner'; // Correct import
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

// GetWeather component that fetches weather data
function GetWeather() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  // Function to handle date formatting
  const toDateFunction = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentDate = new Date();
    return `${weekdays[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${currentDate.getDate()}`;
  };

  // API key retrieved from the .env file
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // Log the API key to check if it's being loaded correctly
  console.log("API Key:", apiKey); 

  // Function to fetch weather from OpenWeatherMap
  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log("City name being searched:", input); // Check if input is correct
      setWeather({ ...weather, loading: true });
  
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      
      // Log the request URL and parameters to debug
      console.log("Request URL:", `${url}?q=${input}&units=imperial&appid=${apiKey}`);
      
      try {
        const res = await axios.get(url, {
          params: {
            q: input,  // Ensure input is being passed here
            units: 'imperial',
            appid: apiKey,
          },
        });
        console.log("API Response:", res.data); // Confirm successful response
        setWeather({ data: res.data, loading: false, error: false });
      } catch (error) {
        console.log("API Error:", error.response?.data?.message || error.message);
        setWeather({ data: {}, loading: false, error: true });
      } finally {
        setInput(''); // Clear input after the API call
      }
    }
  };

  return (
    <div className="App">
      <h1 className="app-name">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City"
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      {weather.loading && (
        <>
          <br />
          <br />
          <Loader type="Oval" color="black" height={100} width={100} />
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}>City not found</span>
          </span>
        </>
      )}
      {weather.data && weather.data.main && weather.data.weather && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp">
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°F</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description}</p>
            <p>Wind Speed: {weather.data.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetWeather;