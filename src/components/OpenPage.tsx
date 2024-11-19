import {Box, Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";

function OpenPage() {
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{backgroundColor: "red"}}>
            <Box
                bgcolor="green"
                border={2}
                flex={12}
                p={2}
                textAlign="center"
                sx={{
                    display: {xs: "none", sm: "block"},
                    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
                    minHeight: '100%'
                }}>
                Here we can create our notes
                <Box>
                    <Button 
                        variant="contained"
                        component={Link}
                        to="/registration"
                    >
                        Registration
                    </Button>
                </Box>
            </Box>
        </Stack>
    );
}

export default OpenPage;