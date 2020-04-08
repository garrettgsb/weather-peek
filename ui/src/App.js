import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    fetch('/v1/weather')
    .then(response => response.json())
    .then((response) => {
            const { condition, expect, city, temperature, windy, cloudy } = response;
      this.setState({
        message: `${condition}: Expect ${expect} in ${city}. It's ${temperature}ºC outside, ${cloudy} cloudy, and ${windy} windy.`,
      });
    })
  }

  render() {
    return (
      <div className="App">
        <h1>{ this.state.message }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button>
      </div>
    );
  }
}

export default App;
