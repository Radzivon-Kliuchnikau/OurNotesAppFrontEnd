import {useMsal} from "@azure/msal-react";
import {Button, styled} from "@mui/material";

const SignOutButton = styled(Button)(({theme}) => ({
    color: "black",
    backgroundColor: "#F8EAEA",
    alignSelf:"center",
}))

const SignOutLink = () => {
    const {instance} = useMsal();

    const handleLogout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        });
    }

    return (
        <SignOutButton onClick={() => handleLogout()}>
            Sign Out
        </SignOutButton>
    );
};

export default SignOutLink;