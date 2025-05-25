import { Box, CircularProgress } from "@mui/material";
import * as React from "react";

const LoadingBox = (): React.ReactElement => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingBox;
