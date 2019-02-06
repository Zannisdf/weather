import React, { Component } from 'react';
import './App.css';
import WeatherInfo from './components/weatherInfo'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: [],
      current: {},
      condition: '',
      icon: ''
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const currPos = position.coords;
      console.log(currPos.latitude, currPos.longitude)
      this.getCurrWeather(currPos.latitude, currPos.longitude);
    }, this.error)
    setInterval(this.getTime, 1000)
  }

  getCurrWeather = (lat, lon) => {
    const key = '3c888c8fa4bd447eb2422702190602'
    fetch(`https://api.apixu.com/v1/current.json?key=${key}&q=${lat},${lon}`)
    .then( response => response.json())
    .then( data => this.setState({
      location: [data.location.name, data.location.country],
      current: {tempC: data.current.temp_c, tempF: data.current.temp_f},
      condition: data.current.condition.text,
      icon: data.current.condition.icon
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
    const { icon, condition, location, time, current } = this.state;
    return (
      <div className="App">
        <WeatherInfo 
          icon={icon}
          description={condition}
          city={location.join(', ')}
          time={time}
          temp={current.tempC}
          />
      </div>
    );
  }
}

export default App;
