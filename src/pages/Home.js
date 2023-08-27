import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Home(){

    const navigate = useNavigate();

    const user_id = localStorage.getItem("auth_id");
    
    const [user, setUser] = useState([]);

    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/api/users/${user_id}`).then(res=> {
            setUser(res.data.user);
        });
    }, [user_id])

    const logout = (e) => {
        localStorage.removeItem("auth_id");
        navigate('/');
    }

    return(

        <div className="container mt-5">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Hi, {user.name}!</h1>
                    <h3 class="display-7">Welcome to the Innodata Assessment Home Page !</h3>
                    <hr className="my-4"/>
                    <p className="lead">Click on the below "View My Profile" button to access your profile :)</p>
                    <p className="lead">
                    <Link to={`/users/view/${user_id}`} className="btn btn-primary">View My Profile</Link>
                    <button type="button" onClick={(e) => logout()} className="btn btn-danger float-end">Logout</button>
                </p>
                </div>
            </div>
        </div>
    )
}

export default Home;