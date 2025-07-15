import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Add, Delete } from "@mui/icons-material";
import NoteRemoveDialog from "../components/common/Dialogs/NoteRemoveDialog.tsx";
import NoteDialog from "../components/common/NoteDialog.tsx";
import * as React from "react";
import {
    createNote,
    deleteNote,
    editNote,
    getNotes,
} from "../services/api/notesApi.tsx";
import { Note } from "../types/general";
import Spinner from "../components/common/Spinner.tsx";

const Notes = (): React.ReactElement => {
    const maxHeaderLength = 30;
    const maxContentLength = 70;

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
    const [openEditNoteModal, setOpenEditNoteModal] = useState<boolean>(false);
    const [openCreateNoteModal, setOpenCreateNoteModal] =
        useState<boolean>(false);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const handleOpenCreateModal = () => {
        setOpenCreateNoteModal(true);
    };

    const handleCloseCreateModal = () => {
        setOpenCreateNoteModal(false);
    };

    const handleCreateNote = async (title: string, content: string) => {
        const newNote = await createNote(title, content);
        if (!newNote) {
            setErrorMessage("Failed to create note: empty response");
            setError(true);
            return;
        }
        setData((prevData) => [...prevData, newNote]);
        handleCloseCreateModal();
    };

    const handleOpenEditModal = (note: Note) => {
        setSelectedNote(note);
        setOpenEditNoteModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditNoteModal(false);
        setSelectedNote(null);
    };

    const handleEditNote = async (title: string, content: string) => {
        if (!selectedNote) return;

        await editNote(selectedNote.id, title, content);
        const updatedData: Note[] = data.map((item: Note) =>
            item.id === selectedNote.id
                ? {
                      ...item,
                      title: title,
                      content: content,
                  }
                : item
        );
        setData(updatedData);
        handleCloseEditModal();
    };

    const handleOpenRemoveModal = (id: string) => {
        setSelectedNoteId(id);
        setOpenRemoveModal(true);
    };

    const handleCloseRemoveModel = () => {
        setOpenRemoveModal(false);
        setSelectedNoteId(null);
    };

    const handleNoteDelete = async () => {
        if (!selectedNoteId) return;

        await deleteNote(selectedNoteId);
        const updatedData = data.filter(
            (note: Note) => note.id !== selectedNoteId
        );
        setData([...updatedData]);
        handleCloseRemoveModel();
    };

    const getAllNotes = async () => {
        setLoading(true);
        const notes = await getNotes();
        if (!notes) {
            setErrorMessage("Failed to get notes: empty response");
            setError(true);
            setLoading(false);
            return;
        }
        setData(notes);
        setLoading(false);
    };

    useEffect(() => {
        getAllNotes();
    }, []);

    return (
        <Container
            sx={{
                minHeight:
                    "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <NoteRemoveDialog
                open={openRemoveModal}
                onClose={handleCloseRemoveModel}
                onDelete={handleNoteDelete}
            />
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
                defaultValues={
                    selectedNote
                        ? {
                              title: selectedNote.title,
                              content: selectedNote.content,
                          }
                        : undefined
                }
                onSave={(title, content) => handleEditNote(title, content)}
            />
            {loading ? (
                <Spinner />
            ) : error ? (
                <Typography
                    aria-live="assertive"
                    sx={{ display: errorMessage ? "block" : "none" }}
                >
                    {errorMessage}
                </Typography>
            ) : (
                <Box sx={{ padding: "20px", marginTop: "40px" }}>
                    <Box>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCreateModal();
                            }}
                            disableRipple
                            startIcon={<Add />}
                            sx={{
                                width: "170px",
                                height: "30px",
                                border: "1px solid black",
                                borderRadius: "10px",
                                color: "black",
                                textDecoration: "none",
                                textTransform: "none",
                                fontSize: "16px",
                            }}
                        >
                            Create new note
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            marginTop: "40px",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            justifyContent: "center",
                            alignContent: "start",
                            padding: 4,
                        }}
                    >
                        {data.length > 0 ? (
                            data.map((note: Note) => (
                                <Card
                                    key={uuidv4()}
                                    onClick={() => handleOpenEditModal(note)}
                                    sx={{
                                        width: "300px",
                                        height: "150px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            margin: 0,
                                            padding: "10px 10px 0 10px",
                                        }}
                                    >
                                        <Typography component="h1" variant="h6">
                                            {note.title.length > maxHeaderLength
                                                ? `${note.title.substring(0, maxHeaderLength)}...`
                                                : note.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {note.content.length >
                                            maxContentLength
                                                ? `${note.content.substring(0, maxContentLength)}...`
                                                : note.content}
                                        </Typography>
                                    </CardContent>
                                    <CardActions
                                        sx={{ justifyContent: "flex-end" }}
                                    >
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenRemoveModal(note.id);
                                            }}
                                            aria-label="delete"
                                        >
                                            <Delete />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            ))
                        ) : (
                            <h1>You don't have any notes at the moment</h1>
                        )}
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default Notes;
