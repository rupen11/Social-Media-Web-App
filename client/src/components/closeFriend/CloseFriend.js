import React from 'react'
import './closeFriend.css'

const CloseFriend = (props) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { username, profilePicture } = props.user;
    return (
        <li className="sidebarFriend">
            <img className='sidebarFriendImg' src={PF + profilePicture} alt="" />
            <span className="sidebarFriendName">{username}</span>
        </li>
    )
}

export default CloseFriend