import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/UseAuth.tsx";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        <div>
            <h2>You must be logged in to view this page.</h2>
            <p>Please log in to continue.</p>
            <p>Redirecting to login...</p>
            {setTimeout(() => {
                window.location.href = `/login?redirect=${location.pathname}`;
            }, 2000)}
        </div>
    );
};

export default ProtectedRoute;
