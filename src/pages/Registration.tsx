import { useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FieldValues, useForm } from "react-hook-form";
import * as React from "react";
import { EMAIL_REGEX, PSW_REGEX, USERNAME_REGEX } from "../utils/Constants.tsx";
import { useAuth } from "../context/UseAuth.tsx";
import MainContainer from "../components/common/MainContainer.tsx";
import { RegistrationFormInputs } from "../types/general";

const Registration = (): React.ReactElement => {
    const { registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
        getValues,
    } = useForm<RegistrationFormInputs>({ mode: "onChange" });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);
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

    const onSubmit = async (data: FieldValues) => {
        registerUser(
            data.username,
            data.useremail,
            data.password,
            data.confirmPassword
        );
        // setSuccess(true); // TODO: Redirect to the success page with a call to activate account in email and then to sign in
        reset();
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
                        Create your new account
                    </Typography>

                    <Typography sx={{ marginBottom: "20px" }}>
                        With account you can save and share your notes
                    </Typography>

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
                            error={!!errors.userName}
                        >
                            <InputLabel htmlFor="name">User name</InputLabel>
                            <OutlinedInput
                                {...register("userName", {
                                    required: "User name is required",
                                    pattern: {
                                        value: USERNAME_REGEX,
                                        message:
                                            "Minimum 3 characters. Must start with a letter. Can contain only letters, numbers, hyphens, underscores, and spaces.",
                                    },
                                })}
                                sx={{
                                    borderRadius: "15px",
                                }}
                                id="name"
                                type="test"
                                label="User name"
                            />
                            {errors.userName && (
                                <FormHelperText>
                                    {errors.userName.message}
                                </FormHelperText>
                            )}
                        </FormControl>

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
                                        message: "Just type a valid email",
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
                                    pattern: {
                                        value: PSW_REGEX,
                                        message:
                                            "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character",
                                    },
                                })}
                                sx={{
                                    borderRadius: "15px",
                                }}
                                id="password"
                                label="Password"
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
                            />
                            {errors.password && (
                                <FormHelperText>
                                    {errors.password?.message}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            sx={{
                                margin: "10px 0",
                            }}
                            variant="outlined"
                            error={!!errors.confirmPassword}
                        >
                            <InputLabel htmlFor="confirmPassword">
                                Confirm password
                            </InputLabel>
                            <OutlinedInput
                                {...register("confirmPassword", {
                                    required: "Confirm password required",
                                    validate: (value) =>
                                        value === getValues("password") ||
                                        "Passwords must match",
                                })}
                                sx={{
                                    borderRadius: "15px",
                                }}
                                id="password"
                                label="Password"
                                type={showConfirmPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword
                                                    ? "hide the password"
                                                    : "display the password"
                                            }
                                            onClick={
                                                handleClickShowConfirmPassword
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.confirmPassword && (
                                <FormHelperText>
                                    {errors.confirmPassword?.message}
                                </FormHelperText>
                            )}
                        </FormControl>

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
                                Create account and sign in
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </MainContainer>
    );
};

export default Registration;
