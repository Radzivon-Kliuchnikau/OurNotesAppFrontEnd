import { UserProfile } from "../types/User.ts";
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginApi, registrationApi } from "../services/api/authApi.tsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    ) => void;
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
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        userName: string,
        userEmail: string,
        password: string,
        confirmPassword: string
    ) => {
        await registrationApi(userName, userEmail, password, confirmPassword);
    };

    const loginUser = async (
        userEmail: string,
        password: string,
        pathToReturn: string
    ) => {
        await loginApi(userEmail, password).then((response) => {
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
        });
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
