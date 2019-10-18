import React, { Component } from 'react'
import '../Button.css'
import { Link } from "react-router-dom";


export class RegistrationSubmitButton extends Component {
    render() {
        return (
            <>
                <Link to="/register" className="btn_" onClick={this.props.reg}>Sign up</Link>
            </>
        )
    }
}


export default RegistrationSubmitButton