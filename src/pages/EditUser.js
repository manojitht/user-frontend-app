import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditUser(){

    let { id } = useParams();

    const [inputErrorList, setInputErrorList] = useState({})

    const[user, setUser] = useState({})

    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/api/users/${id}/edit`).then(res=> {
            console.log(res)
            setUser(res.data.user);
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 404){
                    setInputErrorList(error.response.data.errors)
                }
                if(error.response.status === 500){
                    alert(error.response.data)
                }
            }
        });
    }, [id])
    
    const handleInput = (e) => {
        e.persist();
        setUser({...user, [e.target.name]: e.target.value});
    }

    const updateUser = (e) => {
        e.preventDefault();
        
        const data = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            technologies: user.technologies,
            description: user.description,
            password: user.password,
        }

        axios.put(`http://127.0.0.1:8000/api/users/${id}/edit`, data).then(res => {
            alert(res.data.message);
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors)
                }
                if(error.response.status === 404){
                    setInputErrorList(error.response.data.errors)
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
                                <h4>Edit User</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateUser}>
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
                                        {/* <select class="form-select" multiple aria-label="Multiple select example">
                                            <option selected>Python</option>
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
                                            data=""
                                            onReady={ editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log( 'Editor is ready to use!', editor );
                                            } }
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                console.log( { event, editor, data } );
                                            } }
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
                                        <label className="form-label">Change Password:</label>
                                        <input type="text" name="password" value={user.password} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.password}</span>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <Link to="/view-user" className="btn btn-secondary float-end">My Profile</Link>                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser;