import React, { Component } from 'react';

class WeatherInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      weather: '',
      description: '',
      temp: 0.0,
      city: '',
      time: ''
    }
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude,
          lon = position.coords.longitude;
      console.log(lat, lon)
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=85b4be71576890900bfcd3a946908d9e`)
      .then( response => response.json())
      .then( data => this.setState({
        weather: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        city: data.name
      }))
    })
    setInterval(this.getTime, 1000)
  }

  getTime = () => {
    const currTime = new Date();
    this.setState({
      time: `${currTime.getHours()}:${currTime.getMinutes()}:${currTime.getSeconds()}`
    })
  }

  render(){
    return(
      <div className="info_box">
        <p>Weather: {this.state.weather}</p>
        <p>{this.state.description}</p>
        <p>City: {this.state.city}</p>
        <p>Current time {this.state.time}</p>
        <p>Current temp: {this.state.temp}°C</p>
      </div>
    )
  }
}

export default WeatherInfo;