import React, { useContext, useRef, useState } from 'react'
import "./share.css"
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import socialContext from '../../context/socialContext';
import { useSelector } from 'react-redux';

const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    const user = useSelector((state) => state.getUserReducer.userdata);

    const submitHandle = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = file.name;
            data.append('file', file);
            data.append("name", fileName);
            newPost.img = fileName;
            try {
                await axios.post("/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture ? PF + user.profilePicture : PF + "noAvatar.png"} alt="" />
                    <input className='shareInput' ref={desc} type="text" name="" placeholder={`What's in your mind ${user.username}?`} />
                </div>
                <hr className='shareHr' />
                {
                    file && (
                        <div className="shareImageContent">
                            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                            <CloseOutlinedIcon className='shareCancelImg' onClick={() => setFile(null)} />
                        </div>
                    )
                }
                <form className="shareButton" onSubmit={submitHandle}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMediaOutlinedIcon htmlColor='tomato' className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <LabelImportantOutlinedIcon htmlColor='blue' className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <LocationOnOutlinedIcon htmlColor='green' className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsOutlinedIcon htmlColor='gold' className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button type='submit' className="shareBtn">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share