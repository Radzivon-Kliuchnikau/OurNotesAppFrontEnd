import { UserProfile } from "../types/User.ts";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registrationApi } from "../services/api/authApi.tsx";
import { toast } from "react-toastify";
import { AddTokenToHeaders } from "../services/axiosBase.tsx";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (email: string, password: string, pathToReturn: string) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
};

type Props = {
    children: React.ReactNode;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<Props> = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            AddTokenToHeaders(token);
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        userName: string,
        userEmail: string,
        password: string
    ) => {
        await registrationApi(userName, userEmail, password)
            .then((response) => {
                if (response) {
                    toast.success("Registration was successful");
                    navigate("/login"); // TODO: Redirect to the page where system ask to activate account from email
                }
            })
            .catch((error) => toast.warning("Server error: " + error.message));
    };

    const loginUser = async (
        userEmail: string,
        password: string,
        pathToReturn: string
    ) => {
        await loginApi(userEmail, password)
            .then((response) => {
                if (response) {
                    const userObject: UserProfile = {
                        userName: response.userName,
                        email: response.email,
                    };
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(userObject));
                    setUser(userObject);
                    setToken(response.token);
                    toast.success("Login successful");
                    navigate(pathToReturn);
                }
            })
            .catch((error) => toast.warning("Server error: " + error.message));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        toast.success("Logout successful");
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                registerUser,
                loginUser,
                logoutUser,
                isLoggedIn,
            }}
        >
            {isReady && children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
