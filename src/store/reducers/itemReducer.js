import { 
    CREATE_ITEM_SUCCESS, 
    CREATE_ITEM_ERROR, 
    SEARCH_ITEM_SUCCESS, 
    SEARCH_ITEM_ERROR, 
    DELETE_SUCCESS, 
    DELETE_ERROR,
    DELETE_USER_INVENTORY_SUCCESS,
    DELETE_USER_INVENTORY_ERROR,
    } from '../actions/types';

const initState = [];

const itemReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_ITEM_SUCCESS:
            console.log('item created');
            return state;
        case CREATE_ITEM_ERROR:
            console.log('An error occured during CREATE ITEM', action.err);
            return state;
        case SEARCH_ITEM_SUCCESS:
            console.log('Item searched');
            return [
                ...state,
                action.payload
            ];
        case SEARCH_ITEM_ERROR:
            console.log('An error occured during SEARCH ITEM');
            return state;
        case DELETE_SUCCESS:
            console.log('Delete success');
            return state;    
        case DELETE_ERROR:
            console.log('Delete error', action.err);
            return state;
        case DELETE_USER_INVENTORY_SUCCESS:
            console.log('Deleting the user inventory success');
            return state;
        case DELETE_USER_INVENTORY_ERROR:
            console.log('Error occured during the user inventory deletion', action.err);
            return state;
        default:
            return state;
    }
};

export default itemReducer;