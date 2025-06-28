import { Stack, styled } from "@mui/material";
import * as React from "react";

const Container = styled(Stack)(() => ({
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "0 20px",
}));

interface Props {
    children: React.ReactNode;
}

const MainContainer: React.FC<Props> = (props: {
    children: React.ReactNode;
}): React.ReactElement => {
    return <Container>{props.children}</Container>;
};

export default MainContainer;
