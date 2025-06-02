import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import * as React from "react";

const Unauthorized = (): React.ReactElement => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <Box>
            <Typography>This is Unauthorized Page!!!</Typography>
            <Button onClick={goBack}>Go back</Button>
        </Box>
    );
};

export default Unauthorized;
