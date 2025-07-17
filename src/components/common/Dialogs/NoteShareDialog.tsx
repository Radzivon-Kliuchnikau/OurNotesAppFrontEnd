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
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import * as React from "react";
import PopUpDialogButton from "../Buttons/PopUpDialogButton.tsx";
import { EMAIL_REGEX } from "../../../utils/Constants.tsx";
import { Controller, useForm } from "react-hook-form";
import {
    ShareWithUserFormInputs,
    ViewEditRights,
} from "../../../types/general.ts";

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
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<ShareWithUserFormInputs>({ mode: "onChange" });

    const onSubmit = async (form: ShareWithUserFormInputs) => {
        console.log("Form submitted:", form);
        onShare(form.userEmail);
        reset();
    };

    const handleClose = () => {
        onClose();
        reset();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "10px",
                        }}
                    >
                        <FormControl
                            sx={{
                                margin: "10px 0",
                                width: "70%",
                            }}
                            variant="outlined"
                            error={!!errors.userEmail}
                        >
                            <InputLabel htmlFor="email">
                                Email address
                            </InputLabel>
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
                        </FormControl>
                        <FormControl
                            sx={{
                                margin: "10px 0",
                                width: "30%",
                            }}
                            error={!!errors.viewEditRights}
                        >
                            <InputLabel id="rights-label">
                                Can View or Edit
                            </InputLabel>
                            <Controller
                                name="viewEditRights"
                                control={control}
                                defaultValue={ViewEditRights.VIEW}
                                rules={{ required: "Permission is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="rights-label"
                                        id="rights-select"
                                        label="Can View or Edit"
                                        sx={{ borderRadius: "15px" }}
                                    >
                                        <MenuItem value={ViewEditRights.VIEW}>
                                            View
                                        </MenuItem>
                                        <MenuItem value={ViewEditRights.EDIT}>
                                            Edit
                                        </MenuItem>
                                    </Select>
                                )}
                            />
                            {errors.viewEditRights && (
                                <FormHelperText>
                                    {errors.viewEditRights.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Box>
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
