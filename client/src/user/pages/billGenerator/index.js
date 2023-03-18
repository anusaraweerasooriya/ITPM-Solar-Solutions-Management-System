import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  MenuItem,
  CardHeader,
  CardContent,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  useMediaQuery,
  Divider,
  Button,
} from "@mui/material";
import FlexBox from "admin/components/FlexBox";
import {
  LocalizationProvider,
  DatePicker,
  MobileDatePicker,
  StaticDatePicker,
  DesktopDatePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

import { Formik } from "formik";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import BillTable from "./BillTable";
import OverviewChart from "./OverviewChart";

const DayHandlingRadioGroup = ({ isDays, setIsDays }) => {
  const onChangeHandler = (event) => {
    if (event.target.value === "date") {
      setIsDays(false);
    } else {
      setIsDays(true);
    }
  };
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Select method
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChangeHandler}
        defaultValue="days"
      >
        <FormControlLabel value="date" control={<Radio />} label="Pick Dates" />
        <FormControlLabel
          value="days"
          control={<Radio />}
          label="Number of days"
        />
      </RadioGroup>
    </FormControl>
  );
};

const UnitsHandlingRadioGroup = ({ isUnits, setIsUnits }) => {
  const onChangeHandler2 = (event) => {
    if (event.target.value === "units") {
      setIsUnits(false);
    }
    if (event.target.value === "reading") {
      setIsUnits(true);
    }
  };
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Select method
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChangeHandler2}
        defaultValue="units"
      >
        <FormControlLabel
          value="reading"
          control={<Radio />}
          label="Readings"
        />
        <FormControlLabel
          value="units"
          control={<Radio />}
          label="Number of units"
        />
      </RadioGroup>
    </FormControl>
  );
};

const billGeneratorSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email")
    .required("This field cannot be empty"),
  noOfDays: yup.number().required(),
  noOfUnits: yup.number().required(),
});

const initialFormValues = {
  email: "",
  category: "Domestic",
  noOfDays: "",
  noOfUnits: "",
};

