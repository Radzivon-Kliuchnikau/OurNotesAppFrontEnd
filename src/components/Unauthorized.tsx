import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <Box>
            <Typography>This is Unauthorized Page!!XXXXXXXXX</Typography>
            <Button onClick={goBack}>Go back</Button>
        </Box>
    );
};

export default Unauthorized;