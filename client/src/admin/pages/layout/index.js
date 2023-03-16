import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarAdmin from "admin/components/NavbarAdmin";
import authReducer from "hooks/auth-hook";
import Sidebar from "admin/components/Sidebar";

const AdminLayout = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state) => state.auth.user);

  return (
    <Box
      display={isNonMobileScreen ? "flex" : "block"}
      width="100%"
      height="100%"
    >
      <Sidebar
        user={user || {}}
        isNonMobileScreen={isNonMobileScreen}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <NavbarAdmin
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
