import React, { Component } from 'react'
import '../Button.css';
import { Link } from "react-router-dom";


export class HomeLoginButton extends Component {
    render() {
        return (
            <div>
                <Link to="/login" className="btn_">Sign in</Link>
            </div>
        )
    }
}


export default HomeLoginButton