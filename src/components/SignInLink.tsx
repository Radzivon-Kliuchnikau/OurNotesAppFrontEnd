import {useMsal} from "@azure/msal-react";
import {LoginRequest} from "../auth/authConfig.ts";
import {Button, styled} from "@mui/material";

const SignInButton = styled(Button)(({theme}) => ({
    color: "black",
    backgroundColor: "#F8EAEA",
    alignSelf:"center",
}))

const SignInLink = (props: any) => {
    const { instance } = useMsal();
    
    const handleLogin = () => {
        instance.loginRedirect(LoginRequest).catch(exeption => {
            console.log(exeption)
        })
    }
    
    return (
        <SignInButton onClick={() => handleLogin()}>
            {props.buttonName}
        </SignInButton>
    );
};

export default SignInLink;