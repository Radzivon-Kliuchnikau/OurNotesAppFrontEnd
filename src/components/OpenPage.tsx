import {Box} from "@mui/material";

function OpenPage() {
    return (
        <Box bgcolor="green" border={2} flex={12} p={2} sx={{display:{xs: "none", sm: "block"}}}>
            It's Open Page
        </Box>
    );
}

export default OpenPage;