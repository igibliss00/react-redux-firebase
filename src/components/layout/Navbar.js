import React from 'react';
import { connect } from 'react-redux';
import SignedInLink from './SignedInLink';
import SignedOutLink from './SignedOutLink';
import SearchBar from './SearchBar';
import styles from '../componentStyles.module.css';

const Navbar = props => {
    const { auth } = props;
    const links = auth ? <SignedInLink /> : <SignedOutLink />;
    return (
        <nav className={styles.nav}>
            <a className={styles.logo} href="/">renterii</a> 
            <SearchBar />
            <div className="login-menu">
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth.uid
    }
}

export default connect(mapStateToProps)(Navbar);