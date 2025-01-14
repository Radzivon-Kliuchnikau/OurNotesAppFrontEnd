import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import axios from "../api/axios.tsx";
import {useEffect, useState} from "react";
import MainContainer from "../components/common/MainContainer.tsx";
import {Add, Delete} from "@mui/icons-material";
import NoteObject from "../interfaces/NoteObject.tsx";
import {Link} from "react-router-dom";
import API_URL from "../utils/Constants.tsx";
import LoadingBox from "../components/common/LoadingBox.tsx";

const Notes = () => {
    const maxHeaderLength = 30;
    const maxContentLength = 70;

    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

    const handleOpenModal = (id: string) => {
        setSelectedNoteId(id);
        setOpenModal(true);
    }

    const handleCloseModel = () => {
        setOpenModal(false);
        setSelectedNoteId(null);
    }
    const handleDelete = async () => {
        if (!selectedNoteId) return;

        try {
            const response = await axios.delete(
                `${API_URL.DELETE_NOTE}/${selectedNoteId}`,
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }
            )
            const updatedData = data.filter((note: NoteObject) => note.id !== selectedNoteId);
            setData([...updatedData]);
        } catch (error: any) {
            if (!error.response) {
                setErrorMessage("No Server Response")
            } else if (error.response?.status === 401) {
                setErrorMessage("Unauthorized")
            } else {
                setErrorMessage("Can't remove notes, we're working on it");
            }

            setError(true);
        } finally {
            handleCloseModel();
        }
    }

    const getAllNotes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                API_URL.NOTES_URL,
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }
            );
            setData(response.data);

        } catch (error: any) {
            if (!error.response) {
                setErrorMessage("No Server Response")
            } else if (error.response?.status === 401) {
                setErrorMessage("Unauthorized")
            } else {
                setErrorMessage("Can't pull notes, we're working on it");
            }

            setError(true);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getAllNotes();
    }, [])

    return (
        <MainContainer>
            <Dialog open={openModal} onClose={handleCloseModel}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>Do you actually want to remove this note?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModel}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            {
                loading ? (
                    <LoadingBox/>
                ) : error ? (
                    <Typography aria-live="assertive"
                                sx={{display: errorMessage ? "block" : "none"}}>
                        {errorMessage}
                    </Typography>
                ) : (
                    <Box sx={{padding: "20px", marginTop: "40px"}}>
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
                                marginTop: "40px",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 2,
                                justifyContent: "center",
                                alignContent: "start",
                                padding: 4
                            }}>
                            {data.map((note: NoteObject, index) => (
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
                                            {note.title.length > maxHeaderLength
                                                ? `${note.title.substring(0, maxHeaderLength)}...`
                                                : note.title
                                            }
                                        </Typography>
                                        <Typography variant="body2">
                                            {note.content.length > maxContentLength
                                                ? `${note.content.substring(0, maxContentLength)}...`
                                                : note.content
                                            }
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{justifyContent: "flex-end"}}>
                                        <IconButton onClick={() => handleOpenModal(note.id)} aria-label="delete">
                                            <Delete/>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                )}
        </MainContainer>
    );
};

export default Notes;