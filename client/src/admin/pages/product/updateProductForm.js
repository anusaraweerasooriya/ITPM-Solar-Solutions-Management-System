import React from 'react'
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useGetProductByIdQuery } from 'hooks/api-hook';

const ProductSchema = yup.object().shape({
    productName: yup.string().required("Product name cannot be empty"),
    price: yup.string().required("Product price cannot be empty"),
    productType: yup.string().required("Please select a product type"),
    category: yup.string().required("Please select a product category"),
    description: yup.string(),
});

const initialValuesProduct = {
    productName: "",
    price: "",
    productType: "",
    category: "Inverter",
    description: "",
};

const UpdateProductForm = ({prodId, setIsUpdateForm, refetch}) => {
    const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
    const { data } = useGetProductByIdQuery(
      { prodId },
      { refetchOnMountOrArgChange: true }
    );
    console.log("id", prodId)
    console.log("data",data)

    if (data) {
      initialValuesProduct.productName = data.productName;
      initialValuesProduct.price = data.price;
      initialValuesProduct.productType = data.productType;
      initialValuesProduct.category = data.category;
      initialValuesProduct.description = data.description;
    }

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("values", values)
    const response = await fetch(
      `http://localhost:5001/products/updateProduct/${prodId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const responseData = await response.json();
  
    if (!response.ok) {
      throw new Error(responseData.message);
    }
  
    if (response.ok) {
      if (responseData) {
        setIsUpdateForm(false);
        refetch();
      }
    }
  };
  
  return (
    <>
        <Typography
          fontWeight="bold"
          variant="h4"
          sx={{ mb: "1rem", textAlign: "center" }}
        >
          UPDATE PRODUCT
        </Typography>
        <hr></hr>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesProduct}
          validationSchema={ProductSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                pt="20px"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minimax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobileScreen ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  label="Product Name"
                  onBlur={handleBlur}
                  onAbort={handleChange}
                  value={values.productName}
                  name="productName"
                  error={
                    Boolean(touched.productName) && Boolean(errors.productName)
                  }
                  helperText={touched.productName && errors.productName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={
                    Boolean(touched.price) && Boolean(errors.price)
                  }
                  helperText={touched.price && errors.price}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Product Type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.productType}
                  name="productType"
                  error={
                    Boolean(touched.productType) && Boolean(errors.productType)
                  }
                  helperText={touched.productType && errors.productType}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={
                    Boolean(touched.category) && Boolean(errors.category)
                  }
                  helperText={touched.category && errors.category}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              {/* BUTTONs */}
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    borderRadius: "1.5rem",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  Update Product
                </Button>
              </Box>
            </form>
          )}
        </Formik>
    </>
  );
};

export default UpdateProductForm;
