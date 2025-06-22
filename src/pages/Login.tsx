import { Box, Button, FormLabel, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TextFieldCustom from "../components/common/TextFieldCustom.tsx";
import { useForm } from "react-hook-form";
import * as React from "react";
import { useAuth } from "../context/UseAuth.tsx";
import { EMAIL_REGEX } from "../utils/Constants.tsx";
import MainContainer from "../components/common/MainContainer.tsx";
import { Link } from "react-router-dom";
import FormField from "../components/common/FormField.tsx";
import { LoginFormInputs } from "../types/general";

const Login = (): React.ReactElement => {
    const { loginUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
        setFocus,
    } = useForm<LoginFormInputs>({ mode: "onChange" });

    useEffect(() => {
        setFocus("userEmail");
    }, []);

    const location = useLocation();
    const pathToReturn: string = location.state?.from?.pathname || "/";

    const onSubmit = async (form: LoginFormInputs) => {
        loginUser(form.userEmail, form.password, pathToReturn);
        reset();
    };

    return (
        <MainContainer>
            <Box
                sx={{
                    marginTop: "40px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{ marginBottom: "20px" }}
                    >
                        Sign in to your account
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
                        <FormField
                            label="Email address"
                            name="userEmail"
                            type="email"
                            register={register}
                            error={errors.userEmail?.message}
                            validation={{
                                required: "User email is required",
                                pattern: {
                                    value: EMAIL_REGEX,
                                    message: "Invalid email format",
                                },
                            }}
                        />
                        <FormField
                            label="Password"
                            name="password"
                            type="password"
                            register={register}
                            error={errors.password?.message}
                            validation={{
                                required: "Password is required",
                            }}
                            actionElement={
                                <Button
                                    component={Link}
                                    to="/forgot-password"
                                    sx={{
                                        textDecoration: "underline",
                                        color: "black",
                                        textTransform: "none",
                                        fontSize: "15px",
                                        padding: 0,
                                        top: 0,
                                        fontWeight: 600,
                                        "&:hover": {
                                            textDecoration: "none",
                                            backgroundColor: "transparent",
                                        },
                                    }}
                                >
                                    Forgot password
                                </Button>
                            }
                        />

                        <Box>
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
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: "120px",
                        minWidth: "450px",
                        padding: "24px",
                        display: "flex",
                        gap: "24px",
                        flexDirection: "column",
                        backgroundColor: "#f4f4f4",
                        borderRadius: "16px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "18px",
                        }}
                    >
                        Not got an account?
                    </Typography>
                    <Button
                        component={Link}
                        to="/registration"
                        disableRipple
                        sx={{
                            alignSelf: "flex-start",
                            fontWeight: 600,
                            borderWidth: "2px",
                            border: "1px solid black",
                            borderRadius: "2rem",
                            padding: ".5rem 2.5rem",
                            color: "black",
                            textShadow: "none",
                            letterSpacing: "0.025rem",
                            textDecoration: "none",
                            textTransform: "none",
                            fontSize: "18px",
                        }}
                    >
                        Rerister now
                    </Button>
                </Box>
            </Box>
        </MainContainer>
    );
};

export default Login;
