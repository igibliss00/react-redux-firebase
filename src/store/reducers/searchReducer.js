import { SEARCH_ITEM_SUCCESS, SEARCH_ITEM_ERROR } from '../actions/types';
import _ from 'lodash';

const initState = {};

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case SEARCH_ITEM_SUCCESS:
            console.log('Item searched');
            return {
                ...state,
                ..._.mapKeys(action.payload, 'id')
            };
        case SEARCH_ITEM_ERROR:
            console.log('An error occured during SEARCH ITEM');
            return state;
        default:
            return state;
    }
};

export default searchReducer;