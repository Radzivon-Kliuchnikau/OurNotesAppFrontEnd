import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog, DialogActions, DialogContent, DialogTitle, FormLabel,
    IconButton, styled,
    Typography
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import MainContainer from "../components/common/MainContainer.tsx";
import {Add, Delete} from "@mui/icons-material";
import NoteObject from "../interfaces/NoteObject.tsx";
import LoadingBox from "../components/common/LoadingBox.tsx";
import TextFieldCustom from "../components/common/TextFieldCustom.tsx";
import NoteRemoveDialog from "../components/common/NoteRemoveDialog.tsx";
import {createNote, deleteNote, editNote, getNotes} from "../api/notesApi.ts";

const NoteDialog = styled(Dialog)(({theme}) => ({
    "& .MuiDialog-paper": {
        height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
        width: "1000px",
        padding: theme.spacing(2),
        borderRadius: "10px",
        backgroundColor: "#f9f6f2"
    }
}))

const StyledButton = styled(Button)(({theme}) => ({
    width: "120px",
    height: "40px",
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "500",
    border: "1px solid black",
    color: "black",

}))

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

    const handleCreateNote = async () => {
        try {
            const newNote = await createNote(noteTitle, noteContent);
            setData((prevData) => [...prevData, newNote]);
            setNoteTitle("");
            setNoteContent("");
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
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setOpenEditNoteModal(true);
    }

    const handleCloseEditModal = () => {
        setOpenEditNoteModal(false);
        setSelectedNote(null);
        setNoteTitle("");
        setNoteContent("");
    }
    
    const handleEditNote = async () => {
        if (!selectedNote) return;

        try {
            await editNote(selectedNote.id, noteTitle, noteContent);
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
        <MainContainer>
            <NoteRemoveDialog open={openRemoveModal} onClose={handleCloseRemoveModel} onDelete={handleNoteDelete}/>
            <NoteDialog open={openEditNoteModal} onClose={handleCloseEditModal}>
                <DialogTitle>Edit your note</DialogTitle>
                <DialogContent>
                    <FormLabel htmlFor="noteTitle" sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Note title</Typography>
                    </FormLabel>
                    <TextFieldCustom
                        value={noteTitle}
                        type="text"
                        id="noteTitle"
                        autoComplete="off"
                        onChange={(event) => setNoteTitle(event.target.value)}
                        required
                    />

                    <FormLabel htmlFor="noteContent" sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Note content</Typography>
                    </FormLabel>
                    <TextFieldCustom
                        id="noteContent"
                        value={noteContent}
                        onChange={(event) => setNoteContent(event.target.value)}
                        sx={{}}
                        type="text"
                        multiline
                        fullWidth
                        rows={10}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <StyledButton
                        onClick={handleCloseEditModal}
                        sx={{
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#cacfcb",
                            },
                        }}
                    >Cancel</StyledButton>
                    <StyledButton
                        onClick={handleEditNote}
                        sx={{
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#16db65",
                            },
                        }}
                    >Save</StyledButton>
                </DialogActions>
            </NoteDialog>
            <NoteDialog open={openCreateNoteModal} onClose={handleCloseCreateModal}>
                <DialogTitle>Create a new note</DialogTitle>
                <DialogContent>
                    <FormLabel htmlFor="noteTitle" sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Note title</Typography>
                    </FormLabel>
                    <TextFieldCustom
                        value={noteTitle}
                        type="text"
                        id="noteTitle"
                        autoComplete="off"
                        onChange={(event) => setNoteTitle(event.target.value)}
                        required
                    />

                    <FormLabel htmlFor="noteContent" sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Note content</Typography>
                    </FormLabel>
                    <TextFieldCustom
                        id="noteContent"
                        value={noteContent}
                        onChange={(event) => setNoteContent(event.target.value)}
                        sx={{}}
                        type="text"
                        multiline
                        fullWidth
                        rows={10}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <StyledButton
                        onClick={handleCloseCreateModal}
                        sx={{
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#cacfcb",
                            },
                        }}
                    >Cancel</StyledButton>
                    <StyledButton
                        onClick={handleCreateNote}
                        sx={{
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#16db65",
                            },
                        }}
                    >Save</StyledButton>
                </DialogActions>
            </NoteDialog>
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
        </MainContainer>
    );
};

export default Notes;