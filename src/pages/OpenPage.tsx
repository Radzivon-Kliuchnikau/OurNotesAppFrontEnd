import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import MainContainer from '../components/common/MainContainer.tsx'
import * as React from 'react'

const OpenPage = (): React.ReactElement => {
    return (
        <MainContainer>
            <Box
                flex={12}
                p={2}
                textAlign="center"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '100px',
                }}
            >
                <Box sx={{ maxWidth: '800px', marginBottom: '40px' }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                            fontWeight: 600,
                        }}
                    >
                        Create your notes, save it and share
                    </Typography>
                </Box>
                <Typography
                    component="h1"
                    variant="h6"
                    sx={{ marginBottom: '40px' }}
                >
                    A little tool that help you and your partner to remember
                    things
                </Typography>
                <Button
                    component={Link}
                    to="/registration"
                    disableRipple
                    sx={{
                        width: '120px',
                        height: '30px',
                        border: '1px solid black',
                        borderRadius: '10px',
                        color: 'black',
                        textDecoration: 'none',
                        textTransform: 'none',
                        fontSize: '16px',
                    }}
                >
                    Get started
                </Button>
            </Box>
        </MainContainer>
    )
}

export default OpenPage
