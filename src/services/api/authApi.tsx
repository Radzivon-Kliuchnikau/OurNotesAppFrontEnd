import axios from "../axiosBase.tsx";
import { API_URL } from "../../utils/Constants.tsx";
import { ErrorHandler } from "../../utils/ErrorHandler.tsx";
import {
    UserProfileLoginType,
    UserProfileRegistrationType,
} from "../../types/User.ts";

export const loginApi = async (
    userEmail: string,
    password: string
): Promise<UserProfileLoginType | undefined> => {
    try {
        const response = await axios.post<UserProfileLoginType>(
            `${API_URL.LOGIN_URL}`,
            JSON.stringify({ email: userEmail, password }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return response.data;
    } catch (error) {
        ErrorHandler(error);
    }
};

export const registrationApi = async (
    userName: string,
    userEmail: string,
    password: string
): Promise<UserProfileRegistrationType | undefined> => {
    try {
        const response = await axios.post<UserProfileRegistrationType>( // TODO: Think on another type for registration
            API_URL.REGISTER_URL,
            JSON.stringify({ userName: userName, email: userEmail, password }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        ErrorHandler(error);
    }
};
