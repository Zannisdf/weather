import React from 'react';

const WeatherInfo = ({ icon, weather, description, city, time, temp }) => {
  return(
    <div className="info_box">
      <img src={`https://openweathermap.org/img/w/${icon}.png`} alt="Weather icon"></img>
      <p>Weather: {weather}</p>
      <p>{description}</p>
      <p>City: {city}</p>
      <p>Current time {time}</p>
      <p>Current temp: {temp}°C</p>
    </div>
  )
}

export default WeatherInfo;