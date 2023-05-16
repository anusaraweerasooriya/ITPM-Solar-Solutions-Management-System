import React from "react";
import {
  Box,
  useMediaQuery,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormModal from "components/modals/FormModal";
import SuccessModal from "./SuccessModal";

const CardPayment = ({ amount, userId }) => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const [isOpen, setIsOpen] = useState(false);

  const validationSchema = yup.object().shape({
    cardNumber: yup.string().required("Card number can not be empty"),
    cardName: yup.string().required("Card name can not be empty"),
    expDate: yup.string().required("Expiry date can not be empty"),
    cvv: yup.string().required("CVV can not be empty"),
  });

  const initialValues = {
    cardNumber: "",
    cardName: "",
    amount: amount,
    expDate: "",
    cvv: "",
  };

  const handleSubmit = async (values, onSubmitProps) => {
    values.user = userId;
    values.type = "Donation";
    const response = await fetch(
      "http://localhost:5001/payments/createPayment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedResponse = await response.json();
    console.log(savedResponse);

    if (!response.ok) {
      throw new Error(savedResponse.message);
    }

    if (response.ok) {
      if (savedResponse) {
        onSubmitProps.resetForm();
        setIsOpen(!isOpen);
      }
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
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
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            <TextField
              label="Card Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.cardNumber}
              name="cardNumber"
              error={Boolean(touched.cardNumber) && Boolean(errors.cardNumber)}
              helperText={touched.cardNumber && errors.cardNumber}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Card Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.cardName}
              name="cardName"
              error={Boolean(touched.cardName) && Boolean(errors.cardName)}
              helperText={touched.cardName && errors.cardName}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Amount"
              disabled
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.amount}
              name="amount"
              error={Boolean(touched.amount) && Boolean(errors.amount)}
              helperText={touched.amount && errors.amount}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Expiry Date"
              placeholder="MM/YY"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.expDate}
              name="expDate"
              error={Boolean(touched.expDate) && Boolean(errors.expDate)}
              helperText={touched.expDate && errors.expDate}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              label="CVV"
              onBlur={handleBlur}
              onChange={handleChange}
              name="cvv"
              error={Boolean(touched.cvv) && Boolean(errors.cvv)}
              helperText={touched.cvv && errors.cvv}
              sx={{ gridColumn: "span 1" }}
            />
          </Box>

          {/* BUTTONs */}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              resetForm();
            }}
            sx={{
              mt: "4rem",
              mr: "1rem",
              p: "0.5rem",
              width: "8rem",
            }}
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              mt: "4rem",
              p: "0.5rem",
              width: "8rem",
            }}
          >
            Submit
          </Button>

          {/* Success message */}
          {isOpen && (
            <SuccessModal
              setOpen={setIsOpen}
              open={isOpen}
              title={
                <Typography fontWeight="bold">
                  Donation payment is submitted successfully
                </Typography>
              }
            >
              <Typography>We appreciate your helping hand</Typography>
            </SuccessModal>
          )}
        </form>
      )}
    </Formik>
  );
};

export default CardPayment;
