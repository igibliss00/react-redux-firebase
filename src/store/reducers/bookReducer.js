import { BOOKING_SUCCESS, BOOKING_ERROR, BOOKING_REG_SUCCESS, BOOKING_REG_ERROR } from '../actions/types';

const initState = [];

const bookReducer = (state = initState, action) => {
    switch (action.type) {
        case BOOKING_SUCCESS:
            console.log('booking created');
            return state;
        case BOOKING_ERROR:
            console.log('An error occured during BOOKING', action.err);
        case BOOKING_REG_SUCCESS:
            console.log('Booking registered to the user databse');
            return state;
        case BOOKING_REG_ERROR:
            console.log('An error occured during BOOKING REG', action.err);
            break;
        default:
            return state;
    }
};

export default bookReducer;