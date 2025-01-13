import {Box, CircularProgress} from "@mui/material";

const LoadingBox = () => {
    return (
        // TODO: Style this component properly
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Center spinner vertically
            }}
        >
            <CircularProgress/> {/* Spinner */}
        </Box>
    );
};

export default LoadingBox;