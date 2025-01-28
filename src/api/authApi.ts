import axios from "./axios.tsx";
import API_URL from "../utils/Constants.tsx";

export const login = async (userEmail: string, password: string) => {
    const response = await axios.post(
        `${API_URL.LOGIN_URL}${API_URL.USE_SESSION_COOKIES}`,
        JSON.stringify({email: userEmail, password}),
        {
            headers: {"Content-Type": "application/json"}
        }
    );
    
    return response.data;
}

export const registration = async (userName: string, userEmail: string, password: string) => {
    const response = await axios.post(
        API_URL.REGISTER_URL,
        JSON.stringify({userName: userName, email: userEmail, password}),
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    )
    
    return response.data;
}