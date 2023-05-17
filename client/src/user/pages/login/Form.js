import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "hooks/auth-hook";
import ReCAPTCHA from "react-google-recaptcha";
import ErrorModal from "components/modals/ErrorModal";

const registerSchema = yup.object().shape({
  fullname: yup.string().required("This field cannot be empty"),
  email: yup
    .string()
    .email("invalid email")
    .required("This field cannot be empty"),
  password: yup.string().min(7, "must be at least 7 characters long"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const loginSchema = yup.object().shape({
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  fullname: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const initialLoginFormValues = {
  email: "",
  password: "",
};

const Form = (props) => {
  const [pageType, setPageType] = useState("login");
  const [captchaKey, setCaptchaKey] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");

  props.isLoginHandle(isLogin);

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "http://localhost:5001/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const savedUser = await savedUserResponse.json();

    if (!savedUserResponse.ok) {
      throw new Error(savedUser.message);
    }
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const logged = await loggedInResponse.json();

    if (!loggedInResponse.ok) {
      throw new Error(logged.message);
    }

    if (loggedInResponse.ok) {
      onSubmitProps.resetForm();
      if (logged.user) {
        dispatch(
          setLogin({
            user: logged.user,
            token: logged.token,
            role: logged.user.role,
          })
        );
        if (logged.user.role === "admin") {
          navigate("/admin/planRequests");
        } else {
          navigate("/home");
        }
      }
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      try {
        await login(values, onSubmitProps);
      } catch (err) {
        setOpen(true);
        setError(err.message);
      }
    }

    if (isRegister) {
      try {
        await register(values, onSubmitProps);
      } catch (err) {
        setOpen(true);
        setError(err.message);
      }
    }
  };

  const recaptchaHandler = (value) => {
    setCaptchaKey(value);
  };

  return (
    <div>
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
        initialValues={isLogin ? initialLoginFormValues : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
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
              {isRegister && (
                <>
                  <TextField
                    label="Full Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullname}
                    name="fullname"
                    color="success"
                    error={
                      Boolean(touched.fullname) && Boolean(errors.fullname)
                    }
                    helperText={touched.fullname && errors.fullname}
                    sx={{ gridColumn: "span 4", color: "green" }}
                  />
                </>
              )}
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
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                color="success"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              {isRegister && (
                <TextField
                  label="Re-enter password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.passwordConfirmation}
                  name="passwordConfirmation"
                  color="success"
                  error={
                    Boolean(touched.passwordConfirmation) &&
                    Boolean(errors.passwordConfirmation)
                  }
                  helperText={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                  sx={{ gridColumn: "span 4" }}
                />
              )}

              {!isLogin && (
                <ReCAPTCHA
                  sitekey="6LcreUskAAAAABVC02ZrdpVnOfFSwC7bxP-oN5cp"
                  onChange={recaptchaHandler}
                />
              )}
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
                disabled={!captchaKey && !isLogin}
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  borderRadius: "1.5rem",
                  fontWeight: "bold",
                  fontSize: "0.8rem",

                  // "&:hover": { color: palette.primary.main },
                }}
              >
                {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: "#2e4cf1",
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
