import {Box, Typography} from "@mui/material";
import Users from "../components/Users.tsx";
import useAuth from "../hooks/UseAuth.tsx";

const Admin = () => {
    const {authUser} = useAuth();
    return (
        <Box>
            <Typography>Hello, {authUser?.Name}. You are admin!</Typography>
            <Users/>
        </Box>
    );
};

export default Admin;