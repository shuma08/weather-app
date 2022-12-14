
import axios from "axios";

const API_KEY = '4525b21e7c56d35975dfb848bd0616ca'

const WeatherInstance = (city, units = 'metric') =>
    axios.create({
        baseURL: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`,

    });
export const weatherAPI = {
    getWeather(city, units) {
        return WeatherInstance(city, units).get();
    }
}