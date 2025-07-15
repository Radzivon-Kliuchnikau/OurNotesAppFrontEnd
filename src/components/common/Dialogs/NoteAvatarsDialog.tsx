import {
    Avatar,
    Box,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import * as React from "react";
import { User } from "../../../types/general";
import { v4 as uuidv4 } from "uuid";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    users: User[];
}

const NoteAvatarsDialog: React.FC<CustomDialogProps> = ({
    open,
    onClose,
    users,
}): React.ReactElement => {
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
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Shared With
                    </Typography>
                    <List dense>
                        {users.map((user) => (
                            <ListItem key={uuidv4()}>
                                <ListItemAvatar>
                                    <Avatar src={user.image}>
                                        {user.name[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                    secondary={user.email}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default NoteAvatarsDialog;
