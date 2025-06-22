import axios from "axios";
import { toast } from "react-toastify";

export const ErrorHandler = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            if (error.code === "ERR_NETWORK") {
                toast.error(
                    "Network error occurred. Unable to connect to the server."
                );
            } else {
                toast.error(
                    error.message || "An unexpected network error occurred."
                );
            }

            return;
        }

        const errorResponse = error.response;
        if (Array.isArray(errorResponse?.data.errors)) {
            for (let errorValue of errorResponse.data.errors) {
                toast.warning(errorValue);
            }
        } else if (typeof errorResponse?.data.errors === "object") {
            for (let errorValue in errorResponse?.data.errors) {
                toast.warning(errorResponse.data.errors[errorValue][0]);
            }
        } else if (errorResponse?.data) {
            toast.warning(errorResponse.data);
        } else if (errorResponse?.status === 401) {
            toast.warning("Unauthorized. Please log in again.");
            window.history.pushState({}, "LoginPage", "/login");
            // window.location.href = `/login?redirect=${location.pathname}`;
        } else {
            toast.warning(errorResponse?.data);
        }
    }
};
