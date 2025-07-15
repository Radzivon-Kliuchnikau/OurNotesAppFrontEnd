import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import * as React from "react";
import PopUpDialogButton from "../Buttons/PopUpDialogButton.tsx";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const NoteRemoveDialog: React.FC<CustomDialogProps> = ({
    open,
    onClose,
    onDelete,
}): React.ReactElement => {
    return (
        <Dialog
            open={open}
            sx={{
                "& .MuiDialog-paper": {
                    width: "400px",
                    padding: "15px",
                    borderRadius: "10px",
                    backgroundColor: "#f9f6f2",
                },
            }}
        >
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <Typography>
                    Do you actually want to remove this note?
                </Typography>
            </DialogContent>
            <DialogActions>
                <PopUpDialogButton
                    onClick={onClose}
                    sx={{
                        "&:hover": {
                            backgroundColor: "#cacfcb",
                        },
                    }}
                >
                    Cancel
                </PopUpDialogButton>
                <PopUpDialogButton
                    onClick={onDelete}
                    sx={{
                        "&:hover": {
                            backgroundColor: "#f53333",
                        },
                    }}
                >
                    Delete
                </PopUpDialogButton>
            </DialogActions>
        </Dialog>
    );
};

export default NoteRemoveDialog;
