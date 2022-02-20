import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './chatOnline.css'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get("/users/friends/" + currentId);
                setFriends(res.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getFriends();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data)
        } catch (error) {

        }
    }

    return (
        <div className='chatOnline'>
            {onlineFriends.map((o) => {
                return <div className="chatOnlineFriend" key={o?._id} onClick={() => { handleClick(o) }}>
                    <div className="chatOnlineImgContainer">
                        <img className='chatOnlineImg' src={o?.profilePicture ? PF + o.profilePicture : PF + "noAvatar.png"} alt="" />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineWrapper">{o?.username}</span>
                </div>
            })}
        </div>
    )
}

export default ChatOnline