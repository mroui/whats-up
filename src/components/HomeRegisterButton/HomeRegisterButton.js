import React, { Component } from 'react'
import '../Button.css'
import { Link } from "react-router-dom";


export class HomeRegisterButton extends Component {
    render() {
        return (
            <div>
                <Link to="/register" className="btn_">Sign up</Link>
            </div>
        )
    }
}


export default HomeRegisterButton
