import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Register(){

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({})

    // keeping the state of input fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [description, setDescription] = useState('');
    const [password, setpassword] = useState('');
  
    const handleNameChange = event => {
      setName(event.target.value);
    };
  
    const handleEmailChange = event => {
      setEmail(event.target.value);
    };

    const handlePhoneChange = event => {
        setPhone(event.target.value);
    };

    const handleTechnologiesChange = event => {
        setTechnologies(event.target.value);
    };
  
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setDescription(data);
    };

    const handlePasswordChange = event => {
        setpassword(event.target.value);
    };
  
    const saveUser = event => {
      event.preventDefault();        
        
        const data = {
            name: name,
            email: email,
            phone: phone,
            technologies: technologies,
            description: description,
            password: password,
        }

        axios.post(`http://127.0.0.1:8000/api/register`, data).then(res => { // calling the laravel api to register the users with input data
            alert(res.data.message);
            navigate('/')
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors)
                }
                if(error.response.status === 500){
                    alert(error.response.data)
                }
            }
        })
    };

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
                                        <input type="text" name="name" value={name} onChange={handleNameChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.name}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">User Email:</label>
                                        <input type="email" name="email" value={email} onChange={handleEmailChange}  className="form-control" />
                                        <span className="text-danger">{inputErrorList.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">User Phone:</label>
                                        <input type="text" name="phone" value={phone} onChange={handlePhoneChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.phone}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Technologies:</label>
                                        {/* <select name="technologies" value={technologies} onChange={handleTechnologiesChange} class="form-select" multiple aria-label="Multiple select example">
                                            <option value="1">AWS</option>
                                            <option value="2">PHP Laravel</option>
                                            <option value="3">MySQL</option>
                                        </select> */}
                                        <input type="text" name="technologies" value={technologies} onChange={handleTechnologiesChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.technologies}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description:</label>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            name="description"
                                            data= {description}
                                            onInit={ editor=> {

                                            }}
                                            onChange={handleEditorChange}
                                        />                                        
                                        <span className="text-danger">{inputErrorList.description}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Create Password:</label>
                                        <input type="text" name="password" value={password} onChange={handlePasswordChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.password}</span>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                    <Link to="/" className="btn btn-danger float-end">Go to Login</Link>                                    
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