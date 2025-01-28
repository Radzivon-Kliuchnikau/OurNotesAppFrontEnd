import {
    Box,
    Button,
    Card,
    FormLabel,
    styled,
    Typography
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
// @ts-ignore
import Link from "@mui/material/Link";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../hooks/UseAuth.tsx";
import MainContainer from "../components/common/MainContainer.tsx";
import TextFieldCustom from "../components/common/TextFieldCustom.tsx";
import {login} from "../api/authApi.ts";

const FormCard = styled(Card)(({theme}) => ({
    display: "flex",
    boxShadow: "none", // Removes the default shadow
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    width: "320px",
    padding: "40px",
    marginTop: "130px",
    border: "1px solid black",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
        border: "none",
        padding: "0px 40px 40px 40px",
        marginTop: "50px"
    }
}))

const Login = () => {
    const {setAuthUser} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userEmailRef = useRef();
    const errorRef: any = useRef();

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // @ts-ignore
        userEmailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage("");
    }, [userEmail, password])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await login(userEmail, password)

            setAuthUser({Email: userEmail, Name: userEmail});
            setUserEmail("");
            setPassword("");
            navigate(from, {replace: true});
        } catch (error: any) {
            if (!error.response) {
                setErrorMessage("No Server Response")
            } else if (error.response?.status === 400) {
                setErrorMessage("Missing User email or password ")
            } else if (error.response?.status === 401) {
                setErrorMessage("Unauthorized")
            } else {
                setErrorMessage("Login failed");
            }
            errorRef.current.focus();
        }

    }

    return (
        <MainContainer>
            <FormCard variant="outlined">
                <Typography ref={errorRef} aria-live="assertive"
                            sx={{display: errorMessage ? "block" : "none"}}>
                    {errorMessage}
                </Typography>
                <Box sx={{marginTop: "30px", marginBottom: "40px"}}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/">
                        <img src="../public/static/logo.svg" alt="Logo" />
                    </Typography>
                </Box>
                <Typography component="h1" variant="h5" sx={{marginBottom: "20px"}}>Sign In</Typography>
                <Box component="form" onSubmit={handleSubmit}
                     sx={{
                         width: "400px",
                         display: "flex", 
                         flexDirection: "column",
                }}>

                    <FormLabel htmlFor="useremail" sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Username or email address</Typography>
                    </FormLabel>
                    <TextFieldCustom
                        type="text"
                        id="useremail"
                        inputRef={userEmailRef}
                        autoComplete="off"
                        onChange={(event) => setUserEmail(event.target.value)}
                        value={userEmail}
                        required
                    />

                    <FormLabel htmlFor="userPassword" sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>Password</Typography>
                    </FormLabel>
                    <TextFieldCustom
                        type="password"
                        id="userPassword"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        required
                    />

                    <Button
                        type="submit"
                        disabled={userEmail == "" || password == ""}
                        disableRipple
                        sx={{
                            width: "320px",
                            height: "50px",
                            border: "1px solid black",
                            borderRadius: "10px",
                            color: "black",
                            textDecoration: "none",
                            textTransform: "none",
                            fontSize: "20px",
                            marginBottom: "40px",
                            marginTop: "30px"
                        }}
                    >
                        Sign in
                    </Button>
                </Box>
                <Typography sx={{textAlign: "center"}}>
                    Need an Account?{" "}
                    <Link
                        href="/registration"
                        sx={{color: "black", textDecoration: "none"}}>
                        Sign Up
                    </Link>
                </Typography>
            </FormCard>
        </MainContainer>
    )
};

export default Login;