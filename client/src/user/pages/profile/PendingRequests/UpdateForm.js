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
import { Formik } from "formik";
import * as yup from "yup";
import FlexBox from "admin/components/FlexBox";
import GridTypeModal from "user/pages/planRequests/GridTypeModal";
import ErrorModal from "components/modals/ErrorModal";
import { useGetPendingRequestByIdQuery } from "hooks/api-hook";

const planRequestSchema = yup.object().shape({
  clientName: yup.string().required("This field cannot be empty"),
  email: yup
    .string()
    .email("invalid email")
    .required("This field cannot be empty"),

  phone: yup
    .number()
    .min(10, "Enter a valid phone  number")
    .required("This field cannot be empty"),

  companyName: yup.string().required("This field cannot be empty"),
  companyAddress: yup.string().required("This field cannot be empty"),
  monthlyPowerConsumption: yup.string().required("This field cannot be empty"),
  gridType: yup.string().required("This field cannot be empty"),
  clientAddress: yup.string().required("This field cannot be empty"),
  description: yup.string().required("This field cannot be empty"),
});

const initialValues = {
  email: "",
  clientName: "",
  phone: "",
  companyName: "",
  companyAddress: "",
  clientAddress: "",
  description: "",
  monthlyPowerConsumption: "",
  gridType: "",
};

const UpdateForm = ({ reqId, refetch, setIsForm }) => {
  const { palette } = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isCommercial, setIsCommercial] = useState(true);
  const [isGridModal, setIsGridModal] = useState(false);
  const { data } = useGetPendingRequestByIdQuery(
    { reqId },
    { refetchOnMountOrArgChange: true }
  );

  // eslint-disable-next-line no-lone-blocks
  if (data) {
    initialValues.clientAddress = data.clientAddress;
    initialValues.clientName = data.clientName;
    initialValues.companyAddress = data.companyAddress;
    initialValues.companyName = data.companyName;
    initialValues.email = data.email;
    initialValues.description = data.description;
    initialValues.gridType = data.gridType;
    initialValues.monthlyPowerConsumption = data.monthlyPowerConsumption;
    initialValues.phone = data.phone;
  }

  let type;
  const submitRequest = async (values, onSubmitProps) => {
    if (isCommercial) {
      type = "commercial";
    } else {
      type = "domestic";
    }

    values.type = type;
    const response = await fetch(
      `http://localhost:5001/requests/updateRequest/${reqId}`,
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
    <div>
      {isGridModal && <GridTypeModal />}
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
        validationSchema={planRequestSchema}
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
                "& > div": {
                  gridColumn: isNonMobileScreen ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                color="success"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Client Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clientName}
                name="clientName"
                color="success"
                error={
                  Boolean(touched.clientName) && Boolean(errors.clientName)
                }
                helperText={touched.clientName && errors.clientName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Phone"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                color="success"
                error={Boolean(touched.phone) && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box width="100%" mt="2rem">
              <FlexBox>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isCommercial}
                      onClick={() => {
                        setIsCommercial(!isCommercial);
                      }}
                    />
                  }
                  label="Commercial Project"
                  fontVariant="h2"
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: "1rem",
                      color: "green",
                      fontWeight: "bold",
                    },
                  }}
                />
              </FlexBox>
            </Box>
            <FlexBox mb="1rem">
              <Typography color="red">*</Typography>
              <Typography>
                If your requested plan is for commercial purposes please tick
                the above option
              </Typography>
            </FlexBox>
            {isCommercial && (
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                ml="6.5rem"
                width="110%"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobileScreen ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  label="Company Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyName}
                  name="companyName"
                  disabled={!isCommercial}
                  color="success"
                  error={
                    Boolean(touched.companyName) && Boolean(errors.companyName)
                  }
                  helperText={touched.companyName && errors.companyName}
                  sx={{ gridColumn: "span 3" }}
                />

                <TextField
                  label="Company Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={!isCommercial}
                  value={values.companyAddress}
                  name="companyAddress"
                  color="success"
                  error={
                    Boolean(touched.companyAddress) &&
                    Boolean(errors.companyAddress)
                  }
                  helperText={touched.companyAddress && errors.companyAddress}
                  sx={{ gridColumn: "span 3" }}
                />
              </Box>
            )}
            <Box
              display="grid"
              mt="1rem"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreen ? undefined : "span 4",
                },
              }}
            >
              <TextField
                select
                label="Monthly power consumption"
                name="monthlyPowerConsumption"
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue="0-60"
                value={values.monthlyPowerConsumption}
                helperText={
                  touched.monthlyPowerConsumption &&
                  errors.monthlyPowerConsumption
                }
                error={
                  Boolean(touched.monthlyPowerConsumption) &&
                  Boolean(errors.monthlyPowerConsumption)
                }
                color="success"
                sx={{ gridColumn: "span 4", mt: "1rem" }}
              >
                <MenuItem value="0-60">0-60</MenuItem>
                <MenuItem value="61-120">61 - 120 kWh</MenuItem>
                <MenuItem value="121-180">121 - 180 kWh</MenuItem>
                <MenuItem value="180-240">181 - 240 kWh</MenuItem>
                <MenuItem value="240>"> More than 240 kWh</MenuItem>
              </TextField>

              <TextField
                select
                label="Grid Type"
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue="Off-Grid"
                value={values.gridType}
                name="gridType"
                error={Boolean(touched.gridType) && Boolean(errors.gridType)}
                helperText={touched.gridType && errors.gridType}
                color="success"
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="Off-Grid">Off-Grid</MenuItem>
                <MenuItem value="On-Grid">On-Grid</MenuItem>
              </TextField>
            </Box>

            <Typography
              mt="1rem"
              color="green"
              fontWeight="bold"
              onClick={() => setIsGridModal(!isGridModal)}
              sx={{
                textDecoration: "underline",
                color: "green",
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              What is the Grid Type? Click here to understand more.
            </Typography>

            <Box
              display="grid"
              mt="3rem"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreen ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="Client Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clientAddress}
                name="clientAddress"
                color="success"
                error={
                  Boolean(touched.clientAddress) &&
                  Boolean(errors.clientAddress)
                }
                helperText={touched.clientAddress && errors.clientAddress}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Detailed explanation about the request plan"
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
                Update Request
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateForm;
