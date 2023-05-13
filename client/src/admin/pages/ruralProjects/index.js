import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  useTheme,
  Button,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAdminRuralProjectsQuery } from "hooks/api-hook";
import Header from "admin/components/Header";
import DataGridCustomToolbar from "admin/components/DataGridCustomToolbar";
import DeleteModal from "admin/components/DeleteModal";

const AdminRuralProjects = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [ruralProjId, setRuralProjId] = useState("");

  //delete modal
  const [isDeleteForm, setIsDeleteForm] = useState(false);

  // values to be sent to backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAdminRuralProjectsQuery(
    {
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    },
    { refetchOnMountOrArgChange: true }
  );

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
      field: "estimTotalCost",
      headerName: "Total Cost",
      flex: 0.8,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        const onClickDelete = (e) => {
          const currentRow = params.row;
          setRuralProjId(currentRow._id);
          setIsDeleteForm(!isDeleteForm);
        };

        const handleDelete = async () => {
          console.log(ruralProjId)
          const response = await fetch(
            `http://localhost:5001/projects/deleteRuralProject/${ruralProjId}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
      
          const responseData = await response.json();

          if (!response.ok) {
            throw new Error(responseData.message);
          }

          if (response.ok) {
            if (responseData.savedRequest) {
              navigate("/admin/ruralProjects");
            }
          }
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              onClick={onClick}
              sx={{
                textTransform: "unset",
                background: "#007bff",
              }}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={onClick}
              sx={{
                textTransform: "unset",
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setIsDeleteForm(!isDeleteForm)}
              sx={{
                textTransform: "unset",
              }}
            >
              Delete
            </Button>
            {isDeleteForm && (
              <DeleteModal 
                setOpen={setIsDeleteForm} 
                open={isDeleteForm} 
                title="Delete Rural Project"
                body="Are you sure you want to delete this rural project?"
                handleDelete={handleDelete}>
              </DeleteModal>
            )}
          </Stack>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="RURAL PROJECTS" subtitle="Rural Project Management" />

      <Box
        mt="20px"
        height="70vh"
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
          rows={(data && data.ruralProjects) || []}
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
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={() => navigate("/admin/addRuralProject")}
      >
        ADD
      </Button>
    </Box>
  );
};

export default AdminRuralProjects;
