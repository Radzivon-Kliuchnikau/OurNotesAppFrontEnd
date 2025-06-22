import { useForm } from "react-hook-form";
import { Box, FormLabel, Typography } from "@mui/material";
import TextFieldCustom from "./TextFieldCustom.tsx";
import { LoginFormInputs } from "../../types/general";

type FormFieldProps = {
    label: string;
    name: keyof LoginFormInputs;
    type?: string;
    register: ReturnType<typeof useForm<LoginFormInputs>>["register"];
    error?: string;
    validation?: object;
    actionElement?: React.ReactNode;
};

const FormField = ({
    label,
    name,
    type = "text",
    register,
    error,
    validation = {},
    actionElement,
}: FormFieldProps) => {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "5px",
                }}
            >
                <FormLabel htmlFor={name} sx={{ display: "flex" }}>
                    <Typography
                        sx={{
                            fontSize: "15px",
                            marginBottom: "5px",
                        }}
                    >
                        {label}
                    </Typography>
                </FormLabel>
                {actionElement}
            </Box>
            <TextFieldCustom
                {...register(name, validation)}
                type={type}
                id={name}
                autoComplete="off"
            />
            {error && (
                <Typography
                    sx={{
                        color: "red",
                        fontSize: "14px",
                        marginTop: "-10px",
                        marginBottom: "10px",
                    }}
                >
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default FormField;
