import React from 'react';
import { searchItem } from '../../store/actions/itemActions'
import { connect } from 'react-redux';
import LinkButton from '../LinkButton'
import styles from '../componentStyles.module.css'

class SearchBar extends React.Component {
    state = {
        search: '',
    };
    
    onChange = e => {
        this.setState({
            search: e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.searchItem(this.state.search);
    }
    render() {
        return(
            <form className={styles.searchbar} onSubmit={this.onSubmit}>
                <input 
                    type="text" 
                    id={styles.searchbar}
                    value={this.state.search}
                    onChange={this.onChange} 
                    placeholder='Search your item'
                />
                {/* <button className={styles.searchBtn}>Search</button>  */}
                <LinkButton
                    to='/' 
                    className={styles.searchBtn}
                >Search!</LinkButton>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchItem: item => dispatch(searchItem(item))
    }
};

export default connect(null, mapDispatchToProps)(SearchBar);