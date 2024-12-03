# WeatherFetch Application

## Overview

The Weather Fetch App is a React-based web application that allows users to search for the weather of a city by entering its name. It fetches data from the OpenWeatherMap API and displays current weather information, including temperature, wind speed, weather description, and an icon representing the weather conditions. The app also handles loading states, errors, and provides a clean, user-friendly interface.

## Project Structure

```
CECS 470 - Project 5/
├── package.json
├── package-lock.json
├── node_modules/
├── weather-app/
│   ├── .env
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   ├── package.json
│   ├── node_modules/
├── reportWebVitals.js
```

### Key Files

- **.env**: Contains environment variables, such as the OpenWeather API key.
- **package.json**: Manages project dependencies and scripts.
- **App.js**: The main React component that handles the search, fetches weather data, and displays the results.
- **App.css**: The styles for the application.
- **index.js**: The entry point of the application, rendering the `App` component.
- **reportWebVitals.js**: For measuring performance (not directly involved in functionality).

---

## Key Functionalities

### 1. **City Weather Search**
   - **Input Field**: Users enter the name of the city they want to search for in a text input.
   - **Search Logic**: When the user presses the `Enter` key, a request is made to the OpenWeatherMap API using Axios to fetch weather data for the city.
   - **API Request**: The weather data is fetched using the OpenWeatherMap API endpoint: `https://api.openweathermap.org/data/2.5/weather`, passing the city name and API key.
   - **API Response**: If the city is found, the weather data is displayed on the screen. If the city is not found, an error message is shown.

### 2. **Weather Information Display**
   - **City Name and Country**: The name of the city and its country code are displayed.
   - **Temperature**: The current temperature in Fahrenheit is displayed.
   - **Weather Icon**: A weather icon is shown based on the current weather conditions (sunny, cloudy, etc.).
   - **Wind Speed**: The wind speed in meters per second is displayed.
   - **Weather Description**: A description of the weather (e.g., "clear sky", "cloudy") is displayed.

### 3. **Error Handling**
   - **City Not Found**: If the city entered by the user is not found in the API, a "City not found" error message is displayed.
   - **Loader**: A loading spinner is shown while the weather data is being fetched.

### 4. **Date and Time Formatting**
   - The app displays the current date in a readable format (e.g., "Monday, December 3 2024").

---

## Detailed Breakdown of the Code

### 1. **App.js**

This file contains the main logic of the Weather App.

#### Import Statements
```javascript
import { default as Loader } from 'react-loader-spinner'; // For the loading spinner
import React, { useState } from 'react'; // React hooks
import axios from 'axios'; // Axios for HTTP requests
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome icons
import { faFrown } from '@fortawesome/free-solid-svg-icons'; // Error icon
import './App.css'; // CSS styles
```

#### `GetWeather` Component
- **State Variables**:
  - `input`: Holds the user input (city name).
  - `weather`: An object containing the loading state, weather data, and error status.

#### `toDateFunction`
This function returns the current date formatted as `Weekday, Month Day Year`.

#### `handleSearch`
This function is triggered when the user presses `Enter`. It fetches weather data from OpenWeatherMap based on the entered city name. It logs the request URL and API response for debugging purposes.

```javascript
const handleSearch = async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    console.log("City name being searched:", input); // Debugging
    setWeather({ ...weather, loading: true }); // Set loading state
  
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    console.log("Request URL:", `${url}?q=${input}&units=imperial&appid=${apiKey}`); // Debugging
    
    try {
      const res = await axios.get(url, {
        params: {
          q: input,  // City name
          units: 'imperial',
          appid: apiKey,  // API key
        },
      });
      console.log("API Response:", res.data); // Debugging
      setWeather({ data: res.data, loading: false, error: false }); // Set weather data
    } catch (error) {
      console.log("API Error:", error.response?.data?.message || error.message); // Error handling
      setWeather({ data: {}, loading: false, error: true }); // Set error state
    } finally {
      setInput(''); // Clear input field
    }
  }
};
```

#### Rendering the Weather Data
- Displays the city, country, date, temperature, weather description, and wind speed.
- Displays the weather icon based on the fetched data.

### 2. **App.css**

The styling for the application includes the following:
- **App Container**: Centered container with a white background and shadow to create a card-like layout.
- **Search Bar**: A styled input field where the user enters the city name.
- **Weather Info**: Styles for the city name, temperature, and weather description.
- **Error Message**: Red text for error messages indicating when a city is not found.
- **Loading Spinner**: Displays a spinner while waiting for the API response.

---

## Setup Instructions

### 1. Clone the Repository
If you haven't already, clone the repository:

```bash
git clone <repository-url>
```

### 2. Install Dependencies
Navigate to the `weather-app` directory and install the necessary dependencies:

```bash
cd weather-app
npm install
```

### 3. Set Up the `.env` File
Ensure the `.env` file is placed inside the `weather-app` directory and contains your OpenWeatherMap API key:

```
REACT_APP_OPENWEATHER_API_KEY=your-api-key-here
```

### 4. Run the App
After installing the dependencies and setting up the `.env` file, start the development server:

```bash
npm start
```

This will launch the app in your browser at `http://localhost:3000`.

---

## Troubleshooting

### 1. **API Key Issue**
If you're seeing an error related to the API key, make sure:
- The `.env` file is in the correct directory (`weather-app`).
- The API key is valid and properly entered.

### 2. **"City Not Found" Error**
If a city cannot be found:
- Check the spelling of the city name.
- Ensure the city exists in the OpenWeatherMap database.

---

## Conclusion

This project demonstrates how to create a simple weather app using React and the OpenWeatherMap API. It covers state management, making API requests, handling errors, and displaying dynamic content in a user-friendly interface.
