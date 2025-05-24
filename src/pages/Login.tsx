import { Box, Button, Container, FormLabel, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import Link from '@mui/material/Link'
import { useLocation, useNavigate } from 'react-router-dom'
import TextFieldCustom from '../components/common/TextFieldCustom.tsx'
import FormCard from '../components/common/FormCard.tsx'
import { FieldValues, useForm } from 'react-hook-form'
import * as React from 'react'
import { loginApi } from '../services/api/authApi.tsx'

type FormInputs = {
    username: string
    password: string
    serverResponse: string
}

const Login = (): React.ReactElement => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
        setFocus,
        setError,
    } = useForm<FormInputs>()

    useEffect(() => {
        setFocus('username')
    }, [])

    const { setAuthUser } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const errorRef: any = useRef()

    const onSubmit = async (data: FieldValues) => {
        await loginApi(data.username, data.password)
        setAuthUser({ Email: data.username, Name: data.username })
        reset()
        navigate(from, { replace: true })
    }

    return (
        <Container
            sx={{
                minHeight:
                    'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <FormCard>
                {/*<Typography ref={errorRef} aria-live="assertive"*/}
                {/*            sx={{display: errors.serverResponse ? "block" : "none"}}>*/}
                {/*    {errors.serverResponse?.message}*/}
                {/*</Typography>*/}
                <Box sx={{ marginTop: '30px', marginBottom: '40px' }}>
                    <Typography variant="h6" noWrap component="a" href="/">
                        <img src="../public/static/logo.svg" alt="Logo" />
                    </Typography>
                </Box>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ marginBottom: '20px' }}
                >
                    Sign In
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        width: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormLabel htmlFor="username" sx={{ display: 'flex' }}>
                        <Typography
                            sx={{ fontSize: '14px', marginBottom: '5px' }}
                        >
                            Username or email address
                        </Typography>
                    </FormLabel>
                    <TextFieldCustom
                        {...register('username', {
                            required: 'User name or email is required',
                        })}
                        type="text"
                        id="username"
                        autoComplete="off"
                    />

                    <FormLabel htmlFor="userPassword" sx={{ display: 'flex' }}>
                        <Typography
                            sx={{ fontSize: '14px', marginBottom: '5px' }}
                        >
                            Password
                        </Typography>
                    </FormLabel>
                    <TextFieldCustom
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        type="password"
                        id="userPassword"
                    />

                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        disableRipple
                        sx={{
                            width: '100%',
                            height: '50px',
                            border: '1px solid black',
                            borderRadius: '10px',
                            color: 'black',
                            textDecoration: 'none',
                            textTransform: 'none',
                            fontSize: '20px',
                            marginBottom: '40px',
                            marginTop: '30px',
                        }}
                    >
                        Sign in
                    </Button>
                </Box>
                <Typography sx={{ textAlign: 'center' }}>
                    Need an Account?{' '}
                    <Link
                        href="/registration"
                        sx={{ color: 'black', textDecoration: 'none' }}
                    >
                        Sign Up
                    </Link>
                </Typography>
            </FormCard>
        </Container>
    )
}

export default Login
