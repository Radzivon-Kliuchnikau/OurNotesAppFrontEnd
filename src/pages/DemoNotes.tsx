import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Add, Delete, Share } from "@mui/icons-material";
import NoteRemoveDialog from "../components/common/NoteRemoveDialog.tsx";
import NoteDialog from "../components/common/NoteDialog.tsx";
import * as React from "react";
import { Note } from "../types/general";
import Spinner from "../components/common/Spinner.tsx";
import { demoNotes } from "../utils/NotesDemoData.ts";
import MainContainer from "../components/common/MainContainer.tsx";

import "./DemoNotes.css";
import { motion, AnimatePresence } from "motion/react";
import NoteShareDialog from "../components/common/NoteShareDialog.tsx";

const DemoNotes = (): React.ReactElement => {
    const MotionCard = motion(Card);

    const maxHeaderLength = 30;
    const maxContentLength = 70;

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
    const [openShareModal, setOpenShareModal] = useState<boolean>(false);
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
        const newNote = {
            id: uuidv4(),
            title: title,
            content: content,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Note;
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

    const handleOpenShareModal = (id: string) => {
        setSelectedNoteId(id);
        setOpenShareModal(true);
    };

    const handleCloseShareModel = () => {
        setOpenShareModal(false);
        setSelectedNoteId(null);
    };

    const handleNoteDelete = async () => {
        if (!selectedNoteId) return;

        const updatedData = data.filter(
            (note: Note) => note.id !== selectedNoteId
        );
        setData([...updatedData]);
        handleCloseRemoveModel();
    };

    const handleNoteShare = async () => {
        if (!selectedNoteId) return;

        // const updatedData = data.filter(
        //     (note: Note) => note.id !== selectedNoteId
        // );
        // setData([...updatedData]);
        handleCloseShareModel();
    };

    const getAllNotes = async () => {
        setLoading(true);
        setData(demoNotes);
        setLoading(false);
    };

    useEffect(() => {
        getAllNotes();
    }, []);

    return (
        <MainContainer>
            <NoteRemoveDialog
                open={openRemoveModal}
                onClose={handleCloseRemoveModel}
                onDelete={handleNoteDelete}
            />
            <NoteShareDialog
                open={openShareModal}
                onClose={handleCloseShareModel}
                onShare={handleNoteShare}
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
                <Box
                    sx={{
                        marginTop: "40px",
                    }}
                >
                    <Box>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCreateModal();
                            }}
                            disableRipple
                            startIcon={<Add />}
                            sx={{
                                fontWeight: 600,
                                borderWidth: "2px",
                                border: "1px solid black",
                                borderRadius: "2rem",
                                padding: ".5rem 2.5rem",
                                color: "black",
                                textShadow: "none",
                                letterSpacing: "0.025rem",
                                textDecoration: "none",
                                textTransform: "none",
                                fontSize: "20px",
                                whiteSpace: "nowrap",
                                minWidth: "fit-content",
                            }}
                        >
                            Create new note
                        </Button>
                    </Box>
                    <Box>
                        {data.length === 0 ? (
                            <h1>You don't have any notes at the moment</h1>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "16px",
                                        marginTop: "40px",
                                        marginBottom: "40px",
                                        transition: "all 800ms ease",
                                    }}
                                >
                                    {data.map((note: Note) => (
                                        <motion.div
                                            key={note.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.7,
                                                rotate: -5,
                                                transition: {
                                                    duration: 0.4,
                                                    ease: "easeInOut",
                                                },
                                            }}
                                            transition={{ duration: 0.5 }}
                                            style={{
                                                flex: "1 1 300px",
                                                minWidth: "280px",
                                                maxWidth: "380px",
                                                touchAction: "none",
                                            }}
                                        >
                                            <MotionCard
                                                key={uuidv4()}
                                                whileHover={{
                                                    y: -4,
                                                    boxShadow:
                                                        "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeInOut",
                                                }}
                                                onClick={() =>
                                                    handleOpenEditModal(note)
                                                }
                                                sx={{
                                                    height: "200px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent:
                                                        "space-between",
                                                    cursor: "pointer",
                                                    border: "1px solid black",
                                                    borderRadius: "15px",
                                                    boxShadow: "none",
                                                }}
                                            >
                                                <CardContent
                                                    sx={{
                                                        margin: 0,
                                                        padding:
                                                            "20px 20px 0 20px",
                                                    }}
                                                >
                                                    <Typography
                                                        component="h1"
                                                        variant="h6"
                                                    >
                                                        {note.title.length >
                                                        maxHeaderLength
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
                                                    sx={{
                                                        justifyContent:
                                                            "flex-end",
                                                        backgroundColor:
                                                            "#cbcbcb",
                                                    }}
                                                >
                                                    <IconButton
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOpenShareModal(
                                                                note.id
                                                            );
                                                        }}
                                                        aria-label="delete"
                                                    >
                                                        <Share />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOpenRemoveModal(
                                                                note.id
                                                            );
                                                        }}
                                                        aria-label="delete"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </CardActions>
                                            </MotionCard>
                                        </motion.div>
                                    ))}
                                </Box>
                            </AnimatePresence>
                        )}
                    </Box>
                </Box>
            )}
        </MainContainer>
    );
};

export default DemoNotes;
