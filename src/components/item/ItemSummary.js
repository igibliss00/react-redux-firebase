import React from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../../store/actions/itemActions';
import styles from '../componentStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ItemSummary extends React.Component {    
    handleDelete = e => {
        e.preventDefault();
        this.props.deleteItem(this.props.item.id);
    }

    renderAdmin() {
        if (this.props.auth === this.props.item.authorId) {
            return (
                <div>
                    <button className={styles.editBtn}>Edit</button>  
                    <button onClick={this.handleDelete} className={styles.deleteBtn}>Delete</button>  
                </div>
            )
        }
    }
    
    render() {    
        const { item } = this.props;
        return (
            <div className={styles.itemSummary}>           
                <img className={styles.thumbnail} src={item.image_url} alt=""/>
                <div className={styles.card}>
                    <p className={styles.verified}><span className={styles.verifiedBox}>PLUS</span>  VERIFIED ITEM</p>
                    <h3>{item.item_name}</h3>
                    <p>${item.item_price} CAD per day</p>
                    <p>Lender: {item.authorFirstname} {item.authorLastname}</p>
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <FontAwesomeIcon icon="star" size='xs' className={styles.star} />   
                    <span style={{'fontWeight': 'bold'}}>{Math.floor(Math.random() * 1000)}</span>
                    <br/>  
                    {this.renderAdmin()}
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteItem: itemId => dispatch(deleteItem(itemId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSummary);