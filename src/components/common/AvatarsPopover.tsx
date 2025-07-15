import React from "react";
import {
    Avatar,
    Box,
    Popover,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { User } from "../../types/general";
import { v4 as uuidv4 } from "uuid";

interface Props {
    users: User[];
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

const AvatarsPopover: React.FC<Props> = ({ users, anchorEl, onClose }) => {
    const open = Boolean(anchorEl);
    console.log("Rendering popover, anchorEl:", anchorEl);
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Shared With
                </Typography>
                <List dense>
                    {users.map((user) => (
                        <ListItem key={uuidv4()}>
                            <ListItemAvatar>
                                <Avatar src={user.image}>{user.name[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.name}
                                secondary={user.email}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Popover>
    );
};

export default AvatarsPopover;
