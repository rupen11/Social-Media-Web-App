import React, { useEffect } from 'react'
import './home.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('AuthToken');
        if (!token) history.push('/login');
    },[]);
    
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}

export default Home