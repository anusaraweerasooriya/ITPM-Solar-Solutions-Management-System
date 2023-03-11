import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Navbar from "user/components/Navbar";
import Footer from "user/components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';

const ClientLayout = () => {
  return (
    <Box>
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE BODY */}
      <Outlet />

      {/* FOOTER */}
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default ClientLayout;

