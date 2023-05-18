import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useTheme, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAdminCompletedProjectsQuery } from "hooks/api-hook";
import DataGridCustomToolbar from "admin/components/DataGridCustomToolbar";

const CompletedProjects = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [projId, setProjId] = useState("");

  // values to be sent to backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAdminCompletedProjectsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

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
      field: "planId",
      headerName: "Plan ID",
      flex: 0.8,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "client",
      headerName: "Client",
      flex: 1,
    },
    {
      field: "projectType",
      headerName: "Project Type",
      flex: 0.8,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClickAddToRecent = (e) => {
          const currentRow = params.row;
          const id = currentRow._id;
          setProjId(id);
          navigate(`/admin/addToRecent/${id}`);
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              onClick={onClickAddToRecent}
              sx={{
                textTransform: "unset",
                background: "#007bff",
              }}
            >
              Add to recent
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box
      mt="20px"
      height="35vh"
      mb="10px"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.primary[500],
          color: "#ffffff",
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "#ffffff",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.primary[200],
          color: "#ffffff",
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.primary[500]} !important`,
        },
      }}
    >
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={(data && data.completedProjects) || []}
        columns={columns}
        rowCount={(data && data.total) || 0}
        rowsPerPageOptions={[20, 50, 100]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        sortingMode="server"
        onPaginationModelChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        //components={{ Toolbar: DataGridCustomToolbar }}
        componentsProps={{
          toolbar: { searchInput, setSearchInput, setSearch },
        }}
      />
    </Box>
  );
};

export default CompletedProjects;
