import { 
    CREATE_ITEM_SUCCESS, 
    CREATE_ITEM_ERROR, 
    SEARCH_ITEM_SUCCESS, 
    SEARCH_ITEM_ERROR, 
    DELETE_SUCCESS, 
    DELETE_ERROR,
    DELETE_USER_INVENTORY_SUCCESS,
    DELETE_USER_INVENTORY_ERROR
    } from './types';
import Geocode from "react-geocode";
import { key } from "../../components/map/apikey";
import "@firebase/storage";
import { randomizer } from "./randomizer";
import _ from 'lodash';

export const createItem = item => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {

        // -------------the order of process------------------
        // 1. upload the image to Firebase storage.  This is done first to obtain the imagePath which will be saved into the item profile
        // 2. get the longitute and the latitude of the item location from converting the regular address (needed for geolocation)
        // 3. save the item into firestore
        // 4. save the same item posting info under inventory collection so that seraching for the item under the userId and deleting the item can
        //    done easily.  (ex. this list can be used for to show "all the current listings". Can't be done with #5)
        // 5. using the unique item ID generated by firestore, save the same item info under the owner's profile. This is different from #4 in that
        //    this list will be kept indefinitely as history, and never manipulated


        // upload the image into Firebase storage 
        var imagePath = '';
        const firebase = getFirebase();  
        const storage = firebase.storage().ref();
        storage.child(`item_images/${item.item_name}${randomizer}`).put(item.item_image).then(snapshot => {
            imagePath = snapshot.metadata.fullPath;
            getAddressAndSave(imagePath);
        });  

        // associate the longitute and latitude of the location with the item through converting the address
        Geocode.setApiKey(key);
        Geocode.enableDebug();
        var getAddressAndSave = imagePath => Geocode.fromAddress(item.item_location).then(
            response => {
                var { lat, lng } = response.results[0].geometry.location;
                // associate the item with the creator of the post
                var profile = getState().firebase.profile;
                var userId = getState().firebase.auth.uid;

                // exlude the File type from item.item._image that's not recognized by Firebase
                var newItem = _.omit(item, ['item_image']);

                // save the item info along with the imagePath which is the path of the image to Firebase storage
                const firestore = getFirestore();
                firestore.collection('items').add({
                    ...newItem,
                    authorFirstname: profile.firstName,
                    authorLastname: profile.lastName,
                    authorId: userId,
                    createdAt: new Date(),
                    lat: lat,
                    lng: lng,
                    image: imagePath
                }).then((s) => {
                    // save the posting info into the poster's database to keep track of their inventory
                    firestore.collection('users').doc(userId).set({
                        inventory: {
                            [s._key.path.segments[1]]: 
                                {
                                    ...newItem,
                                    itemId: s._key.path.segments[1]
                                } 
                        }
                    }, { merge: true })
                    // save the same posting info under inventory
                    firestore.collection('inventory').doc(userId).set({
                        [s._key.path.segments[1]]: {
                            ...newItem,
                            authorFirstname: profile.firstName,
                            authorLastname: profile.lastName,
                            authorId: userId,
                            createdAt: new Date(),
                            lat: lat,
                            lng: lng,
                            image: imagePath
                        }
                    }, { merge: true })
                }).then(() => {
                    dispatch({ type: CREATE_ITEM_SUCCESS }, item);
                }).catch(err => {
                    dispatch({ type: CREATE_ITEM_ERROR }, err);
                });
            },  
            error => {  
                console.error("Geocode action error", error);
            }
        )}
    }

export const searchItem = item => {
    return (dispatch, getState) => {
        const itemList = getState().firestore.ordered.items;
        const filteredItems = itemList.filter(singleItem => {
            return singleItem.item_name.toLowerCase().indexOf(item.toLowerCase()) !== -1;
        });
        if (!filteredItems) {
            dispatch({ type: SEARCH_ITEM_ERROR });
        }

        dispatch({ type: SEARCH_ITEM_SUCCESS, payload: filteredItems});
    }
}

export const deleteItem = itemId => { 
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const userId = getState().firebase.auth.uid;
        // delete the item in the items collection
        firestore.collection('items').doc(itemId).delete()
        .then((s) => {
            dispatch({ type: DELETE_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: DELETE_ERROR } , err);
        });
        
        // delete the item in the inventory collection
        firestore.collection('inventory').doc(userId).set({
            ...[itemId],
            deleted: {}
        }).then(() => {
            dispatch({ type: DELETE_USER_INVENTORY_SUCCESS });
        })
        .catch( err => {
            dispatch({ type: DELETE_USER_INVENTORY_ERROR } , err);
        });     
    };
};

// export const deleteItem = itemId => { 
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         const firestore = getFirestore();
//         const firebase = getFirebase();
//         const userId = getState().firebase.auth.uid;
//         console.log("action profile", userId)
//         firestore.collection('items').doc(itemId).delete()
//         .then(() => {
//             dispatch({ type: DELETE_SUCCESS });
//         })
//         .catch( err => {
//             dispatch({ type: DELETE_ERROR } , err);
//         });
            // firestore.collection('users').doc(userId).set({
            //     inventory: {
            //         [itemId]: {

            //         }
            //     }
            // }).then(() => {
            //     dispatch({ type: DELETE_USER_INVENTORY_SUCCESS });
            // })
            // .catch( err => {
            //     dispatch({ type: DELETE_USER_INVENTORY_ERROR } , err);
            // }); 
  
//     };
// };

