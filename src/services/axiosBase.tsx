import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosBase = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosBase.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosBase;
