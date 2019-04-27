import { BOOKING_SUCCESS, BOOKING_ERROR, BOOKING_REG_SUCCESS, BOOKING_REG_ERROR } from './types';
import _ from 'lodash';

export const book = bookingDate => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;    
        const booking = getState().firestore.data.items[bookingDate.itemId];  

        // exclude the unnecessary exclude dates
        const newBookingDate = _.omit(bookingDate, ['excludeDates']);
        // creates a booking under two tiered structure: item > renter's ID > unique booking ID
        // and adds the user info from firebase
        firestore.collection('items').doc(newBookingDate.itemId).set({
                ...booking,
                booking: {
                    // userId is created as a key so that querying for all the rented items under the same user is possible
                   [userId]: { 
                        [newBookingDate.bookingId]:
                        {
                            ...newBookingDate,
                            renterFirstname: profile.firstName,
                            renterLastname: profile.lastName,
                            renterId: userId,
                            createdAt: new Date()
                        }
                    }
                }
        }, {merge: true}).then(() => {
            dispatch({ type: BOOKING_SUCCESS });    
        }).catch( err => {
            dispatch({ type: BOOKING_ERROR }, err);
        });

        // saving the rental info into the borrower's profile
        firestore.collection('users').doc(userId).set({
            ...profile,
            booking: {
                [newBookingDate.bookingId]:
                    {
                        startDate: newBookingDate.startDate,
                        endDate: newBookingDate.endDate,
                        itemId: newBookingDate.itemId,
                        createdAt: new Date(),
                        item_name: booking.item_name,
                        item_price: booking.item_price,
                        item_location: booking.item_location,
                        authorFirstname: booking.authorFirstname,
                        authorLastname: booking.authorLastname
                    }
            }
        }, {merge: true}).then(() => {
            dispatch({ type: BOOKING_REG_SUCCESS });
        }).catch(err => {
            dispatch({ type: BOOKING_REG_ERROR }, err);
        })

        // saving the rental info to the lender
        firestore.collection('users').doc(booking.authorId).set({
            lending: {
                [newBookingDate.bookingId]:
                    {
                        startDate: newBookingDate.startDate,
                        endDate: newBookingDate.endDate,
                        itemId: newBookingDate.itemId,
                        createdAt: new Date(),
                        item_name: booking.item_name,
                        item_price: booking.item_price,
                        item_location: booking.item_location,
                        renterFirstname: profile.firstName,
                        renterLastname: profile.lastName,
                        renterId: userId
                    }
            }
        }, { merge: true }).then(() => {
            dispatch({ type: BOOKING_REG_SUCCESS });
        }).catch(err => {
            dispatch({ type: BOOKING_REG_ERROR }, err);
        })
    }
}

