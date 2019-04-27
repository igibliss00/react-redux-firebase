import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import mapReducer from './mapReducer';
import searchReducer from './searchReducer';
import bookReducer from './bookReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    item: itemReducer,
    auth: authReducer,
    map: mapReducer,
    search: searchReducer,
    book: bookReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;