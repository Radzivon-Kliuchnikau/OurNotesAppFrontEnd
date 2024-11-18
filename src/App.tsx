import './App.css'
import {Box, Stack} from "@mui/material";
import OpenPage from "./components/OpenPage.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {

    return (
        <Box>
            <Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{backgroundColor:"red"}}>
                <OpenPage />
            </Stack>
        </Box>
    )
}

export default App
