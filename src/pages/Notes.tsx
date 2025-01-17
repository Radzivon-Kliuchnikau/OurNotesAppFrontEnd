import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, TextField,
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
    const [data, setData] = useState<NoteObject[] | []>([]);
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteContent, setNoteContent] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [selectedNote, setSelectedNote] = useState<NoteObject | null>(null);

    const handleOpenEditModal = (note: NoteObject) => {
        if (openRemoveModal) return;
        setSelectedNote(note);
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setOpenEditModal(true);
    }

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedNote(null);
        setNoteTitle("");
        setNoteContent("");
    }

    const handleEditNote = async () => {
        if (!selectedNote) return;

        try {
            const response = await axios.put(
                `${API_URL.NOTES_URL}/${selectedNote.id}`,
                JSON.stringify({title: noteTitle, content: noteContent}),
                {
                    headers: {"Content-Type": "application/json"},
                }
            )
            const updatedData: NoteObject[] = data.map((item: NoteObject) =>
                item.id === selectedNote.id ? {
                    ...item,
                    title: noteTitle,
                    content: noteContent
                } : item)
            setData(updatedData);
        } catch (error: any) {
            if (!error.response) {
                setErrorMessage("No Server Response")
            } else if (error.response?.status === 401) {
                setErrorMessage("Unauthorized")
            } else {
                setErrorMessage("Can't edit notes, we're working on it");
            }

            setError(true);
        } finally {
            handleCloseEditModal();
        }
    }

    const handleOpenRemoveModal = (id: string) => {
        setSelectedNoteId(id);
        setOpenRemoveModal(true);
    }

    const handleCloseRemoveModel = () => {
        setOpenRemoveModal(false);
        setSelectedNoteId(null);
    }

    const handleNoteDelete = async () => {
        if (!selectedNoteId) return;

        try {
            const response = await axios.delete(
                `${API_URL.NOTES_URL}/${selectedNoteId}`,
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
            handleCloseRemoveModel();
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
            <Dialog open={openRemoveModal} onClose={handleCloseRemoveModel}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>Do you actually want to remove this note?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRemoveModel}>Cancel</Button>
                    <Button onClick={handleNoteDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                <DialogTitle>Edit your note</DialogTitle>
                <DialogContent>
                    <TextField
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        label="Title"
                        fullWidth
                    />

                    <TextField
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        label="Note content"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal}>Cancel</Button>
                    <Button onClick={() => handleEditNote(selectedNote)}>Save</Button>
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
                                    onClick={() => handleOpenEditModal(note)}
                                    sx={{
                                        width: "300px",
                                        height: "150px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        cursor: "pointer"
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
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenRemoveModal(note.id)
                                            }} 
                                            aria-label="delete">
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