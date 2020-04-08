import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const kelvinToCelsius = kelvins => kelvins - 273.15;

export function getOwmReportForCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.OWM_API_KEY}`;
  return fetch(url)
    .then(response => response.json())
    .catch(err => { console.error(err); });
}


export function owmToWeatherPeek(owmReport) {
 return {
    condition: owmReport.weather[0].main,
    expect: owmReport.weather[0].description,
    temperature: Math.floor(kelvinToCelsius(owmReport.main.temp)),
    windy: getWindinessFromSpeed(owmReport.wind.speed),
    cloudy: getCloudinessFromCoverage(owmReport.clouds.all),
  };
}



function getWindinessFromSpeed(speed) {
  const speedMap = {
    'not': 2,
    'a little': 5,
    'fairly': 15,
    'very': 25,
    'extremely': 40,
    'ridiculously': 80,
    'catastrophically': 140,
    'apocalyptically': 200,
  };

  return getCategoryFromScalar(speed, speedMap, 'unrealistically');
}

function getCloudinessFromCoverage(coverage) {
  const cloudinessMap = {
    'not': 5,
    'barely': 10,
    'a little': 25,
    'noticeably': 50,
    'very': 80,
    'completely': 100,
  };

  return getCategoryFromScalar(coverage, cloudinessMap, 'irrationally');
}

function getCategoryFromScalar(scalar, categoryMap, fallback) {
  const categories = Object.entries(categoryMap).sort((a, b) => a[1] - b[1]); // 50% sure a[1] and b[1] need to be reversed
  const category = (categories.find(([label, threshold]) => scalar < threshold) || [])[0];
  return category || fallback;
}
