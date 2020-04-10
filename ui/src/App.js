import React, { useState, useRef } from 'react';
import useCityList from './hooks/useCityList.js';
import CitiesList from './components/CitiesList.js';
import './App.css';

const App = () => {
  const [token, _setToken] = useState(localStorage.getItem('token'));
  const setToken = (token) => {
    localStorage.setItem('token', token);
    _setToken(token);
  }

  const cityInputRef = useRef();
  const { cities, addCity, removeCity } = useCityList(token);

  return (
    <main className="app">
      <h1>Weather Peek</h1>
      <p>A weather dashboard for folks who can't be bothered with things like how many degrees it is out.</p>
      <button onClick={() => setToken('f16bccbd-192a-4bae-90a9-bd4bb510746e')} >
        Token 1
      </button>
      <button onClick={() => setToken('8970ea45-bd4e-4184-ab39-493d6da80979')} >
        Token 2
      </button>
      <form onSubmit={e => { e.preventDefault(); addCity(cityInputRef.current ? cityInputRef.current.value : null) }}>
        <input ref={cityInputRef} type='text' placeholder='Enter city name...' />
        <button type='submit'>Get weather for city</button>
      </form>
      <CitiesList cities={cities} removeCity={removeCity} />
    </main>
  );
}

export default App;
