import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Moment from 'moment';
import styles from '../componentStyles.module.css';

class Checkout extends React.Component {

    render() {
        const { bookingInfo, bookedItem } = this.props;
        // convert the Firebase timestamp to a Date object first and then use the method toDateString to convert it to a String
        const startDate = bookingInfo && bookingInfo.startDate.toDate();
        const startDateString = startDate && startDate.toDateString();
        const endDate = bookingInfo && bookingInfo.endDate.toDate();
        const endDateString = endDate && endDate.toDateString();

        // calculate the number of days being rented
        const a = Moment(startDateString);
        const b = Moment(endDateString);
        const duration = Math.abs(a.diff(b, 'days'))+1;
        return (
            <div className={styles.checkout}>
                <div className={styles.checkout1}>
                    {/* <img src="https://source.unsplash.com/random" alt=""/> */}
                </div>
                <div className={styles.checkout2}>
                    <div className={styles.checkoutTop}>
                        <p>Thank you {bookingInfo && bookingInfo.renterFirstname} {bookingInfo && bookingInfo.renterLastname}</p>
                        <p>{bookedItem && bookedItem.item_name} has been booked!</p>
                    </div>
                    <div className={styles.checkoutBottom}>
                        <hr className={styles.line}/>
                        <p><span style={{'fontWeight':'bold'}}>Rental Start Date:</span>  {startDateString}</p>
                        <p><span style={{'fontWeight':'bold'}}>Rental End Date:</span>  {endDateString}</p>
                        <p><span style={{'fontWeight':'bold'}}>Your Total Rental Period: </span> {duration} days.</p>
                        <p><span style={{'fontWeight':'bold'}}>Your Total Rental cost: </span> ${bookedItem && bookedItem.item_price} x {duration} = ${bookedItem && bookedItem.item_price * duration}.</p>
                    </div>
                    <hr className={styles.line}/>
                    <p>Please meet {bookedItem && bookedItem.authorFirstname} {bookedItem && bookedItem.authorLastname} at {bookedItem && bookedItem.item_location} by {startDateString} to pick up your item.</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const itemId = ownProps.match.params.id;
    const bookingId = ownProps.match.params.type;
    const items = state.firestore.data.items;
    const bookedItem = items ? items[itemId] : null;
    const uid = state.firebase.auth.uid;
    const bookingInfo = bookedItem ? bookedItem.booking[uid][bookingId] : null;
    return {
        bookingInfo: bookingInfo,
        bookedItem: bookedItem
    } 
}

export default compose(
    firestoreConnect([
        { collection: 'items' }
    ]),
    connect(mapStateToProps)
)(Checkout);


