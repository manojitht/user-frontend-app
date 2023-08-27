import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HTMLReactParser from 'html-react-parser';

function ViewUser(){

    const { id }= useParams();
    const navigate = useNavigate();
    
    const [user, setUser] = useState([]);

    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`).then(res=> {
            setUser(res.data.user);
        });
    }, [id])

    const htmlContent = String(user.description);

    const deleteUser = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting User...";

        axios.delete(`http://127.0.0.1:8000/api/users/${id}/delete`).then(res => {
            alert(res.data.message);
            navigate("/")
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 404){
                    alert(error.response.data.message)
                    thisClicked.innerText = "Delete";
                }
                if(error.response.status === 500){
                    alert(error.response.data)
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
                                <h4>Welcome to your profile!
                                <Link to="/home" className="btn btn-warning float-end">Back to Home</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Hello, {user.name}!</h3>
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">Name:</h4>
                                    <p class="card-text">{user.name}</p>
                                    <h4 class="card-title">Email:</h4>
                                    <p class="card-text">{user.email}</p>
                                    <h4 class="card-title">Phone:</h4>
                                    <p class="card-text">{user.phone}</p>
                                    <h4 class="card-title">Technologies:</h4>
                                    <p class="card-text">{user.technologies}</p>
                                    <h4 class="card-title">Description:</h4>
                                    <div>
                                        {HTMLReactParser(htmlContent)}
                                    </div>
                                    <Link to={`/users/${user.id}/edit`} className="btn btn-success">Edit Account</Link>
                                    <button type="button" onClick={(e) => deleteUser(e, user.id)} className="btn btn-danger float-end">Delete My Account</button>
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