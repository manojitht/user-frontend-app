import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'

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
    const [technologies, setTechnologies] = useState('');

    const handleInput = (e) => {
        e.persist();
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setDescription(data);
      };

    const handleOnchange = val => {
          setTechnologies(val)
      }
  
      const  options  = [
        { label:  'Java', value:  'Python'  },
        { label:  'Python', value:  'Java'  },
        { label:  'PHP', value:  'PHP'  },
        { label:  'C++', value:  'C++'  },
        { label:  'C#', value:  'C#'  },
        { label:  'JavaScript', value:  'JavaScript'  },
        { label:  'TypeScript', value:  'TypeScript'  },
        { label:  'Html', value:  'Html'  },
        { label:  'CSS', value:  'CSS'  },
        { label:  'Angular', value:  'Angular'  },
        { label:  'React Js', value:  'React Js'  },
        { label:  'Django', value:  'Django'  },
        { label:  'Spring Boot', value:  'Spring Boot'  },
        { label:  'AWS', value:  'AWS'  },
        { label:  'Azure', value:  'Azure'  },
    ]

    const updateUser = (e) => {
        e.preventDefault();
        
        const data = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            technologies: technologies,
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
                                        <label className="form-label">Existing Tech on your profile:</label><p class="card-text">{user.technologies}</p>
                                        <label className="form-label">Choose Technologies:</label>
                                        <MultiSelect name="technologies" value={user.technologies} onChange={handleOnchange} options={options} placeholder="Choose to edit technologies" />
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