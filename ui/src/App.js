import React, { useState, useRef, useEffect } from 'react';
import useCityList from './hooks/useCityList.js';
import Authenticate from './components/Authenticate.js';
import CitiesList from './components/CitiesList.js';
import { getAccount } from './api.js';
import './App.css';

const App = () => {
  const [token, _setToken] = useState(localStorage.getItem('token'));
  const [account, setAccount] = useState(null);
  const setToken = (token) => {
    localStorage.setItem('token', token);
    _setToken(token);
  }

  useEffect(() => {
    if (token) {
      (async () => setAccount(await getAccount(token)))();
    } else {
      setAccount(null);
    }
  }, [token]);

  const cityInputRef = useRef();
  const { cities, addCity, removeCity, persistCityList } = useCityList(token);

  return (
    <main className="app">
      <h1>Weather Peek</h1>
      <p>A weather dashboard for folks who can't be bothered with pesky numbers.</p>
      <p>Create a list of cities. Make an account to save your list and view it on any device.</p>
      <Authenticate account={account} setAccount={setAccount} setToken={setToken} persistCityList={persistCityList} />
      <form onSubmit={e => { e.preventDefault(); addCity(cityInputRef.current ? cityInputRef.current.value : null) }}>
        <input ref={cityInputRef} type='text' placeholder='Enter city name...' />
        <button type='submit'>Get weather for city</button>
      </form>
      <CitiesList cities={cities} removeCity={removeCity} />
    </main>
  );
}

export default App;
