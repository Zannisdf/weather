import React, { Component } from 'react';

class WeatherInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: false,
      weather: '',
      description: '',
      icon: '01n',
      temp: 0.0,
      city: '',
      time: ''
    }
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const currPos = position.coords;
      this.getCurrWeather(currPos.latitude, currPos.longitude);
    }, this.error)
    setInterval(this.getTime, 1000)
  }

  getCurrWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=85b4be71576890900bfcd3a946908d9e`)
    .then( response => response.json())
    .then( data => this.setState({
      weather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      temp: data.main.temp,
      city: data.name
    }));
  }

  error = () => this.setState({ error: true });

  formatTime = n => n < 10 ? `0${n}` : n; 

  getTime = () => {
    const currTime = new Date();
    this.setState({
      time: `${this.formatTime(currTime.getHours())}:${this.formatTime(currTime.getMinutes())}`
    })
  }

  render(){
    return(
      <div className="info_box">
        <p>{this.state.error ? "There's been an error, please try again" : ''}</p>
        <img src={`https://openweathermap.org/img/w/${this.state.icon}.png`} alt="Weather icon"></img>
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