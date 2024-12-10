import {Box, Button, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function OpenPage() {
    return (
        <Stack
            direction="column"
            spacing={2}
            sx={{
                backgroundColor: "red",
                height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
                minHeight: '100%'
            }}>
            <Box
                bgcolor="green"
                border={2}
                flex={12}
                p={2}
                textAlign="center"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Typography component="p">
                    Here we can create
                </Typography>
                <Typography sx={{fontSize:25}} component="p">
                    Our Notes
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/registration"
                    sx={{
                        width: "221px",
                        alignSelf: "center",
                        margin: "30px"
                    }}
                >
                    Registration
                </Button>
            </Box>
        </Stack>
    );
}

export default OpenPage;