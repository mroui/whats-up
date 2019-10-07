import React, { Component } from 'react';
import '../Button.css';
import { Link } from "react-router-dom";
import firebaseConnection from '../../firebase/config';


export class LogoutButton extends Component {


    logout = () => {
        firebaseConnection.auth().signOut();
    }


    render() {
        return (
            <div>
                <Link to="/" className="btn_" onClick={this.logout}>Log out</Link>
            </div>
        )
    }
}


export default LogoutButton