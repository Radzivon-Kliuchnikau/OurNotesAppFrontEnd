import useAuth from "../hooks/UseAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    console.log(auth.userEmail)
    
    return (
        auth?.roles?.find(role => allowedRoles.include(role))
            ? <Outlet/>
            : auth?.user
                ? <Navigate to="/unauthorized" state={{from: location}} replace />
                : <Navigate to="/login" state={{from: location}} replace />
    );
};

export default RequireAuth;