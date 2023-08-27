import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditUser(){

    let { id } = useParams();

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({}) // error messages

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

    const [description, setDescription] = useState('');

    const handleInput = (e) => {
        e.persist();
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setDescription(data);
      };

    const updateUser = (e) => {
        e.preventDefault();
        
        const data = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            technologies: user.technologies,
            description: description,
        }

        axios.put(`http://127.0.0.1:8000/api/users/${id}/edit`, data).then(res => {
            alert(res.data.message);
            navigate(`/users/view/${id}`);
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors)
                }
                else if(error.response.status === 500){
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
                                        <input type="email" name="email" value={user.email} onChange={handleInput} className="form-control" />
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
                                        <input type="text" name="technologies" value={user.technologies} onChange={handleInput}  className="form-control" />
                                        <span className="text-danger">{inputErrorList.technologies}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description:</label>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            name="description"
                                            data= {user.description}
                                            onInit={ editor=> {

                                            }}
                                            onChange={handleEditorChange}
                                        />
                                        <span className="text-danger">{inputErrorList.description}</span>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <Link to={`/users/view/${id}`} className="btn btn-secondary float-end">My Profile</Link>                                    
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