import {Box, Button, Card, FormLabel, Stack, styled, TextField, Typography} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import Link from "@mui/material/Link";
import AuthContext from "../context/AuthProvider.tsx";
import axios from "../api/axios.tsx";

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
    const {setAuth} = useContext(AuthContext);

    const userEmailRef = useRef();
    const errorRef: any = useRef();

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [success, setSuccess] = useState(false);

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

            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles || null;
            setAuth({ userEmail, password, roles, accessToken})
            setUserEmail("");
            setPassword("");
            setSuccess(true);
        } catch (error: any) {
            if(!error.response){
                setErrorMessage("No Server Response")
            } else if(error.response?.status === 400){
                setErrorMessage("Missing User email or password ")
            } else if(error.response?.status === 401){
                setErrorMessage("Unauthorized")
            } else {
                setErrorMessage("Login failed");
            }
            errorRef.current.focus();
        }

    }

    return (
        <>
            {
                success ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            textAlign: "center",
                            height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)'
                        }}>
                        <Typography component="h1">Success!</Typography>
                        <Link
                            href="/"
                            sx={{alignSelf: "center", color: "black", textDecoration: "none"}}>
                            Go to Home
                        </Link>
                    </Box>
                ) : (
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
            }
        </>
    )
};

export default Login;