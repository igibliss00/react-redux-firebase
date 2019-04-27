import React from 'react';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../store/actions/authActions';
import { NavLink } from 'react-router-dom';
import styles from '../componentStyles.module.css'

const SignedOutLink = props => {
    return (
        <div className={styles.li}>
        <NavLink 
            className={styles.navlink2} 
            to='/signin' 
            onClick={props.signIn}
        >
        Sign In
        </NavLink>
        <NavLink 
            className={styles.navlink2} 
            to='/signup' 
            onClick={props.signUp}
        >
        Sign Up
        </NavLink>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: () => dispatch(signIn()),
        signUp: () => dispatch(signUp())
    }
}

export default connect(null, mapDispatchToProps)(SignedOutLink);
