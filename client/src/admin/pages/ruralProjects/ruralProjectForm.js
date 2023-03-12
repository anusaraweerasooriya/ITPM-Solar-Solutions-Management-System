import { useState } from "react";
import { 
    Box, 
    useMediaQuery,
    Button,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBox from "admin/components/FlexBox";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const ruralProjectSchema = yup.object().shape({
    projectName: yup.string().required("Project name cannot be empty"),
    location: yup.string().required("Location cannot be empty"),
    projectType: yup.string().required("Please select project type"),
    monthlyConsumption: yup.number().required("Monthly consumption amount cannot be empty"),
    gridType: yup.string().required("Please select grid type"),
    estimInitiateDate: yup.date().required("Please select estimated initiation date"),
    estimEndDate: yup.date().required("Please select estimated end date"),
    estimTotalCost: yup.number().required("Estimated total cost cannot be empty"),
    imagePath: yup.string(),
    description: yup.string(),
    currentAllocation: yup.number(),
    status: yup.string()
})

const initialValuesRuralProject = {
    projectName:  "",
    location:  "",
    projectType:  "",
    monthlyConsumption:  "",
    gridType:  "",
    estimInitiateDate:  "",
    estimEndDate:  "",
    estimTotalCost: "",
    imagePath: "",
    description: "",
    currentAllocation: 0,
    status: "Pending"
}

const RuralProjectForm = () => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)");

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
            console.log("project saved!!!!!!!!!!!!!!!!!!");
        }
    };

    return (
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
                <form  onSubmit={handleSubmit}>
                    <Box 
                        pt="20px"
                        display="grid" 
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx = {{
                            "& > div": { gridColumn : isNonMobileScreens ? undefined : "span 4" },      
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
                            sx={{ gridColumn: "span 2" }}
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
                            label="Monthly Consumption"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.monthlyConsumption}
                            name="monthlyConsumption"
                            error={Boolean(touched.monthlyConsumption) && Boolean(errors.monthlyConsumption)}
                            helperText={(touched.monthlyConsumption) && (errors.monthlyConsumption)}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Grid Type"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.gridType}
                            name="gridType"
                            error={Boolean(touched.gridType) && Boolean(errors.gridType)}
                            helperText={(touched.gridType) && (errors.gridType)}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Estimated Initiation Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.estimInitiateDate}
                            name="estimInitiateDate"
                            error={Boolean(touched.estimInitiateDate) && Boolean(errors.estimInitiateDate)}
                            helperText={(touched.estimInitiateDate) && (errors.estimInitiateDate)}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Estimated End Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.estimEndDate}
                            name="estimEndDate"
                            error={Boolean(touched.estimEndDate) && Boolean(errors.estimEndDate)}
                            helperText={(touched.estimEndDate) && (errors.estimEndDate)}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField 
                            label="Estimated Cost"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.estimTotalCost}
                            name="estimTotalCost"
                            error={Boolean(touched.estimTotalCost) && Boolean(errors.estimTotalCost)}
                            helperText={(touched.estimTotalCost) && (errors.estimTotalCost)}
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
                                setFieldValue("picture", acceptedFiles[0])
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
                                {!values.picture ? (
                                    <p>Add Picture Here</p>
                                ) : (
                                    <FlexBox>
                                    <Typography>{values.picture.name}</Typography>
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
                            error={Boolean(touched.description) && Boolean(errors.description)}
                            helperText={(touched.description) && (errors.description)}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* ADD BUTTON */}
                    <Button type="submit" variant="contained" color="success" fullWidth
                        sx={{
                            m: "2rem 0",
                            p: "1rem",
                        }}
                    >
                        ADD
                    </Button>
                </form >
            )}
        </Formik>
    );
}

export default RuralProjectForm;