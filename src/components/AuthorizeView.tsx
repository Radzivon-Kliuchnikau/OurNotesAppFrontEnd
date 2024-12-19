import API_URL from "../utils/Constants.tsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import InternalError from "../pages/InternalError.tsx";
import LoadingBox from "./LoadingBox.tsx";
import useAuth from "../hooks/UseAuth.tsx";
import useAuthCheck from "../hooks/UseAuthCheck.tsx";

const AuthorizeView = () => {
    const location = useLocation();
    const { authUser } = useAuth();
    const { loading, internalError } = useAuthCheck();

    if (loading) return <LoadingBox/>;
    if (internalError) return <InternalError/>;
    if (!authUser) return <Navigate to={API_URL.LOGIN_URL} state={{from: location}} replace/>
    return <Outlet/>;
};

export default AuthorizeView;