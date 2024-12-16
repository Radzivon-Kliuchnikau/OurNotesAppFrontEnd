import {useEffect, useState} from "react";
import axios from "../api/axios.tsx";
import API_URL from "../utils/Constants.tsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import InternalError from "../pages/InternalError.tsx";
import LoadingBox from "./LoadingBox.tsx";
import useAuth from "../hooks/UseAuth.tsx";

const AuthorizeView = () => {
    const location = useLocation();

    const {authUser, setAuthUser} = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [internalError, setInternalError] = useState(false);

    useEffect(() => {
        let retryCount: number = 0;
        let maxRetries: number = 2;
        let delayTime: number = 1000;

        const waitForRetry = (delayTime: number) => {
            return new Promise((resolve) => setTimeout(resolve, delayTime))
        }

        const callAuthWithRetry = async (url: string) => {
            try {
                const response = await axios.get(url);
                if (response.status == 200) {
                    setAuthUser({Email: response.data.email, Name: response.data.name});
                }
            } catch (error: any) {
                console.error("Error during auth check:", error);
                if (error.status == 401) {
                    console.log("Unauthorized");
                    setAuthUser(null);
                } else {
                    retryCount++;
                    if (retryCount > maxRetries) {
                        setInternalError(true);
                    } else {
                        await waitForRetry(delayTime);

                        return callAuthWithRetry(url);
                    }
                }
            }
        }

        callAuthWithRetry(API_URL.CHECK_AUTH)
            .finally(() => {
                setLoading(false)
            });
    }, [setAuthUser])

    if (loading) return <LoadingBox/>;
    if (internalError) return <InternalError/>;
    if (!authUser) return <Navigate to={API_URL.LOGIN_URL} state={{from: location}} replace/>
    return <Outlet/>;
};

export default AuthorizeView;