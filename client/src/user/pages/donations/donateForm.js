import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  useMediaQuery,
  Button,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import FlexBox from "admin/components/FlexBox";
import * as yup from "yup";
import FormModal from "components/modals/FormModal";
import PayPalButton from './paypalButton'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const donationSchema = yup.object().shape({
  fullName: yup.string().required("Name cannot be empty"),
  email: yup.string().email("invalid email").required("E-mail cannot be empty"),
  amount: yup.number().required("Please enter the amount"),
  contributingProject: yup.string(),
  date: yup.date(),
});

const DonateForm = () => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const projectId = location.state.id;
  const projectName = location.state.name;
  const today = new Date().toISOString().split("T")[0];

  //REcaptcha
  const [captchaKey, setCaptchaKey] = useState("");
  const recaptchaHandler = (value) => {
    setCaptchaKey(value);
  };
  const [isCaptcha, setIsCaptcha] = useState(true);

  //select payment options
  const [isOpen, setIsOpen] = useState(false);

  //card pay form
  const [isCardPayment, setIsCardPayment] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setcvv] = useState("");

  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const initialValuesDonation = {
    fullName: "",
    email: "",
    amount: "",
    contributingProject: projectName,
    date: today,
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("values", values)
    values.user = user._id;
    values.type = "Donation";
    values.cardNumber = cardNumber;
    values.cardName = cardName;
    values.expDate = expDate;
    values.project = projectId;
    const response = await fetch(
      "http://localhost:5001/donations/createDonation",
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
        navigate("/donate");
      }
    }
  };

  if (user) {
    initialValuesDonation.fullName = user.name;
    initialValuesDonation.email = user.email;
  }

  return (
    <Box
      width={isNonMobileScreens ? "50%" : "93%"}
      p="3rem"
      m="2rem auto"
      borderRadius="1.5rem"
      backgroundColor="#ffffff"
    >
      <Typography fontWeight="bold" variant="h4" sx={{ textAlign: "center" }}>
        GIVE TO AN AREA OF GREATEST NEED
      </Typography>
      <hr></hr>
      <Typography variant="h6" sx={{ mb: "1.5rem" }}>
        100% of your donation will solely be contributed to the specific project
        and you will be able to view your total contributions via user profile.
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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="E-mail"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={Boolean(touched.amount) && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Contributing Project"
                onBlur={handleBlur}
                onChange={handleChange}
                value={projectName}
                name="contributingProject"
                error={
                  Boolean(touched.contributingProject) &&
                  Boolean(errors.contributingProject)
                }
                helperText={
                  touched.contributingProject && errors.contributingProject
                }
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                disabled
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={today}
                name="date"
                error={Boolean(touched.date) && Boolean(errors.date)}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 4" }}
              />
              {isCaptcha && (
              <ReCAPTCHA
                sitekey="6LcreUskAAAAABVC02ZrdpVnOfFSwC7bxP-oN5cp"
                onChange={recaptchaHandler}
              />
              )}
            </Box>

            {/* BUTTONs */}
            <FlexBox gap="1rem">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  resetForm();
                }}
                sx={{
                  m: "2rem 0",
                  p: "0.8rem",
                  width: "8rem",
                }}
              >
                Clear
              </Button>

              {!isOpen && 
                !isPaymentSuccess && (
                  <Button
                    variant="contained"
                    color="success"
                    disabled={!captchaKey}
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{
                      m: "2rem 0",
                      p: "0.8rem",
                      width: "10rem",
                    }}
                  >
                    Proceed to Pay
                  </Button>
                )
              }


              {isPaymentSuccess &&
              <Button
                variant="outlined"
                color="success"
                startIcon={<CheckCircleOutlineIcon />}
                sx={{
                  m: "2rem 0",
                  p: "0.8rem",
                  width: "15rem",
                  fontWeight: "bold"
                }}
              >
                Payment Successfull
              </Button>
              }
              </FlexBox>

              {isPaymentSuccess &&
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{
                  m: "2rem 0",
                  p: "0.8rem",
                  width: "100%"
                }}
              >
                Submit
              </Button>
              }


              {/* =======================================select payment options ==================================== */}
              {isOpen && 
                <FormModal setOpen={setIsOpen} open={isOpen}>
                  <Box>
                      <Typography textAlign="center" fontWeight="bold" fontSize="1.5rem">
                          Amount : $ {values.amount}
                      </Typography>

                      <FlexBox padding="2rem" gap="2rem">
                          <Box mt="-40px" onClick={() => {setIsCardPayment(true)}}>
                              <img 
                                  width="130px"
                                  alt="visa"
                                  src={`http://localhost:5001/assets/visa.png`}
                              />
                          </Box>
                          <Box mt="-40px" onClick={() => {setIsCardPayment(true)}}>
                              <img 
                                  width="100px"
                                  alt="master"
                                  src={`http://localhost:5001/assets/master.png`}
                              />
                          </Box>
                          <PayPalButton/>
                      </FlexBox>

                      {/* =======================================card pay form ==================================== */}
                      {isCardPayment && (
                        <>
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
                            onChange={(e) => setCardNumber(e.target.value)}
                            value={cardNumber}
                            sx={{ gridColumn: "span 4" }}
                          />
                          <TextField
                            label="Name on card"
                            onChange={(e) => setCardName(e.target.value)}
                            value={cardName}
                            sx={{ gridColumn: "span 4" }}
                          />
                          <TextField
                            label="Payment Amount"
                            disabled
                            value={values.amount}
                            sx={{ gridColumn: "span 2" }}
                          />
                          <TextField
                            label="Expiry Date"
                            placeholder="MM/YY"
                            onChange={(e) => setExpDate(e.target.value)}
                            value={expDate}
                            sx={{ gridColumn: "span 1" }}
                          />
                          <TextField
                            label="CVV"
                            onChange={(e) => setcvv(e.target.value)}
                            value={cvv}
                            sx={{ gridColumn: "span 1" }}
                          />
                        </Box>

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
                          onClick={() => {setIsOpen(!isOpen); setIsPaymentSuccess(true); setIsCaptcha(false)}}
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
                        </>
                      )}


                  </Box>
                </FormModal>
              }

          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DonateForm;


