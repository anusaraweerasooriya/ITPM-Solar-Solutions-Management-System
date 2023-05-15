import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAdminDonationsQuery } from "hooks/api-hook";
import Header from "admin/components/Header";
import DataGridCustomToolbar from "admin/components/DataGridCustomToolbar";
import FormModal from "components/modals/FormModal";
import DonationView from "./donationView";

const AdminDonations = () => {
  const theme = useTheme();
  const [donationId, setDonationId] = useState("");

  //view modal
  const [isDonationView, setIsDonationView] = useState(false);
  
  // values to be sent to backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAdminDonationsQuery({
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
      field: "fullName",
      headerName: "Donor Full Name",
      flex: 1.5,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.7,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      field: "contributingProject",
      headerName: "Contributing Project",
      flex: 1.5,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {

        const onClickView = (e) => {
          const currentRow = params.row;
          setDonationId(currentRow._id);
          setIsDonationView(!isDonationView);
          console.log("function id", donationId)
        }

        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              onClick={onClickView}
              sx={{
                textTransform:"unset",
                background:"#007bff"
              }}
            >
              View
            </Button>
            {isDonationView && (
              <FormModal
                setOpen={setIsDonationView} 
                open={isDonationView}>
                {/*title=""*/}
                  <DonationView donateId={donationId} />
              </FormModal>
            )}
          </Stack>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {isDonationView && (
        <FormModal setOpen={setIsDonationView} open={isDonationView}>
          <DonationView />
        </FormModal>
      )}

      <Header title="DONATIONS" subtitle="Donations Management" />      

      <Box mt="20px" height="70vh" mb="10px"
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
          rows={(data && data.donations) || []}
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

export default AdminDonations;