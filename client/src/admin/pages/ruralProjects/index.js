import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetRuralProjectsQuery } from "hooks/api-hook";
import Header from "admin/components/Header";
import RuralProjectForm from "./ruralProjectForm";

const AdminRuralProjects = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { data, isLoading } = useGetRuralProjectsQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1.5,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "projectType",
      headerName: "Type",
      flex: 0.8,
    },
    {
      field: "gridType",
      headerName: "Grid Type",
      flex: 0.5,
    },
    {
      field: "estimInitiateDate",
      headerName: "Initiation Date",
      flex: 1,
    },
    {
      field: "estimTotalCost",
      headerName: "Total Cost",
      flex: 0.8,
    },
    {
      field: "",
      headerName: "Actions",
      flex: 1,
    },
  ];

  return (
    <>
    <Box m="1.5rem 2.5rem">
      <Header title="RURAL PROJECTS" subtitle="Rural Project Management" />
      <Box mt="40px" height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary[400],
            color: "#ffffff",
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary[200],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary[200],
            color: "#ffffff",
            borderTop: "none"
          },
          "& .MuiDataGrid-toolbarContainer .MuiButtonText": {
            backgroundColor: `${theme.palette.primary[200]} !important`,
            color: "#ffffff",
            borderTop: "none"
          },
        }}
      >
        <DataGrid 
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>

    {/*<RuralProjectForm />*/}

    </>
  );
};

export default AdminRuralProjects;