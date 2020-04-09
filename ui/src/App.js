import React, { useState } from 'react';
import './App.css';

const fetchData = () => {
  fetch('/v1/weather')
  .then(response => response.json())
  .then((response) => {
    const { condition, expect, city, temperature, windy, cloudy } = response;
    this.setState({
      message: `${condition}: Expect ${expect} in ${city}. It's ${temperature} outside, ${cloudy} cloudy, and ${windy} windy.`,
    });
  })
}

const App = () => {
  const state = useState({ message: 'Click the button to load data!' });
  return (
    <div className="App">
      <h1>{ state.message }</h1>
      <button onClick={fetchData} >
        Fetch Data
      </button>
    </div>
  );
}

export default App;
