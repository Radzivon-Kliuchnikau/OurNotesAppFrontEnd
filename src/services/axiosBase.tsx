import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AddTokenToHeaders = (token: string) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
