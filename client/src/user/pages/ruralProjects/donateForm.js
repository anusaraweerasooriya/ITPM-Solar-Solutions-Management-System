import { useLocation } from 'react-router-dom';
import { 
  Box, 
  useMediaQuery,
  Button,
  TextField,
  Typography,
  useTheme,
  MenuItem,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBox from "admin/components/FlexBox";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";

const donationSchema = yup.object().shape({
  fullName: yup.string().required("Name cannot be empty"),
  email: yup.string().email("invalid email").required("E-mail cannot be empty"),
  amount: yup.number().required("Please enter the amount"),
  contributingProject: yup.string(),
  date: yup.date()
})

const today = new Date().toISOString().split('T')[0];

const initialValuesDonation = {
  fullName:  "",
  email:  "",
  amount:  "",
  contributingProject: "",
  date:  today,
}

const DonateForm = () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  //get project info
  const location = useLocation();
  const id = location.state.id;
  const projectName = location.state.name;

  const handleFormSubmit = async(values, onSubmitProps) => {
    const savedDonationResponse = await fetch(
        "http://localhost:5001/submitDonation",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        }
    );
    const savedDonation = await savedDonationResponse.json();
    onSubmitProps.resetForm();

    if (savedDonation) {
        console.log("project saved!!!!!!!!!!!!!!!!!!");
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
      <Typography fontWeight="bold" variant="h4" sx={{ textAlign:"center" }}>
        GIVE TO AN AREA OF GREATEST NEED
      </Typography>
      <hr></hr>
      <Typography variant='h6' sx={{mb: "1.5rem"}}>
        100% of your donation will solely be contributed to the specific project and you will be able to view your total contributions via user profile. 
      </Typography>
      
      <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesDonation}
          validationSchema={donationSchema}
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
                          label="Full Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.fullName}
                          name="fullName"
                          error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                          helperText={(touched.fullName) && (errors.fullName)}
                          sx={{ gridColumn: "span 4" }}
                      />
                      <TextField 
                          label="E-mail"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={Boolean(touched.email) && Boolean(errors.email)}
                          helperText={(touched.email) && (errors.email)}
                          sx={{ gridColumn: "span 2" }}
                      />
                      <TextField 
                          label="Amount"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.amount}
                          name="amount"
                          error={Boolean(touched.amount) && Boolean(errors.amount)}
                          helperText={(touched.amount) && (errors.amount)}
                          sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                          label="Contributing Project"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={projectName}
                          name="contributingProject"
                          error={Boolean(touched.contributingProject) && Boolean(errors.contributingProject)}
                          helperText={(touched.contributingProject) && (errors.contributingProject)}
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
                          Proceed to Pay
                      </Button>
                  </FlexBox>
              </form >
          )}
      </Formik>
  </Box>
    );
}

export default DonateForm;