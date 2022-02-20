import React from 'react'
import "./message.css"
import { format } from 'timeago.js'

const Message = ({ message, own }) => {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className="messageTop">
                <img className='messageImg' src="https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
}

export default Message