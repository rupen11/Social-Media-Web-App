import React, { useRef } from 'react'
import './register.css'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const history = useHistory();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmpassword = useRef();

    const handleClick = async (e) => {
        e.preventDefault();
        if (password.current.value !== confirmpassword.current.value) {
            password.current.setCustomValidity("Passwords Don't Match");
        }

        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                const res = await axios.post("/auth/register", user);
                console.log(res);
                history.push("/login");
            }
            catch (error) {
                console.log(error);
            }
        }
    }

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
                        <input type="text" ref={username} minLength={3} maxLength={20} required className="loginInput" placeholder='Username' />
                        <input type="email" ref={email} required className="loginInput" placeholder='Email' />
                        <input type="password" ref={password} minLength={4} required className="loginInput" placeholder='Password' />
                        <input type="password" ref={confirmpassword} required className="loginInput" placeholder='Confirm Password' />
                        <button type="submit" className='loginButton'>Sign up</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton"><Link to="/login" className='loginButtonText'>Log into Account</Link></button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Register