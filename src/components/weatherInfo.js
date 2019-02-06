import React from 'react';

const WeatherInfo = ({ icon, description, city, time, temp }) => {
  return(
    <div className="info_box">
      <img src={icon} alt="Weather icon"></img>
      <p>{description}</p>
      <p>City: {city}</p>
      <p>Current time {time}</p>
      <p>Current temp: {temp}°C</p>
    </div>
  )
}

export default WeatherInfo;