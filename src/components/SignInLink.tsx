import {useMsal} from "@azure/msal-react";
import {LoginRequest} from "../auth/authConfig.ts";
import {Button} from "@mui/material";

const SignInLink = () => {
    const { instance } = useMsal();
    
    const handleLogin = () => {
        instance.loginRedirect(LoginRequest).catch(exeption => {
            console.log(exeption)
        })
    }
    
    return (
        <Button onClick={() => handleLogin()}>
            Sign In
        </Button>
    );
};

export default SignInLink;