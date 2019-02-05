import React, { Component } from 'react';
import './App.css';
import Tab from './components/tab'
import WeatherInfo from './components/weatherInfo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tab />
        <WeatherInfo />
      </div>
    );
  }
}

export default App;
