import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as React from "react";
import { useAuth } from "../context/UseAuth.tsx";
import { EMAIL_REGEX } from "../utils/Constants.tsx";
import MainContainer from "../components/common/MainContainer.tsx";
import { Link } from "react-router-dom";
import { LoginFormInputs } from "../types/general";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LinkButton from "../components/common/Buttons/LinkButton.tsx";

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

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <MainContainer>
            <Box
                sx={{
                    marginTop: "40px",
                    display: "flex",
                    justifyContent: {
                        mobile: "center",
                        tablet: "center",
                        laptop: "space-between",
                    },
                    flexDirection: {
                        mobile: "column",
                        tablet: "column",
                        laptop: "row",
                    },
                }}
            >
                <Box
                    sx={{
                        width: {
                            mobile: "100%",
                            tablet: "100%",
                            laptop: "400px",
                        },
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{ marginBottom: "20px" }}
                    >
                        Sign in to your account
                    </Typography>

                    <Box
                        sx={{
                            display: {
                                mobile: "flex",
                                tablet: "flex",
                                laptop: "none",
                            },
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "15px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "18px",
                            }}
                        >
                            Not got an account?
                        </Typography>
                        <LinkButton
                            component={Link}
                            to="/registration-request"
                            variant="text"
                            disableRipple
                        >
                            Rerister now
                        </LinkButton>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <FormControl
                            sx={{
                                margin: "10px 0",
                            }}
                            variant="outlined"
                            error={!!errors.userEmail}
                        >
                            <InputLabel htmlFor="email">
                                Email address
                            </InputLabel>
                            <OutlinedInput
                                {...register("userEmail", {
                                    required: "User email is required",
                                    pattern: {
                                        value: EMAIL_REGEX,
                                        message: "Invalid email format",
                                    },
                                })}
                                sx={{
                                    borderRadius: "15px",
                                }}
                                id="email"
                                type="email"
                                label="Email address"
                            />
                            {errors.userEmail && (
                                <FormHelperText>
                                    {errors.userEmail.message}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            sx={{
                                margin: "10px 0",
                            }}
                            variant="outlined"
                            error={!!errors.password}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                sx={{
                                    borderRadius: "15px",
                                }}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword
                                                    ? "hide the password"
                                                    : "display the password"
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {errors.password && (
                                <FormHelperText>
                                    {errors.password.message}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <LinkButton
                                component={Link}
                                to="/forgot-password"
                                variant="text"
                                disableRipple
                            >
                                Forgot password
                            </LinkButton>
                        </Box>

                        <Box>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                disableRipple
                                sx={{
                                    width: "100%",
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
                        display: {
                            mobile: "none",
                            tablet: "none",
                            laptop: "flex",
                        },
                    }}
                >
                    <Box
                        sx={{
                            height: "120px",
                            minWidth: "400px",
                            width: "45%",
                            padding: "24px",
                            margin: "0 30px",
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
                            to="/registration-request"
                            disableRipple
                            sx={{
                                alignSelf: "flex-start",
                                fontWeight: 600,
                                padding: ".5rem 2.5rem",
                            }}
                        >
                            Register now
                        </Button>
                    </Box>
                </Box>
            </Box>
        </MainContainer>
    );
};

export default Login;
