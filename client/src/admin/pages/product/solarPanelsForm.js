import { useState } from 'react';
import {
  Box,
  useMediaQuery,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Formik } from 'formik';
import React from 'react'
import * as yup from "yup";
import FlexBox from 'admin/components/FlexBox';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const ProductSchema = yup.object().shape({
  productName: yup.string().required("Product name cannot be empty"),
  Price: yup.string().required("Product name cannot be empty"),
  ProductType: yup.string().required("Please select a product type"),
  imagePath: yup.string().required("please choose an image"),
  category: yup.string().required("Please select a product category"),
  description: yup.string(),
  maxVoltage : yup.string().required("Please fill this field"),
  maxCurrent : yup.string().required("Please fill this field"),
  ratedPower  : yup.string().required("Please fill this field"),
});

const initialValuesProduct = {
  productName: "",
  Price: "",
  ProductType: "",
  imagePath: "",
  category: "",
  description: "",
  maxVoltage: "",
  maxCurrent: "",
  ratedPower: "",
};

const SolarPanelsForm = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const today = new Date().toISOString().split("T")[0];

  const handleFormSubmit = async (values, onSubmitProps) => {
     // send form information with an image
    console.log(values);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("imagePath", values.imagePath.name);

    const savedUserResponse = await fetch(
      "https://loaclhost:5001/createProduct",
      {
        method: "POST",
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
    <div>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="3rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor="ffffff"
      >
        <Typography
          fontWeight="bold"
          variant="h4"
          sx={{ mb: "1.5rem", textAlign: "center" }}
        >
          ADD SOLAR PANEL
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
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobileScreens ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  label="Product Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                  error={Boolean(touched.price) && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  sx={{ gridColumn: "span 4" }}
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
                  sx={{ gridColumn: "span 4" }}
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
                            <ModeEditOutlineIcon />
                          </FlexBox>
                        )}  
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <TextField
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={Boolean(touched.category) && Boolean(errors.category)}
                  helperText={touched.category && errors.category}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Max Voltage"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.maxVoltage}
                  name="maxVoltage"
                  error={
                    Boolean(touched.maxVoltage) && Boolean(errors.maxVoltage)
                  }
                  helperText={touched.maxVoltage && errors.maxVoltage}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Max Current"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.maxCurrent}
                  name="maxCurrent"
                  error={
                    Boolean(touched.maxCurrent) &&
                    Boolean(errors.maxCurrent)
                  }
                  helperText={touched.maxCurrent && errors.maxCurrent}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Rated Power "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ratedPower}
                  name="ratedPower"
                  error={
                    Boolean(touched.ratedPower) && Boolean(errors.ratedPower)
                  }
                  helperText={touched.ratedPower && errors.ratedPower}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              {/* BUTTONs */}
              <FlexBox gap="1rem">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    resetForm();
                  }}
                  sx={{
                    m: "2rem 0",
                    p: "0.8rem",
                    width: "8rem",
                  }}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{
                    m: "2rem 0",
                    p: "0.8rem",
                    width: "8rem",
                  }}
                >
                  ADD
                </Button>
              </FlexBox>

            </form>
          )}
        </Formik>
      </Box>
    </div>
  )
}

export default SolarPanelsForm;
