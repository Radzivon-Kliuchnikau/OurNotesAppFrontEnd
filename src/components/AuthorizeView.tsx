import {createContext, useEffect, useState} from "react";
import User from "../interfaces/User.tsx";
import axios from "../api/axios.tsx";
import API_URL from "../utils/Constants.tsx";
import {Box} from "@mui/material";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import InternalError from "../pages/InternalError.tsx";
import LoadingBox from "./LoadingBox.tsx";


const UserContext = createContext({});

const AuthorizeView = () => {
    const location = useLocation();

    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [internalError, setInternalError] = useState(false);

    let emptyUser: User = {Email: "", Name: ""};
    const [user, setUser] = useState(emptyUser);

    useEffect(() => {
        let retryCount: number = 0;
        let maxRetries: number = 2;
        let delayTime: number = 1000;

        const waitForRetry = (delayTime: number) => {
            return new Promise((resolve) => setTimeout(resolve, delayTime))
        }

        const callAuthWithRetry = async (url: string) => {
            try {
                const response = await axios.get(url, {withCredentials: true});

                if (response.status == 200) {
                    console.log("Authorized");
                    setUser({Email: response.data.Email, Name: response.data.Name});
                    setAuthorized(true);

                    return response;
                }
            } catch (error: any) {
                console.error("Error during auth check:", error);

                if (error.status == 401) {
                    console.log("Unauthorized");

                    return error;
                } else {
                    retryCount++;
                    if (retryCount > maxRetries) {
                        setInternalError(true);
                        throw error;
                    } else {
                        await waitForRetry(delayTime);

                        return callAuthWithRetry(url);
                    }
                }
            }
        }

        callAuthWithRetry(API_URL.CHECK_AUTH)
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if (loading) {
        return (
            <Box>
                <LoadingBox/>
            </Box>
        )
    } else {
        if (internalError) {
            return (
                <InternalError/>
            )
        } else if (authorized && !loading) {
            return (
                <Box>
                    <UserContext.Provider value={user}>
                        <Outlet/>
                    </UserContext.Provider>
                </Box>
            )
        } else {
            return (
                <Box>
                    <Navigate to={API_URL.LOGIN_URL} state={{from: location}} replace/>
                </Box>
            )
        }
    }
};

export { UserContext };
export default AuthorizeView;