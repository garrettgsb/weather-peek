import { useState, useEffect } from 'react';
import { getWeatherForCity, getCitiesForAccount, addCityToAccount, removeCityFromAccount } from '../api.js';

const useCityList = (token) => {
  const [cities, setCities] = useState([]);
  const [ error, setError ] = useState(null);

  // Load cities for account if user has a token
  useEffect(
    () => { (async () => { if (token) setCities(await getCitiesForAccount(token)) })() },
    [token]
  );

  const addCity = async (city) => {
    if (!city || cities.find(_city => _city.city === city)) return;
    const cityWeather = await getWeatherForCity(city)
    if (cityWeather.error) return setError(cityWeather.error);

    setCities(prev => [...prev, cityWeather]);
    if (token) addCityToAccount(city, token);
  }

  const removeCity = async (cityName) => {
    setCities(prev => prev.filter(city => city.city !== cityName));
    if (token) removeCityFromAccount(cityName, token);
  }

  return {
    cities,
    error,
    addCity,
    removeCity,
  }
}

export default useCityList;
