import { SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/types';

const initState = {
    authError: ''
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            console.log('Signup success')
            return {
                ...state,
                actionError: null
            };
        case SIGNUP_ERROR:
            console.log("Signup Error")
            return {
                ...state,
                authError: "Signup failed"
            }
        case LOGIN_SUCCESS:
            console.log("Login success");
            return {
                ...state,
                authError: null
            };
        case LOGIN_ERROR: 
            console.log("Login error");
            return {
                ...state,
                authError: "Login failed"
            };
        default:
            return state;
    };
};

export default authReducer;