import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

const Layout = () => {
    return (
        <Box>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </Box>
    );
};

export default Layout;