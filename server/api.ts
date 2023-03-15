import axios from 'axios';

export const getSearchOptions = async (value: string) => {
  const apiKey = '10f3b9293d761df72964a0fe6e00e4f1';
  const response = await axios(
    `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=${5}&appid=${apiKey}`
  );
  return response;
};
export const getWeatherData = async (lat: string, lon: string) => {
  const apiKey = '10f3b9293d761df72964a0fe6e00e4f1';
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const response = await axios.get(url);
  const forecastData = {
    ...response.data.city,
    list: response.data.list.slice(0, 16),
  };
  return forecastData;
};
