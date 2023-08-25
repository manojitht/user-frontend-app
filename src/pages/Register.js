import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Register(){

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({})

    const[user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        technologies: '',
        description: '',
        password: ''
    })
    
    const handleInput = (e) => {
        e.persist();
        setUser({...user, [e.target.name]: e.target.value});
    }

    const saveUser = (e) => {
        e.preventDefault();
        
        // setLoading(true);
        const data = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            technologies: user.technologies,
            description: user.description,
            password: user.password,
        }

        axios.post(`http://127.0.0.1:8000/api/users`, data).then(res => {
            alert(res.data.message);
            navigate('/login')
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors)
                    // setLoading(false);
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
                                <h4>User Registration
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveUser}>
                                    <div className="mb-3">
                                        <label className="form-label">User Name:</label>
                                        <input type="text" name="name" value={user.name} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.name}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">User Email:</label>
                                        <input type="email" name="email" value={user.email} onChange={handleInput}  className="form-control" />
                                        <span className="text-danger">{inputErrorList.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">User Phone:</label>
                                        <input type="text" name="phone" value={user.phone} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.phone}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Technologies:</label>
                                        {/* <select name="technologies" value={user.technologies} onChange={handleInput} class="form-select" multiple aria-label="Multiple select example">
                                            <option select>Python</option>
                                            <option value="1">AWS</option>
                                            <option value="2">PHP Laravel</option>
                                            <option value="3">MySQL</option>
                                        </select> */}
                                        <input type="text" name="technologies" value={user.technologies} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.technologies}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description:</label>
                                        {/* <CKEditor
                                            editor={ ClassicEditor }
                                            data= {user.description}
                                            onReady={ editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log( 'Editor is ready to use!', editor );
                                            } }
                                            onChange={handleInput}
                                            onBlur={ ( event, editor ) => {
                                                console.log( 'Blur.', editor );
                                            } }
                                            onFocus={ ( event, editor ) => {
                                                console.log( 'Focus.', editor );
                                            } }
                                        /> */}
                                        <textarea name="description" value={user.description} onChange={handleInput} className="form-control" rows="5" />
                                        
                                        <span className="text-danger">{inputErrorList.description}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Create Password:</label>
                                        <input type="text" name="password" value={user.password} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.password}</span>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                    <Link to="/login" className="btn btn-danger float-end">Go to Login</Link>                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;