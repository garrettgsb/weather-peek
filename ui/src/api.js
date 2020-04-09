const apiGet = async (path) => (await fetch(path)).json();
const apiPost = async (path, body) => {
  return (await fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })).json();
}

export const getWeatherForCity = async (cityName) => {
  const queryStringParam = cityName ? `?city=${cityName}` : '';
  const response = await apiGet(`/v1/weather${queryStringParam}`);
  console.log(response);
  const { condition, expect, city, temperature, windy, cloudy } = response;
  return {
    ...response,
    message: `${condition}: Expect ${expect} in ${city}. It's ${temperature} outside, ${cloudy} cloudy, and ${windy} windy.`,
  };
}

export const getCitiesForAccount = async (token) => (await apiGet(`/v1/accounts/${token}`)).cities;
export const addCityToAccount = async (city, token) => await apiPost(`/v1/accounts/${token}/cities`, { city });
export const removeCityFromAccount = async (city, token) => await apiPost(`/v1/accounts/${token}/cities/${city}/delete`);
