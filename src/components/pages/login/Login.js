import React, {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import "./Login.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTasks, faUnlock, faEye, faAt } from '@fortawesome/free-solid-svg-icons';


 

const Login = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [passwordInputType, setPasswordInputType] = useState('password')

    
    const submitLoginHandler = (data) => {
        
        axios.post('https://cors-anywhere.herokuapp.com/https://todo-application-2.herokuapp.com/loginPerson', {
            email: data.email,
            password: data.password,  
        })
        .then(res => {
            if(typeof res.data === "object") {
                 
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('userEmail', res.data.email);
                
                window.location.href="/";
            } else {
                alert(res.data);
            }
             
        });

       

    };

    const showPassword = () => {
        if(passwordInputType === 'text') {
            setPasswordInputType('password') 
        } else {

            setPasswordInputType('text')
        }
        
    }
  
    return(
        <div id="login-div" className="container-fluid bg-primary min-vh-100 d-flex flex-column align-items-center justify-content-center">
             
            <form onSubmit={handleSubmit(submitLoginHandler)} id="register-form" className=" row col-11 col-md-6 d-flex flex-column justify-content-center align-items-center border border-3 border-dark p-4 bg-light">

            <div id="logo-div" className="d-flex justify-content-center align-items-center mt-3 mb-4">
                <FontAwesomeIcon icon={faTasks} color="black" size="2x" className="me-3" />
                <h1 id="register-title" className=" text-dark fs-3 d-flex justify-content-center align-items-center">to do list</h1> 
            </div>
             
            <div className="input-group input-group-lg flex-nowrap mb-3 ps-1">
                <span class="input-group-text" id="email-icon"><FontAwesomeIcon icon={faAt}/></span>
                <input type="email" className="form-control fs-6" id="email" placeholder="Email" aria-label="email" aria-describedby="email-icon" {...register('email', {required:"This is required", pattern:  {value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message:"Enter a valid email"}})}/> 
                 
            </div> 
            {errors.email && <p className="text-danger">{errors.email.message}</p>} 

            <div className="input-group input-group-lg flex-nowrap mb-3 ps-1">
                <span className="input-group-text" id="password-icon"><FontAwesomeIcon icon={faUnlock} /></span>
                <input type={passwordInputType} className="form-control fs-6" id="password" placeholder="Password" aria-label="password" aria-describedby="password-icon" {...register('password', {required:"This is required"})}/> 
                <span className="input-group-text" id="password-icon"><FontAwesomeIcon icon={faEye} onClick={showPassword} /></span>
                 
            </div> 
            {errors.password && <p className="text-danger">{errors.password.message}</p>}

            <p className="d-flex justify-content-center align-items-center">Don't have an account? &nbsp; <a href="/register" className="text-decoration-none text-primary">Sign up</a></p>  

            <button className="btn btn-sm btn-success text-white rounded-3 col-5 col-md-3 fw-bold" id="register-btn">login</button>   
             
            </form>
        </div>
    )
};

export default Login;
