import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = (): React.ReactElement => {
    return (
        <Box>
            <Navbar />
            <Outlet />
            <ToastContainer />{" "}
            {/* Expand Toast to all components: Login, Register, etc. */}
            <Footer />
        </Box>
    );
};

export default Layout;
