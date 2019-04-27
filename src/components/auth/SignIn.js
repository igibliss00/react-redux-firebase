import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import styles from '../componentStyles.module.css'

class SignIn extends React.Component {
    state = {
        email: '',
        password: ''
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.signIn(this.state);
        this.props.history.push('/');
    } 

    render() {       
        return (
            <div className={styles.signinContainer}> 
                <h3 className={styles.subTitle}>Sign In</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="input-field">
                        <input value={this.state.email} onChange={this.onChange} id="email" type="text" className={styles.input} placeholder="Email" />
                    </div>
                    <div className="input-field">
                        <input value={this.state.password} onChange={this.onChange} id="password" type="password" className={styles.input} placeholder="Password" />
                    </div>
                    <div className="input-field">
                        <button className={styles.signBtn}>Enter</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (user) => dispatch(signIn(user))
    }
}

export default connect(null, mapDispatchToProps)(SignIn);