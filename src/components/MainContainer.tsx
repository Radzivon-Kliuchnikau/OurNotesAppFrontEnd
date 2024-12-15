import {Box, Stack, styled} from "@mui/material";

const Container = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    }
}))

const StyledBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    }
}))

const MainContainer = (props: { children: React.ReactNode }) => {
    return (
        <Container>
            <StyledBox>
                {props.children}
            </StyledBox>
        </Container>
    );
};

export default MainContainer;