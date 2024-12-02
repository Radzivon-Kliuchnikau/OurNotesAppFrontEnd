import {Navigate, Outlet, useLocation} from "react-router-dom";
import {AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";

const RequireAuth = () => {
    const location = useLocation();

    return (
        <>
            <AuthenticatedTemplate>
                <Outlet/>
            </AuthenticatedTemplate>
            
            <UnauthenticatedTemplate>
                {/*<SignInLink buttonName="Sign In"/>*/}
                <Navigate to="/login" state={{from: location}} replace/>
            </UnauthenticatedTemplate>
        </>
    );
};

export default RequireAuth;