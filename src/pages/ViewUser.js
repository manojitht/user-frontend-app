import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function ViewUser(){

    const {auth_name}= useParams();
    const navigate = useNavigate();

    const user_id = localStorage.getItem("auth_id");
    const user_name = localStorage.getItem("auth_name");
    const user_email = localStorage.getItem("auth_email");
    const user_phone = localStorage.getItem("auth_phone");
    const user_technologies = localStorage.getItem("auth_technologies");
    const user_description = localStorage.getItem("auth_description");

    const logout = () => {
        localStorage.removeItem("auth_token");
        navigate('/');
    }

    return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Welcome to your profile!</h4>
                            </div>
                            <div className="card-body">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">{user_name}</h3>
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">Email:</h4>
                                    <p class="card-text">{user_email}</p>
                                    <h4 class="card-title">Phone:</h4>
                                    <p class="card-text">{user_phone}</p>
                                    <h4 class="card-title">Technologies:</h4>
                                    <p class="card-text">{user_technologies}</p>
                                    <h4 class="card-title">Description:</h4>
                                    <p class="card-text">{user_description}</p>
                                    <Link to={`/users/${user_id}/edit`} className="btn btn-success">Edit Account</Link>
                                    <Link to="/" className="btn btn-danger float-end">Delete My Account</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUser;