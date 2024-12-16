import {Stack, styled} from "@mui/material";

const Container = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    }
}))

const MainContainer = (props: { children: React.ReactNode }) => {
    return (
        <Container>
            {props.children}
        </Container>
    );
};

export default MainContainer;