const BillGenerator = () => {
  const [isDays, setIsDays] = useState(true);
  const [isUnits, setIsUnits] = useState(true);
  const [units, setUnits] = useState(0);
  const [prevUnits, setPrevUnits] = useState(0);
  const [currUnits, setCurrUnits] = useState(0);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [billData, setBillData] = useState();
  const [isTable, setIsTable] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  console.log(isUnits);

  const generateBill = async (values, onSubmitProps) => {
    console.log(values);
    const response = await fetch("http://localhost:5001/bill/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const generatedBill = await response.json();
    setBillData(generatedBill);
    console.log(generatedBill);

    if (!response.ok) {
      throw new Error(generateBill.message);
    }
    if (response.ok) {
      onSubmitProps.resetForm();

      setIsTable(true);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await generateBill(values, onSubmitProps);
    } catch (error) {
      console.log(error);
    }
  };

  const currentReadingHandler = (event) => {
    setCurrUnits(event.target.value);
  };
  const prevReadingHandler = (event) => {
    setPrevUnits(event.target.value);
  };
  // const noOfUnitsHandler = () => {
  //   return currUnits - prevUnits;
  // };

  return (
    <Box>
      <Box
        sx={{
          background: "white",
          m: "2.5rem",
          borderRadius: "0.8rem",
        }}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialFormValues}
          validationSchema={billGeneratorSchema}
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
              <Box>
                <Box
                  m="2rem"
                  display="grid"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  justifyContent="space-between"
                  rowGap="20px"
                  columnGap="1.33%"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobileScreen ? undefined : "span 3",
                    },
                  }}
                >
                  <Card sx={{ m: "1.2rem", boxShadow: 3 }}>
                    <CardHeader
                      title="Traffic and Details"
                      subheader="Select the traffic type and enter email"
                      sx={{
                        background:
                          "linear-gradient(to right, #5465FF, #8490FF)",

                        ".MuiCardHeader-title": {
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "white",
                        },
                        ".MuiCardHeader-subheader": {
                          color: "white",
                        },
                      }}
                    />
                    <CardContent sx={{ m: "1rem" }}>
                      <TextField
                        label="Email"
                        type="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        size="medium"
                        color="success"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{ width: "100%" }}
                      />
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Traffic Type"
                        name="category"
                        defaultValue="Domestic"
                        helperText={touched.category && errors.category}
                        error={
                          Boolean(touched.category) && Boolean(errors.category)
                        }
                        size="medium"
                        color="success"
                        sx={{ width: "100%", mt: "2rem" }}
                      >
                        <MenuItem value="Domestic">Domestic</MenuItem>
                        <MenuItem value="Commercial">Commercial</MenuItem>
                      </TextField>
                    </CardContent>
                  </Card>
                  <Card sx={{ m: "1.2rem", boxShadow: 3 }}>
                    <CardHeader
                      title="Period"
                      subheader="Period in days"
                      sx={{
                        background:
                          "linear-gradient(to right, #5465FF, #959FFF)",

                        ".MuiCardHeader-title": {
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "white",
                        },
                        ".MuiCardHeader-subheader": {
                          color: "white",
                        },
                      }}
                    />
                    <CardContent sx={{ m: "1rem" }}>
                      <DayHandlingRadioGroup
                        isDays={isDays}
                        setIsDays={setIsDays}
                      />
                      <Box mt="2rem" mb="2rem">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={["DatePicker", "DatePicker", "", ""]}
                          >
                            <DemoItem label="Current Reading Date">
                              <DatePicker
                                defaultValue={dayjs("2022-04-17")}
                                disabled={isDays}
                              />
                            </DemoItem>
                            <DemoItem label="Last Reading Date">
                              <DatePicker
                                defaultValue={dayjs("2022-04-17")}
                                disabled={isDays}
                              />
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>

                      <TextField
                        label="Number of days"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.noOfDays}
                        name="noOfDays"
                        size="medium"
                        color="success"
                        disabled={!isDays}
                        error={
                          Boolean(touched.noOfDays) && Boolean(errors.noOfDays)
                        }
                        helperText={touched.noOfDays && errors.noOfDays}
                        sx={{ width: "100%" }}
                      />
                    </CardContent>
                  </Card>
                  <Card sx={{ m: "1.2rem", boxShadow: 3 }}>
                    <CardHeader
                      title="Import Units /kWh"
                      subheader="Customer  Grid"
                      sx={{
                        background:
                          "linear-gradient(to right, #5465FF, #959FFF)",

                        ".MuiCardHeader-title": {
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "white",
                        },
                        ".MuiCardHeader-subheader": {
                          color: "white",
                        },
                      }}
                    />
                    <CardContent sx={{ m: "1rem" }}>
                      <UnitsHandlingRadioGroup
                        isUnits={isUnits}
                        setIsUnits={setIsUnits}
                      />
                      <TextField
                        label="Previous Meter Reading"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyUp={prevReadingHandler}
                        name="noOfDays"
                        size="medium"
                        color="success"
                        disabled={!isUnits}
                        error={
                          Boolean(touched.noOfDays) && Boolean(errors.noOfDays)
                        }
                        helperText={touched.noOfDays && errors.noOfDays}
                        sx={{ width: "100%", mt: "2rem", mb: "2rem" }}
                      />
                      <TextField
                        label="Current Meter Reading"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyUp={currentReadingHandler}
                        // name="noOfDays"
                        size="medium"
                        color="success"
                        disabled={!isUnits}
                        error={
                          Boolean(touched.noOfDays) && Boolean(errors.noOfDays)
                        }
                        helperText={touched.noOfDays && errors.noOfDays}
                        sx={{ width: "100%", mb: "2rem" }}
                      />
                      <TextField
                        label="Number of Units"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="noOfUnits"
                        // value={noOfUnitsHandler}
                        size="medium"
                        disabled={isUnits}
                        color="success"
                        error={
                          Boolean(touched.noOfUnits) &&
                          Boolean(errors.noOfUnits)
                        }
                        helperText={touched.noOfUnits && errors.noOfUnits}
                        sx={{ width: "100%" }}
                      />
                    </CardContent>
                  </Card>
                </Box>
                <Box m="1rem">
                  <Divider sx={{ backgroundColor: "black" }} />
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  mr="3.2rem"
                >
                  <Button variant="outlined" size="large" sx={{ mr: "1rem" }}>
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                      background: "#1769aa",
                    }}
                  >
                    Genreate Bill
                  </Button>
                </Box>
                <Box m="1rem">
                  <Divider sx={{ backgroundColor: "black" }} />
                </Box>
              </Box>
            </form>
          )}
        </Formik>
        {/*=================== OUTPUT TABLE =============================*/}
        <Box mb="2rem">{isTable && <BillTable billData={billData} />}</Box>
        <Box m="1rem">
          <Divider sx={{ backgroundColor: "black" }} />
        </Box>
        <Box m="3.2rem">
          {isTable && <OverviewChart chartData={billData} />}
        </Box>
      </Box>
    </Box>
  );
};

export default BillGenerator;
