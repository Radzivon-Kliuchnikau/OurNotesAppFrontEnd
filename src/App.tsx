import OpenPage from "./pages/OpenPage.tsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Registration from "./pages/Registration.tsx";
import Login from "./pages/Login.tsx";
import Notes from "./pages/Notes.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import Admin from "./pages/Admin.tsx";
import AuthorizeView from "./components/auth/AuthorizeView.tsx";
import { useAuth } from "./context/UseAuth.tsx";
import MissingRoute from "./pages/MissingRoute.tsx";
import NetworkErrorPage from "./pages/NetworkErrorPage.tsx";

const App = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route index element={user ? <Notes /> : <OpenPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route element={<AuthorizeView />}>
                    <Route path="admin" element={<Admin />} />
                </Route>
                <Route path="/*" element={<MissingRoute />} />
                <Route path="networkerror" element={<NetworkErrorPage />} />
            </Route>
        </Routes>
    );
};

export default App;
