import React, { useState } from 'react'
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
import * as yup from "yup";
import { useGetProductsQuery } from 'hooks/api-hook';

const ProductSchema = yup.object().shape({
    productName: yup.string().required("Product name cannot be empty"),
    price: yup.string().required("Product price cannot be empty"),
    productType: yup.string().required("Please select a product type"),
    imagePath: yup.string().required("please choose an image"),
    category: yup.string().required("Please select a product category"),
    description: yup.string(),
    ratedPower: yup.string().required("Please fill this field"),
    batteryVoltage: yup.string().required("Please fill this field"),
    MPPTVoltage: yup.string().required("Please fill this field"),
});

const initialValuesProduct = {
    productName: "",
    price: "",
    productType: "",
    imagePath: "",
    category: "Inverter",
    description: "",
    ratedPower: "",
    batteryVoltage: "",
    MPPTVoltage: "",
};

const UpdateProductForm = () => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
    const today = new Date().toISOString().split("T")[0];
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const { data } = useGetProductsQuery
  return (
    <div>
      
    </div>
  )
}

export default UpdateProductForm
