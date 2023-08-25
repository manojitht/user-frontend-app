import { Link } from "react-router-dom";

function Login(){
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
                                        <label className="form-label">User Email:</label>
                                        <input type="email" name="email"  className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password:</label>
                                        <input type="text" name="phone" className="form-control" />
                                        <span className="text-danger"></span>
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