import { Box, Button, styled, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import MainContainer from '../components/common/MainContainer.tsx'
import * as React from 'react'

const ErrorBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    height: '600px',
    textAlign: 'center',
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
}))

const ErrorImage = styled('img')(({ theme }) => ({
    width: '100%', // Full width of its container
    height: 'auto', // Maintain aspect ratio
    borderRadius: theme.shape.borderRadius, // Optional: Add rounded corners
    boxShadow: theme.shadows[3],
}))

const InternalError = (): React.ReactElement => {
    return (
        <MainContainer>
            <ErrorBox sx={{ width: 345 }}>
                <Box>
                    <Typography gutterBottom variant="h5" component="div">
                        Opps... Something went wrong
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        We're working on it. Try again later
                    </Typography>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/"
                        sx={{
                            width: '221px',
                            alignSelf: 'center',
                            margin: '30px',
                        }}
                    >
                        Home
                    </Button>
                </Box>
            </ErrorBox>
        </MainContainer>
    )
}

export default InternalError
