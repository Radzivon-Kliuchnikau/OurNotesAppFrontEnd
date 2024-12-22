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
import useAuth from "./hooks/UseAuth.tsx";
import useAuthCheck from "./hooks/UseAuthCheck.tsx";
import LoadingBox from "./components/common/LoadingBox.tsx";

function App() {

    const {authUser} = useAuth();
    const {loading} = useAuthCheck();

    if(loading) return <LoadingBox/>
    
    return (
        <Routes>
            <Route path="registration" element={<Registration/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="/" element={<Layout/>}>
                {authUser
                    ? <Route path="/" element={<Notes/>}/>
                    : <Route path="/" element={<OpenPage/>}/>
                }
                <Route path="unauthorized" element={<Unauthorized/>}/>
                <Route element={<AuthorizeView/>}>
                    <Route path="admin" element={<Admin/>}/>
                    <Route path="notes" element={<Notes/>}/>
                </Route>
                <Route path="*" element={<MissingRoute/>}></Route>
            </Route>
        </Routes>
    )
}

export default App
