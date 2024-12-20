import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import API_URL from "../../utils/Constants.tsx";
import axios from "../../api/axios.tsx";
import UseAuth from "../../hooks/UseAuth.tsx";
import {useState} from "react";

const LogoutButton = () => {
    const navigate = useNavigate();
    const {setAuthUser} = UseAuth();
    const [internalError, setInternalError] = useState(false);
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post(API_URL.LOGOUT_URL);
            if (response.status == 200) {
                navigate(API_URL.MAINPAGE_URL);
                setAuthUser(null);
                console.log("FROM STATUS 200");
            }
        } catch (error: any) {
            if (error.response?.status == 401) {
                console.log("Unauthorised " + error);
            } else {
                setInternalError(true);
            }
        }
    }

    return (
        <Button
            variant="text"
            disableRipple
            onClick={handleSubmit}
            sx={{
                all: 'unset', // Removes all default button styles
                color: "black",
                cursor: "pointer",
            }}
        >
            Sign out
        </Button>
    );
};

export default LogoutButton;