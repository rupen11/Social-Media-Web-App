import React, { useContext, useEffect, useRef } from 'react'
import './login.css'
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory } from 'react-router-dom'
import socialContext from '../../context/socialContext';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/index';
import axios from 'axios';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const context = useContext(socialContext);
    const { user, loginHandle } = context;
    const email = useRef();
    const password = useRef();

    const handleClick = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("/auth/login", { email: email.current.value, password: password.current.value });
            if (res.status === 200) {
                localStorage.setItem("AuthToken", res.data.jwtToken);
                dispatch(getUser(res.data.user));
                history.push("/");
            }
        }
        catch (error) {
            console.log("Some error to login " + error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('AuthToken');
        if (token) history.push('/');
    }, []);

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facegram</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Lamasocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" ref={email} className="loginInput" placeholder='Email' required />
                        <input type="password" ref={password} minLength={1} className="loginInput" placeholder='Password' required />
                        {/* <button type="submit" className='loginButton' disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}</button> */}
                        <button type="submit" className='loginButton'>Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        {/* <button className="loginRegisterButton"><Link to="/register" className='loginButtonText'>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create a New Account"}</Link></button> */}
                        <button type='button' className="loginRegisterButton"><Link to="/register" className='loginButtonText'>Create a New Account</Link></button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Login