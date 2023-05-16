import React, { useState } from "react";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import ErrorModal from "components/modals/ErrorModal";
import { useGetRecentProjectByIdQuery } from "hooks/api-hook";

const recentProjectSchema = yup.object().shape({
  projectName: yup.string().required("This field cannot be empty"),
  description: yup.string().required("This field cannot be empty"),
  location: yup.string().required("This field cannot be empty"),
});

const initialValues = {
  projectName: "",
  description: "",
  location: "",
};

const UpdateForm = ({ prodId, refetch, setIsForm }) => {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { data } = useGetRecentProjectByIdQuery({ prodId });

  // eslint-disable-next-line no-lone-blocks
  if (data) {
    console.log(data);
    initialValues.projectName = data.projectName;
    initialValues.location = data.location;
    initialValues.description = data.description;
  }

  const submitRequest = async (values, onSubmitProps) => {
    const response = await fetch(
      `http://localhost:5001/recentProjects/updateRecentProject/${prodId}`,
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
        onSubmitProps.resetForm();
        refetch();
        setIsForm(false);
      }
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await submitRequest(values, onSubmitProps);
    } catch (error) {
      setError(error.message);
      console.log(error);
      setOpen(true);
    }
  };

  return (
    <Box minWidth="500px">
      {error && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          error={error}
          setError={setError}
        />
      )}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={recentProjectSchema}
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
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > Box": {
                  gridColumn: isNonMobileScreen ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="Project Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projectName}
                name="projectName"
                color="success"
                error={
                  Boolean(touched.projectName) && Boolean(errors.projectName)
                }
                helperText={touched.projectName && errors.projectName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                color="success"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                multiline={true}
                rows={4}
                value={values.description}
                name="description"
                color="success"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* BUTTONS */}
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
    </Box>
  );
};

export default UpdateForm;
