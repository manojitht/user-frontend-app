import { Link } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Register(){
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
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">User Name:</label>
                                        <input type="text" name="name" className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">User Email:</label>
                                        <input type="email" name="email"  className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">User Phone:</label>
                                        <input type="text" name="name" className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Technologies:</label>
                                        <select class="form-select" multiple aria-label="Multiple select example">
                                            <option selected>Python</option>
                                            <option value="1">AWS</option>
                                            <option value="2">PHP Laravel</option>
                                            <option value="3">MySQL</option>
                                        </select>
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description:</label>
                                        <CKEditor
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
                                        />
                                        
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Create Password:</label>
                                        <input type="text" name="phone" className="form-control" />
                                        <span className="text-danger"></span>
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