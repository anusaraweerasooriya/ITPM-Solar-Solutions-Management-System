import { 
  Box, 
  useMediaQuery,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBox from "admin/components/FlexBox";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useGetProjectByIdQuery } from "hooks/api-hook";

const recentProjectSchema = yup.object().shape({
    projectName: yup.string(),
    location: yup.string(),
    description: yup.string(),
    projectType: yup.string(),
    endDate: yup.date().required("Please select project end date"),
    picturePath  : yup.string(),
})

const initialValuesForRecentProject = {
    projectId: "",
    projectName:  "",
    location:  "",
    description:  "",
    projectType:  "",
    endDate: "",
    picturePath: "",
}

const AddToRecentForm = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const today = new Date().toISOString().split("T")[0];
  const projId = useParams().id;
  const { data } = useGetProjectByIdQuery({projId});

  // eslint-disable-next-line no-lone-blocks
  if (data) {
    initialValuesForRecentProject.projectId = projId;
    initialValuesForRecentProject.projectName = data.projectName;
    initialValuesForRecentProject.location = data.location;
    initialValuesForRecentProject.description = data.location;
    initialValuesForRecentProject.projectType = data.projectType;
  }
  
  const handleFormSubmit = async(values, onSubmitProps) => {
      //send form info with an image
      const formData = new FormData();
      for (let value in values) {
          formData.append(value, values[value]);
      }
      formData.append("picturePath", values.picturePath.name);
      
      const savedUserResponse = await fetch(
          "http://localhost:5001/addRecentProject",
          {
              method: "POST",
              body: formData,
          }
      );
      const savedProject = await savedUserResponse.json();
      console.log(savedProject)
      
      if (!savedUserResponse.ok) {
        throw new Error(savedProject.message);
      }

      if (savedUserResponse.ok) {
        if (savedProject) {
            onSubmitProps.resetForm();
            navigate("/admin/recentProjects")
        }
      }
  };

  return (
      <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="3rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor="#ffffff"
      >
          <Typography
            fontWeight="bold"
            variant="h4"
            sx={{ mb: "1.5rem", textAlign: "center" }}
          >
            ADD TO RECENT
          </Typography>
          <Typography>Please enter necessary details of the completed project</Typography>
          <hr></hr>
          
          <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValuesForRecentProject}
              validationSchema={recentProjectSchema}
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
                  <form  onSubmit={handleSubmit}>
                      <Box 
                          pt="20px"
                          display="grid" 
                          gap="30px"
                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                          sx = {{
                              "& > div": { gridColumn : isNonMobileScreens ? undefined : "span 4"},      
                          }}
                      >
                          <TextField 
                              label="Project Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.projectName}
                              name="projectName"
                              error={Boolean(touched.projectName) && Boolean(errors.projectName)}
                              helperText={(touched.projectName) && (errors.projectName)}
                              sx={{ gridColumn: "span 4" }}
                          />
                          <TextField 
                              label="Location"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.location}
                              name="location"
                              error={Boolean(touched.location) && Boolean(errors.location)}
                              helperText={(touched.location) && (errors.location)}
                              sx={{ gridColumn: "span 4" }}
                          />
                          <TextField 
                              label="Description"
                              onBlur={handleBlur}
                              multiline
                              rows={4}
                              onChange={handleChange}
                              value={values.description}
                              name="description"
                              error={Boolean(touched.description) && Boolean(errors.description)}
                              helperText={(touched.description) && (errors.description)}
                              sx={{ gridColumn: "span 4" }}
                          />
                          <TextField 
                              label="Project Type"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.projectType}
                              name="projectType"
                              error={Boolean(touched.projectType) && Boolean(errors.projectType)}
                              helperText={(touched.projectType) && (errors.projectType)}
                              sx={{ gridColumn: "span 2" }}
                          />
                          <TextField
                              label="Project End-date"
                              type="date"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.endDate}
                              name="endDate"
                              error={Boolean(touched.endDate) && Boolean(errors.endDate)}
                              helperText={(touched.endDate) && (errors.endDate)}
                              sx={{ gridColumn: "span 2" }}
                              InputLabelProps={{ shrink: true }}
                              inputProps={{ max: today }}
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
                                      setFieldValue("picturePath", acceptedFiles[0])
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
                                      {!values.picturePath ? (
                                          <p>Add Picture Here</p>
                                      ) : (
                                          <FlexBox>
                                          <Typography>{values.picturePath.name}</Typography>
                                          <EditOutlinedIcon />
                                          </FlexBox>
                                      )}
                                      </Box>
                                  )}
                              </Dropzone>
                          </Box>
                      </Box>

                      {/* BUTTONs */}
                      <FlexBox gap="1rem">
                          <Button variant="outlined" color="primary"
                              onClick={() => {resetForm();}}
                              sx={{
                                  m: "2rem 0",
                                  p: "0.8rem",
                                  width: "8rem"
                              }}
                          >
                              Clear
                          </Button>
                          <Button type="submit" variant="contained" color="success"
                              sx={{
                                  m: "2rem 0",
                                  p: "0.8rem",
                                  width: "8rem"
                              }}
                          >
                              ADD
                          </Button>
                      </FlexBox>
                  </form >
              )}
          </Formik>
      </Box>
  );
}

export default AddToRecentForm;
