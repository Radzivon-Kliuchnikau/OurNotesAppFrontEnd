import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent, Container,
    IconButton,
    Typography
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {Add, Delete} from "@mui/icons-material";
import NoteObject from "../interfaces/NoteObject.tsx";
import LoadingBox from "../components/common/LoadingBox.tsx";
import NoteRemoveDialog from "../components/common/NoteRemoveDialog.tsx";
import {createNote, deleteNote, editNote, getNotes} from "../api/notesApi.ts";
import NoteDialog from "../components/common/NoteDialog.tsx";

const Notes = () => {
    const maxHeaderLength = 30;
    const maxContentLength = 70;

    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    const [data, setData] = useState<NoteObject[] | []>([]);
    const [loading, setLoading] = useState(false);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const [openEditNoteModal, setOpenEditNoteModal] = useState(false);
    const [openCreateNoteModal, setOpenCreateNoteModal] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [selectedNote, setSelectedNote] = useState<NoteObject | null>(null);

    const errorRef: any = useRef();

    const handleOpenCreateModal = () => {
        setOpenCreateNoteModal(true);
    }
    
    const handleCloseCreateModal = () => {
        setOpenCreateNoteModal(false);
    }

    const handleCreateNote = async (title: string, content: string) => {
        try {
            const newNote = await createNote(title, content);
            setData((prevData) => [...prevData, newNote]);
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
        } finally {
            handleCloseCreateModal();
        }

    }
    
    const handleOpenEditModal = (note: NoteObject) => {
        setSelectedNote(note);
        setOpenEditNoteModal(true);
    }

    const handleCloseEditModal = () => {
        setOpenEditNoteModal(false);
        setSelectedNote(null);
    }
    
    const handleEditNote = async (title: string, content: string) => {
        if (!selectedNote) return;

        try {
            await editNote(selectedNote.id, title, content);
            const updatedData: NoteObject[] = data.map((item: NoteObject) =>
                item.id === selectedNote.id ? {
                    ...item,
                    title: title,
                    content: content
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
            await deleteNote(selectedNoteId);
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
            const notes = await getNotes();
            setData(notes);

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
        <Container sx={{
            minHeight: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
            display: "flex",
            justifyContent: "center"
        }}>
            <NoteRemoveDialog open={openRemoveModal} onClose={handleCloseRemoveModel} onDelete={handleNoteDelete}/>
            <NoteDialog
                open={openCreateNoteModal}
                onClose={handleCloseCreateModal}
                dialogTitle="Create a new note"
                onSave={(title, content) => handleCreateNote(title, content)}
            />
            <NoteDialog
                open={openEditNoteModal}
                onClose={handleCloseEditModal}
                dialogTitle="Edit your note"
                defaultValues={selectedNote ? {title: selectedNote.title, content: selectedNote.content} : undefined}
                onSave={(title, content) => handleEditNote(title, content)}
            />
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenCreateModal()
                                }}
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
                                        cursor: "pointer",
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
        </Container>
    );
};

export default Notes;