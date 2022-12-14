import { WEATHER_LOADING, WEATHER_ERROR, GET_WEATHER_DONE } from "../types/weatherTypes";

const initialState = {
    data: [],
    isLoading: false,
    error: null
};

const weatherReduser = (state = initialState, action) => {
    switch (action.type) {
        case WEATHER_LOADING:
            return {
                ...state,
                isLoading: action.loading
            };


        case GET_WEATHER_DONE:
            return {
                ...state,
                data: action.payload // eslint-disable-line
            };
        case WEATHER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        // case PASSWORD_REMOVE_ERROR:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         error: null
        //     };


        default:
            return state;
    }
};

export default weatherReduser;
