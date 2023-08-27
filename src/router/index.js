import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ViewUser from '../pages/ViewUser';
import EditUser from '../pages/EditUser';
import Home from '../pages/Home';

function MyRouter(){
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users/view/:id" element={<ViewUser />} />
            <Route path="/users/:id/edit" element={<EditUser />} />
        </Routes>
    )
}

export default MyRouter;