import {AppBar, Avatar, Box, InputBase, styled, Toolbar, Typography} from "@mui/material";
import {Checklist} from "@mui/icons-material";

const Navbar = () => {

    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between"
    })

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
                <Checklist sx={{display: {xs: "block", sm: "none"}}}/> {/*Icon instead of Text logo when screen is small*/}
                <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <Typography sx={{color: "black"}}>Login</Typography>
                    <Avatar src="/static/avatar.jpg"/>
                </Box>
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;