import {AppBar, Avatar, Box, Button, styled, Toolbar, Typography} from "@mui/material";
import {Checklist, Person} from "@mui/icons-material";
import useAuth from "../hooks/UseAuth.tsx";
import {Link} from "react-router-dom";

const LogoImage = styled("img")(({theme}) => ({}))

const Navbar = () => {

    const {authUser} = useAuth();
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
                    <LogoImage src="../public/static/logo.svg"/>
                </Typography>
                <Checklist
                    sx={{display: {xs: "block", sm: "none"}}}/> {/*Icon instead of Text logo when screen is small*/}
                {!authUser ? (
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
                        {/*<Avatar src="/static/avatar.jpg"/>*/}
                    </Box>
                ) : (
                    <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <Typography sx={{color: "black"}}>
                            Hey, {authUser.Name}</Typography>
                        <Avatar src="/static/avatar.jpg"/>
                    </Box>
                )}
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;