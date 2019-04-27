import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ItemList from './item/ItemList';
import MultiMap from './map/MultiMap';
// import MapWithAMarkerWithLabel from './map/MarkerWithLabel';
import styles from './componentStyles.module.css';

class Landing extends React.Component {

    state = {
        // toronto as the default location
        lat: 43.761539,
        lng: -79.411079,
        errMessage: null
    }

    componentDidMount() {
        // browser's native Geolocation API to request for user's location
        navigator.geolocation.getCurrentPosition(
            pos => this.setState({lat: pos.coords.latitude, lng: pos.coords.longitude}),
            err => this.setState({errMessage: err.message})
        );
    }

    render() {
        // checked to if the landing page result show display a search result or a default database fetch
        const { defaultItems, searchResults } = this.props;
        const items = searchResults.length > 0 ? searchResults : defaultItems;
        const title = searchResults.length > 0 ? "Search Results" : "Featured Items";

        // if you want the defaultCenter of the map to be directed by the database fetch
        // const defaultCenter = items && items[0];
        const defaultCenter = {
            lat: this.state.lat,
            lng: this.state.lng
        }

        return (
            <div className={styles.landing}>
                <ItemList title={title} items={items} />
                {/* <div className={styles.map}>
                    map
                </div> */}
                <MultiMap 
                    defaultCenter={defaultCenter}
                    items={items}
                    containerElement={<div className={styles.map} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />

            </div>
        )
    }
};

 // Object.values is a built-in JavaScript function to covert objects into an array
const mapStateToProps = state => {
    return ({
        defaultItems: state.firestore.ordered.items,
        searchResults: Object.values(state.search),
        firebase: state.firebase
    });
};

export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
        { collection: 'items' }
    ])
)(Landing);