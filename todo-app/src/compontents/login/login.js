import React, { useState } from 'react';
import { loginAPI, createUser } from './apiHelper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

function LoginPage({onLogin}) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [message, setMessage] = useState('');

    function handleChange(e){
        const {name, value} = e.target;
        setCredentials({
            ...credentials,
        [name]: value,
        });
    }

    async function handleLoginClick(){
        setMessage('');
        const res = await loginAPI(credentials);
        if(res.user_id){
            setMessage('Login Successfull');
            onLogin(res.user_id);
        }else{
            setMessage(res.message)
        }
    }

    async function handleCreateUserClick(){
        setMessage('');
        const res = await createUser(credentials);
        if(res.ok){
            setMessage('User Created');
        }else{
            setMessage('Failed');
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt5">
                <div className="col-md-16">
                    <div className="card">
                        <div className="card-body text-center mt-6">
                            <h2 className="card-title">
                                {isLoginMode ? 'Login' : 'Create New User'}
                            </h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Enter username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    />
                                </div>
                                {isLoginMode ? (
                                    <button 
                                    type="button"
                                    className="btn btn-primary w-100 mt-4"
                                    onClick={handleLoginClick}
                                    >
                                        Login
                                    </button>
                                ) : ( 
                                    <button
                                    type="button"
                                    className="btn btn-primary w-100 mt-4"
                                    onClick={handleCreateUserClick}    
                                    >
                                        Create User
                                </button> )}
                            </form>
                            <div className="text-center mt-4">
                                <button
                                type="button"
                                className="btn btn-link"
                                onClick={() => setIsLoginMode(!isLoginMode)}
                                >
                                    {isLoginMode ? 'Create New Account' : 'Back to Login'}
                                </button>
                            </div>
                            {message && (
                                <div className="alert alert-info mt-3">
                                    {message}
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LoginPage;