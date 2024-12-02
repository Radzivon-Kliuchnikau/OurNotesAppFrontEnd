import {Box, Card, Stack, styled, Typography} from "@mui/material";
import SignInLink from "./SignInLink.tsx";


const RegistrationContainer = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    }
}))

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

const LoginMsal = () => {
    
    return (
        <RegistrationContainer>
            <FormCard variant="outlined">
                <Typography component="h1" variant="h4">Sign In with Microsoft Account</Typography>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                    <SignInLink buttonName="Sign In"/>
                </Box>
            </FormCard>
        </RegistrationContainer>
    );
};

export default LoginMsal;