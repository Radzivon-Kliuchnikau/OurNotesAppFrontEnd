import { Button } from "@mui/material";
import * as React from "react";
import { useAuth } from "../../context/UseAuth.tsx";

const LogoutButton = (): React.ReactElement => {
    const { logoutUser } = useAuth();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        logoutUser();
    };

    return (
        <Button
            variant="text"
            disableRipple
            onClick={handleSubmit}
            sx={{
                all: "unset", // Removes all default button styles
                color: "black",
                cursor: "pointer",
            }}
        >
            Sign out
        </Button>
    );
};

export default LogoutButton;
