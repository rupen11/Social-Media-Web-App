import React from 'react'
import './online.css'

const Online = (props) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { username, profilePicture } = props.user;
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className='rightbarProfileImg' src={PF + profilePicture} alt="" />
                <span className='rightbarOnline'></span>
            </div>
            <span className="rightbarUsername">{username}</span>
        </li>
    )
}

export default Online