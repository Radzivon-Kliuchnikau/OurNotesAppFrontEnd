import {useRef, useState, useEffect} from "react";
import axios from "../api/axios";
import {Box, Card, FormLabel, Stack, styled, TextField, Typography} from "@mui/material";
import {Close, Done, Info} from "@mui/icons-material";


// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const REGISTER_URL = "/register";

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

const RegistrationContainer = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    }
}))

const Registration = () => {
    const userRef: any = useRef();
    const errorRef: any = useRef();

    const [user, setUser] = useState("");

    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWA_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password == matchPassword;
        setValidMatch(match);

    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage("");
    }, [user, password, matchPassword]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const v1 = EMAIL_REGEX.test(user);
        const v2 = PWA_REGEX.test(password);

        if (!v1 || !v2) {
            setErrorMessage("Invalid Input");
            return;
        }
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({email: user, password}),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
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
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <a href="#">Sign In</a>
                        </p>
                    </section>
                ) : (
                    <RegistrationContainer>
                        <FormCard variant="outlined">
                            <p ref={errorRef} className={errorMessage ? "errMsg" : "offscreen"}
                               aria-live="assertive">{errorMessage}</p>
                            <Typography component="h1" variant="h4">Register</Typography>
                            <Box component="form" onSubmit={handleSubmit}
                                 sx={{display: "flex", flexDirection: "column", gap: 2}}>
                                <FormLabel htmlFor="useremail" sx={{display: "flex"}}>
                                    <Typography>User name</Typography>
                                    <Box component="span" sx={{display: validName ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box component="span" sx={{display: validName || !user ? "none" : "block"}}>
                                        <Close/>
                                    </Box>
                                </FormLabel>
                                <TextField
                                    type="email"
                                    id="useremail"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(event) => setUser(event.target.value)}
                                    required
                                    aria-invalid={validName}
                                    aria-describedby="userNameDescription"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <Box id="userNameDescription" sx={{display: userFocus && user && !validName ? "flex" : "none", gap: 1}}>
                                    <Info/>
                                    <Typography component="p">Just type a valid email.</Typography>
                                </Box>
                                
                                <label htmlFor="password">
                                    Password:
                                    <span className={validPassword ? "valid" : "hide"}>
                            Valid icon
                        </span>
                                    <span className={validPassword || !password ? "hide" : "invalid"}>
                            Invalid icon
                        </span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    aria-invalid={validPassword}
                                    aria-describedby="passwordDescription"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                />
                                <p id="passwordDescription"
                                   className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                    <span>someicon</span>
                                    8 to 24 characters. <br/>
                                    Must include uppercase and lowercase letters, a number and a special
                                    character. <br/>
                                    Allowed special characters: <span aria-label="exclamation mark">!</span><span
                                    aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span
                                    aria-label="dollar sign">$</span><span aria-label="percent"></span>
                                </p>


                                <label htmlFor="confirmPassword">
                                    Confirm Password:
                                    <span className={validMatch && matchPassword ? "valid" : "hide"}>
                            Valid icon
                        </span>
                                    <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
                            Invalid icon
                        </span>
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    onChange={(event) => setMatchPassword(event.target.value)}
                                    required
                                    aria-invalid={validMatch}
                                    aria-describedby="confirmPasswordDescription"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmPasswordDescription"
                                   className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <span>someicon</span>
                                    Must match the first password input field.
                                </p>

                                <button disabled={!validName || !validPassword || !validMatch}>
                                    Sign Up
                                </button>
                            </Box>
                            <p>
                                Already registered? <br/>
                                <span className="line">
                                    <a href="#">Sign In</a>
                                </span>
                            </p>
                        </FormCard>
                    </RegistrationContainer>
                )}
        </>
    )
}

export default Registration;
