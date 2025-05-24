import {Box, Typography} from "@mui/material";
import Users from "../components/Users.tsx";
import * as React from "react";
import {useAuth} from "../context/UseAuth.tsx";

const Admin = (): React.ReactElement => {
    const {user} = useAuth();
    return (
        <Box>
            <Typography>Hello, {user?.userName}. You are admin!</Typography>
            <Users/>
        </Box>
    );
};

export default Admin;