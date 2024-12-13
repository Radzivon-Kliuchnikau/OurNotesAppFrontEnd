import {Box, Typography} from "@mui/material";
import Users from "../components/Users.tsx";
import AuthorizeView from "../components/AuthorizeView.tsx";

const Admin = () => {
    return (
        <AuthorizeView>
            <Box>
                <Typography>This is Admin component!!</Typography>
                <Users/>
            </Box>
        </AuthorizeView>
    );
};

export default Admin;