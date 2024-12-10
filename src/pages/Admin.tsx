import {Box, Typography} from "@mui/material";
import Users from "../components/Users.tsx";

const Admin = () => {
    return (
        <Box>
            <Typography>This is Admin component!!</Typography>
            <Users/>
        </Box>
    );
};

export default Admin;