import React, { useState } from 'react';
import useCityList from './hooks/useCityList.js';
import './App.css';

const App = () => {
  const token = localStorage.getItem('token');
  const { cities, addCity } = useCityList(token);
  return (
    <div className="App">
      <h1>There is a button</h1>
      <button onClick={() => addCity()} >
        Fetch Data
      </button>
      <p>{JSON.stringify(cities)}</p>
    </div>
  );
}

export default App;
