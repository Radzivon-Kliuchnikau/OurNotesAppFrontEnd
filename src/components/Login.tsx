import {Box, Button, Card, FormLabel, Stack, styled, TextField, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
// @ts-ignore
import Link from "@mui/material/Link";
import axios from "../api/axios.tsx";
import useAuth from "../hooks/UseAuth.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const LOGIN_URL = "/login";

const RegistrationContainer = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    }
}))

const FormCard = styled(Card)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
}))

const Login = () => {
    // @ts-ignore
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userEmailRef = useRef();
    const errorRef: any = useRef();

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // @ts-ignore
        userEmailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage("");
    }, [userEmail, password])

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({email: userEmail, password}),
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));

            const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles || null;
            setAuth({userEmail, password, accessToken});
            setUserEmail("");
            setPassword("");
            navigate(from, {replace: true});
        } catch (error: any) {
            if (!error.response) {
                setErrorMessage("No Server Response")
            } else if (error.response?.status === 400) {
                setErrorMessage("Missing User email or password ")
            } else if (error.response?.status === 401) {
                setErrorMessage("Unauthorized")
            } else {
                setErrorMessage("Login failed");
            }
            errorRef.current.focus();
        }

    }

    return (
        <RegistrationContainer>
            <FormCard variant="outlined">
                <Typography ref={errorRef} aria-live="assertive"
                            sx={{display: errorMessage ? "block" : "none"}}>
                    {errorMessage}
                </Typography>
                <Typography component="h1" variant="h4">Sign In</Typography>
                <Box component="form" onSubmit={handleSubmit}
                     sx={{display: "flex", flexDirection: "column", gap: 2}}>

                    <FormLabel htmlFor="useremail" sx={{display: "flex"}}>
                        <Typography>Email</Typography>
                    </FormLabel>
                    <TextField
                        type="email"
                        id="useremail"
                        inputRef={userEmailRef}
                        autoComplete="off"
                        onChange={(event) => setUserEmail(event.target.value)}
                        value={userEmail}
                        required
                    />

                    <FormLabel htmlFor="userPassword" sx={{display: "flex"}}>
                        <Typography>Password</Typography>
                    </FormLabel>
                    <TextField
                        type="password"
                        id="userPassword"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={userEmail == "" || password == ""}>
                        Sign Up
                    </Button>
                </Box>
                <Typography sx={{textAlign: "center"}}>
                    Need an Account?{" "}
                    <Link
                        href="/registration"
                        sx={{color: "black", textDecoration: "none"}}>
                        Sign Up
                    </Link>
                </Typography>
            </FormCard>
        </RegistrationContainer>
    )
};

export default Login;