import {AppBar, Avatar, Box, styled, Toolbar, Typography} from "@mui/material";
import {Checklist, Person} from "@mui/icons-material";
import useAuth from "../hooks/UseAuth.tsx";

const LogoImage = styled("img")(({theme}) => ({}))

const Navbar = () => {

    const {authUser} = useAuth();
    console.log("authUser");
    console.log(authUser);
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
                        <Typography
                            sx={{
                                color: "black",
                                textDecoration: "none"
                            }}
                            component="a"
                            href="/login"
                        >
                            Sign in
                        </Typography>
                        {/*<Avatar src="/static/avatar.jpg"/>*/}
                        <Person sx={{color: "black"}}/>
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