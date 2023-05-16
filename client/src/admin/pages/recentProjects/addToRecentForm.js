
import { 
  Box, 
  useMediaQuery,
  Button,
  TextField,
  Typography,
  useTheme,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBox from "admin/components/FlexBox";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";

const recentProjectSchema = yup.object().shape({
  projectName: yup.string().required("Project name cannot be empty"),
  location: yup.string().required("Location cannot be empty"),
  projectType: yup.string().required("Please select project type"),
  projectEndDate: yup.date().required("Please select estimated end date"),
  imagePath: yup.string(),
  description: yup.string(),

})

const initialValuesForRecentProject = {
  projectName:  "",
  location:  "",
  projectType:  "",
  projectEndDate:  "",
  imagePath: "",
  description: "",
}

const AddToRecentForm = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const {} = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const today = new Date().toISOString().split('T')[0];
  
  const handleFormSubmit = async(values, onSubmitProps) => {
      //send form info with an image
      const formData = new FormData();
      for (let value in values) {
          formData.append(value, values[value]);
      }
      formData.append("imagePath", values.imagePath.name);
      
      const savedUserResponse = await fetch(
          "http://localhost:5001/ruralproject",
          {
              method: "POST",
              body: formData,
          }
      );
      const savedProject = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if (savedProject) {
          navigate("/admin/recentProjects")
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
          <Typography fontWeight="bold" variant="h4" sx={{ mb: "1.5rem", textAlign:"center" }}>
          ADD RECENT PROJECT
          </Typography>
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
                              select
                              label="Project Type"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.projectType}
                              name="projectType"
                              error={Boolean(touched.projectType) && Boolean(errors.projectType)}
                              helperText={(touched.projectType) && (errors.projectType)}
                              sx={{ gridColumn: "span 2" }}
                          >
                              <MenuItem value="Domestic">Domestic</MenuItem>
                              <MenuItem value="Commercial">Commercial</MenuItem>
                          </TextField>
                          <TextField
                              label="End Date"
                              type="date"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.projectEndDate}
                              name="projectEndDate"
                              error={Boolean(touched.projectEndDate) && Boolean(errors.projectEndDate)}
                              helperText={(touched.projectEndDate) && (errors.projectEndDate)}
                              sx={{ gridColumn: "span 2" }}
                              InputLabelProps={{ shrink: true }}
                              inputProps={{ min: today }}
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
                              multiline
                              rows={4}
                              onChange={handleChange}
                              value={values.description}
                              name="description"
                              error={Boolean(touched.description) && Boolean(errors.description)}
                              helperText={(touched.description) && (errors.description)}
                              sx={{ gridColumn: "span 4" }}
                          />
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
