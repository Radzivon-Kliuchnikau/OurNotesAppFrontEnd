import {useRef, useEffect, useState} from "react";
import {Box, Button, Card, Container, FormLabel, styled, Typography} from "@mui/material";
import {Close, Done, Info} from "@mui/icons-material";
import Link from '@mui/material/Link';
import TextFieldCustom from "../components/common/TextFieldCustom.tsx";
import {registration} from "../api/authApi.ts";
import {FieldValues, useForm} from "react-hook-form";


const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{3,23}$/;
const PWA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const FormCard = styled(Card)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    width: "420px",
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

type FormInputs = {
    username: string,
    useremail: string,
    password: string,
    confirmPassword: string,
    serverResponse: string
}

const Registration = () => {
    const [success, setSuccess] = useState(false);
    const errorRef: any = useRef();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting, isValid},
        reset,
        getValues,
        setFocus,
        setError
    } = useForm<FormInputs>({mode: "onChange"});

    useEffect(() => {
        setFocus("username");
    }, [])

    const onSubmit = async (data: FieldValues) => {
        try {
            await registration(data.username, data.useremail, data.password);
            setSuccess(true);
            reset();
        } catch (error: any) {
            if (!error?.response) {
                setError("serverResponse",{
                    type: "server",
                    message: "No answer from the server"
                });
            } else if (error.response.data) {
                Object.entries(error.response.data).forEach(([field, messages]) => {
                    if(Array.isArray(messages)) {
                        setError("serverResponse",{
                            type: "server",
                            message: messages.join(" ")
                        });
                    }
                })
            } else {
                setError("serverResponse",{
                    type: "server",
                    message: "Registration failed. Please try again"
                });
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
                    <Container sx={{
                        minHeight: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <FormCard variant="outlined">
                            <Typography
                                ref={errorRef}
                                aria-live="assertive"
                                sx={{display: errors.serverResponse ? "block" : "none"}}
                            >
                                {errors.serverResponse?.message}
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
                                    <Box component="span"
                                         sx={{display: getValues("username") && !errors.username ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box component="span" sx={{display: !errors.username ? "none" : "block"}}>
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
                                    autoComplete="off"
                                    placeholder="Jonny D"
                                    aria-describedby="userNameDescription"
                                />
                                <Box id="userNameDescription"
                                     sx={{
                                         display: errors.username ? "flex" : "none",
                                         marginTop: "-30px",
                                         marginBottom: "10px",
                                         alignItems: "center"
                                     }}>
                                    <Info sx={{fontSize: "12px"}}/>
                                    <Typography sx={{
                                        fontSize: "12px",
                                        marginLeft: "5px"
                                    }}>{`${errors.username?.message}`}</Typography>
                                </Box>

                                <FormLabel htmlFor="useremail" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Email</Typography>
                                    <Box component="span"
                                         sx={{display: getValues("useremail") && !errors.useremail ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box component="span" sx={{display: !errors.useremail ? "none" : "block"}}>
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
                                    aria-describedby="userNameDescription"
                                />
                                <Box id="userNameDescription"
                                     sx={{
                                         display: errors.useremail ? "flex" : "none",
                                         marginTop: "-30px",
                                         marginBottom: "10px",
                                         alignItems: "center"
                                     }}>
                                    <Info sx={{fontSize: "12px"}}/>
                                    <Typography sx={{
                                        fontSize: "12px",
                                        marginLeft: "5px"
                                    }}>{`${errors.useremail?.message}`}</Typography>
                                </Box>

                                <FormLabel htmlFor="password" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Password</Typography>
                                    <Box component="span"
                                         sx={{display: getValues("password") && !errors.password ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box component="span" sx={{display: !errors.password ? "none" : "block"}}>
                                        <Close/>
                                    </Box>
                                </FormLabel>
                                <TextFieldCustom
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: PWA_REGEX,
                                            message: "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character"
                                        }
                                    })}
                                    type="password"
                                    id="password"
                                    placeholder="*********"
                                    aria-describedby="passwordDescription"
                                />
                                <Box id="passwordDescription"
                                     sx={{
                                         display: errors.password ? "flex" : "none",
                                         marginTop: "-30px",
                                         marginBottom: "10px",
                                         alignItems: "center",
                                         textAlign: "left"
                                     }}>
                                    <Info sx={{fontSize: "12px"}}/>
                                    <Typography sx={{
                                        fontSize: "12px",
                                        marginLeft: "5px"
                                    }}>{`${errors.password?.message}`}</Typography>
                                </Box>

                                <FormLabel htmlFor="confirmPassword" sx={{display: "flex"}}>
                                    <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Confirm
                                        Password</Typography>
                                    <Box
                                        sx={{display: getValues("confirmPassword") && !errors.confirmPassword ? "block" : "none"}}>
                                        <Done/>
                                    </Box>
                                    <Box sx={{display: !errors.confirmPassword ? "none" : "block"}}>
                                        <Close/>
                                    </Box>
                                </FormLabel>
                                <TextFieldCustom
                                    {...register("confirmPassword", {
                                        required: "Confirm password required",
                                        validate: (value) => value === getValues("password") || "Passwords must match"
                                    })}
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="*********"
                                    aria-describedby="confirmPasswordDescription"
                                />
                                <Box id="confirmPasswordDescription"
                                     sx={{
                                         display: errors.confirmPassword ? "flex" : "none",
                                         marginTop: "-30px",
                                         marginBottom: "10px",
                                         alignItems: "center",
                                         textAlign: "left"
                                     }}>
                                    <Info sx={{fontSize: "12px"}}/>
                                    <Typography sx={{
                                        fontSize: "12px",
                                        marginLeft: "5px"
                                    }}>{`${errors.confirmPassword?.message}`}</Typography>
                                </Box>

                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    disableRipple
                                    sx={{
                                        width: "100%",
                                        height: "50px",
                                        border: "1px solid black",
                                        borderRadius: "10px",
                                        color: "black",
                                        textDecoration: "none",
                                        textTransform: "none",
                                        fontSize: "20px",
                                        marginBottom: "30px",
                                        marginTop: "20px",
                                        alignContent: "center"
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
                    </Container>
                )}
        </>
    )
}

export default Registration;
