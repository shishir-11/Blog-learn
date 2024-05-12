import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Navbar = () => {
    const {setUserInfo,userInfo} = useContext(UserContext);

    useEffect(()=>{
        fetch('https://server-production-359e.up.railway.app/profile',{
            method:'GET',
            credentials:'include',
        }).then(response=>{
            console.log(response);
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
            })
        });
    },[])

    function logout(){
        fetch('https://server-production-359e.up.railway.app/logout',{
            credentials:'include',
            method:'POST',
        })
        setUserInfo(null);
    }

    const userName = userInfo?.username
    return (
        <header>
            <div className="logo">
                <Link to="/"><h2>My Blogs</h2></Link>
            </div>
            <div className="navigation">
                {userName&&(
                    <>
                    <Link to="/create">Create</Link>
                    <a onClick={logout}>Logout</a>
                    </>
                )}
                { !userName && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Navbar;
