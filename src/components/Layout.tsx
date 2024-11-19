import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.tsx";

const Layout = () => {
    return (
        <Box>
            <Navbar/>
            <Outlet/>
        </Box>
    );
};

export default Layout;