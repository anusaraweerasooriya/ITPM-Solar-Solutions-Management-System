import { useMediaQuery, Box, useTheme, Button, Stack } from '@mui/material';
import Header from 'admin/components/Header';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductCards from './productCards';
import { useGetAdminProductsQuery } from "hooks/api-hook";
import { DataGrid } from '@mui/x-data-grid';
import DataGridCustomToolbar from "admin/components/DataGridCustomToolbar"
import ProductForm from './productFrom';

const AdminProducts = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width: 1700px)");

    // values to be sent to backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const { data, isLoading } = useGetAdminProductsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });
    console.log(data);
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "productName",
            headerName: "Product Name",
            flex: 1.5,
        },
        {
            field: "productType",
            headerName: "Product Type",
            flex: 0.8,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
        },
        {
            field: "features",
            headerName: "Features",
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
                return alert(JSON.stringify(currentRow, null, 4));
                };
        
                return (
                <Stack direction="row" spacing={2}>
                    <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={onClick}
                    sx={{
                        textTransform:"unset",
                    }}
                    >
                    Edit
                    </Button>
                    <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={onClick}
                    sx={{
                        textTransform:"unset",
                    }}
                    >
                    Delete
                    </Button>
                </Stack>
                );
            },
        },
    ];


  return (
    <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="Product Management" />

        {isDesktop && (
            <ProductCards />
        )}

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
                rows={(data && data.product) || []}
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
            onClick={() => navigate("/admin/addProduct")}
        >
            ADD
        </Button>    
    </Box>
  );
};

export default AdminProducts;