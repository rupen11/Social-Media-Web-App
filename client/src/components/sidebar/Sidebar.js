import React from 'react'
import "./sidebar.css"
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CloseFriend from '../closeFriend/CloseFriend';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatBubbleOutlineOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledWhiteOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupsOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkBorderOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <QuestionMarkOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventNoteOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className='sidebarHr' />
        <ul className="sidebarFriendList">
          {/* {Users.map(u => {
            return (
              <CloseFriend key={u.id} user={u} />
            )
          })} */}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar