import OpenPage from "./pages/OpenPage.tsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Registration from "./pages/Registration.tsx";
import Login from "./pages/Login.tsx";
import Notes from "./pages/Notes.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import Admin from "./pages/Admin.tsx";
import { useAuth } from "./context/UseAuth.tsx";
import MissingRoute from "./pages/MissingRoute.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import RegistrationRequest from "./pages/RegistrationRequest.tsx";
import ForgotPasswordRequest from "./pages/ForgotPasswordRequest.tsx";
import DemoNotes from "./pages/DemoNotes.tsx";

const App = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration />} />
                <Route path="demo" element={<DemoNotes />} />
                <Route
                    path="registration-request"
                    element={<RegistrationRequest />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordRequest />}
                />
                <Route index element={user ? <Notes /> : <OpenPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route
                    path="admin"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route path="/*" element={<MissingRoute />} />
            </Route>
        </Routes>
    );
};

export default App;
