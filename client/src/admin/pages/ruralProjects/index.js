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
import FormModal from "components/modals/FormModal";
import RuralProjectUpdate from "./ruralProjectUpdate";
import RuralProjectView from "./ruralProjectView";

const AdminRuralProjects = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [ruralProjId, setRuralProjId] = useState("");

  //delete modal
  const [isDeleteForm, setIsDeleteForm] = useState(false);

  //update modal
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  //view modal
  const [isView, setIsView] = useState(false);

  // values to be sent to backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch } = useGetAdminRuralProjectsQuery(
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
      flex: 0.7,
    },
    {
      field: "gridType",
      headerName: "Grid Type",
      flex: 0.6,
    },
    {
      field: "estimTotalCost",
      headerName: "Total Cost",
      flex: 0.8,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      field: "currentAllocation",
      headerName: "Current Allocation",
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

        const onClickDelete = (e) => {
          const currentRow = params.row;
          setRuralProjId(currentRow._id);
          setIsDeleteForm(!isDeleteForm);
        };

        const onClickUpdate = (e) => {
          const currentRow = params.row;
          setRuralProjId(currentRow._id);
          setIsUpdateForm(!isUpdateForm);
        };

        const onClickView = (e) => {
          const currentRow = params.row;
          setRuralProjId(currentRow._id);
          setIsView(!isView);
        }

        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={onClickUpdate}
              sx={{
                textTransform: "unset",
              }}
            >
              Edit
            </Button>
            {isUpdateForm && (
              <FormModal
                setOpen={setIsUpdateForm} 
                open={isUpdateForm}>
                {/*title="Update Rural Project"*/}
                  <RuralProjectUpdate projId={ruralProjId} setIsUpdateForm={setIsUpdateForm} refetch={refetch} />
              </FormModal>
            )}
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={onClickDelete}
              sx={{
                textTransform: "unset",
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={onClickView}
              sx={{
                textTransform: "unset",
                background: "#007bff",
              }}
            >
              View
            </Button>
            {isView && (
              <FormModal
                setOpen={setIsView} 
                open={isView}>
                {/*title=""*/}
                  <RuralProjectView projId={ruralProjId} />
              </FormModal>
            )}
          </Stack>
        );
      },
    },
  ];

  const handleDelete = async () => {
    console.log("id", ruralProjId );
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
      setIsDeleteForm(false);
      refetch();
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      {isDeleteForm && (
        <DeleteModal 
          setOpen={setIsDeleteForm} 
          open={isDeleteForm} 
          title="Delete Rural Project"
          body="Are you sure you want to delete this rural project?"
          handleDelete={handleDelete}>
        </DeleteModal>
      )}

      {isUpdateForm && (
        <FormModal setOpen={setIsUpdateForm} open={isUpdateForm}>
          <RuralProjectUpdate />
        </FormModal>
      )}

      {isView && (
        <FormModal setOpen={setIsView} open={isView}>
          <RuralProjectView />
        </FormModal>
      )}

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
