import { LoginFormInputs } from "../../types/general.ts";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { EMAIL_REGEX } from "../../utils/Constants.tsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type EmailRequestProps = {
    title: string;
    description: string;
    submitFunction: (form: LoginFormInputs) => Promise<void>;
};

const EmailRequestForm = ({
    title,
    description,
    submitFunction,
}: EmailRequestProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<LoginFormInputs>({ mode: "onChange" });

    const navigate = useNavigate();

    const handleFormSubmit = async (form: LoginFormInputs) => {
        await submitFunction(form);
        reset();
    };

    return (
        <Box
            sx={{
                marginTop: "50px",
            }}
        >
            <Typography
                component="h1"
                variant="h5"
                sx={{ marginBottom: "20px" }}
            >
                {title}
            </Typography>
            <Typography sx={{ marginBottom: "20px" }}>{description}</Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(handleFormSubmit)}
                sx={{
                    width: {
                        mobile: "100%",
                        tablet: "100%",
                        laptop: "600px",
                    },
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <FormControl
                    sx={{
                        margin: "10px 0 50px",
                    }}
                    variant="outlined"
                    error={!!errors.userEmail}
                >
                    <InputLabel htmlFor="email">Email address</InputLabel>
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            mobile: "column",
                            tablet: "column",
                            laptop: "row",
                        },
                        gap: 4,
                    }}
                >
                    <Button
                        disableRipple
                        sx={{
                            width: {
                                mobile: "100%",
                                tablet: "100%",
                                laptop: "40%",
                            },
                        }}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        disableRipple
                        sx={{
                            width: "100%",
                        }}
                    >
                        Email me
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EmailRequestForm;
