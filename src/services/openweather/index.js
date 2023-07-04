const openWeatherAPI_URL = 'http://api.openweathermap.org/';
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const getCity = async (cityName) => {
    const resultsLimit = 5;
    const url = openWeatherAPI_URL
        + '/geo/1.0/direct'
        + '?q=' + cityName
        + '&limit=' + resultsLimit
        + '&appid=' + apiKey;
    return fetch(url).then(res => res.json());
};

export const getWeather = async (lat, lon) => {
    const url = openWeatherAPI_URL
        + '/data/2.5/weather'
        + '?lat=' + lat
        + '&lon=' + lon
        + '&units=metric'
        + '&appid=' + apiKey;
    return fetch(url).then(res => res.json());
};