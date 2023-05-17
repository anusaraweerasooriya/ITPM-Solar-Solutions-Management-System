import React, { useState } from 'react'
import * as yup from "yup";
import { useSelector } from "react-redux";
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
import { Formik } from 'formik';
import FlexBox from "admin/components/FlexBox";

const productRequestSchema = yup.object().shape({
    fullName: yup.string().required("Name cannot be empty"),
    email: yup.string().email("invalid email").required("E-mail cannot be empty"),
    phone: yup.number().min(10, "Enter a valid phone  number").required("This field cannot be empty"),
    relatedProduct: yup.string(),
    date: yup.date(),
    messages: yup.string().required("This field cannot be empty"),
});

const ProductRequestForm = () => {
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const ProductId = location.state.id;
    const productName = location.state.name;
    const today = new Date().toISOString().split("T")[0];
    const [captchaKey, setCaptchaKey] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const initialValuesProductRequest = {
        fullName: "",
        email: "",
        phone: "",
        relatedProduct: productName,
        date: today,
        messages: "",
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        const savedProductRequestResponse = await fetch(
            "http://localhost:5001/productRequests/createProductRequest",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const savedProductRequest = await savedProductRequestResponse.json();
        onSubmitProps.resetForm();

        if (savedProductRequest) {
            navigate("/products");
        }
    };

    const recaptchaHandler = (value) => {
        setCaptchaKey(value);
    };

    if (user) {
        initialValuesProductRequest.fullName = user.name;
        initialValuesProductRequest.email = user.email;
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
                GET IN TOUCH
            </Typography>
            <hr></hr>
            <Typography variant="h6" sx={{ mb: "1.5rem" }}>
                Please complete the form below and we'll get in touch.
            </Typography>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesProductRequest}
                validationSchema={productRequestSchema}
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
                                label="Phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                name="phone"
                                error={Boolean(touched.phone) && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Related Product"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={productName}
                                name="relatedProduct"
                                error={
                                Boolean(touched.relatedProduct) &&
                                Boolean(errors.relatedProduct)
                                }
                                helperText={
                                touched.relatedProduct && errors.relatedProduct
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
                            <TextField
                                label="Message"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.messages}
                                name="messages"
                                color="success"
                                multiline
                                rows={5}
                                error={
                                Boolean(touched.messages) && Boolean(errors.messages)
                                }
                                helperText={touched.messages && errors.messages}
                                sx={{ gridColumn: "span 4" }}
                            />
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
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                //onClick={() => setIsOpen(!isOpen)}
                                sx={{
                                m: "2rem 0",
                                p: "0.8rem",
                                width: "8rem",
                                }}
                            >
                                Submit
                            </Button>
                        </FlexBox>
                    </form>
                )}

            </Formik>
    </Box>
  )
}

export default ProductRequestForm;
