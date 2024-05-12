import React, { useContext, useState } from 'react';
import './Login.css';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState('');
    const {setUserInfo} = useContext(UserContext);
    async function tryLogin(ev){
        ev.preventDefault();
        const response = await fetch('https://server-production-359e.up.railway.app/login',{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        });
        if(response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo)
                setRedirect(true) 
            })
        }else{
            alert('Wrong credentials');
        }
    }

    if (redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <main>
            <div className='login-window'>
                <h1>LOGIN</h1>
                <form action="" onSubmit={tryLogin}>
                    <label htmlFor="">Username</label>
                    <input name='username' type='text' placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button>Submit</button>
                </form>
            </div>
        </main>
    );
}

export default Login;
