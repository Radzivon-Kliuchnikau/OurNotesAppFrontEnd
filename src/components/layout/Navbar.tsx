import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton, ListItemIcon, Menu,
    MenuItem,
    styled,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {Logout, Person} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useState} from "react";
import LogoutButton from "../auth/LogoutButton.tsx";
import * as React from "react";
import {useAuth} from "../../context/UseAuth.tsx";

const LogoImage = styled("img")(({theme}) => ({}))

const Navbar = (): React.ReactElement => {
    const {user} = useAuth();
    const { loading } = useAuthCheck();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log("authUser " + user);
    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between"
    })

    return (
        <AppBar 
            position="static"
            elevation={0}
            sx={{
                borderBottom: "1px solid black",
                backgroundColor: "white",
                opacity: loading ? 0 : 1,
                transition: "opacity 0.2s ease-in-out",
                pointerEvents: loading ? "none" : "auto",
        }}>
            <StyledToolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/">
                    <LogoImage src="../public/static/logo.svg"/>
                </Typography>
                {!user ? (
                    <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <Button
                            component={Link}
                            to="/login"
                            sx={{
                                width: "80px",
                                height: "30px",
                                color: "black",
                                textDecoration: "none",
                                textTransform: "none",
                                fontSize: "16px"
                            }}
                        >Sign in</Button>
                        <Button
                            component={Link}
                            to="/registration"
                            sx={{
                                width: "80px",
                                height: "30px",
                                border: "1px solid black",
                                borderRadius: "10px",
                                color: "black",
                                textDecoration: "none",
                                textTransform: "none",
                                fontSize: "16px"
                            }}
                        >Sign up</Button>
                    </Box>
                ) : (
                    <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <Typography sx={{color: "black"}}>
                            Hey, {user.userName}</Typography>
                        <Tooltip title="Settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ml: 2}}
                                aria-controls="account-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{width: 32, height: 32}}><Person/></Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -1.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                            sx={{
                                top: `25px`,
                                left: `${anchorEl?.getBoundingClientRect()?.right - 145}px`,
                                transform: 'none'
                            }}>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                <LogoutButton/>
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;