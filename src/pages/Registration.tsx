import {useRef, useState, useEffect} from "react";
import axios from "../api/axios";
import {Box, Button, Card, FormLabel, Stack, styled, TextField, Typography} from "@mui/material";
import {Close, Done, Info} from "@mui/icons-material";
import Link from '@mui/material/Link';
import MainContainer from "../components/common/MainContainer.tsx";
import API_URL from "../utils/Constants.tsx";


const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const REGISTER_URL = "/api/account/register";

const FormCard = styled(Card)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    width: "320px",
    padding: "10px 40px 10px 40px",
    marginTop: "70px",
    border: "1px solid black",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
        border: "none",
        padding: "0px 40px 10px 40px",
        marginTop: "30px"
    }
}))

const TextFieldCustom = styled(TextField)(({theme}) => ({
    "& .MuiOutlinedInput-root": { // Target the root container of the input
        border: "1px solid black", // Custom border
        borderRadius: "10px", // Custom border radius
    },
    "& .MuiOutlinedInput-notchedOutline": { // Target the outline specifically
        border: "none", // Remove the default outline
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "1px solid black", // Optional: Add hover styles
    },
    "& .MuiOutlinedInput-input": {
        padding: "10px", // Adjust padding if needed
    },
    width: "320px",
    height: "50px",
    marginBottom: "15px"
}))

