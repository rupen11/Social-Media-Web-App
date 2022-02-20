import React, { useContext, useEffect, useState } from 'react'
import "./feed.css"
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.getUserReducer.userdata);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = props.username
        ? await axios.get("/posts/profile/" + props.username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  }, [props.username, user])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {(!props.username || user?.username === props.username) && <Share />}
        {posts.map((p => {
          return (
            <Post key={p._id} post={p} />
          )
        }))}
      </div>
    </div>
  )
}

export default Feed