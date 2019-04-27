import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { NavLink } from 'react-router-dom';
import styles from '../componentStyles.module.css'

const SignedInLink = props => {
    return (
        <ul className={styles.ul}>
            <li className={styles.li}><a className={styles.home} href='/'>Home</a></li>
            <li className={styles.li}><NavLink className={styles.navlink} to='' onClick={props.signOut}>Sign Out</NavLink></li>
            <li className={styles.li}><NavLink className={styles.navlink} to='/item/create'>Post an item</NavLink></li>
            <li className={styles.li}><NavLink className={styles.navlink} to='/profile'>My Profile</NavLink></li>
        </ul>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLink);
