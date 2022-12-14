import { weatherAPI } from "../../apis/api";
import { WEATHER_LOADING, WEATHER_ERROR, GET_WEATHER_DONE, POST_WEATHER_DONE } from "../types/weatherTypes";


export const WeatherAction = {
    request: (loading) => ({
        type: WEATHER_LOADING,
        loading
    }),

    getReceive: (payload) => ({
        type: GET_WEATHER_DONE,
        payload
    }),
    postReceive: (payload) => ({
        type: POST_WEATHER_DONE,
        payload
    }),
    //   removeError: () => ({
    //     type: PASSWORD_REMOVE_ERROR,
    // }),
    failed: (e) => ({
        type: WEATHER_ERROR,
        error: e
    })
};



export const getWeather = (city, units) => async (dispatch) => {
    const { request, getReceive, failed } = WeatherAction;
    dispatch(request(true));
    try {
        const res = await weatherAPI.getWeather(city, units)
        console.log("RES", res);
        dispatch(getReceive(res.data));
        dispatch(request(false));
    } catch (e) {
        console.log(e);
        dispatch(failed(e));
        dispatch(request(false));
    }
};
export const refWeather = (city, units) => async (dispatch) => {
    const { request, getReceive, failed } = WeatherAction;
    dispatch(request(true));
    try {
        const res = await weatherAPI.getWeather(city, units)
        console.log("RES", res);
        dispatch(getReceive(res.data));
        const newData = res.data;
        const localArray = JSON.parse(localStorage.getItem("weatherData") || '[]')
        const filteredData = localArray.map((el) => {
            if (el.name === newData.name) {
                el = newData;
            }
            return el;
        });
        localStorage.setItem("weatherData", JSON.stringify(filteredData))

        dispatch(request(false));
    } catch (e) {
        console.log(e);
        dispatch(failed(e));
        dispatch(request(false));
    }
};

