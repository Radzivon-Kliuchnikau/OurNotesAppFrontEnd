import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import {BrowserRouter, Routes, Route} from "react-router-dom";

import App from './App.tsx'
import {AuthProvider} from "./context/AuthProvider.tsx";
// import {ThemeProvider} from "@mui/material";
// import {theme} from "./utils/Theme.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/*<ThemeProvider theme={theme}>*/}
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
        {/*</ThemeProvider>*/}
    </StrictMode>
)
