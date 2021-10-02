import axios from "axios";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "./Register.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTasks, faUnlock, faEye } from '@fortawesome/free-solid-svg-icons';

 

const Register = () => {

    const {register, handleSubmit, formState: { errors }} = useForm();

    const [passwordInputType, setPasswordInputType] = useState('password')

    
    const submitRegisterHandler = (data) => {
        
        axios.post('https://cors-anywhere.herokuapp.com/https://todo-application-2.herokuapp.com/registerPerson', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,   
        })
        .then(res => {
             
            if(typeof res.data === "object") {
                window.location.href ="/login";
                

            } else {
                alert(res.data);
            }  
        });

        alert('Thanks for seeing my code:) Unfortunately, the API on which this app was built may not be available anymore and it is not under my control :('); 

    };

    const showPassword = () => {
        if(passwordInputType === 'text') {
            setPasswordInputType('password') 
        } else {

            setPasswordInputType('text')
        }
        
    }
  

    return(
        <div id="register-div" className="container-fluid bg-primary min-vh-100 d-flex flex-column align-items-center justify-content-center">
             
            <form onSubmit={handleSubmit(submitRegisterHandler)} id="register-form" className=" row col-11 col-md-6 d-flex flex-column justify-content-center align-items-center border border-3 border-dark p-4 bg-light">
             
            <div id="logo-div" className="d-flex justify-content-center align-items-center mt-3 mb-4">
                <FontAwesomeIcon icon={faTasks} color="black" size="2x" className="me-3" />
                <h1 id="register-title" className=" text-dark fs-3 d-flex justify-content-center align-items-center">to do list</h1> 
            </div>
            <div className="form-floating mb-2  ps-1 ">
                <input   type="text" className="form-control" id="firstName" placeholder="First Name" {...register('firstName', {required:"This is required", minLength: {value: 2, message: "Minimum 2 characters"}})}/> 
                <label for="firstName">First Name</label>
                {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
            </div>

            <div className="form-floating mb-2 ps-1">
                <input   type="text" className="form-control" id="lasttName" placeholder="Last Name" {...register('lastName', {required:"This is required", minLength: {value: 2, message: "Minimum 2 characters"}})}/> 
                <label for="lastName">Last Name</label>
                {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
            </div>

            <div className="form-floating mb-2 ps-1">
                <input   type="email" className="form-control" id="email" placeholder="Email" {...register('email', {required:"This is required", pattern:  {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message:"Enter a valid email"}})}/> 
                <label for="email">Email</label>
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>  

            <div className="input-group input-group-lg flex-nowrap mb-3 ps-1">
                <span className="input-group-text" id="password-icon"><FontAwesomeIcon icon={faUnlock} /></span>
                <input type={passwordInputType} className="form-control fs-6" id="password" placeholder="Password" aria-label="password" aria-describedby="password-icon" {...register('password', {required:"This is required", minLength: {value: 8, message: "Minimum 8 characters"}})}/> 
                <span className="input-group-text" id="password-icon"><FontAwesomeIcon icon={faEye} onClick={showPassword} /></span>
                 
            </div> 
            {errors.password && <p className="text-danger">{errors.password.message}</p> }

            <p className="d-flex justify-content-center align-items-center">Already have an account? &nbsp; <a href="/login" className="text-decoration-none text-success">Log in</a></p>  

            <button className="btn btn-sm btn-dark text-white rounded-3 col-5 col-md-3 fw-bold" id="register-btn" type="submit">register</button>   

            </form>
        </div>
    )
};

export default Register;
