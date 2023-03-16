import React from "react";
import { Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import Header from "admin/components/Header";
import { DataGrid } from "@mui/x-data-grid";
import RuralProjectForm from "./ruralProjectForm";

const AdminRuralProjects = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <>
    <Box m="1.5rem 2.5rem">
      <Header title="RURAL PROJECTS" subtitle="Rural Project Management" />
    </Box>

    <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="3rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor="#ffffff"
    >
        <Typography fontWeight="bold" variant="h4" sx={{ mb: "1.5rem", textAlign:"center" }}>
          ADD RURAL PROJECT
        </Typography>
        <hr></hr>
        <RuralProjectForm />
    </Box>
    </>
  );
};

export default AdminRuralProjects;