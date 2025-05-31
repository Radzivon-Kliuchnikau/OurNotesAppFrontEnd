import { API_URL } from "../../utils/Constants.tsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import InternalError from "../../pages/InternalError.tsx";
import * as React from "react";
// import Spinner from "../common/Spinner.tsx";
import { useAuth } from "../../context/UseAuth.tsx";

const AuthorizeView = (): React.ReactElement => {
    const location = useLocation();
    const { user } = useAuth();
    // const { loading, internalError } = useAuthCheck();

    // if (loading) return <Spinner />;
    // if (internalError) return <InternalError />;
    if (!user)
        return (
            <Navigate
                to={API_URL.LOGIN_URL}
                state={{ from: location }}
                replace
            />
        );
    return <Outlet />;
};

export default AuthorizeView;
