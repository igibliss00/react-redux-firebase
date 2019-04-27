import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ItemSummary from './ItemSummary';
import styles from '../componentStyles.module.css';


class ItemList extends React.Component {

    renderList() {
        const { items } = this.props;
        return items && items.map(item => {
            // the original poster of the item cannot see their own listings on the landing page
            if (item.authorId !== this.props.auth) {
                return (
                    <div key={item.id} className={styles.subItemList}>    
                        <Link to={`/item/itemdetail/${item.id}`} style={{ textDecoration: 'none' }} >
                            <ItemSummary item={item} />
                        </Link>    
                    </div>
                )   
            }   
        })
    }

    render() {
        const { title } = this.props;
        return (
            <div className={styles.itemList}>  
                <h2 className={styles.itemListTitle}>{title} <p className={styles.itemListSubTitle}>Toronto</p></h2>
                <div className={styles.renderListContainer}>
                    {this.renderList()}
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

export default connect(mapStateToProps)(ItemList);