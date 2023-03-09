import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarAdmin from "admin/components/NavbarAdmin";

const AdminLayout = () => {
  return (
    <Box width="100%" height="100%">
      <Box>
        <NavbarAdmin />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
