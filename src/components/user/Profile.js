import React from 'react';
import styles from '../componentStyles.module.css';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { deleteItem } from '../../store/actions/itemActions';
import _ from 'lodash';

class Profile extends React.Component {

    onClick = e => {
        // e.preventDefault();
        console.log("e", e);
        this.props.deleteItem(e);
    }

    // list of the items currently rented by the user
    renderBorrowedList() {
        const { booking } = this.props;  
        if (booking) {
            return Object.keys(booking).map(x => {
                return (
                    <div className={styles.profileList} key={booking[x].createdAt}>
                        <p><span style={{'fontWeight':'bold'}}>{booking[x].item_name}</span> from {booking[x].authorFirstname} {booking[x].authorLastname}</p>
                        <p>Due date: {booking[x].endDate.toDate().toDateString()}</p>
                        
                    </div>
                )
            })
        }
        return null;
    }

    // list of the items currently being rented out to other people
    renderLentList() {
        const { profile } = this.props;
        if (profile.lending) {
            return Object.keys(profile.lending).map(x => {
                return (
                    <div className={styles.profileList} key={profile.lending[x].createdAt}>
                        <p><span style={{'fontWeight':'bold'}}>{profile.lending[x].item_name}</span> rented by {profile.lending[x].renterFirstname} {profile.lending[x].renterLastname}</p>
                        <p>Due Date: {profile.lending[x].endDate.toDate().toDateString()}</p>
                    </div>
                )
            })
        }
        return null;
    }

    renderItemList() {
        const { inventory, auth } = this.props;
        console.log("inventory", inventory)
        // console.log("lodash", _.pluck(inventory))
        
        // console.log("this.props.inventory", inventory)
        // _.forOwn(inventory, function(val, auth) {
        //     console.log(val)
        //     console.log("lodash",Object.keys(val).map(x => val[x].item_name[1])); 
        //   });

        // for(var key in inventory) {
        //     var value = inventory[key];
        //     console.log(value)
        // }
        // if (inventory) {
        //     return  _.forOwn(inventory, function(val, auth) {
        //         return Object.keys(val).map(x => {
        //            return (
        //                <div className={styles.inventoryList} key={x}>
        //                val[x]
        //                </div>
        //            )
        //         }) 
                
                // return (
                //     <div className={styles.inventoryList} key={x}>
                //         {/* {console.log("object keys", inventory[x][auth])} */}
                //         <p><span style={{'fontWeight':'bold'}}>Item Name:</span> {inventory[x].item_name}</p>
                //         <p><span style={{'fontWeight':'bold'}}>Price:</span> ${inventory[x].item_price} <span style={{'fontSize':'12px'}}>/day</span></p>
                //         <div className={styles.inventoryBtns}>
                //             <div  className={styles.inventoryBtn}>
                //                 <Link 
                //                     className={styles.link} 
                //                     to={`/item/itemdetail/${inventory[x].itemId}`}
                //                 >View my posting</Link>
                //             </div>
                //             <div className={styles.inventoryBtnBlue}>
                //                 <Link 
                //                     to={'/'}
                //                     className={styles.link} 
                //                 >Edit</Link>
                //             </div>
                //             <button 
                //                 onClick={() => this.onClick(x)}
                //                 className={styles.inventoryBtnRed}
                //             >Delete</button>
                //         </div>
                //          <img className={styles.inventoryPic} src={inventory[x].image_url} alt=""/>
                //     </div>
                // )
            // })
        // }
    }

    // list of items currently posted to the website 
    renderItemHistory() {
        const { profile } = this.props;
        if (profile.inventory) {
            return Object.keys(profile.inventory).map(x => {
                return (
                    <div className={styles.inventoryList} key={profile.inventory[x].itemId}>
                        <div>
                            <p><span style={{'fontWeight':'bold'}}>Item Name:</span> {profile.inventory[x].item_name}</p>
                            <p><span style={{'fontWeight':'bold'}}>Price:</span> ${profile.inventory[x].item_price} <span style={{'fontSize':'12px'}}>/day</span></p>    
                        </div>
                    </div>
                )
            })
        }
        return null;
    }
    
    render() {
        const { profile } = this.props; 
        return (
            <div className={styles.profile}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileTag}>
                        <img className={styles.profileImg} src="https://source.unsplash.com/random" alt=""/>
                        <h3>Welcome {profile.firstName} {profile.lastName}! </h3>
                    </div>
                </div>
                <div className={styles.profileBody}>
                    <div className={styles.profileCard}>
                        <h4 className={styles.profileSubtitle}>Items you rented from others</h4>
                        {this.renderBorrowedList()}
                    </div>
                    <div className={styles.profileCard}>
                        <h4 className={styles.profileSubtitle}>Items others rented from you</h4>
                        {this.renderLentList()}
                    </div>
                </div>
                <div className={styles.inventory}>
                    <h4 className={styles.profileSubtitle}>Your currently listed items</h4>
                    {this.renderItemList()}
                </div>
                <div className={styles.inventory}>
                    <h4 className={styles.profileSubtitle}>Your post history</h4>
                    {this.renderItemHistory()}
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        booking: state.firebase.profile.booking,
        profile: state.firebase.profile,
        inventory: state.firestore.data.inventory,
        auth: state.firebase.auth.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteItem: itemId => dispatch(deleteItem(itemId)),
    }
}

export default compose(
    firestoreConnect([ 
        { 
            'collection': 'users',
            'collection': 'items',
            'collection': 'inventory'
         } 
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(Profile);