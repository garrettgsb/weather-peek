import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const kelvinToCelsius = kelvins => kelvins - 273.15;

export async function getReportForCity(city) {
  const owmReport = await getOwmReportForCity(city);
  return owmToWeatherPeek(owmReport);
}

export function getOwmReportForCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.OWM_API_KEY}`;
  return fetch(url)
    .then(response => response.json())
    .catch(err => { console.error(err); });
}

export function owmToWeatherPeek(owmReport) {
  try {
    return {
       condition: owmReport.weather[0].main,
       expect: owmReport.weather[0].description,
       temperature: getWarmnessFromTemperature(kelvinToCelsius(owmReport.main.temp)),
       windy: getWindinessFromSpeed(owmReport.wind.speed),
       cloudy: getCloudinessFromCoverage(owmReport.clouds.all),
     };
  } catch (err) {
    console.error(err);
    return {
      error: 'Failed to create weather report',
    };
  }
}

export const cityNamesToReports = async (cities=[]) =>
  await Promise.all(
    cities.map(
      async city => ({...await getReportForCity(city), city })
    )
);

export function getWarmnessFromTemperature(temperature) {
  const tempMap = {
    'super cold': -40,
    'very cold': -20,
    'cold': -10,
    'kind of cold': 0,
    'cool': 10,
    'kind of cool': 15,
    'warm': 20,
    'hot': 30,
    'very hot': 35,
    'super hot': Infinity, // https://superhotgame.com/play-prototype/
  };

  return getCategoryFromScalar(temperature, tempMap);
}

export function getWindinessFromSpeed(speed) {
  const speedMap = {
    'not': 2,
    'a little': 5,
    'fairly': 15,
    'very': 25,
    'extremely': 40,
    'ridiculously': 80,
    'catastrophically': 140,
    'apocalyptically': Infinity,
  };

  return getCategoryFromScalar(speed, speedMap);
}

export function getCloudinessFromCoverage(coverage) {
  const cloudinessMap = {
    'not': 5,
    'barely': 10,
    'a little': 25,
    'noticeably': 50,
    'very': 80,
    'completely': Infinity,
  };

  return getCategoryFromScalar(coverage, cloudinessMap);
}

export function getCategoryFromScalar(scalar, categoryMap, fallback) {
  const categories = Object.entries(categoryMap).sort((a, b) => a[1] - b[1]); // 50% sure a[1] and b[1] need to be reversed
  const category = (categories.find(([label, threshold]) => scalar <= threshold) || [])[0];
  return category || fallback;
}
