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
  return await apiGet(`/v1/weather${queryStringParam}`);
}

export const getCitiesForAccount = async (token) => (await apiGet(`/v1/accounts/${token}`)).cities;
export const addCityToAccount = async (city, token) => await apiPost(`/v1/accounts/${token}/cities`, { city });
export const removeCityFromAccount = async (city, token) => await apiPost(`/v1/accounts/${token}/cities/${city}/delete`);

export const signup = async (name, password) => await apiPost('/v1/accounts', { name, password });
export const login = async (name, password) => await apiPost('/v1/authenticate', { name, password });
export const getAccount = async (token) => await apiGet(`/v1/accounts/${token}`);
