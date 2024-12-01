import {AppBar, Avatar, Box, styled, Toolbar, Typography} from "@mui/material";
import {Checklist} from "@mui/icons-material";
import {useIsAuthenticated} from "@azure/msal-react";
import SignOutLink from "./SignOutLink.tsx";
import SignInLink from "./SignInLink.tsx";

const Navbar = () => {
    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between"
    })
    
    const isAuthenticated = useIsAuthenticated();

    return (
        <AppBar position="static" sx={{backgroundColor: "white"}}>
            <StyledToolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        display: {xs: "none", sm: "block"},
                        textDecoration: "none",
                        color: "black",
                        letterSpacing: ".1rem",
                        fontWeight: 700,
                    }}>
                    Our Notes
                </Typography>
                <Checklist
                    sx={{display: {xs: "block", sm: "none"}}}/> {/*Icon instead of Text logo when screen is small*/}
                <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                    {isAuthenticated ? <SignOutLink/> : <SignInLink/>}
                    <Avatar src="/static/avatar.jpg"/>
                </Box>
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;