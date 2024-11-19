import './App.css'
import OpenPage from "./components/OpenPage.tsx";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Registration from "./components/Registration.tsx";
import Login from "./components/Login.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<OpenPage/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="login" element={<Login/>}/>
            </Route>
        </Routes>
    )
}

export default App
