import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import MapWithAMarker from '../map/MarkerMap';
import BookItem from '../booking/BookItem'; 
import "@firebase/storage";
import styles from '../componentStyles.module.css';
import Reviews from './Reviews';


class ItemDetail extends React.Component {

    
    render() {
        const { item } = this.props;
        // const item  = {
        //     item_name: 'Shoes',
        //     item_description: 'aldjsflsjdflk',
        //     item_price: '500',
        //     item_location: 'Toronto',
        //     item_image: 'image.jpg',
        //     image_url: 'asjfldkj.jpg',
        //     itemId: 'EAuzpHBQsHk3gjnb6onb'
        // };
        const defaultCenter = {
            lat:  item.lat,
            lng:  item.lng
        }
        return (
            <div className={styles.itemDetail}>
                <div className={styles.detailHeader}>
                    <div className={styles.heroDesc}> 
                        <p className={styles.heroTitle}>Breathe easy, rent easy. Rent high quality AV equipment at an afordable price</p>
                    </div>
                    <div className={styles.heroImg}>
                        
                    </div>
                    {/* <img className={styles.heroImg} src={item.image_url} alt=""/> */}
                </div>
                <div className={styles.detailBody}>
                    <div>
                        <div className={styles.detail}>
                            <div className={styles.detailTop}>
                                <h3 className={styles.detailTitle}>{item.item_name}!</h3>
                                <p>{item.item_location}</p>
                                <p><span className={styles.price}>${item.item_price}</span><span className={styles.perDay}>  per day</span></p>
                                <p className={styles.detailDesc}>{item.item_description}</p>   
                            </div>
                            <div>
                                <img src="https://source.unsplash.com/user/michaeldam" className={styles.lenderImg} alt=""/>
                                <p>Lender: {item.authorFirstname} {item.authorLastname}</p>
                            </div>
                        </div>
                        <Reviews />
                    </div>
                    <div>
                        <BookItem item={item} itemId={this.props.match.params.id} />
                        <MapWithAMarker
                            defaultCenter={defaultCenter}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            item={item}
                        />
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    const items = state.firestore.data.items;
    const itemId = ownProps.match.params.id; 
    const item = items ? items[itemId] : null;
    return {
        item: item
    }
}

export default compose(
    firestoreConnect([ 
        { 'collection': 'items' } 
    ]),
    connect(mapStateToProps)
)(ItemDetail);
