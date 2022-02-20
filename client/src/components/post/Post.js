import React, { useContext, useEffect, useState } from 'react'
import "./post.css"
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import socialContext from '../../context/socialContext';
import { useSelector } from 'react-redux';

const Post = (props) => {
    const context = useContext(socialContext);
    // const { user: currentUser } = context;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { _id, userId, createdAt, desc, likes, img } = props.post;
    const currentUser = useSelector((state) => state.getUserReducer.userdata);

    const [like, setLike] = useState(likes.length);
    const [isLiked, setIsLiked] = useState();
    const [comment, setComment] = useState(0);

    const likeHandler = async () => {
        try {
            const res = await axios.put('/posts/' + _id + '/like', { userId: currentUser._id });
            setLike(isLiked ? like - 1 : like + 1);
            setIsLiked(!isLiked);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setIsLiked(likes.includes(currentUser._id))
    }, [currentUser._id, likes]);

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [userId])

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img className='postProfileImg' src={user.profilePicture ? PF + user.profilePicture : PF + "noAvatar.png"} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreHorizOutlinedIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{desc}</span>
                    <img className='postImg' src={img && PF + img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postButtomLeft">
                        <img className='likeIcon' src="/assets/like.png" onClick={likeHandler} alt="" />
                        <img className='likeIcon' src="/assets/heart.png" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} likes</span>
                    </div>
                    <div className="postButtomRight">
                        <span className="postCommenttext">{comment} comments</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Post