import { GET_GEOCODE_SUCCESS, GET_GEOCODE_ERROR } from '../actions/types';

const initState = {};

const mapReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_GEOCODE_SUCCESS:
            return {
                ...state, 
                lat: action.payload.results[0].geometry.location.lat,
                lng: action.payload.results[0].geometry.location.lng
            }
        case GET_GEOCODE_ERROR:
            console.log("Geocode map reducer error");
            return state;
        default:
            return state;
    }
}

export default mapReducer;