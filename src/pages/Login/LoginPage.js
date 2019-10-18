import React, { Component } from 'react';
import './LoginPage.css';
import '../signingContent.css';
import LoginSubmitButton from '../../components/LoginSubmitButton/LoginSubmitButton';
import login_icon from '../../assets/images/login_icon.svg';
import BackButton from '../../components/BackButton/BackButton';
import firebaseConnection from '../../firebase/config';
import { Redirect } from 'react-router';


export class LoginPage extends Component {

    state = {
        email: null,
        password: null,
        error: null,
        redirect: false,
        user: null
    }
      
      
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/diary' />
        }
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



    checkAccount = (e) => {
        e.preventDefault();
        firebaseConnection.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                return (
                    this.setState({
                        redirect: true
                    })
                )
            }).catch(error_ => {
                return(
                    this.setState({
                        error: error_.message
                }))
            });
    }


    createFormInputs = () => {
        return (
            <form id="loginform">
                <input className="forminput" type="email" placeholder="E-mail"
                    onChange={this.handleEmailChanged}/>
                <input className="forminput" type="password" placeholder="Password"
                    onChange={this.handlePasswordChanged}/>
            </form>
        )
    }
    
    createContent = () => {
        return (
            <div className="content">
                <img src={login_icon} alt="login icon"/>
                <h2>Sign in</h2>

                {this.createFormInputs()}
                {this.renderRedirect()}

                <div className="error-state">{this.state.error}</div>

                <LoginSubmitButton login={this.checkAccount}/>
                <BackButton/>
            </div>
        )
    }


    render() {
        return (
            (this.state.user) ? <Redirect to="/diary"/> : this.createContent()
        )
    }
}


export default LoginPage