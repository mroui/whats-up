import React, { Component } from 'react';
import './HomePage.css';
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
            <div className="block-content">
                <img className="img" src={login_icon} alt="login icon"/>
                <h2 className="h2">Welcome to WhatsUp!</h2>
                <div className="btn">
                    <HomeLoginButton/> 
                </div>
                <div className="btn">
                    <HomeRegisterButton/>
                </div>
            </div>
        );
    }



    createBodyBlock = () => {
        return (
            <div className="Body">
            <div className="block">
                {(this.state.user) ? <Redirect to="/diary"/> : this.createContent()}
            </div>
            </div>
        );
    }


    render() {
        return (
            this.createBodyBlock()
        );
    }
}


export default HomePage