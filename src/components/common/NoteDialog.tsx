import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, styled, Typography} from "@mui/material";
import TextFieldCustom from "./TextFieldCustom.tsx";

const CustomNoteDialog = styled(Dialog)(({theme}) => ({
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

interface NoteDialogProps {
    open: boolean;
    onClose: () => void;
    dialogTitle: string;
    noteTitle: string;
    noteContent: string;
    setNoteTitle: (value: string) => void;
    setNoteContent: (value: string) => void;
    onSave: () => void;
}

const NoteDialog: React.FC<NoteDialogProps> = ({
   open,
   onClose,
   dialogTitle,
   noteTitle,
   noteContent,
   setNoteTitle,
   setNoteContent,
   onSave,
}) => {
    return (
        <CustomNoteDialog open={open} onClose={onClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
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
                    onClick={onClose}
                    sx={{
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                            backgroundColor: "#cacfcb",
                        },
                    }}
                >Cancel</StyledButton>
                <StyledButton
                    onClick={onSave}
                    sx={{
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                            backgroundColor: "#16db65",
                        },
                    }}
                >Save</StyledButton>
            </DialogActions>
        </CustomNoteDialog>
    );
};

export default NoteDialog;
