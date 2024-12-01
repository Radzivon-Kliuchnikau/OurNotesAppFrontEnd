import {useMsal} from "@azure/msal-react";
import {Button} from "@mui/material";

const SignOutLink = () => {
    const {instance} = useMsal();

    const handleLogout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        });
    }

    return (
        <Button onClick={() => handleLogout()}>
            Sign Out
        </Button>
    );
};

export default SignOutLink;