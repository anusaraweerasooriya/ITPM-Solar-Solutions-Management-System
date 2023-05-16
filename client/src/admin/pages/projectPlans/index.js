import React, { useState, useEffect } from "react";
import { Box, useTheme, Stack, Button, Chip } from "@mui/material";

import { Done } from "@mui/icons-material";
import Header from "admin/components/Header";
import DataGridCustomToolbar from "admin/components/DataGridCustomToolbar";

import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAdminProjectPlansQuery } from "hooks/api-hook";

const ProjectPlans = () => {
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

  const [isRejectModal, setIsRejectModal] = useState(false);
  const [currReqId, setCurrReqId] = useState("");

  const { data, isLoading, refetch } = useGetAdminProjectPlansQuery({
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
      field: "requestId",
      headerName: "Request",
      flex: 1,
    },
    {
      field: "servicePack",
      headerName: "Service Pack",
      flex: 1,
    },
    {
      field: "serviceCharge",
      headerName: "Service Charge",
      flex: 0.8,
    },
    {
      field: "totalCost",
      headerName: "Total Cost",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
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

        const rejectPlanHandler = (e) => {
          const currentRow = params.row;
          const reqId = currentRow._id;
          setCurrReqId(reqId);
          setIsRejectModal(!isRejectModal);
        };

        const createPlanHandler = (e) => {
          const currentRow = params.row;
          const reqId = currentRow._id;
          setCurrReqId(reqId);
          navigate(`/admin/addProjectPlan/${reqId}`);
        };

        const currentRow = params.row;
        const isPending = currentRow.status === "pending";
        const isRejected = currentRow.status === "rejected";

        return (
          <div>
            {isPending ? (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={createPlanHandler}
                  sx={{
                    textTransform: "unset",
                  }}
                >
                  Create
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={rejectPlanHandler}
                  sx={{
                    textTransform: "unset",
                  }}
                >
                  Reject
                </Button>
              </Stack>
            ) : isRejected ? (
              <Box>
                <Chip label="Rejected" color="default" />
              </Box>
            ) : (
              <Box>
                <Chip
                  label="Plan Created"
                  color="success"
                  variant="outlined"
                  icon={<Done />}
                />
              </Box>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PROJECT PLANS" subtitle="Project Plan Management" />
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
          rows={(data && data.plans) || []}
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

export default ProjectPlans;
