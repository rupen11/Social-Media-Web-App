import React, { useContext } from 'react'
import './topbar.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state) => state.getUserReducer.userdata);

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">Facegram</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchOutlinedIcon className="searchIcon" />
          <input type="text" name="search" className='searchInput' placeholder="Search for friend, post or video" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <IconButton>
              <PersonOutlineOutlinedIcon className='topbarIcon' />
            </IconButton>
            <span className="topbarIconbadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger">
              <IconButton>
                <ChatBubbleOutlineOutlinedIcon className='topbarIcon' />
              </IconButton>
              <span className="topbarIconbadge">1</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <IconButton>
              <NotificationsOutlinedIcon className='topbarIcon' />
            </IconButton>
            <span className="topbarIconbadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img src={user?.profilePicture ? PF + user.profilePicture : PF + "noAvatar.png"} alt="" className='topbarImg' />
        </Link>
      </div>
    </div>
  )
}

export default Topbar