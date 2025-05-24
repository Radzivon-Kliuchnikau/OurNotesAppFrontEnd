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
  onDelete: () => void;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "400px",
    padding: theme.spacing(2),
    borderRadius: "10px",
    backgroundColor: "#f9f6f2",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "120px",
  height: "40px",
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: "500",
  border: "1px solid black",
  color: "black",
}));

const NoteRemoveDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  onDelete,
}): React.ReactElement => {
  return (
    <CustomDialog open={open}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <Typography>Do you actually want to remove this note?</Typography>
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
          onClick={onDelete}
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#f53333",
            },
          }}
        >
          Delete
        </StyledButton>
      </DialogActions>
    </CustomDialog>
  );
};

export default NoteRemoveDialog;
