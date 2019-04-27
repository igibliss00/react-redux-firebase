import { LOGIN_ERROR, LOGIN_SUCCESS, SIGNOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from './types';

export const signIn = credentials => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: LOGIN_SUCCESS });
        }).catch((err) => {
            dispatch({ type: LOGIN_ERROR }, err);
        }); 
    }
};

export const signOut = _ => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch( { type: SIGNOUT_SUCCESS })
        })
    }
};

export const signUp = newUser => {
    // getFirebase authentication service to sign the user up, which generates UID
    // and getFirestore to communicate with the store
    // Firestore User Collection stores more info regarding the user 
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(res => {
            return firestore.collection('users').doc(res.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                username: newUser.username
            });
        }).then(() => {
            dispatch({ type: SIGNUP_SUCCESS });
        }).catch((err) => {
            dispatch({ type: SIGNUP_ERROR, err });
        });
    };
};