import {Box, Button, Card, CardActions, CardContent, CardMedia, Stack, styled, Typography} from "@mui/material";

const InternalErrorContainer = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    }
}))

const ErrorCard = styled(Card)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    }
}))

const InternalError = () => {
    return (
        <InternalErrorContainer>
            <ErrorCard sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="../static/error_img.jpg"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </ErrorCard>
            
        </InternalErrorContainer>
    );
};

export default InternalError;