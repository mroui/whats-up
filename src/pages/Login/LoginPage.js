import React, { Component } from 'react';
import './LoginPage.css';
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
            .then((u) => {
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
            <div>
                <input className="input" type="email" placeholder="E-mail"
                    onChange={this.handleEmailChanged}/>
                <div className="inputDiv">
                    <input className="input" type="password" placeholder="Password"
                        onChange={this.handlePasswordChanged}/>
                </div>
            </div>
        )
    }


    
    createContent = () => {
        return (
            <div className="Body">
            <div className="block">
            <div className="block-content">

                <img className="img-login" src={login_icon} alt="login icon"/>

                <h2 className="h2-login">Sign in</h2>

                {this.createFormInputs()}

                {this.renderRedirect()}

                <div className="error-state">{this.state.error}</div>

                <div className="btn-login">
                    <LoginSubmitButton login={this.checkAccount}/>
                </div>

                <div className="btn-login">
                    <BackButton />
                </div>

            </div>
            </div>
            </div>
        )
    }


    render() {
        return (
            console.log(this.state.user),
            (this.state.user) ? <Redirect to="/diary"/> : this.createContent()
        )
    }
}



export default LoginPage