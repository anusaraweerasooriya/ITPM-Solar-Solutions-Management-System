import React, { useState } from "react";
import { Box, useTheme, Stack, Button, Chip } from "@mui/material";
import { Done } from "@mui/icons-material";
import Header from "admin/components/Header";
import { useGetAdminRecentProjectsQuery } from "hooks/api-hook";
import DataGridCustomToolbar from "admin/components/DataGridCustomToolbar";

import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DeleteRecentProjectModal from "./DeleteRecentProjectModal";
import UpdateForm from "./UpdateForm";
import FormModal from "components/modals/FormModal";
import { useEffect } from "react";

const RecentProjects = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();
  console.log(user);

  //data to be sending to the backend api
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [prodId, setProdId] = useState("");
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const { data, isLoading, refetch } = useGetAdminRecentProjectsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  useEffect(() => {
    refetch();
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "projectId",
      headerName: "Project ",
      flex: 1,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 0.8,
    },
    {
      field: "projectType",
      headerName: "Project Type",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 0.9,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow._id, null, 4));
        };

        const deleteHandler = (e) => {
          const currentRow = params.row;
          const id = currentRow._id;
          setProdId(id);
          setOpen(!open);
        };

        const updateHandler = (e) => {
          const currentRow = params.row;
          const id = currentRow._id;
          setProdId(id);
          setOpenForm(!openForm);
        };

        return (
          <div>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={updateHandler}
                sx={{
                  textTransform: "unset",
                }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={deleteHandler}
                sx={{
                  textTransform: "unset",
                }}
              >
                Delete
              </Button>
            </Stack>
          </div>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="RECENT PROJECTS" subtitle="Recent Project Management" />
      {open && (
        <DeleteRecentProjectModal
          open={open}
          setOpen={setOpen}
          prodId={prodId}
          refetch={refetch}
        />
      )}
      {openForm && (
        <FormModal
          setOpen={setOpenForm}
          open={openForm}
          title="Update Recent Project"
        >
          <UpdateForm
            prodId={prodId}
            refetch={refetch}
            setIsForm={setOpenForm}
          />
        </FormModal>
      )}
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
          rows={(data && data.projects) || []}
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
    </Box>
  );
};

export default RecentProjects;
