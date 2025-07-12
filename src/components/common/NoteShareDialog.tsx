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

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    onShare: () => void;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        width: "400px",
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

const NoteShareDialog: React.FC<CustomDialogProps> = ({
    open,
    onClose,
    onShare,
}): React.ReactElement => {
    return (
        <CustomDialog open={open}>
            <DialogTitle>
                Do you want to share your Note with someone?
            </DialogTitle>
            <DialogContent>
                <Typography>Do this to share...</Typography>
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
                    onClick={onShare}
                    sx={{
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                            backgroundColor: "#f53333",
                        },
                    }}
                >
                    Share
                </StyledButton>
            </DialogActions>
        </CustomDialog>
    );
};

export default NoteShareDialog;
