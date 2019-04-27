import firebase from 'firebase/app';

// database
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'

// import * as firebase from 'firebase';

import '@firebase/storage';

// Initialize Firebase
var config = {
    
};
firebase.initializeApp(config);
// firebase.firestore().settings({});


export default firebase
// export const storage = firebase.storage().ref();