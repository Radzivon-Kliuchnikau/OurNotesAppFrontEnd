import useAuth from "../hooks/UseAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    
    console.log(auth.userEmail)
    
    return (
        auth?.userEmail
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace />
    );
};

export default RequireAuth;