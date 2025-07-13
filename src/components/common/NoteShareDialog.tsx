import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    styled,
    Typography,
} from "@mui/material";
import * as React from "react";
import PopUpDialogButton from "./Buttons/PopUpDialogButton.tsx";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    onShare: () => void;
}

const NoteShareDialog: React.FC<CustomDialogProps> = ({
    open,
    onClose,
    onShare,
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
            <DialogTitle>
                Do you want to share your Note with someone?
            </DialogTitle>
            <DialogContent>
                <Typography>Do this to share...</Typography>
            </DialogContent>
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
                    onClick={onShare}
                    sx={{
                        "&:hover": {
                            backgroundColor: "#53abed",
                        },
                    }}
                >
                    Share
                </PopUpDialogButton>
            </DialogActions>
        </Dialog>
    );
};

export default NoteShareDialog;
