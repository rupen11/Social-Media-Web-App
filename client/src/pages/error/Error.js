import React from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../../components/topbar/Topbar'
import './error.css'

const Error = () => {
    return (
        <>
            <Topbar />
            <div className="errorContainer">
                <div className="errorInnerContainer">
                    <h1 className='errorPageHeading'>404 Page Not Found</h1>
                    <img src="./assets/error.svg" alt="" className='errorPageImage' />
                    <p className='errroPagePara'>Sorry page not found, Page you look for not available or may be in construction</p>
                    <button className='errorPageBtn'><Link to="/">Back To Home</Link></button>
                </div>
            </div>
        </>
    )
}

export default Error