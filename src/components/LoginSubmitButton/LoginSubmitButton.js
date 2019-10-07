import React, { Component } from 'react'
import '../Button.css'
import { Link } from "react-router-dom";


export class LoginSubmitButton extends Component {
    render() {
        return (
            <div>
                <Link to="/login" className="btn_" onClick={this.props.login}>Sign in</Link>
            </div>
        )
    }
}


export default LoginSubmitButton