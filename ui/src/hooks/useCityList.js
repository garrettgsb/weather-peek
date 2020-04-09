import { useState, useEffect } from 'react';
import { getWeatherForCity, getCitiesForAccount, addCityToAccount, removeCityFromAccount } from '../api.js';

const useCityList = (token) => {
  const [cities, setCities] = useState([]);
  useEffect(
    () => { (async () => { if (token) setCities(await getCitiesForAccount(token)) })() },
    [token]
  );
  const addCity = async (city) => {
    if (cities.find(_city => _city.name === city)) return;
    const cityWeather = await getWeatherForCity(city)
    setCities(prev => [...prev, cityWeather]);
    if (token) {
      addCityToAccount(city, token);
    }
  }

  const removeCity = async (cityName) => {
    setCities(prev => [...prev, cities.filter(city => city.name === cityName)]);
    if (token) {
      removeCityFromAccount(cityName, token);
    }
  }

  return {
    cities,
    addCity,
    removeCity,
  }
}

export default useCityList;
