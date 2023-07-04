import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../signup.css'
import APIService from '../APIService';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const LogTheUser = () => {
        if(email === "" || password === "") {
            alert("Insert data to login");
        } else {
            APIService.LoginUser(email, password)
            .then(response => {
                console.log(response.status)
                if(response.status === 200) {
                    return navigate("/main");
                } else {
                    alert("Invalid password or email");
                }
            })
            .catch(error => console.error(error));
        }
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    return(
        <div className='container'>
            <h1>Login here</h1>
            <input 
                onChange={handleChangeEmail} 
                value={email} 
                placeholder='email' 
            />
            <input 
                onChange={handleChangePassword} 
                value={password} 
                placeholder='password' 
                type='password' 
            />
            <button onClick={LogTheUser}>Login</button>
            <p>Not a member yet? <Link to="/" style={{ textDecoration: 'none', color: "white" }}>Sign up here</Link></p>
        </div>
    );
};