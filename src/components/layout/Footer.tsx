import {Box, Typography} from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{display: "flex", justifyContent: "center", padding: "20px"}}>
            <Typography>{new Date().getFullYear()} RareCase, Inc.</Typography>        
        </Box>
    );
};

export default Footer;