import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MainContainer from "../components/common/MainContainer.tsx";
import * as React from "react";

const OpenPage = (): React.ReactElement => {
    return (
        <MainContainer>
            <Box
                flex={12}
                p={2}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: "90px 0 auto",
                    padding: 0,
                }}
            >
                <Box
                    sx={{
                        width: "auto",
                        maxWidth: "700px",
                        flexGrow: 1,
                        textAlign: "left",
                    }}
                >
                    <Box sx={{ maxWidth: "800px", marginBottom: "20px" }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {
                                    mobile: "2rem",
                                    tablet: "3rem",
                                    laptop: "3.5rem",
                                },
                                fontWeight: 600,
                            }}
                        >
                            Create your notes, save it and share
                        </Typography>
                    </Box>
                    <Typography
                        component="h1"
                        variant="h6"
                        sx={{ marginBottom: "40px" }}
                    >
                        A little tool that help you and your partner to remember
                        things
                    </Typography>
                    <Button
                        component={Link}
                        to="/login"
                        disableRipple
                        sx={{
                            minWidth: "160px",
                            fontWeight: 600,
                            borderWidth: "2px",
                            border: "1px solid black",
                            borderRadius: "2rem",
                            padding: ".5rem 2.5rem",
                            color: "black",
                            textShadow: "none",
                            letterSpacing: "0.025rem",
                            textDecoration: "none",
                            textTransform: "none",
                            fontSize: "20px",
                        }}
                    >
                        Get started with notes
                    </Button>
                </Box>
                <Box>
                    <Box
                        component="img"
                        src="/static/images/open-page.png"
                        alt="Open Page"
                        sx={{
                            width: "100%",
                            maxWidth: "600px",
                            marginTop: "40px",
                        }}
                    />
                </Box>
            </Box>
        </MainContainer>
    );
};

export default OpenPage;
