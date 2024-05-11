import React, { useState } from 'react';
import './Login.css';

const Register = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    async function register(event){
        
        event.preventDefault();
        const resp = await fetch('http://localhost:4000/register',{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
        });

        if(resp.status===200){
            alert('registration successful');
        }else{
            alert('registration failed');
        }
    }

    return (
        <main>
            <div className='login-window'>
                <h1>REGISTER</h1>
                <form className='register' onSubmit={register}>
                    <label htmlFor="">Username</label>
                    <input name='username'
                           type='text' 
                           placeholder='username'
                           value={username}
                           onChange={(ev)=>setUsername(ev.target.value)}/>

                    <label htmlFor="">Password</label>
                    <input type="password"
                           placeholder='password'
                           value={password}
                           onChange={e=>setPassword(e.target.value)}/>
                    <button>Submit</button>
                </form>
            </div>
        </main>
    );
}

export default Register;
