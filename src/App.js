import React, { Component } from 'react';
import './App.css';
import WeatherInfo from './components/weatherInfo'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      weather: '',
      description: '',
      icon: '',
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

  render() {
    const { icon, weather, description, city, time, temp } = this.state;
    return (
      <div className="App">
        <WeatherInfo 
          icon={icon}
          weather={weather}
          description={description}
          city={city}
          time={time}
          temp={temp}
          />
      </div>
    );
  }
}

export default App;
