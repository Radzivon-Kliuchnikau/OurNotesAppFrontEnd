import {Box, Button, Card, FormLabel, styled, TextField, Typography} from "@mui/material";
import MainContainer from "../components/common/MainContainer.tsx";
import axios from "../api/axios.tsx";
import API_URL from "../utils/Constants.tsx";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import TextFieldCustom from "../components/common/TextFieldCustom.tsx";

const FormCard = styled(Card)(({theme}) => ({
    display: "flex",
    boxShadow: "none", // Removes the default shadow
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    marginTop: "30px",
    width: "100%",
    border: "none",
}))

const CreateNote = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const goBack = () => navigate(-1);

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);

    const errorRef: any = useRef();

    useEffect(() => {
        setErrorMessage("");
    }, [noteTitle, noteContent])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL.NOTES_URL}`,
                JSON.stringify({title: noteTitle, content: noteContent}),
                {
                    headers: {"Content-Type": "application/json"}
                }
            );
            setNoteTitle("");
            setNoteContent("");
            navigate(from, {replace: true});
        } catch (error: any) {
            if (!error.response) {
                setErrorMessage("No Server Response")
            } else if (error.response?.status === 400) {
                setErrorMessage("Missing note title or content ")
            } else if (error.response?.status === 401) {
                setErrorMessage("Unauthorized")
            } else {
                setErrorMessage("Note creation failed");
            }
            setError(true);
            errorRef.current.focus();
        }

    }

    return (
        <MainContainer>
            {
                error ? (
                        <Typography aria-live="assertive"
                                    sx={{display: errorMessage ? "block" : "none"}}>
                            {errorMessage}
                        </Typography>
                    ) :
                    (
                        <FormCard>
                            <Typography component="h1" variant="h5" sx={{marginBottom: "20px"}}>Your note</Typography>
                            <Box component="form" onSubmit={handleSubmit}
                                 sx={{
                                     padding: "20px",
                                     display: "flex",
                                     flexDirection: "column",
                                 }}>

                                <FormLabel htmlFor="useremail" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Note title</Typography>
                                </FormLabel>
                                <TextFieldCustom
                                    type="text"
                                    id="useremail"
                                    autoComplete="off"
                                    onChange={(event) => setNoteTitle(event.target.value)}
                                    value={noteTitle}
                                    required
                                />

                                <FormLabel htmlFor="noteContent" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Note content</Typography>
                                </FormLabel>
                                <TextFieldCustom
                                    sx={{}}
                                    type="text"
                                    multiline
                                    id="noteContent"
                                    onChange={(event) => setNoteContent(event.target.value)}
                                    value={noteContent}
                                    required
                                />
                                <Box sx={{display: "flex", gap: 2, marginTop: "30px", marginBottom: "40px"}}>

                                    <Button
                                        type="submit"
                                        disabled={noteTitle == "" || noteContent == ""}
                                        disableRipple
                                        sx={{
                                            width: "320px",
                                            height: "50px",
                                            border: "1px solid black",
                                            borderRadius: "10px",
                                            color: "black",
                                            textDecoration: "none",
                                            textTransform: "none",
                                            fontSize: "20px",
                                        }}
                                    >
                                        Create note
                                    </Button>
                                    <Button
                                        startIcon={<ArrowBack />}
                                        disableRipple
                                        onClick={goBack}
                                        sx={{
                                            width: "150px",
                                            height: "50px",
                                            border: "1px solid black",
                                            borderRadius: "10px",
                                            color: "black",
                                            textDecoration: "none",
                                            textTransform: "none",
                                            fontSize: "20px",
                                        }}>
                                        Go back
                                    </Button>
                                </Box>
                            </Box>
                        </FormCard>
                    )}
        </MainContainer>
    );
};

export default CreateNote;