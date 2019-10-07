import React, { Component } from 'react'
import '../Button.css'
import { Link } from "react-router-dom";


export class RegistrationSubmitButton extends Component {
    render() {
        return (
            <div>
                <Link to="/register" className="btn_" onClick={this.props.reg}>Sign up</Link>
            </div>
        )
    }
}


export default RegistrationSubmitButton