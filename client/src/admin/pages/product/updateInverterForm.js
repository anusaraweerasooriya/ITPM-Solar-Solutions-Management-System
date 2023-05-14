import React, { useState } from 'react'
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    FormControlLabel,
    Switch,
    MenuItem,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import FlexBox from "admin/components/FlexBox";
import { useGetProductByIdQuery, useGetProductsQuery } from 'hooks/api-hook';
import Dropzone from "react-dropzone";

const ProductSchema = yup.object().shape({
    productName: yup.string().required("Product name cannot be empty"),
    price: yup.string().required("Product price cannot be empty"),
    productType: yup.string().required("Please select a product type"),
    imagePath: yup.string().required("please choose an image"),
    category: yup.string().required("Please select a product category"),
    description: yup.string(),
    ratedPower: yup.string().required("Please fill this field"),
    batteryVoltage: yup.string().required("Please fill this field"),
    MPPTVoltage: yup.string().required("Please fill this field"),
});

const initialValuesProduct = {
    productName: "",
    price: "",
    productType: "",
    imagePath: "",
    category: "Inverter",
    description: "",
    ratedPower: "",
    batteryVoltage: "",
    MPPTVoltage: "",
};

const UpdateProductForm = ({ prodId }) => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
    const today = new Date().toISOString().split("T")[0];
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const { data } = useGetProductByIdQuery(
      { prodId },
      { refetchOnMountOrArgChange: true }
    );
    console.log(prodId)

    if (data) {
      initialValuesProduct.productName = data.productName;
      initialValuesProduct.price = data.price;
      initialValuesProduct.productType = data.productType;
      initialValuesProduct.imagePath = data.imagePath;
      initialValuesProduct.category = data.category;
      initialValuesProduct.description = data.description;
      initialValuesProduct.ratedPower = data.ratedPower;
      initialValuesProduct.batteryVoltage = data.batteryVoltage;
      initialValuesProduct.MPPTVoltage = data.MPPTVoltage;
    }

  const handleFormSubmit = async (values, onSubmitProps) => {
    //send form info with an image
    const formData = new FormData();
    for (let value in values) {
      formData.setValue(value, values[value]);
    }
    formData.append("imagePath", values.imagePath.name);

    const savedUserResponse = await fetch(
      `http://localhost:5001/updateProducts/${prodId}`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const savedProduct = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedProduct) {
      navigate("/admin/products");
    }
  };
  
  return (
    <>
      <Typography
        fontWeight="bold"
        variant="h4"
        sx={{ mb: "1rem", textAlign: "center" }}
      >
        UPDATE RURAL PROJECT
      </Typography>

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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                select
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
                select
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
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("imagePath", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!values.imagePath ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBox>
                          <Typography>{values.imagePath.name}</Typography>
                          <EditOutlinedIcon />
                        </FlexBox>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
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
              <TextField
                select
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                select
                label="Rated Power"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ratedPower}
                name="ratedPower"
                error={
                  Boolean(touched.ratedPower) && Boolean(errors.ratedPower)
                }
                helperText={touched.ratedPower && errors.ratedPower}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Battery Voltage"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.batteryVoltage}
                name="batteryVoltage"
                error={
                  Boolean(touched.batteryVoltage) && Boolean(errors.batteryVoltage)
                }
                helperText={touched.batteryVoltage && errors.batteryVoltage}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="MPPT Voltage"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.MPPTVoltage}
                name="MPPTVoltage"
                error={
                  Boolean(touched.MPPTVoltage) && Boolean(errors.MPPTVoltage)
                }
                helperText={touched.MPPTVoltage && errors.MPPTVoltage}
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

                  // "&:hover": { color: palette.primary.main },
                }}
              >
                Update Project
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default UpdateProductForm;
