import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ViewUser from '../pages/ViewUser';
import EditUser from '../pages/EditUser';

function MyRouter(){
    return(
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/view-user" element={<ViewUser />} />
            <Route path="/edit-user" element={<EditUser />} />
        </Routes>
    )
}

export default MyRouter;