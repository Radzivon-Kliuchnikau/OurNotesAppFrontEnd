import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MainContainer from "../components/common/MainContainer.tsx";
import * as React from "react";
import CommonButton from "../components/common/Buttons/CommonButton.tsx";

const OpenPage = (): React.ReactElement => {
    return (
        <MainContainer>
            <Box
                flex={12}
                p={2}
                sx={{
                    display: "flex",
                    flexDirection: {
                        mobile: "column",
                        tablet: "row",
                        laptop: "row",
                    },
                    justifyContent: "space-between",
                    margin: {
                        mobile: "0 auto",
                        tablet: "0 auto",
                        biggerTablet: "90px 0 auto",
                        laptop: "90px 0 auto",
                    },
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
                        <Box
                            sx={{
                                overflow: "hidden",
                                display: {
                                    mobile: "flex",
                                    tablet: "flex",
                                    biggerTablet: "none",
                                    laptop: "none",
                                },
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                component="img"
                                src="../public/static/open-page-tablet-mobile4.svg"
                                alt="Open Page"
                                sx={{
                                    width: "100%",
                                    maxWidth: "520px",
                                    height: "auto%",
                                    objectFit: "contain",
                                    // position: "relative",
                                }}
                            />
                        </Box>
                    </Box>
                    <Typography
                        component="h1"
                        variant="h6"
                        sx={{
                            marginBottom: {
                                mobile: "20px",
                                tablet: "20px",
                                biggerTablet: "40px",
                                laptop: "40px",
                            },
                        }}
                    >
                        A little tool that help you and your partner to remember
                        things
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "nowrap",
                            flexDirection: {
                                mobile: "column",
                                tablet: "column",
                                laptop: "row",
                            },
                            marginBottom: {
                                mobile: "60px",
                                tablet: "60px",
                                biggerTablet: "60px",
                                laptop: "0",
                            },
                            gap: "20px",
                        }}
                    >
                        <CommonButton
                            component={Link}
                            to="/demo"
                            disableRipple
                            sx={{
                                border: "none",
                                backgroundColor: "#D3D3D3",
                            }}
                        >
                            Check out the demo
                        </CommonButton>
                        <CommonButton
                            component={Link}
                            to="/login"
                            disableRipple
                        >
                            Sign in to your account
                        </CommonButton>
                    </Box>
                </Box>
                <Box
                    sx={{
                        overflow: "visible",
                        display: {
                            mobile: "none",
                            tablet: "none",
                            biggerTablet: "flex",
                            laptop: "flex",
                        },
                    }}
                >
                    <Box
                        component="img"
                        src="../public/static/open-page.svg"
                        alt="Open Page"
                        sx={{
                            width: {
                                mobile: "150%",
                                tablet: "120%",
                                laptop: "100%",
                            },
                            maxWidth: "none",
                            height: "100%",
                            objectFit: "cover",
                            position: "relative",
                            bottom: 80,
                            left: {
                                mobile: "-25%",
                                tablet: "-10%",
                                laptop: "0",
                            },
                        }}
                    />
                </Box>
            </Box>
        </MainContainer>
    );
};

export default OpenPage;
