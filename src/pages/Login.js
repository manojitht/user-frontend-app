import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Login(){

    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value });
    }

    const loginUser = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
            axios.post('http://127.0.0.1:8000/api/login', data).then(res => {
                if(res.data.status === 200) {
                    localStorage.setItem('auth_id', res.data.userid)
                    navigate('/home');
                }
                else if(res.data.status === 401) {

                } 
                else if(res.data.status === 500) {
                    alert("Something went wrong!")
                } 
                else {
                    setLogin({...loginInput, error_list: res.data.errors });
                }
            });
    }

    return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>User Login
                                </h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">User Email:</label>
                                        <input type="email" name="email" value={loginInput.email} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{loginInput.error_list.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password:</label>
                                        <input type="password" name="password" value={loginInput.password} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{loginInput.error_list.password}</span>
                                    </div>
                                    <button type="submit" onClick={loginUser} className="btn btn-primary">Login</button>
                                    <Link to="/register" className="btn btn-danger float-end">Go to Register</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;