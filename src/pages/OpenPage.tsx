import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import MainContainer from "../components/common/MainContainer.tsx";

function OpenPage() {
    return (
        <MainContainer>
            <Box
                bgcolor="#f1e8b8"
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
        </MainContainer>
    );
}

export default OpenPage;