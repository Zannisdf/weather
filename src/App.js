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
      icon: '',
      forecast: []
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
    const key = '3c888c8fa4bd447eb2422702190602',
          daysNumber= '5';
    fetch(`https://api.apixu.com/v1/forecast.json?key=${key}&q=${lat},${lon}&days=${daysNumber}`)
    .then( response => response.json())
    .then( data => this.setState({
      location: [data.location.name, data.location.country],
      current: {tempC: data.current.temp_c, tempF: data.current.temp_f},
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      forecast: data.forecast.forecastday.map(day => ({
        date: day.date,
        temp: {
          maxTempC: day.day.maxtemp_c,
          maxTempF: day.day.maxtemp_f,
          minTempC: day.day.mintemp_c,
          minTempF: day.day.mintemp_f
        },
        condition: day.day.condition.text,
        icon: day.day.condition.icon
      }))
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
    const { icon, condition, location, time, current, forecast } = this.state;
    return (
      <div className="App">
        <WeatherInfo
          icon={icon}
          description={condition}
          city={location.join(', ')}
          time={time}
          temp={current.tempC} />
        <div className="forecast">
        {forecast.map( day => 
          <WeatherInfo
            icon={day.icon}
            description={day.description}
            max={day.temp.maxTempC}
            min={day.temp.minTempC}
            key={day.date} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
