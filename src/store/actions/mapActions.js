import { GET_GEOCODE_SUCCESS } from "./types";
import { key } from "../../components/map/apikey";
import Geocode from "react-geocode";

export const getGeocode = location => {
    return dispatch => {
        Geocode.setApiKey(key);
        Geocode.enableDebug();
        // Get latidude & longitude from address.
        Geocode.fromAddress(location).then(
            response => {
                // const { lat, lng } = response.results[0].geometry.location;
                dispatch({ type: GET_GEOCODE_SUCCESS, payload: response});
            },  
            error => {  
                console.error("Geocode action error", error);
            }
        );
    }
}