import {useRef, useState, useEffect} from "react";
import {Box, Button, Card, FormLabel, styled, Typography} from "@mui/material";
import {Close, Done, Info} from "@mui/icons-material";
import Link from '@mui/material/Link';
import MainContainer from "../components/common/MainContainer.tsx";
import TextFieldCustom from "../components/common/TextFieldCustom.tsx";
import {registration} from "../api/authApi.ts";
import {FieldValues, useForm} from "react-hook-form";


const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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

const Registration = () => {
    const userNameRef: any = useRef();
    const errorRef: any = useRef();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        getValues
    } = useForm();

    // const [userName, setUserName] = useState("");
    // const [validUserName, setValidUserName] = useState(false);
    // const [userNameFocus, setUserNameFocus] = useState(false);
    //
    // const [userEmail, setUserEmail] = useState("");
    // const [validEmail, setValidEmail] = useState(false);
    // const [emailFocus, setEmailFocus] = useState(false);
    //
    // const [password, setPassword] = useState("");
    // const [validPassword, setValidPassword] = useState(false);
    // const [passwordFocus, setPasswordFocus] = useState(false);
    //
    // const [matchPassword, setMatchPassword] = useState("");
    // const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMatchFocus] = useState(false);
    //
    // const [errorMessage, setErrorMessage] = useState("");
    // const [success, setSuccess] = useState(false);

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

    const onSubmit = async (data: FieldValues) => {

        const v1 = EMAIL_REGEX.test(data.userEmail);
        const v2 = PWA_REGEX.test(password);

        if (!v1 || !v2) {
            setErrorMessage("Invalid Input");
            return;
        }
        try {
            await registration(userName, userEmail, password);

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
        } finally {
            reset();
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
                                    <img src="../public/static/logo.svg" alt="Logo"/>
                                </Typography>
                            </Box>
                            <Typography component="h1" variant="h5" sx={{marginBottom: "15px"}}>Sign up</Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)}
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
                                    {...register("username", {
                                        required: "User name is required",
                                        pattern: {
                                            value: USERNAME_REGEX,
                                            message: "Just type a valid name. Min 4 chars"
                                        }
                                    })}
                                    type="text"
                                    id="username"
                                    inputRef={userNameRef}
                                    autoComplete="off"
                                    placeholder="Jonny D"
                                    aria-invalid={validUserName}
                                    aria-describedby="userNameDescription"
                                    onFocus={() => setUserNameFocus(true)}
                                    onBlur={() => setUserNameFocus(false)}
                                />
                                {errors.username && (<Box id="userNameDescription"
                                     sx={{
                                         marginTop: "-10px",
                                         marginBottom: "20px",
                                         alignItems: "center"
                                     }}>
                                    <Info/>
                                    <Typography sx={{fontSize: "13px", marginLeft: "5px"}}>{`${errors.username.message}`}</Typography>
                                </Box>)}

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
                                    {...register("useremail", {
                                        required: "Email is required",
                                        pattern: {
                                            value: EMAIL_REGEX,
                                            message: "Just type a valid email"
                                        }
                                    })}
                                    type="email"
                                    id="useremail"
                                    autoComplete="off"
                                    placeholder="example@example.com"
                                    aria-invalid={validEmail}
                                    aria-describedby="userNameDescription"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                {errors.useremail && (<Box id="userNameDescription"
                                     sx={{
                                         marginTop: "-10px",
                                         marginBottom: "20px",
                                         alignItems: "center"
                                     }}>
                                    <Info/>
                                    <Typography sx={{fontSize: "13px", marginLeft: "5px"}}>{`${errors.useremail.message}`}</Typography>
                                </Box>)}

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
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: PWA_REGEX,
                                            message: `8 to 24 characters. <br/>
                                                Must include uppercase and lowercase <br/> 
                                                letters, a number and a special
                                                character. <br/>
                                                Allowed special characters: <span aria-label="exclamation mark">!</span><span
                                                aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span
                                                aria-label="dollar sign">$</span><span aria-label="percent"></span>`
                                        }
                                    })}
                                    type="password"
                                    id="password"
                                    placeholder="*********"
                                    aria-invalid={validPassword}
                                    aria-describedby="passwordDescription"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                />
                                {errors.password && (<Box id="passwordDescription"
                                     sx={{
                                         marginTop: "-10px",
                                         marginBottom: "20px",
                                         alignItems: "center",
                                         textAlign: "left"
                                     }}>
                                    <Info/>
                                    <Typography sx={{fontSize: "13px", marginLeft: "5px"}}>{`${errors.password.message}`}</Typography>
                                </Box>)}

                                <FormLabel htmlFor="confirmPassword" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Confirm
                                        Password</Typography>
                                    <Box sx={{display: validMatch && matchPassword ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box sx={{display: validMatch || !matchPassword ? "none" : "block"}}>
                                        <Close/>
                                    </Box>
                                </FormLabel>
                                <TextFieldCustom
                                    {...register("confirmPassword", {
                                        required: "Confirm password required"
                                    })}
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="*********"
                                    aria-invalid={validMatch}
                                    aria-describedby="confirmPasswordDescription"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                {errors.confirmPassword && (<Box id="confirmPasswordDescription"
                                     sx={{
                                         marginTop: "-10px",
                                         marginBottom: "20px",
                                         alignItems: "center",
                                         textAlign: "left"
                                     }}>
                                    <Info/>
                                    <Typography sx={{fontSize: "13px", marginLeft: "5px"}}>{`${errors.confirmPassword.message}`}</Typography>
                                </Box>)}

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
