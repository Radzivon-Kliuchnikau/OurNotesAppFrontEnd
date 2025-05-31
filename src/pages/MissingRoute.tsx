import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MissingRoute = (): React.ReactElement => {
    return (
        <Box>
            <Typography>
                This is Missing Route Page. Route not found!!!
            </Typography>

            <Link to="/">
                <Typography>Go to Home Page</Typography>
            </Link>
        </Box>
    );
};

export default MissingRoute;
