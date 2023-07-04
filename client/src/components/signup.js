import React, {useState} from 'react';
import APIService from '../APIService';
import { Link, useNavigate } from 'react-router-dom';
import '../signup.css'
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const insertDataForUser = () => {
        if(email === "" || password === "") {
            alert("insert email or password");
        } else {
            APIService.InsertUser(email, password)
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    return navigate("/login");
                } else {
                    alert("This email is already in use")
                }
            })
            .catch(error => console.error(error))
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
            <h1 className='title'>Signup here</h1>
            <input onChange={handleChangeEmail} value={email} placeholder='email'/>
            <input type='password' onChange={handleChangePassword} value={password} placeholder='password' />
            <button onClick={insertDataForUser}>Sign up</button>
            <p>Already Signed up? <Link to="/login" style={{ textDecoration: 'none', color: "white" }}>Login here</Link></p>
        </div>
    );

};

export default Signup;