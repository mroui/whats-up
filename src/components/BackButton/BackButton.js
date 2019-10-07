import React, { Component } from 'react'
import '../Button.css'
import { Link } from "react-router-dom";


export class BackButton extends Component {
    render() {
        return (
            <div>
                <Link to="/" className="btn_">Back</Link>
            </div>
        )
    }
}


export default BackButton