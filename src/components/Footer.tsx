import {Box, Typography} from "@mui/material";

const Footer = () => {
    return (
        <Box>
            <Typography>{new Date().getFullYear()} RareCase, Inc.</Typography>        
        </Box>
    );
};

export default Footer;