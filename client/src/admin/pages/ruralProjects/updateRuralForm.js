import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import FlexBox from "admin/components/FlexBox";
import GridTypeModal from "user/pages/planRequests/GridTypeModal";
import ErrorModal from "components/modals/ErrorModal";
import { useEffect } from "react";
import { useGetRuralProjectByIdQuery } from "hooks/api-hook";
import Dropzone from "react-dropzone";

const ruralProjectSchema = yup.object().shape({
    projectName: yup.string().required("Project name cannot be empty"),
    location: yup.string().required("Location cannot be empty"),
    projectType: yup.string().required("Please select project type"),
    monthlyConsumption: yup
        .number()
        .required("Monthly consumption amount cannot be empty"),
    gridType: yup.string().required("Please select grid type"),
    estimInitiateDate: yup
        .date()
        .required("Please select estimated initiation date"),
    estimEndDate: yup.date().required("Please select estimated end date"),
    estimTotalCost: yup.number().required("Estimated total cost cannot be empty"),
    imagePath: yup.string(),
    description: yup.string(),
    currentAllocation: yup.number(),
    status: yup.string(),
});

const initialValuesRuralProject = {
    projectName: "",
    location: "",
    projectType: "",
    monthlyConsumption: "",
    gridType: "",
    estimInitiateDate: "",
    estimEndDate: "",
    estimTotalCost: "",
    imagePath: "",
    description: "",
    currentAllocation: "",
    status: "",
};

const UpdateRuralForm = ({ projId }) => {
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const today = new Date().toISOString().split("T")[0];
  const { palette } = useTheme();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { data } = useGetRuralProjectByIdQuery(
    { projId },
    { refetchOnMountOrArgChange: true }
  );

console.log(data);

// eslint-disable-next-line no-lone-blocks
if (data) {
    initialValuesRuralProject.projectName = data.projectName;
    initialValuesRuralProject.location = data.location;
    initialValuesRuralProject.projectType = data.projectType;
    initialValuesRuralProject.monthlyConsumption = data.monthlyConsumption;
    initialValuesRuralProject.gridType = data.gridType;
    initialValuesRuralProject.estimInitiateDate = data.estimInitiateDate;
    initialValuesRuralProject.estimEndDate = data.estimEndDate;
    initialValuesRuralProject.estimTotalCost = data.estimTotalCost;
    initialValuesRuralProject.imagePath = data.imagePath;
    initialValuesRuralProject.description = data.description;
    initialValuesRuralProject.currentAllocation = data.currentAllocation;
    initialValuesRuralProject.status = data.status;
}

const handleFormSubmit = async (values, onSubmitProps) => {
  //send form info with an image
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  formData.append("imagePath", values.imagePath.name);

  const savedUserResponse = await fetch(
    `http://localhost:5001/projects/updateRuralProject/${projId}`,
    {
      method: "PATCH",
      body: formData,
    }
  );
  const savedProject = await savedUserResponse.json();
  onSubmitProps.resetForm();

  if (savedProject) {
    navigate("/admin/ruralProjects");
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
        initialValues={initialValuesRuralProject}
        validationSchema={ruralProjectSchema}
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
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                select
                label="Project Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projectType}
                name="projectType"
                error={
                  Boolean(touched.projectType) && Boolean(errors.projectType)
                }
                helperText={touched.projectType && errors.projectType}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Domestic">Domestic</MenuItem>
                <MenuItem value="Commercial">Commercial</MenuItem>
              </TextField>
              <TextField
                label="Monthly Consumption"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.monthlyConsumption}
                name="monthlyConsumption"
                error={
                  Boolean(touched.monthlyConsumption) &&
                  Boolean(errors.monthlyConsumption)
                }
                helperText={
                  touched.monthlyConsumption && errors.monthlyConsumption
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                select
                label="Grid Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gridType}
                name="gridType"
                error={Boolean(touched.gridType) && Boolean(errors.gridType)}
                helperText={touched.gridType && errors.gridType}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Off-grid">Off-grid</MenuItem>
                <MenuItem value="On-grid">On-grid</MenuItem>
              </TextField>
              <TextField
                label="Estimated Initiation Date"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.estimInitiateDate}
                name="estimInitiateDate"
                error={
                  Boolean(touched.estimInitiateDate) &&
                  Boolean(errors.estimInitiateDate)
                }
                helperText={
                  touched.estimInitiateDate && errors.estimInitiateDate
                }
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: today }}
              />
              <TextField
                label="Estimated End Date"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.estimEndDate}
                name="estimEndDate"
                error={
                  Boolean(touched.estimEndDate) && Boolean(errors.estimEndDate)
                }
                helperText={touched.estimEndDate && errors.estimEndDate}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: today }}
              />
              <TextField
                label="Estimated Cost"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.estimTotalCost}
                name="estimTotalCost"
                error={
                  Boolean(touched.estimTotalCost) &&
                  Boolean(errors.estimTotalCost)
                }
                helperText={touched.estimTotalCost && errors.estimTotalCost}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Current Allocation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currentAllocation}
                name="currentAllocation"
                error={
                  Boolean(touched.currentAllocation) &&
                  Boolean(errors.currentAllocation)
                }
                helperText={touched.currentAllocation && errors.currentAllocation}
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
                          <EditOutlinedIcon />
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
                label="Project Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={
                  Boolean(touched.status) && Boolean(errors.status)
                }
                helperText={touched.status && errors.status}
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
  )
}

export default UpdateRuralForm
