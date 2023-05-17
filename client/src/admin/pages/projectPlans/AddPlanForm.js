import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const projectPlanSchema = yup.object().shape({
  serviceCharge: yup.number().required("Service charge cannot be empty"),
  totalCost: yup.number().required("Total cost cannot be empty"),
  description: yup.string().required("Description cannot be empty"),
});

const initialValues = {
  serviceCharge: "",
  totalCost: "",
  description: "",
};

const AddPlanForm = ({ productCost, reqId }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const [charge, setCharge] = useState(0);

  initialValues.totalCost = productCost;

  // useEffect(() => {
  //   const calculatedTotalCost = productCost * (charge / 100) + productCost;
  //   console.log(calculatedTotalCost);
  //   initialValues.totalCost = calculatedTotalCost.toString();
  // }, [charge, productCost]);

  // const handleServiceCharge = () => {
  //   const calculatedTotalCost = productCost * (charge / 100) + productCost;
  //   console.log(calculatedTotalCost);
  //   initialValues.totalCost = calculatedTotalCost.toString();
  // };

  const createPlan = async (values, onSubmitProps) => {
    const response = await fetch(
      `http://localhost:5001/plans/createProjectPlan/${reqId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    if (response.ok) {
      if (responseData.savedPlan) {
        onSubmitProps.resetForm();
        navigate("/admin/planRequests");
      }
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await createPlan(values, onSubmitProps);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box
      width={isNonMobileScreens ? "95%" : "93%"}
      pt="1rem"
      mt="1rem auto"
      borderRadius="1.5rem"
      backgroundColor="#ffffff"
    >
      <Typography
        fontWeight="bold"
        variant="h4"
        sx={{ mb: "1.5rem", textAlign: "center" }}
      >
        ADD PROJECT PLAN
      </Typography>
      <hr></hr>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={projectPlanSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              m="2rem"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreens ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="Service Charge"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                onChangeCapture={(e) => setCharge(e.target.value)}
                value={values.serviceCharge}
                name="serviceCharge"
                color="success"
                error={
                  Boolean(touched.serviceCharge) &&
                  Boolean(errors.serviceCharge)
                }
                helperText={touched.serviceCharge && errors.serviceCharge}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                      // onClick={handleServiceCharge}
                      >
                        {" "}
                        <AddCircleOutlineOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Total Cost"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.totalCost}
                name="totalCost"
                color="success"
                error={Boolean(touched.totalCost) && Boolean(errors.totalCost)}
                helperText={touched.totalCost && errors.totalCost}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Detailed explanation about the project plan"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                color="success"
                multiline
                rows={5}
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* BUTTONS */}
            <Box m="2rem">
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
                Add Project Plan
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddPlanForm;
