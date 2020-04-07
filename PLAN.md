SCHEMA

api_keys
  key
  email

inspirational_weather_quotes
  text



ROUTES

app.get('/v1/weather', async (req, res) => {
  const { key, city } = req.params;
  // handle too many API calls (> 60/min)
  // handle DOS from unauthorized IP
  const owmData = await request(`https://api.openweathermap.org/data/2.5/weather?q=${city || 'vancouver'}&appid=${process.env.apiKey}`);
  const weather = getWeatherFromOwm(owmData);
  res.json({
    condition: 'Drizzle',
    temperature: 14,
    windy: 'a little',
    cloudy: 'very',
  })
})


UTILS

function getWeatherFromOwm(owmData) {
  return {
    condition: owmData.weather.main,
    temperature: kelvinToCelsius(owmData.main.temp),
    windy: getWindinessFromSpeed(owmData.wind.speed),
    cloudy: getCloudinessFromCoverage(owmData.clouds.all),
  }
};

function getWindinessFromSpeed(speed) {
  const speedMap = {
    'not': 5
    'a little': 10,
    'fairly': 20,
    'very': 50,
    'extremely': 80,
    'ridiculously': 100,
    'catastrophically': 140,
    'apocalyptically': 200,
  };

  return getCategoryFromScalar(speed, speedMap, 'unrealistically');
}

function getCloudinessFromCoverage(coverage) {
  const cloudinessMap = {
    'not': 5
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
  const category = categories.find(([label, threshold]) => speed < threshold);
  return category || fallback;
}
