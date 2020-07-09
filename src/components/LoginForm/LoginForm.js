import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post(API_BASE_URL+'login', payload)
            .then(function (response) {
                if(response.data.code === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.data.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
    }
    return(
        <div className="d-flex justify-content-center">
            <form className="text-center border border-light p-5 margin-top width shadow rounded login-form" action="#!">
                <p className="h4 mb-4">Sign in</p>
                <input type="email" className="form-control mb-4" placeholder="E-mail" value={state.email} id="email" onChange={handleChange} />
                <input type="password" className="form-control mb-4" placeholder="Password" value={state.password} id="password" onChange={handleChange} />
                <div className="d-flex justify-content-around">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                            <label className="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>
                <button className="btn btn-primary btn-block my-4" type="submit" onClick={handleSubmitClick}>Sign in</button>
                <p>Not a member?
                    <a href="#!" onClick={() => redirectToRegister()}> Register Here</a>
                </p>
                <p>or sign in with:</p>
                <a href="#!" className="mx-2" role="button"><i className="fab fa-facebook-f light-blue-text"></i></a>
                <a href="#!" className="mx-2" role="button"><i className="fab fa-twitter light-blue-text"></i></a>
                <a href="#!" className="mx-2" role="button"><i className="fab fa-google light-blue-text"></i></a>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
        </div>
    )
}

export default withRouter(LoginForm);

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
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-dark"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div> */