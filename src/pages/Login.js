import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Login(){

    const [inputErrorList, setInputErrorList] = useState({})

    const[user, setUser] = useState({
        email: '',
        password: ''
    })
   
    const handleInput = (e) => {
        e.persist();
        setUser({...user, [e.target.name]: e.target.value});
    }

    const data = {
        email: user.email,
        password: user.password,
    }

    const loginUser = () => {
        
        // if(user.email === ""){
        //     alert('Please enter email!')
        // }
        // else if(user.password === ""){
        //     alert('Please enter password!')
        // }

        axios.post(`http://127.0.0.1:8000/api/login`, data).then(res => {
            alert(res.data.message);
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 404){
                    setInputErrorList(error.response.data.errors)
                }
            }
        })
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
                                <form onSubmit={loginUser}>
                                    <div className="mb-3">
                                        <label className="form-label">User Email:</label>
                                        <input type="email" name="email" value={user.email} onChange={handleInput}  className="form-control" />
                                        <span className="text-danger">{inputErrorList.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password:</label>
                                        <input type="text" name="password" value={user.password} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.password}</span>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <Link to="/" className="btn btn-danger float-end">Go to Register</Link>
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