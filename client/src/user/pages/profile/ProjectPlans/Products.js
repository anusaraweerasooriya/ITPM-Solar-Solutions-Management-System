import React from "react";
import { Box, Typography, useMediaQuery, Divider } from "@mui/material";
import ProductCard from "./ProductCard";

const Products = ({ servicePack }) => {
  const products = Object.keys(servicePack.products);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box
      width={isNonMobileScreens ? "95%" : "93%"}
      pt="1rem"
      mt="1rem auto"
      borderRadius="1.5rem"
      backgroundColor="#ffffff"
    >
      <Box mb="1rem">
        <Box>
          {products &&
            products.map((productId) => (
              <ProductCard
                id={productId}
                qty={servicePack.products[productId]}
              />
            ))}
        </Box>
      </Box>
      <Box m="1rem">
        <Divider sx={{ background: "black" }} />
      </Box>
      <Typography
        variant="h5"
        color="darkgreen"
        m="0.7rem"
        fontWeight="bold"
        align="end"
      >
        Total Product Cost: {servicePack.totalProductCost}
      </Typography>
      <br />
    </Box>
  );
};

export default Products;
