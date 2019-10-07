import React, { Component } from 'react';
import reg_icon from '../../assets/images/login_icon.svg';
import './RegistrationPage.css';
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
        user: firebaseConnection.auth().currentUser
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
                .then((user_) => {
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
            <div>
                <input className="input" type="email" placeholder="E-mail"
                    onChange={this.handleEmailChanged}/>
                <div className="inputDiv">
                    <input className="input" type="password" placeholder="Password"
                        onChange={this.handlePasswordChanged}/>
                </div>
                <div className="inputDiv">
                    <input className="input" type="password" placeholder="Repeat password"
                        onChange={this.handleRepeatPasswordChanged}/>
                </div>
            </div>
        )
    }



    createBodyBlock = () => {
        return (
            <div className="Body">
                <div className="block">
                    <div className="block-content">

                        <img className="img-reg" src={reg_icon} alt="login icon"/>
                        <h2 className="h2-reg">Sign up</h2>
                        
                        {this.createFormInputs()}

                        {this.renderRedirect()}

                        <div className="error-state">{this.state.error}</div>

                        <div className="btn-login">
                            <RegistrationButton reg={this.checkAccount}/>
                        </div>

                        <div className="btn-login">
                            <BackButton />
                        </div>

                    </div>
            </div>
        </div>
        );
    }



    render() {
        return (
            (this.state.user !== null) ? <Redirect to="/diary"/> :  this.createBodyBlock()
        )
    }
}



export default RegistrationPage