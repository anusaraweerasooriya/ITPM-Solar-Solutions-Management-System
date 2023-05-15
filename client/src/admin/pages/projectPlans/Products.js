import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ProductCard from "./ProductCard";

const Products = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box
      width={isNonMobileScreens ? "95%" : "93%"}
      pt="1rem"
      mt="1rem auto"
      borderRadius="1.5rem"
      backgroundColor="#ffffff"
    >
      <Typography
        fontWeight="bold"
        variant="h4"
        sx={{ mb: "1.5rem", textAlign: "center" }}
      >
        REQUIRED PRODUCTS
      </Typography>
      <hr></hr>

      <Box>
        <Box>
          <ProductCard />
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
