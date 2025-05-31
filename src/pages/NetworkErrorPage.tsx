import { Box, Typography } from "@mui/material";

const NetworkErrorPage = () => {
    return (
        <Box>
            <Typography>
                <h1>Oops... Something went wrong. Probably Network Error</h1>
                <p>It seems there is a problem with the network connection.</p>
                <p>Please check your internet connection and try again.</p>
            </Typography>
        </Box>
    );
};

export default NetworkErrorPage;
