import './App.css'
import OpenPage from "./components/OpenPage.tsx";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Registration from "./components/Registration.tsx";
import Login from "./components/Login.tsx";
import Notes from "./components/Notes.tsx";
import Unauthorized from "./components/Unauthorized.tsx";
import MissingRoute from "./components/MissingRoute.tsx";
import RequireAuth from "./components/RequireAuth.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<OpenPage/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="unauthorized" element={<Unauthorized/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path="notes" element={<Notes/>}/>
                </Route>

                <Route path="*" element={<MissingRoute/>}></Route>
            </Route>
        </Routes>
    )
}

export default App
