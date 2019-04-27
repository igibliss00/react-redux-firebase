import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import styles from '../componentStyles.module.css'

class SignUp extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
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
        this.props.signUp(this.state);
        this.props.history.push('/');
    } 

    render() {       
        return (
            <div className={styles.signinContainer2}> 
                <h3 className={styles.subTitle}>Sign Up</h3>
                <form onSubmit={this.onSubmit} className="white">
                    <div className="input-field">
                        <input value={this.state.firstName} onChange={this.onChange} id="firstName" type="text" placeholder="First Name" className={styles.input}/>
                    </div>
                    <div className="input-field">
                        <input value={this.state.lastName} onChange={this.onChange} id="lastName" type="text" placeholder="Last Name" className={styles.input}/>
                    </div>
                    <div className="input-field">
                        <input value={this.state.username} onChange={this.onChange} id="username" type="text" placeholder="Username" className={styles.input}/>
                    </div>
                    <div className="input-field">
                        <input value={this.state.email} onChange={this.onChange} id="email" type="text" placeholder="Email" className={styles.input}/>
                    </div>
                    <div className="input-field">
                        <input value={this.state.password} onChange={this.onChange} id="password" type="password" placeholder="password" className={styles.input}/>
                    </div>
                    <div className="input-field">
                        <button className={styles.signBtn}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);