import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import * as React from "react";
import PopUpDialogButton from "../Buttons/PopUpDialogButton.tsx";
import { EMAIL_REGEX } from "../../../utils/Constants.tsx";
import { useForm } from "react-hook-form";
import { ShareWithUserFormInputs } from "../../../types/general";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    onShare: (userEmail: string) => void;
}

const NoteShareDialog: React.FC<CustomDialogProps> = ({
    open,
    onClose,
    onShare,
}): React.ReactElement => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<ShareWithUserFormInputs>({ mode: "onChange" });

    const onSubmit = async (form: ShareWithUserFormInputs) => {
        onShare(form.userEmail);
        reset();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "600px",
                    padding: "20px 50px",
                    borderRadius: "10px",
                    backgroundColor: "#f9f6f2",
                },
            }}
        >
            <DialogTitle>Do you want to share this note?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the email address to invite user to view or edit this
                    note.
                </DialogContentText>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <FormControl
                        sx={{
                            margin: "10px 0",
                        }}
                        variant="outlined"
                        error={!!errors.userEmail}
                    >
                        <InputLabel htmlFor="email">Email address</InputLabel>
                        <OutlinedInput
                            {...register("userEmail", {
                                required: "User email is required",
                                pattern: {
                                    value: EMAIL_REGEX,
                                    message: "Invalid email format",
                                },
                            })}
                            sx={{
                                borderRadius: "15px",
                            }}
                            id="email"
                            type="email"
                            label="Email address"
                        />
                        {errors.userEmail && (
                            <FormHelperText>
                                {errors.userEmail.message}
                            </FormHelperText>
                        )}
                    </FormControl>{" "}
                    // TODO: Add Permissions select field: Edit or View rights
                    for user with whom the note is shared
                    <DialogActions>
                        <PopUpDialogButton
                            onClick={onClose}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#cb2027",
                                },
                            }}
                        >
                            Cancel
                        </PopUpDialogButton>
                        <PopUpDialogButton
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#53abed",
                                },
                            }}
                        >
                            Send invite
                        </PopUpDialogButton>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default NoteShareDialog;
