import React from "react";
import { book } from '../../store/actions/bookActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import styles from '../componentStyles.module.css'
import './booking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { randomizer } from '../../store/actions/randomizer';
import LinkButton from '../LinkButton';
import _ from 'lodash';
// import { stringify } from "querystring";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class BookItem extends React.Component {

    state = {
        startDate: null,
        endDate: null,
        itemId: this.props.itemId,
        bookingId: randomizer,
        excludeDates: []
    };  

    componentDidMount () { 
        const { item } = this.props;
        let dateArray = [];
        if (item.booking) {
            // get the dates that are already booked off by iterating through the booking object within items
            // firestore structure for booked items are two tiered: item > renter's ID > unique booking ID
            // in order to iterate through both tiers, double mapping is required
            // also, in order to map objects, lodash is used
            let individualDate = [];

            // first tier: renters ID's
            _.mapValues(item.booking, renters => { 
                // second tier: unique booking ID's
                return  _.mapValues(renters, bookingDetails => {
                    // convert Firebase's timestamp to a regular format
                    const startDate = bookingDetails.startDate.toDate()
                    const endDate = bookingDetails.endDate.toDate()

                    // convert the range of dates to individual dates 
                    const moment = extendMoment(Moment);
                    const range = moment.range(startDate, endDate);
                    for (let day of range.by('day')) {
                        day.format('YYYY-MM-DD');    
                    }  
                    const day = Array.from(range.by('day'));

                    // push the individual dates to an array 
                    return day.map(m => individualDate.push(m.format('YYYY-MM-DD')));
                })
            })

            //  setState is used for re-rendering because the querying the exclude dates is asynchronous 
            //  therefore initial rendering shows undefined 
            this.setState({
                excludeDates: individualDate
            })

        }
    }
 
    handleChangeStart = date => {
        this.setState({
            startDate: date
        });      
    }

    handleChangeEnd = date => {
        this.setState({
            endDate: date
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.book(this.state);
    }

    renderBook() {
        // check to see if the user is logged in and output the correct booking button
        if (this.props.auth) {
            return (
                // wrapping a html button with a Link doesn't work. Therefore use LinkButton component
                // pass the booking ID as params to Checkout
                <LinkButton
                    to={`/checkout/${this.state.itemId}/${this.state.bookingId}`}
                    onClick={this.handleSubmit}
                    className={styles.bookingBtn}
                >Book!</LinkButton>
            )
        } else {
            return (
                <Link to='/signin' style={{ textDecoration: 'none' }} >
                    <button className={styles.bookingBtn} >Sign in to book!</button>
                </Link>
            )
        }
    }
    
    render() {
        


        
        return (
            <div className={styles.datePicker}>
                <h3 className={styles.bookingTitle}>Rental Dates</h3>
                <div className={styles.calender}>
                    <DatePicker
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart}
                        excludeDates={this.state.excludeDates}
                        minDate={new Date()}
                        placeholderText='Start Date'
                    />
                    <DatePicker
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd}
                        excludeDates={this.state.excludeDates}
                        minDate={new Date()}
                        placeholderText='End Date'
                    />
                </div>
                {this.renderBook()}
                <div className="bookingPanel">
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <span style={{'fontWeight': 'bold'}}>{Math.floor(Math.random() * 1000)}</span>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        book: date => dispatch(book(date))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'items' }
    ]) 
)(BookItem);
