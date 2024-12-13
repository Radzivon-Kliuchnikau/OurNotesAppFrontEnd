import {Box, Button, Typography} from "@mui/material";
import axios from "../api/axios.tsx";
import {useState} from "react";
import AuthorizeView from "../components/AuthorizeView.tsx";

const NOTES_URL = "/api/notes";

const Notes = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState("");
    const handleClick = async (event: any) => {
        try {
            const response = await axios.get(
                NOTES_URL,
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            setData(response.data);

        } catch (error: any) {
            if (!error.response) {
                setErrorMessage("No Server Response")
            } else if (error.response?.status === 400) {
                setErrorMessage("Missing User email or password ")
            } else if (error.response?.status === 401) {
                setErrorMessage("Unauthorized")
            } else {
                setErrorMessage("Login failed");
            }
        }

    }

    return (
        <AuthorizeView>
            <Box>
                This is Notes!!!
                <Box>
                    <Button onClick={handleClick}>Call notes api</Button>
                </Box>
                <Typography>
                    {errorMessage}
                </Typography>
                <Typography>{data}</Typography>
            </Box>
        </AuthorizeView>
    );
};

export default Notes;