import React, { useEffect, useState } from "react";
import {
  Box,
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

import dayjs from "dayjs";

import { Formik } from "formik";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import BillTable from "./BillTable";
import OverviewChart from "./OverviewChart";
import { useSelector } from "react-redux";
import { ResponsiveLine } from "@nivo/line";
import ChartBill from "./Chart";

const data = [
  {
    id: "japan",
    color: "hsl(211, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 16,
      },
      {
        x: "helicopter",
        y: 4,
      },
      {
        x: "boat",
        y: 4,
      },
      {
        x: "train",
        y: 297,
      },
      {
        x: "subway",
        y: 135,
      },
      {
        x: "bus",
        y: 73,
      },
      {
        x: "car",
        y: 210,
      },
      {
        x: "moto",
        y: 294,
      },
      {
        x: "bicycle",
        y: 190,
      },
      {
        x: "horse",
        y: 262,
      },
      {
        x: "skateboard",
        y: 161,
      },
      {
        x: "others",
        y: 133,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(250, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 95,
      },
      {
        x: "helicopter",
        y: 126,
      },
      {
        x: "boat",
        y: 31,
      },
      {
        x: "train",
        y: 283,
      },
      {
        x: "subway",
        y: 106,
      },
      {
        x: "bus",
        y: 15,
      },
      {
        x: "car",
        y: 256,
      },
      {
        x: "moto",
        y: 105,
      },
      {
        x: "bicycle",
        y: 47,
      },
      {
        x: "horse",
        y: 219,
      },
      {
        x: "skateboard",
        y: 237,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(303, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 122,
      },
      {
        x: "helicopter",
        y: 239,
      },
      {
        x: "boat",
        y: 263,
      },
      {
        x: "train",
        y: 67,
      },
      {
        x: "subway",
        y: 81,
      },
      {
        x: "bus",
        y: 71,
      },
      {
        x: "car",
        y: 45,
      },
      {
        x: "moto",
        y: 260,
      },
      {
        x: "bicycle",
        y: 34,
      },
      {
        x: "horse",
        y: 168,
      },
      {
        x: "skateboard",
        y: 174,
      },
      {
        x: "others",
        y: 78,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(168, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 126,
      },
      {
        x: "helicopter",
        y: 116,
      },
      {
        x: "boat",
        y: 195,
      },
      {
        x: "train",
        y: 30,
      },
      {
        x: "subway",
        y: 80,
      },
      {
        x: "bus",
        y: 221,
      },
      {
        x: "car",
        y: 45,
      },
      {
        x: "moto",
        y: 188,
      },
      {
        x: "bicycle",
        y: 61,
      },
      {
        x: "horse",
        y: 150,
      },
      {
        x: "skateboard",
        y: 15,
      },
      {
        x: "others",
        y: 50,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(314, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 228,
      },
      {
        x: "helicopter",
        y: 30,
      },
      {
        x: "boat",
        y: 66,
      },
      {
        x: "train",
        y: 15,
      },
      {
        x: "subway",
        y: 81,
      },
      {
        x: "bus",
        y: 250,
      },
      {
        x: "car",
        y: 29,
      },
      {
        x: "moto",
        y: 198,
      },
      {
        x: "bicycle",
        y: 230,
      },
      {
        x: "horse",
        y: 116,
      },
      {
        x: "skateboard",
        y: 149,
      },
      {
        x: "others",
        y: 279,
      },
    ],
  },
];

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
  noOfDays: yup
    .number()
    .positive("This should be a positive number")
    .required(),
  noOfUnits: yup
    .number()
    .positive("This should be a positive number")
    .required(),
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

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [noDays, setNoDays] = useState(0);

  const [prevUnits, setPrevUnits] = useState(0);
  const [currUnits, setCurrUnits] = useState(0);
  const [noOfUnits, setNoOfUnits] = useState(0);

  const [billData, setBillData] = useState();
  const [isTable, setIsTable] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  const currentReadingHandler = (event) => {
    const currValue = event.target.value;
    setCurrUnits(currValue);
  };
  const prevReadingHandler = (event) => {
    const prevValue = event.target.value;
    setPrevUnits(prevValue);
  };

  useEffect(() => {
    setNoOfUnits(currUnits - prevUnits);
    initialFormValues.noOfUnits = noOfUnits;
  }, [currUnits, noOfUnits, prevUnits]);

  const startDateHandler = (event) => {
    setStartDate(event.target.value);
  };
  const endDateHandler = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    const date1 = dayjs(endDate);
    const date2 = dayjs(startDate);

    setNoDays(date1.diff(date2, "day"));

    initialFormValues.noOfDays = noDays;
  }, [endDate, noDays, startDate]);

  if (isAuth) {
    initialFormValues.email = user.email;
  }

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

                      <TextField
                        label="Prev Reading Date"
                        type="date"
                        onChange={startDateHandler}
                        disabled={isDays}
                        size="medium"
                        defaultValue={dayjs(values.someDate).format(
                          "YYYY-MM-DD"
                        )}
                        color="success"
                        sx={{ width: "100%", mt: "2rem" }}
                      />

                      <TextField
                        label="Current Reading Date"
                        type="date"
                        onChange={endDateHandler}
                        disabled={isDays}
                        size="medium"
                        defaultValue={dayjs(values.someDate).format(
                          "YYYY-MM-DD"
                        )}
                        color="success"
                        sx={{ width: "100%", mt: "2rem" }}
                      />

                      <TextField
                        label="Number of days"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.noOfDays}
                        name="noOfDays"
                        size="medium"
                        color="success"
                        error={
                          Boolean(touched.noOfDays) && Boolean(errors.noOfDays)
                        }
                        helperText={touched.noOfDays && errors.noOfDays}
                        sx={{ width: "100%", mt: "2rem" }}
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
                        onChange={prevReadingHandler}
                        size="medium"
                        color="success"
                        disabled={!isUnits}
                        // error={
                        //   Boolean(touched.noOfDays) && Boolean(errors.noOfDays)
                        // }
                        // helperText={touched.noOfDays && errors.noOfDays}
                        sx={{ width: "100%", mt: "2rem", mb: "2rem" }}
                      />
                      <TextField
                        label="Current Meter Reading"
                        type="number"
                        onBlur={handleBlur}
                        onChange={currentReadingHandler}
                        size="medium"
                        color="success"
                        disabled={!isUnits}
                        // error={
                        //   Boolean(touched.noOfDays) && Boolean(errors.noOfDays)
                        // }
                        // helperText={touched.noOfDays && errors.noOfDays}
                        sx={{ width: "100%", mb: "2rem" }}
                      />
                      <TextField
                        label="Number of Units"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="noOfUnits"
                        value={values.noOfUnits}
                        size="medium"
                        // disabled={isUnits}
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
                  <Button
                    onClick={() => resetForm()}
                    variant="outlined"
                    size="large"
                    sx={{ mr: "1rem" }}
                  >
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
        <Box
          height={isTable && "80vh"}
          sx={{
            position: "relative",
            width: "80vw",
            mt: "2rem",
            mb: "2rem",
            ml: "3rem",
          }}
        >
          {isTable && <ChartBill chartData={billData} />}
        </Box>
        <Box mt="2rem">
          <Divider sx={{ backgroundColor: "none", mt: "3rem" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default BillGenerator;
