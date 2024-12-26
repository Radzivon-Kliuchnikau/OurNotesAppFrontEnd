import {Box, Button, Card, CardActions, CardContent, IconButton, Typography} from "@mui/material";
import axios from "../api/axios.tsx";
import {useState} from "react";
import MainContainer from "../components/common/MainContainer.tsx";
import {Add, Delete} from "@mui/icons-material";
import NoteObject from "../interfaces/NoteObject.tsx";
import {Link} from "react-router-dom";

const NOTES_URL = "/api/notes";

const noteData: NoteObject[] = [
    {
        title: "Some useful title",
        body: "Interesting text, bla, bla, bla, bla"
    },
    {
        title: "Another useful title",
        body: "Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, blaInteresting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, blaInteresting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, blaInteresting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla"
    },
    {
        title: "Some useful title",
        body: "Interesting text, bla, bla, bla, bla"
    },
    {
        title: "Some useful title",
        body: "Interesting text,Interesting text,Interesting text,Interesting text, bla, bla, bla, bla"
    },
    {
        title: "Another useful title",
        body: "Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, blaInteresting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, blaInteresting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, bla, bla, Interesting text, bla, bla, blaInteresting text"
    },
    {
        title: "Some useful title",
        body: "Interesting text, bla, bla, bla, bla"
    },
    {
        title: "Some useful title with different info about this that and another",
        body: "Interesting text, Inter estingIn terestin gInter estingInteresti ngIntere stingI nterestingInt eresting text,Interesting text,Interesting text, bla, bla, bla, bla"
    },
    {
        title: "Some useful title title title Some useful titletitl etitletitletitletitlet itletitle title title title Some useful titletitl etitletitletitletitlet itletitle title title title Some useful titletitl etitletitletitletitlet itletitle title title title Some useful titletitl etitletitletitletitlet itletitle title title title",
        body: "Interesting text,Interesti ngInter est ingI nter estingInt eresti ngInteresti ngInterestingI nteresting text,Interesting text,Interesting text, bla, bla, bla, bla"
    },

]

const Notes = () => {
    const maxHeaderLength = 30;
    const maxContentLength = 70;

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
        <MainContainer>
            <Box>
                <Button
                    component={Link}
                    to="/createnote"
                    disableRipple
                    startIcon={<Add/>}
                    sx={{
                        width: "170px",
                        height: "30px",
                        border: "1px solid black",
                        borderRadius: "10px",
                        color: "black",
                        textDecoration: "none",
                        textTransform: "none",
                        fontSize: "16px"
                    }}
                >Create new note</Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                    alignContent: "start",
                    padding: 4
                }}>
                {noteData.map((data, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: "300px",
                            height: "150px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                        <CardContent sx={{margin: 0, padding: "10px 10px 0 10px"}}>
                            <Typography component="h1" variant="h6">
                                {data.title.length > maxHeaderLength
                                    ? `${data.title.substring(0, maxHeaderLength)}...`
                                    : data.title
                                }
                            </Typography>
                            <Typography variant="body2">
                                {data.body.length > maxContentLength
                                    ? `${data.body.substring(0, maxContentLength)}...`
                                    : data.body
                                }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton aria-label="delete">
                                <Delete/>
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </MainContainer>
    );
};

export default Notes;