import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="tabs">
          <div className="tab tab-active">
            <p>Today</p>
          </div>
          <div className="tab tab-inactive">
            <p>Week</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
