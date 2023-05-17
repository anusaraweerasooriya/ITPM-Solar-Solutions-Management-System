import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAdminProductRequestQuery } from "hooks/api-hook";
import Header from "admin/components/Header";
import DataGridCustomToolbar from "admin/components/DataGridCustomToolbar";
import FormModal from "components/modals/FormModal";
import ProductRequestView from "./productRequestView";

const AdminProductRequest = () => {
    const theme = useTheme();
    const [productRequestsId, setProductRequestsId] = useState("");

    //view modal
    const [isProductRequestView, setIsProductRequestView] = useState(false);

    //values to be sent to backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const {data, isLoading} = useGetAdminProductRequestQuery({
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
            headerName: "Full Name",
            flex: 1.5,
        },
        {
            field: "email",
            headerName: "E-mail",
            flex: 1.5,
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "relatedProduct",
            headerName: "Related Product",
            flex: 1.5,
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
        },
        {
            field: "relatedProduct",
            headerName: "Related Product",
            flex: 1.5,
        },
        {
            field: "messages",
            headerName: "Message",
            flex: 1.5,
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
                    setProductRequestsId(currentRow._id);
                    setIsProductRequestView(!isProductRequestView);
                    console.log("function id", productRequestsId)
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
                        {isProductRequestView && (
                            <FormModal
                                setOpen={setIsProductRequestView}
                                open={isProductRequestView}
                            >
                                <ProductRequestView productReqId={productRequestsId} />
                            </FormModal>
                        )}
                    </Stack>
                );
            },
        },
    ];

  return (
    <Box m="1.5rem 2.5rem">
        {isProductRequestView && (
            <FormModal setOpen={setIsProductRequestView} open={isProductRequestView}>
                <ProductRequestView />
            </FormModal>
        )}

        <Header title="Product Request" subtitle="Product Management" />  

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

export default AdminProductRequest;
