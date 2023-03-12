import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "admin/components/Header";
import { DataGrid } from "@mui/x-data-grid";

const RuralProjects = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="RURAL PROJECTS" subtitle="Rural Project Management" />
    </Box>
  );
};

export default RuralProjects;