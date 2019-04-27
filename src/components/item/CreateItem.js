import React from 'react';
import { connect } from 'react-redux';
import { createItem } from '../../store/actions/itemActions';
import PreviewPicture from './PreviewPicture';
import LinkButton from '../LinkButton'
import styles from '../componentStyles.module.css';
import './PlaceAutocomplete.css';
import PlacesAutocomplete, {  geocodeByAddress, getLatLng } from 'react-places-autocomplete';


class CreateProduct extends React.Component {
    state = {
        item_name: '',
        item_description: '',
        item_price: '',
        item_location: '',
        item_image: [],
        image_url: '',
        showStatus: false
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleChange = address => {
        this.setState({
            item_location: address
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            showStatus: true
        })
        this.props.createItem(this.state);
    } 

    // uploading the image to the component state
    displayPicture = event => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
        this.setState({
            item_image: file,
            image_url: reader.result
        });
        };
        reader.readAsDataURL(file);
    }

    handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
    };

    render() { 
        // PlaceAutocomplete setting
        // these options will bias the autocomplete predictions toward Toronto with a radius of 2000 meters,
        // and limit the results to addresses only
        const google = window.google; 
        const searchOptions = {
            location: new google.maps.LatLng(43.6532, -79.3832),
            radius: 500,
            types: ['address']
        }            
        return (
            <div className={styles.postItemContainer}> 
                <h3 className={styles.subTitle}>Post an Item</h3>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="input-field">
                        <input 
                            value={this.state.item_name} 
                            onChange={this.onChange} 
                            id="item_name" 
                            type="text" 
                            className={styles.input} 
                            placeholder="Item Name" 
                        />
                    </div>
                    <div className="input-field">
                        <textarea 
                            value={this.state.item_description} 
                            onChange={this.onChange} 
                            id="item_description" 
                            className={styles.input} 
                            placeholder="Item Description">
                        </textarea>
                    </div>
                    <div className="input-field">
                        <input 
                            value={this.state.item_price} 
                            onChange={this.onChange} 
                            id="item_price" 
                            type="number" 
                            className={styles.input} 
                            placeholder="Item Price" 
                        />                    
                    </div>
                    {/* <div className="input-field">
                        <input 
                            value={this.state.item_location} 
                            onChange={this.onChange} 
                            id="item_location" 
                            type="text" 
                            className={styles.input} 
                            placeholder="Item Location" 
                        /> */}
                    <div className="input-field">
                        <PlacesAutocomplete
                            value={this.state.item_location}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                            id="item_location"
                            searchOptions={searchOptions}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                {...getInputProps({
                                    placeholder: 'Enter your meetup place ...',
                                    className: 'location-search-input',
                                })}
                                />
                                <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>  
                    </div>
                    <div className="input-field">
                        <label 
                            className={styles.input} 
                            htmlFor="item_image">
                            <span className={styles.image_upload_label}>
                                {this.state.item_image[0] ? this.state.item_image[0] : 'Choose images to upload (PNG, JPG)'}
                            </span>
                            <input 
                                id="item_image" 
                                type="file" 
                                accept=".jpg, .jpeg, .png" 
                                onChange={e => this.displayPicture(e)} 
                                className={styles.input} 
                                placeholder="Picture" 
                                multiple
                            />
                        </label>
                        {/* <PreviewPicture image_url={this.state.image_url}/> */}
                    </div>                
                    <LinkButton
                        to='/'
                        className={styles.createBtn}
                    >Create a posting!</LinkButton>
                </form>
                {(this.state.showStatus) ? <p className={styles.status}>Success!</p> : null}       
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createItem: (item) => dispatch(createItem(item))
    }
}

export default connect(null, mapDispatchToProps)(CreateProduct);