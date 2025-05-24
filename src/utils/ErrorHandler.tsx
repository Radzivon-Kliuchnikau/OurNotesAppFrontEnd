import axios from "axios";
import {toast} from "react-toastify";

export const ErrorHandler = (error: any) => {
    if (axios.isAxiosError(error)) {
        const errorResponse = error.response;
        if (Array.isArray(errorResponse?.data.errors)) {
            for (let errorValue of errorResponse.data.errors) {
                toast.warning(errorValue.description);
            }
        } else if (typeof errorResponse?.data.errors === "object") {
            for (let errorValue in errorResponse?.data.errors) {
                toast.warning(errorResponse.data.errors[errorValue][0]);
            }
        } else if(errorResponse?.data) {
            toast.warning(errorResponse.data);
        } else if(errorResponse?.status === 401) {
            toast.warning("Unauthorized. Please log in again.");
            window.history.pushState({}, "LoginPage", "/login");
        } else {
            toast.warning(errorResponse?.data)
        }
    }
};
