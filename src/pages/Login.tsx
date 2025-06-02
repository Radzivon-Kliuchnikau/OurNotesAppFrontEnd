import { Box, Button, Container, FormLabel, Typography } from "@mui/material";
import { useEffect } from "react";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import TextFieldCustom from "../components/common/TextFieldCustom.tsx";
import FormCard from "../components/common/FormCard.tsx";
import { useForm } from "react-hook-form";
import * as React from "react";
import { useAuth } from "../context/UseAuth.tsx";
import { EMAIL_REGEX } from "../utils/Constants.tsx";

type FormInputs = {
    userEmail: string;
    password: string;
};

const Login = (): React.ReactElement => {
    const { loginUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
        setFocus,
    } = useForm<FormInputs>({ mode: "onChange" });

    useEffect(() => {
        setFocus("userEmail");
    }, []);

    const location = useLocation();
    const pathToReturn: string = location.state?.from?.pathname || "/";

    const onSubmit = async (form: FormInputs) => {
        loginUser(form.userEmail, form.password, pathToReturn);
        reset();
    };

    return (
        <Container
            sx={{
                minHeight:
                    "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <FormCard>
                <Box sx={{ marginTop: "30px", marginBottom: "40px" }}>
                    <Typography variant="h6" noWrap component="a" href="/">
                        <img src="../public/static/logo.svg" alt="Logo" />
                    </Typography>
                </Box>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ marginBottom: "20px" }}
                >
                    Sign In
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        width: "400px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <FormLabel htmlFor="userEmail" sx={{ display: "flex" }}>
                        <Typography
                            sx={{ fontSize: "14px", marginBottom: "5px" }}
                        >
                            Email address
                        </Typography>
                    </FormLabel>
                    <TextFieldCustom
                        {...register("userEmail", {
                            required: "User email is required",
                            pattern: {
                                value: EMAIL_REGEX,
                                message: "Invalid email format",
                            },
                        })}
                        type="text"
                        id="userEmail"
                        autoComplete="off"
                    />
                    {errors.userEmail && (
                        <Typography
                            sx={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "-18px",
                            }}
                        >
                            {errors.userEmail.message}
                        </Typography>
                    )}

                    <FormLabel htmlFor="userPassword" sx={{ display: "flex" }}>
                        <Typography
                            sx={{ fontSize: "14px", marginBottom: "5px" }}
                        >
                            Password
                        </Typography>
                    </FormLabel>
                    <TextFieldCustom
                        {...register("password", {
                            required: "Password is required",
                        })}
                        type="password"
                        id="userPassword"
                    />
                    {errors.password && (
                        <Typography
                            sx={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "-18px",
                            }}
                        >
                            {errors.password.message}
                        </Typography>
                    )}

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
                            marginBottom: "40px",
                            marginTop: "30px",
                        }}
                    >
                        Sign in
                    </Button>
                </Box>
                <Typography sx={{ textAlign: "center" }}>
                    Need an Account?{" "}
                    <Link
                        href="/registration"
                        sx={{ color: "black", textDecoration: "none" }}
                    >
                        Sign Up
                    </Link>
                </Typography>
                {/*// TODO: Add link to reset/forgot password*/}
            </FormCard>
        </Container>
    );
};

export default Login;
