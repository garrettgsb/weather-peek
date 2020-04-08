import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const kelvinToCelsius = kelvins => kelvins - 273.15;

export const getOwmReportForCity = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.OWM_API_KEY}`;
  return fetch(url)
  .then(response => response.json())
  .catch(err => { console.error(err); });
};


export const owmToWeatherPeek = (owmReport) => ({
  condition: owmReport.weather[0].main,
  expect: owmReport.weather[0].description,
  temperature: Math.floor(kelvinToCelsius(owmReport.main.temp)),
  windSpeed: owmReport.wind.speed,
});
