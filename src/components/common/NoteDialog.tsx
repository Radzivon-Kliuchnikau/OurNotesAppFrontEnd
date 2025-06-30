import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormLabel,
    styled,
    Typography,
} from "@mui/material";
import TextFieldCustom from "./TextFieldCustom.tsx";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from "react";
import * as React from "react";

type FormInputs = {
    title: string;
    content: string;
};

const CustomNoteDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
        width: "1000px",
        padding: theme.spacing(2),
        borderRadius: "10px",
        backgroundColor: "#f9f6f2",
    },
}));

const StyledButton = styled(Button)(() => ({
    width: "120px",
    height: "40px",
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "500",
    border: "1px solid black",
    color: "black",
}));

interface NoteDialogProps {
    open: boolean;
    onClose: () => void;
    dialogTitle: string;
    defaultValues?: FormInputs;
    onSave: (title: string, content: string) => void;
}

const NoteDialog: React.FC<NoteDialogProps> = ({
    open,
    onClose,
    dialogTitle,
    defaultValues,
    onSave,
}): React.ReactElement => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: defaultValues || { title: "", content: "" },
    });

    useEffect(() => {
        if (defaultValues) {
            setValue("title", defaultValues.title);
            setValue("content", defaultValues.content);
        }
    }, [defaultValues, setValue]);

    const onSubmit = (data: FieldValues) => {
        onSave(data.title, data.content);
        onClose();
    };

    return (
        <CustomNoteDialog open={open} onClose={onClose}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <FormLabel htmlFor="noteTitle" sx={{ display: "flex" }}>
                        <Typography
                            sx={{ fontSize: "14px", marginBottom: "5px" }}
                        >
                            Note title
                        </Typography>
                    </FormLabel>
                    <TextFieldCustom
                        {...register("title", {
                            required: "Hey, mate. Title is required!",
                        })}
                        type="text"
                        id="noteTitle"
                        autoComplete="off"
                    />
                    {errors.title && (
                        <Typography sx={{ color: "red", fontSize: "12px" }}>
                            {errors.title.message}
                        </Typography>
                    )}

                    <FormLabel htmlFor="noteContent" sx={{ display: "flex" }}>
                        <Typography
                            sx={{ fontSize: "14px", marginBottom: "5px" }}
                        >
                            Note content
                        </Typography>
                    </FormLabel>
                    <TextFieldCustom
                        {...register("content")}
                        id="noteContent"
                        type="text"
                        multiline
                        fullWidth
                        rows={10}
                    />
                </DialogContent>
                <DialogActions>
                    <StyledButton
                        onClick={onClose}
                        sx={{
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#cacfcb",
                            },
                        }}
                    >
                        Cancel
                    </StyledButton>
                    <StyledButton
                        type="submit"
                        sx={{
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#16db65",
                            },
                        }}
                    >
                        Save
                    </StyledButton>
                </DialogActions>
            </Box>
        </CustomNoteDialog>
    );
};

export default NoteDialog;
