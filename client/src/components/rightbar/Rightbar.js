import React, { useContext, useEffect, useState } from 'react'
import "./rightbar.css"
import Online from '../online/Online';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/index';

const Rightbar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state) => state.getUserReducer.userdata);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className='birthdayImg' src="/assets/gift.png" alt="" />
          <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today</span>
        </div>
        <img className='rightbarAd' src="/assets/ad.png" alt="" />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="rightbarOnlineFriendList">
          {/* {Users.map(u => {
            return <Online key={u.id} user={u} />
          })} */}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    const [followed, setFollowed] = useState(user.followings?.includes(props.user._id));
    const [friends, setFriends] = useState();

    const handleClick = async () => {
      try {
        if (followed) {
          await axios.put("/users/" + props.user._id + "/unfollow", { userId: user._id });
        }
        else {
          await axios.put("/users/" + props.user._id + "/follow", { userId: user._id });
        }
      }
      catch (error) {
        console.log(error);
      }
      setFollowed(!followed);
    }

    const [showEditContainer, setShowEditContainer] = useState(false);
    const [information, setInformation] = useState();

    const handleEditinfoData = (e) => setInformation({ ...information, [e.target.name]: e.target.value });

    const handleEditinfo = async (e) => {
      e.preventDefault();
      const res = await axios.put('/users/' + user._id, { userId: user._id, information });
      setShowEditContainer(false);
      dispatch(getUser(res.data));
    }

    const logoutuser = () => {
      localStorage.removeItem('AuthToken');
      history.push('/login');
    }

    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/users/friends/" + props.user._id);
          if (friendList.status === 200) {
            setFriends(friendList.data);
          }
        }
        catch (error) {
          console.log(error);
        }
      }
      getFriends();
    }, [])
    return (
      <>
        {props.user.username !== user.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}

          </button>
        )}
        <div className="rightbarInfo">
          {
            !showEditContainer ? <>
              <h4 className='rightbarTitle'>User Information</h4>
              <div className="righrbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
              </div>
              <div className="righrbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
              </div>
              <div className="righrbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
              </div>
              <button className='rightbareditinfoBtn' onClick={() => { setShowEditContainer(true) }}>Edit Information</button>
              <button className='rightbarLogout' onClick={logoutuser}>Logout</button>
            </> :
              <div className="rightbarEditContainer">
                <h4 className='rightbarTitle'>Edit Information</h4>
                <form className='rightbarEditinfoForm'>
                  <input type="text" className='rightbarEditinfoInput' name="city" placeholder='City ex. Ahmedabad' onChange={handleEditinfoData} />
                  <input type="text" className='rightbarEditinfoInput' name="from" placeholder='From ex. Ahmedabad' onChange={handleEditinfoData} />
                  <select name="relationship" className='rightbarEditinfoInput' onChange={handleEditinfoData}>
                    <option value="" selected disabled>Relationship Status</option>
                    <option value="1">Single</option>
                    <option value="2">Married</option>
                    <option value="3">Other</option>
                  </select>
                  <div className="rightbarButtonContainer">
                    <button type="submit" className='rightbarEditinfoSubmit' onClick={handleEditinfo}>Save</button>
                    <button type="button" className='rightbarEditinfoClose' onClick={() => { setShowEditContainer(false) }}>Close</button>
                  </div>
                </form>
              </div>
          }
        </div>
        <h4 className='rightbarTitle'>Friends</h4>
        <div className="rightbarFollowings">
          {friends && friends.map((friend) => {
            return <Link to={`/profile/${friend.username}`} style={{ color: "#000" }} key={friend._id}>
              <div className="rightbarFollowing">
                <img className='rightbarFollowingImg' src={friend.profilePicture ? PF + friend.profilePicture : PF + "noAvatar.png"} alt="" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          })}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {props.user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar