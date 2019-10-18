import React, { Component } from 'react';
import '../signingContent.css';
import login_icon from '../../assets/images/login_icon.svg';
import HomeLoginButton from '../../components/HomeLoginButton/HomeLoginButton';
import HomeRegisterButton from '../../components/HomeRegisterButton/HomeRegisterButton';
import { Redirect } from 'react-router';
import firebaseConnection from '../../firebase/config'


export class HomePage extends Component {

    state = {
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


    createContent = () => {
        return (
            <div className="content">
                <img src={login_icon} alt="login icon"/>
                <h2>Welcome to WhatsUp!</h2>
                <HomeLoginButton/>
                <HomeRegisterButton/>
            </div>
        );
    }


    createBodyBlock = () => {
        return (
                (this.state.user) ? <Redirect to="/diary"/> : this.createContent()
        );
    }


    render() {
        return (
            this.createBodyBlock()
        );
    }
}


export default HomePage