const Registration = () => {
    const userNameRef: any = useRef();
    const errorRef: any = useRef();

    const [userName, setUserName] = useState("");
    const [validUserName, setValidUserName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    const [userEmail, setUserEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userNameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(userEmail);
        setValidEmail(result);
    }, [userEmail])

    useEffect(() => {
        const result = USERNAME_REGEX.test(userName);
        setValidUserName(result);
    }, [userName])

    useEffect(() => {
        const result = PWA_REGEX.test(password);
        setValidPassword(result);
        const match = password == matchPassword;
        setValidMatch(match);

    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage("");
    }, [userEmail, userName, password, matchPassword]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const v1 = EMAIL_REGEX.test(userEmail);
        const v2 = PWA_REGEX.test(password);

        if (!v1 || !v2) {
            setErrorMessage("Invalid Input");
            return;
        }
        try {
            const response = await axios.post(
                API_URL.REGISTER_URL,
                JSON.stringify({userName: userName, email: userEmail, password}),
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            ) // TODO: backend expecting email. Change REGEX for valid email validation
            console.log(response.data);
            console.log(JSON.stringify(response));
            setSuccess(true);
            // clear input fields
        } catch (error: any) {
            if (!error?.response) {
                setErrorMessage("No server response");
            } else if (error.response?.status === 409) {
                setErrorMessage("User name taken");
            } else {
                setErrorMessage("Registration failed");
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
                            href="/login"
                            sx={{alignSelf: "center", color: "black", textDecoration: "none"}}>
                            Sign in
                        </Link>
                    </Box>
                ) : (
                    <MainContainer>
                        <FormCard variant="outlined">
                            <Typography
                                ref={errorRef}
                                aria-live="assertive"
                                sx={{display: errorMessage ? "block" : "none"}}
                            >
                                {errorMessage}
                            </Typography>
                            <Box sx={{marginTop: "20px", marginBottom: "10px"}}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/">
                                    <img src="../public/static/logo.svg" alt="Logo" />
                                </Typography>
                            </Box>
                            <Typography component="h1" variant="h5" sx={{marginBottom: "15px"}}>Sign up</Typography>
                            <Box component="form" onSubmit={handleSubmit}
                                 sx={{
                                     width: "400px",
                                     display: "flex", 
                                     flexDirection: "column" 
                            }}>

                                <FormLabel htmlFor="username" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Name</Typography>
                                    <Box component="span" sx={{display: validUserName ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box component="span" sx={{display: validUserName || !userName ? "none" : "block"}}>
                                        <Close/>
                                    </Box>
                                </FormLabel>
                                <TextFieldCustom
                                    type="text"
                                    id="username"
                                    inputRef={userNameRef}
                                    autoComplete="off"
                                    placeholder="Jonny D"
                                    onChange={(event) => setUserName(event.target.value)}
                                    required
                                    aria-invalid={validUserName}
                                    aria-describedby="userNameDescription"
                                    onFocus={() => setUserNameFocus(true)}
                                    onBlur={() => setUserNameFocus(false)}
                                />
                                <Box id="userNameDescription"
                                     sx={{
                                         display: userNameFocus && userName && !validUserName ? "flex" : "none",
                                         gap: 1
                                     }}>
                                    <Info/>
                                    <Typography component="p">Just type a valid name. Min 4 chars.</Typography>
                                </Box>

                                <FormLabel htmlFor="useremail" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Email</Typography>
                                    <Box component="span" sx={{display: validEmail ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box component="span" sx={{display: validEmail || !userEmail ? "none" : "block"}}>
                                        <Close/>
                                    </Box>
                                </FormLabel>
                                <TextFieldCustom
                                    type="email"
                                    id="useremail"
                                    autoComplete="off"
                                    placeholder="example@example.com"
                                    onChange={(event) => setUserEmail(event.target.value)}
                                    required
                                    aria-invalid={validEmail}
                                    aria-describedby="userNameDescription"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <Box id="userNameDescription"
                                     sx={{display: emailFocus && userEmail && !validEmail ? "flex" : "none", gap: 1}}>
                                    <Info/>
                                    <Typography component="p">Just type a valid email.</Typography>
                                </Box>

                                <FormLabel htmlFor="password" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Password</Typography>
                                    <Box component="span" sx={{display: validPassword ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box component="span" sx={{display: validPassword || !password ? "none" : "block"}}>
                                        <Close/>
                                    </Box>
                                </FormLabel>
                                <TextFieldCustom
                                    type="password"
                                    id="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    placeholder="*********"
                                    aria-invalid={validPassword}
                                    aria-describedby="passwordDescription"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                />
                                <Box id="passwordDescription"
                                     sx={{display: passwordFocus && !validPassword ? "flex" : "none", gap: 1}}>
                                    <Info/>
                                    <Typography>
                                        8 to 24 characters. <br/>
                                        Must include uppercase and lowercase letters, a number and a special
                                        character. <br/>
                                        Allowed special characters: <span aria-label="exclamation mark">!</span><span
                                        aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span
                                        aria-label="dollar sign">$</span><span aria-label="percent"></span>
                                    </Typography>
                                </Box>

                                <FormLabel htmlFor="confirmPassword" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Confirm Password</Typography>
                                    <Box sx={{display: validMatch && matchPassword ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box sx={{display: validMatch || !matchPassword ? "none" : "block"}}>
                                        <Close/>
                                    </Box>
                                </FormLabel>
                                <TextFieldCustom
                                    type="password"
                                    id="confirmPassword"
                                    onChange={(event) => setMatchPassword(event.target.value)}
                                    required
                                    placeholder="*********"
                                    aria-invalid={validMatch}
                                    aria-describedby="confirmPasswordDescription"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <Box id="confirmPasswordDescription"
                                     sx={{display: matchFocus && !validMatch ? "flex" : "none"}}>
                                    <Info/>
                                    <Typography>Must match the first password input field.</Typography>
                                </Box>

                                <Button
                                    type="submit"
                                    disabled={!validEmail || !validUserName || !validPassword || !validMatch}
                                    disableRipple
                                    sx={{
                                        width: "320px",
                                        height: "50px",
                                        border: "1px solid black",
                                        borderRadius: "10px",
                                        color: "black",
                                        textDecoration: "none",
                                        textTransform: "none",
                                        fontSize: "20px",
                                        marginBottom: "30px",
                                        marginTop: "20px"
                                    }}
                                    >
                                    Sign up
                                </Button>
                            </Box>
                            <Typography sx={{textAlign: "center", marginBottom: "10px"}}>
                                Already registered?{" "}
                                <Link
                                    href="/login"
                                    sx={{color: "black", textDecoration: "none"}}>
                                    Sign in
                                </Link>
                            </Typography>
                        </FormCard>
                    </MainContainer>
                )}
        </>
    )
}

export default Registration;
