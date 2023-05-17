import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  useMediaQuery, 
  Box, 
  useTheme, 
  Button, 
  Stack, 
  List, 
  ListItemButton, 
  ListItemText, 
  Collapse 
} from "@mui/material";
import Header from "admin/components/Header";
import ProductCards from "./productCards";
import { useGetAdminProductsQuery } from "hooks/api-hook";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "admin/components/DataGridCustomToolbar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import UpdateProductForm from "./updateProductForm"
import FormModal from "components/modals/FormModal";
import DeleteModal from "admin/components/DeleteModal";
import ProductView from "./productView";

const AdminProducts = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [productsId, setProductId] = useState("");
  const isDesktop = useMediaQuery("(min-width: 1700px)");

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

  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch } = useGetAdminProductsQuery(
    {
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    },
    { refetchOnMountOrArgChange: true }
  );

  //console.log(data);
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
      flex: 1.5,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
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
      width: 250,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {

        const onClickDelete = (e) => {
          const currentRow = params.row;
          setProductId(currentRow._id);
          setIsDeleteForm(!isDeleteForm);
         // return alert(JSON.stringify(currentRow, null, 4));
        };

        const onClickUpdate = (e) => {
          const currentRow = params.row;
          setProductId(currentRow._id);
          setIsUpdateForm(!isUpdateForm);
         // return alert(JSON.stringify(currentRow, null, 4));
        };

        const onClickView = (e) => {
          const currentRow = params.row;
          setProductId(currentRow._id);
          setIsView(!isView);
          console.log("function id", productsId)
         // return alert(JSON.stringify(currentRow, null, 4));
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
                  <UpdateProductForm prodId={productsId} setIsUpdateForm={setIsUpdateForm} refetch={refetch} />
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
                  <ProductView productId={productsId} />
              </FormModal>
            )}
          </Stack>
        );
      },
    },
  ];

  const handleDelete = async () => {
    console.log("id", productsId );
    const response = await fetch(
      `http://localhost:5001/products/deleteProduct/${productsId}`,
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
          title="Delete product"
          body="Are you sure you want to delete this product?"
          handleDelete={handleDelete}
        >
        </DeleteModal>
      )}

      {isUpdateForm && (
        <FormModal
          setOpen={setIsUpdateForm}
          open={isUpdateForm}
        >
          <UpdateProductForm />
        </FormModal>
      )}

      {isView && (
        <FormModal
          setOpen={setIsView}
          open={isView}
        >
          <ProductView />
        </FormModal>
      )}
      
      <Header title="PRODUCTS" subtitle="Product Management" />

      {isDesktop && <ProductCards />}

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
          rows={(data && data.products) || []}
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
        onClick={handleClick}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
      >
        ADD
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={() => navigate("/admin/addProduct")}>
            <ListItemText primary="Add Inverter" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/admin/addSolarPanels")}>
            <ListItemText primary="Add Solar Panels" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/admin/addBatteries")}>
            <ListItemText primary="Add Batteries" />
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  );
};

export default AdminProducts;
