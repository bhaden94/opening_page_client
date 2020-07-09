import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "name":state.name,
                "email":state.email,
                "password":state.password,
            }
            axios.post(API_BASE_URL+'register', payload)
                .then(function (response) {
                    if(response.data.code === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToHome = () => {
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <div className="d-flex justify-content-center">
            <form className="text-center border border-light p-5 margin-top width shadow rounded register-form" action="#!">
                <p className="h4 mb-4">Register</p>
                <input type="text" className="form-control mb-4" placeholder="Name" value={state.name} id="name" onChange={handleChange} />
                <input type="email" className="form-control mb-4" placeholder="E-mail" value={state.email} id="email" onChange={handleChange} />
                <input type="password" className="form-control mb-4" placeholder="Password" value={state.password} id="password" onChange={handleChange} />
                <input type="password" className="form-control mb-4" placeholder="Confirm Password" value={state.confirmPassword} id="confirmPassword" onChange={handleChange} />
                <button className="btn btn-primary btn-block my-4" type="submit" onClick={handleSubmitClick}>Register</button>
                <p>Already have an account?
                    <a href="#!" onClick={() => redirectToLogin()}> Login Here</a>
                </p>
                <p>or sign up with:</p>
                <a href="#!" className="mx-2" role="button"><i className="fab fa-facebook-f light-blue-text"></i></a>
                <a href="#!" className="mx-2" role="button"><i className="fab fa-twitter light-blue-text"></i></a>
                <a href="#!" className="mx-2" role="button"><i className="fab fa-google light-blue-text"></i></a>

                <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                    {state.successMessage}
                </div>
            </form>
            
        </div>
    )
}

export default withRouter(RegistrationForm);

/* <div id="margin-top" className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div> */