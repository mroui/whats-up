import React, { Component } from 'react';
import reg_icon from '../../assets/images/login_icon.svg';
import './RegistrationPage.css';
import '../signingContent.css';
import RegistrationButton from '../../components/RegistrationSubmitButton/RegistrationSubmitButton';
import BackButton from '../../components/BackButton/BackButton';
import firebaseConnection from '../../firebase/config';
import { Redirect } from 'react-router';


export class RegistrationPage extends Component {

    state = {
        email: null,
        password: null,
        repeatpassword: null,
        error: null,
        redirect: false,
        user: null
    }


    componentDidMount = () => {
        return this.authListener();
    }

    
    authListener = () => {
        return (
            firebaseConnection.auth().onAuthStateChanged((user_) => {
                if (user_) {
                    this.setState({user: user_});
                }
                else {
                    this.setState({user: null});
                }
            })
        )
    }


    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/diary' />
        }
    }


    checkAccount = (e) => {
        if (this.state.repeatpassword === this.state.password) {
            e.preventDefault();
            firebaseConnection.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.setState({
                        redirect: true
                    })
                })
                .catch(error_ => {
                    return(
                        this.setState({
                            error: error_.message
                    }))
                });
        } else {
            this.setState({
                error: "Passwords don't match."
            })
        }
    }


    handleEmailChanged = (event) => {
        this.setState({
            email: event.target.value
        })
    }


    handlePasswordChanged = (event) => {
        this.setState({
            password: event.target.value
        })
    }


    handleRepeatPasswordChanged = (event) => {
        this.setState({
            repeatpassword: event.target.value
        })
    }


    createFormInputs = () => {
        return (
            <form id="regform">
                <input className="forminput" type="email" placeholder="E-mail"
                    onChange={this.handleEmailChanged}/>
                <input className="forminput" type="password" placeholder="Password"
                    onChange={this.handlePasswordChanged}/>
                <input className="forminput" type="password" placeholder="Repeat password"
                    onChange={this.handleRepeatPasswordChanged}/>
            </form>
        )
    }


    createContent = () => {
        return (
            <div className="content">
                <img src={reg_icon} alt="login icon"/>
                <h2>Sign up</h2>
                
                {this.createFormInputs()}
                {this.renderRedirect()}

                <div className="error-state">{this.state.error}</div>

                <RegistrationButton reg={this.checkAccount}/>
                <BackButton/>
            </div>
        );
    }


    render() {
        return (
            (this.state.user) ? <Redirect to="/diary"/> :  this.createContent()
        )
    }
}


export default RegistrationPage