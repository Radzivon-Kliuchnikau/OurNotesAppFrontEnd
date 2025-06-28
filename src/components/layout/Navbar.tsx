import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { Logout, Person, PersonOutline } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "../auth/LogoutButton.tsx";
import * as React from "react";
import { useAuth } from "../../context/UseAuth.tsx";

const LogoImage = styled("img")(() => ({}));

const Navbar = (): React.ReactElement => {
    const { user, isLoggedIn } = useAuth();

    const location = useLocation();
    const currentPath = location.pathname;
    const authRoutes = ["/login", "/registration", "/forgot-password"];
    const isAuthPage = authRoutes.includes(currentPath);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between",
        padding: "0 !important",
    });

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "10px 20px",
                backgroundColor: "white",
                transition: "opacity 0.2s ease-in-out",
                left: 0,
                right: 0,
            }}
        >
            <StyledToolbar>
                <Typography variant="h6" noWrap component="a" href="/">
                    <LogoImage src="../public/static/logo.svg" />
                </Typography>
                {!isLoggedIn() ? (
                    !isAuthPage && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                component={Link}
                                to="/login"
                                sx={{
                                    height: "auto",
                                    border: "none",
                                    display: "flex",
                                    gap: "5px",
                                    padding: 0,
                                    color: "black",
                                    textDecoration: "none",
                                    textTransform: "none",
                                    fontSize: "16px",
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        boxShadow: "none",
                                    },
                                }}
                                disableRipple
                            >
                                <PersonOutline sx={{ color: "black" }} />
                                Sign in
                            </Button>
                        </Box>
                    )
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Typography sx={{ color: "black" }}>
                            Hey, {user?.userName}
                        </Typography>
                        <Tooltip title="Settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls="account-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>
                                    <Person />
                                </Avatar>
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
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -1.5,
                                            mr: 1,
                                        },
                                        "&::before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform:
                                                "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                            sx={{
                                top: `25px`,
                                left: `${anchorEl?.getBoundingClientRect()?.right - 145}px`,
                                transform: "none",
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                <LogoutButton />
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;
