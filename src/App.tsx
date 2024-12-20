import './App.css'
import OpenPage from "./pages/OpenPage.tsx";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Registration from "./pages/Registration.tsx";
import Login from "./pages/Login.tsx";
import Notes from "./pages/Notes.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import MissingRoute from "./pages/MissingRoute.tsx";
import Admin from "./pages/Admin.tsx";
import AuthorizeView from "./components/auth/AuthorizeView.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<OpenPage/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="unauthorized" element={<Unauthorized/>}/>
                <Route element={<AuthorizeView />}>
                    <Route path="admin" element={<Admin/>}/>
                    <Route path="notes" element={<Notes/>}/>
                </Route>
                <Route path="*" element={<MissingRoute/>}></Route>
            </Route>
        </Routes>
    )
}

export default App
