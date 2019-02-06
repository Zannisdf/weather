import React from 'react';

const WeatherInfo = ({ icon, description, city, time, temp, max, min }) => {
  return(
    <div className="info_box">
      <img src={icon} alt="Weather icon"></img>
      <p>{description}</p>
      <p>{city}</p>
      <p>{time}</p>
      <p>Current temp: {temp}°C</p>
      <p>Max: {max}</p>
      <p>Min: {min}</p>
    </div>
  )
}

export default WeatherInfo;