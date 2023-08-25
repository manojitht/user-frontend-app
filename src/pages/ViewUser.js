import { Link } from "react-router-dom";

function ViewUser(){
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
                                    <h3 class="card-title">Thiyageswarakumar Manojith</h3>
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">Email:</h4>
                                    <p class="card-text">manojith@gmail.com</p>
                                    <h4 class="card-title">Phone:</h4>
                                    <p class="card-text">0777210098</p>
                                    <h4 class="card-title">Technologies:</h4>
                                    <p class="card-text">Python, Java, C++, PHP, Django, Laravel.</p>
                                    <h4 class="card-title">Description:</h4>
                                    <p class="card-text">I was a passionate developer</p>
                                    <Link to="/edit-user" className="btn btn-success">Edit Account</Link>
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