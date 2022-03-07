import React, { useContext, useEffect, useRef, useState } from 'react'
import "./messenger.css"
import Topbar from '../../components/topbar/Topbar'
import Conversations from '../../components/conversations/Conversations';
import Message from '../../components/message/Message';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import IconButton from '@mui/material/IconButton';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { useHistory } from 'react-router-dom';

const Messenger = () => {
    const history = useHistory();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessages, setnewMessages] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const scrollRef = useRef();
    const socket = useRef();
    const user = useSelector((state) => state.getUserReducer.userdata);

    useEffect(() => {
        const token = localStorage.getItem('AuthToken');
        if (!token) history.push('/login');

        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setTimeout(() => {
                setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)));
            }, 500);
        })
    }, [user])

    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getConversation();
    }, [user._id])

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMessage();
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessages,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find(member => member !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessages
        })

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setnewMessages("");
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" className='chatMenuInput' placeholder='Search for Friends' />
                        {conversations.map((c) => {
                            return <div key={c._id} onClick={() => { setCurrentChat(c) }}>
                                <Conversations conversation={c} currentUser={user} />
                            </div>
                        })}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop">
                                        {
                                            messages.map((m) => {
                                                return <div ref={scrollRef} key={m._id}>
                                                    <Message message={m} own={m.sender === user._id} />
                                                </div>
                                            })
                                        }
                                    </div>

                                    <form className="chatBoxBottom" onSubmit={handleSubmit}>
                                        <textarea className='chatMessageInput' value={newMessages} onChange={(e) => { setnewMessages(e.target.value) }} placeholder='Write Someting...'></textarea>
                                        <IconButton type="submit" className='chatSubmitButton'>
                                            <SendOutlinedIcon htmlColor="#1877f2" />
                                        </IconButton>
                                    </form>
                                </> : <span className='noConversation'>Open a conversation to start a chat</span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Messenger