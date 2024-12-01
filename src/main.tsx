import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import {BrowserRouter, Routes, Route} from "react-router-dom";

import App from './App.tsx'
import {MsalProvider} from "@azure/msal-react";
import {PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "./auth/authConfig.ts";

// Take instructions about AUTH from here: 
// Quickstart: Sign in users in a single-page app (SPA) and call the Microsoft Graph API using JavaScript
// https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-single-page-app-javascript-sign-in

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MsalProvider instance={msalInstance}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </BrowserRouter>
        </MsalProvider>
    </StrictMode>
)
