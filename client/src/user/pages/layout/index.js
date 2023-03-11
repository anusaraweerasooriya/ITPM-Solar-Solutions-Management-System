import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "user/components/Navbar";
import FooterComp from "user/components/Footer";

const ClientLayout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <FooterComp /> 
      </Box>
    </Box>
  );
};

export default ClientLayout;
