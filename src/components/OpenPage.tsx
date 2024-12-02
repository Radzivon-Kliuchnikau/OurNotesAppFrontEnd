import {Box, Button, Stack, Typography} from "@mui/material";
import SignInLink from "./SignInLink.tsx";
import {useIsAuthenticated} from "@azure/msal-react";
import {Link, useLocation} from "react-router-dom";

function OpenPage() {

    const isAuthenticated = useIsAuthenticated();


    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
                minHeight: '100%'
            }}>
            <Box
                border={2}
                flex={2}
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
                <Typography sx={{fontSize: 25, marginBottom: "25px"}} component="p">
                    Our Notes
                </Typography>
                {isAuthenticated
                    ?
                    <Button
                        component={Link}
                        to="/notes"
                        sx={{
                            color: "black",
                            backgroundColor: "#F8EAEA",
                            alignSelf: "center",
                        }}>
                        Create some Notes
                    </Button>
                    : <SignInLink buttonName="Sign In with Microsoft"/>

                }
            </Box>
        </Stack>
    );
}

export default OpenPage;